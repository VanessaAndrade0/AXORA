'use strict';
/* Conexión con Supabase.
   - Datos: una sola tabla "docs" (ruta + JSON) protegida por usuario. Al entrar se
     cargan todos tus documentos a memoria; cada cambio se escribe primero en
     Supabase y luego se refleja en pantalla.
   - Capturas: bucket privado "capturas", cada usuaria en su propia carpeta.
   La app (app.js) solo conoce la interfaz doc()/collection() de memDb. */

function memDb(ganchos){
  ganchos=ganchos||{};
  const docs=new Map(),oyentes=new Set();
  const copia=o=>JSON.parse(JSON.stringify(o??null));
  const rid=()=>(window.crypto&&crypto.randomUUID)?crypto.randomUUID().replace(/-/g,'').slice(0,20):Math.random().toString(36).slice(2,12)+Date.now().toString(36);
  const meta={fromCache:false,hasPendingWrites:false};
  const sDoc=p=>({id:p.split('/').pop(),exists:docs.has(p),data:()=>docs.get(p),metadata:meta});
  const sCol=p=>{const d=[...docs.keys()].filter(k=>k.startsWith(p+'/')&&!k.slice(p.length+1).includes('/')).sort().map(sDoc);return{docs:d,size:d.length,empty:!d.length,docChanges:()=>[],metadata:meta}};
  const avisar=()=>oyentes.forEach(f=>f());
  const oir=f=>{oyentes.add(f);Promise.resolve().then(f);return()=>oyentes.delete(f)};
  const doc=p=>({id:p.split('/').pop(),path:p,
    get:async()=>sDoc(p),
    set:async d=>{const c=copia(d);if(ganchos.guardar)await ganchos.guardar(p,c);docs.set(p,c);avisar()},
    update:async d=>{const c={...(docs.get(p)||{}),...copia(d)};if(ganchos.guardar)await ganchos.guardar(p,c);docs.set(p,c);avisar()},
    delete:async()=>{if(ganchos.borrar)await ganchos.borrar(p);docs.delete(p);avisar()},
    onSnapshot:n=>oir(()=>n(sDoc(p))),
    collection:c=>col(p+'/'+c)});
  const col=p=>{const q={path:p,where:()=>q,orderBy:()=>q,limit:()=>q,
    doc:id=>doc(p+'/'+(id||rid())),
    add:async d=>{const r=q.doc();await r.set(d);return r},
    get:async()=>sCol(p),
    onSnapshot:n=>oir(()=>n(sCol(p)))};return q};
  return{doc,collection:col,
    // cambios que llegan desde Supabase (otro dispositivo): no se vuelven a escribir
    _poner(p,d){docs.set(p,copia(d));avisar()},
    _quitar(p){if(docs.delete(p))avisar()},
    _reemplazar(filas){docs.clear();filas.forEach(f=>docs.set(f.path,f.data));avisar()}};
}

const Backend=(()=>{
  const BUCKET='capturas',TABLA='docs';
  let sb=null,uid=null,email='',local=null,ultima=0;
  const cfg=()=>window.NACAR_CONFIG||{};
  const configurado=()=>/^https:\/\/[^/]+\.[^/]+/.test(cfg().supabaseUrl||'')&&String(cfg().supabaseKey||'').length>20&&!/PEGA_AQUI/.test(cfg().supabaseKey);
  const ok=r=>{if(r.error)throw r.error;return r.data};

  async function iniciar(){
    if(!configurado()||!window.supabase||!window.supabase.createClient)return{estado:'sin-config'};
    sb=window.supabase.createClient(cfg().supabaseUrl.replace(/\/+$/,''),cfg().supabaseKey);
    const {data,error}=await sb.auth.getSession();
    if(error||!data||!data.session)return{estado:'sin-sesion'};
    uid=data.session.user.id;email=data.session.user.email||'';
    return{estado:'listo'};
  }
  async function entrar(correo,clave){
    const data=ok(await sb.auth.signInWithPassword({email:correo,password:clave}));
    uid=data.user.id;email=data.user.email||'';
  }
  async function salir(){try{if(sb)await sb.auth.signOut()}catch(e){console.error(e)}}

  async function leerTodo(){
    const filas=[];
    for(let i=0;;i+=1000){
      const data=ok(await sb.from(TABLA).select('path,data').eq('user_id',uid).order('path').range(i,i+999));
      filas.push(...data);
      if(data.length<1000)break;
    }
    ultima=Date.now();
    return filas;
  }
  async function cargar(){
    const filas=await leerTodo();
    local=memDb({
      guardar:async(p,d)=>{ok(await sb.from(TABLA).upsert({user_id:uid,path:p,data:d,updated_at:new Date().toISOString()},{onConflict:'user_id,path'}))},
      borrar:async p=>{ok(await sb.from(TABLA).delete().eq('user_id',uid).eq('path',p))}
    });
    local._reemplazar(filas);
    // Lo que cambies en otro dispositivo llega en vivo...
    try{
      sb.channel('docs-'+uid).on('postgres_changes',{event:'*',schema:'public',table:TABLA,filter:'user_id=eq.'+uid},c=>{
        if(c.eventType==='DELETE'){if(c.old&&c.old.path&&(!c.old.user_id||c.old.user_id===uid))local._quitar(c.old.path)}
        else if(c.new&&c.new.path&&c.new.user_id===uid)local._poner(c.new.path,c.new.data);
      }).subscribe();
    }catch(e){console.error(e)}
    // ...y, por si acaso, se vuelve a leer todo al regresar a la app después de un rato.
    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState!=='visible'||Date.now()-ultima<60000)return;
      leerTodo().then(f=>local._reemplazar(f)).catch(e=>console.error(e));
    });
  }

  const assets={
    async upload(blob,o){
      const tipo=(o&&o.type)||blob.type||'image/jpeg',ext=tipo==='image/png'?'png':tipo==='image/webp'?'webp':tipo==='image/gif'?'gif':'jpg';
      const nombre=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2,10);
      const ruta=uid+'/'+nombre+'.'+ext;
      ok(await sb.storage.from(BUCKET).upload(ruta,blob,{contentType:tipo,upsert:false,cacheControl:'31536000'}));
      return{id:ruta};
    },
    async delete(id){ok(await sb.storage.from(BUCKET).remove([id]));return{deleted:true}},
    async list(){
      const data=ok(await sb.storage.from(BUCKET).list(uid,{limit:1000}))||[];
      return{usage:{files:data.length,bytes:data.reduce((a,f)=>a+((f.metadata&&f.metadata.size)||0),0)}};
    }
  };
  async function urlsFotos(ids){
    const data=ok(await sb.storage.from(BUCKET).createSignedUrls(ids,3600))||[],mapa={};
    data.forEach((d,i)=>{if(d&&d.signedUrl&&!d.error)mapa[d.path||ids[i]]=d.signedUrl});
    return mapa;
  }
  async function bajarFoto(id){return ok(await sb.storage.from(BUCKET).download(id))}

  return{iniciar,entrar,salir,cargar,db:()=>local,assets,urlsFotos,bajarFoto,correo:()=>email};
})();
