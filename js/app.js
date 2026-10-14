'use strict';
/* ---------- catálogo ---------- */
const MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const MES_C=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const CATS={
  gasto:[
    {id:'casa',n:'Mensualidad de la casa',c:'#c6a15b'},
    {id:'mant',n:'Cuota de mantenimiento',c:'#a8854a'},
    {id:'predial',n:'Predial e impuestos',c:'#8c7a5a'},
    {id:'inversion',n:'Inversión y mejoras',c:'#2f8f9a'},
    {id:'suscripciones',n:'Suscripciones',c:'#bf4d75'},
    {id:'servicios',n:'Servicios (luz, agua, internet)',c:'#5b8fc7'},
    {id:'comida',n:'Comida',c:'#4fa58c'},
    {id:'transporte',n:'Transporte',c:'#6f7fc9'},
    {id:'escuela',n:'Escuela',c:'#9a6fd0'},
    {id:'salud',n:'Salud',c:'#d0607f'},
    {id:'personal',n:'Ropa y personal',c:'#c77bc0'},
    {id:'diversion',n:'Diversión',c:'#e08a52'},
    {id:'ahorro',n:'Ahorro',c:'#5aa35f'},
    {id:'deudas',n:'Deudas y tarjetas',c:'#c25050'},
    {id:'otros',n:'Otros gastos',c:'#a3969a'}],
  ingreso:[
    {id:'sueldo',n:'Sueldo',c:'#c6a15b'},
    {id:'renta',n:'Renta de la casa',c:'#bf4d75'},
    {id:'negocio',n:'Ventas o negocio',c:'#9a6fd0'},
    {id:'apoyo',n:'Apoyo o regalo',c:'#4fa58c'},
    {id:'otro_ing',n:'Otros ingresos',c:'#a3969a'}]
};
const CAT_CASA=['casa','mant','predial','renta'];
const METODOS=['Transferencia SPEI','Tarjeta de débito','Tarjeta de crédito','Efectivo','Tarjeta de vales','Depósito en ventanilla','Cargo domiciliado'];
const VALES='Tarjeta de vales';
const SUBS=['Amazon Prime','Netflix','Spotify','Disney+','Max','YouTube Premium','iCloud+','Apple Music','Canva','Gimnasio'];
const NOMBRES=['AXORA','Nácar','Peonía','Alhaja','Rosa Dorada','Champán','Cuarzo','Lumbre','Vané'];
const catDe=id=>[...CATS.gasto,...CATS.ingreso].find(c=>c.id===id)||{id:'otros',n:'Sin categoría',c:'#a3969a'};
const VISTAS=[['inicio','Inicio'],['movimientos','Movimientos'],['capturas','Capturas'],['pagos','Pagos'],['inversion','Inversión'],['casa','Casa'],['plan','Plan'],['ajustes','Ajustes']];
const EN_MAS=['inversion','casa','plan','ajustes'];
const IC={
  inicio:'<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  movimientos:'<path d="M7 4v16m0 0-3-3m3 3 3-3M17 20V4m0 0-3 3m3-3 3 3"/>',
  capturas:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5.5-5 4 3.5 3-2.5L21 18"/>',
  pagos:'<path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7 2.5 7h-17S6 15 6 9z"/><path d="M10 20a2.2 2.2 0 0 0 4 0"/>',
  inversion:'<path d="M4 19h16M6 16l4-5 3 3 5-7"/><path d="M15 7h3v3"/>',
  casa:'<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8m-3 3 3 3m-6 0 2 2"/>',
  plan:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  ajustes:'<path d="M4 7h10m4 0h2M4 17h2m4 0h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  mas_menu:'<circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/>',
  mas:'<path d="M12 5v14M5 12h14"/>',
  asa:'<circle cx="9" cy="6" r="1.2"/><circle cx="15" cy="6" r="1.2"/><circle cx="9" cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/><circle cx="9" cy="18" r="1.2"/><circle cx="15" cy="18" r="1.2"/>',
  izq:'<path d="m14.5 6-6 6 6 6"/>',
  der:'<path d="m9.5 6 6 6-6 6"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  subir:'<path d="M12 16V5m0 0-4 4m4-4 4 4M5 19h14"/>',
  bajar:'<path d="M12 5v11m0 0-4-4m4 4 4-4M5 19h14"/>',
  sol:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
  luna:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>'
};
const ic=(n,s=20)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]||''}</svg>`;

/* ---------- utilidades ---------- */
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtM=new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'});
const $m=n=>fmtM.format(Number(n)||0);
const num=v=>{const n=parseFloat(String(v??'').replace(/[^0-9.]/g,''));return isFinite(n)?Math.round(n*100)/100:0};
const dia31=v=>Math.max(0,Math.min(31,Math.round(num(v))));
const p2=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate());
const hoy=()=>iso(new Date());
const clon=o=>JSON.parse(JSON.stringify(o??null));
const mesDe=ym=>MESES[+ym.slice(5,7)-1];
const nombreMes=ym=>mesDe(ym)+' '+ym.slice(0,4);
const fechaLarga=f=>{const [y,m,d]=f.split('-').map(Number);return new Intl.DateTimeFormat('es-MX',{weekday:'long',day:'numeric',month:'long'}).format(new Date(y,m-1,d))};
const fechaCorta=f=>{const [y,m,d]=f.split('-').map(Number);return d+' '+MES_C[m-1].toLowerCase()+' '+y};
const corto=v=>v>=1e6?'$'+(v/1e6).toFixed(1)+'M':v>=1000?'$'+Math.round(v/1000)+'k':'$'+Math.round(v);
const techo=v=>{if(v<=0)return 1;const p=10**Math.floor(Math.log10(v)),n=v/p;return (n<=1?1:n<=2?2:n<=5?5:10)*p};
/* Las capturas viven en un bucket privado: cada imagen se pide con un enlace firmado que dura una hora. */
const PIXEL='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const urlFotos=new Map(),colaFotos=new Set();
function fotoUrl(id){
  if(!id)return PIXEL;
  if(/^(blob:|data:)/.test(id))return id;
  const c=urlFotos.get(id);
  if(c&&Date.now()-c.t<45*60000)return c.url;
  if(!colaFotos.size)setTimeout(resolverFotos,0);
  colaFotos.add(id);
  return c?c.url:PIXEL;
}
async function resolverFotos(){
  const ids=[...colaFotos];colaFotos.clear();if(!ids.length)return;
  let mapa={};try{mapa=await Backend.urlsFotos(ids)}catch(e){console.error(e)}
  ids.forEach(id=>{if(mapa[id])urlFotos.set(id,{url:mapa[id],t:Date.now()})});
  document.querySelectorAll('img[data-fid]').forEach(img=>{
    const id=img.dataset.fid;if(!ids.includes(id))return;
    if(mapa[id])img.src=mapa[id];
    else if(img.hasAttribute('data-foto')&&img.parentElement)img.parentElement.classList.add('rota');
    else img.hidden=true;
  });
}
const pct=(a,b)=>b>0?Math.max(0,Math.min(100,a/b*100)):0;

/* ---------- tema ---------- */
const raiz=document.documentElement,temaHost=raiz.getAttribute('data-theme');
let tema='auto';
function esOscuro(){const a=raiz.getAttribute('data-theme');return a?a==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches}
function aplicarTema(t,guardar){
  tema=t;
  if(t==='claro')raiz.setAttribute('data-theme','light');
  else if(t==='oscuro')raiz.setAttribute('data-theme','dark');
  else if(temaHost)raiz.setAttribute('data-theme',temaHost);
  else raiz.removeAttribute('data-theme');
  if(guardar){try{localStorage.setItem('tema',t)}catch(e){}}
  const b=$('btn-tema');if(b)b.innerHTML=ic(esOscuro()?'sol':'luna',19);
}

/* ---------- estado ---------- */
const AJ_DEF=()=>({nombreApp:'',logo:'',sueldo:0,vales:0,frecuencia:'quincenal',anios:[],presupuestos:{},
  casa:{nombre:'Mi casa',precio:0,enganche:0,credito:0,saldo:0,saldoFecha:'',mensualidad:0,diaPago:0,diaPago2:0,diaFin:0,captura:true,plazo:0,institucion:''},
  renta:{estado:'buscando',monto:0,inquilino:'',diaPago:0,deposito:0,inicio:'',fin:''}});
const S={modo:'cargando',dueno:true,vista:'inicio',ym:hoy().slice(0,7),libro:{},fijos:[],metas:[],proyectos:[],aj:AJ_DEF(),
  f:{tipo:'todos',cat:'',q:'',alcance:'mes'},uso:null};
let db=null,assets=null,descargas=null,F=null,V=null;
const subs={};

const delMes=ym=>(S.libro[ym.slice(0,4)]||[]).filter(m=>m.fecha.startsWith(ym));
const delAnio=y=>S.libro[y]||[];
const todos=()=>Object.values(S.libro).flat();
const suma=(arr,tipo)=>arr.reduce((a,m)=>a+(m.tipo===tipo?m.monto:0),0);
const total=arr=>arr.reduce((a,m)=>a+m.monto,0);
const orden=(a,b)=>b.fecha.localeCompare(a.fecha)||String(b.creado||'').localeCompare(String(a.creado||''));
// Un pago puede cubrir un mes distinto al de su fecha (ej. te cobran el 29 lo del día 1).
const perDe=m=>m.periodo||m.fecha.slice(0,7);
const pagosDe=ym=>todos().filter(m=>m.tipo==='gasto'&&perDe(m)===ym);
const cobrosCasa=()=>S.aj.casa.diaPago2>0?2:1;
const Mes=ym=>{const n=nombreMes(ym);return n[0].toUpperCase()+n.slice(1)};
function optsPer(base){
  const [y,m]=base.split('-').map(Number);let h='';
  for(let i=-2;i<=2;i++){const d=new Date(y,m-1+i,1),v=d.getFullYear()+'-'+p2(d.getMonth()+1);h+=`<option value="${v}" ${i===0?'selected':''}>${Mes(v)}</option>`}
  return h;
}
const VERSION='13 oct 2026 · v10';
// Pagos del mismo concepto ya registrados que podrían ser el cobro de este mes hecho por adelantado.
// cercanos: últimos 10 días del mes anterior (se preguntan antes de abrir el formulario).
// recientes: últimos dos meses (se ofrecen dentro del formulario, junto a las capturas).
function pagosPrevios(f,ym,dias){
  const [y,m]=ym.split('-').map(Number),ini=iso(new Date(y,m-1,1-dias)),fin=iso(new Date(y,m,0));
  return todos().filter(x=>x.tipo==='gasto'&&(f.virtual?x.cat==='casa':x.fijoId===f.id)&&perDe(x)!==ym&&x.fecha>=ini&&x.fecha<=fin).sort(orden);
}
const filaPrevio=(x,ym)=>`<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:8px"><span style="flex:1;min-width:150px"><b>${esc(fechaCorta(x.fecha))}</b> · ${$m(x.monto)}${x.fotos&&x.fotos.length?' · con captura':' · sin captura'}</span><button type="button" class="btn pri chico" data-a="usar-pago" data-id="${esc(x.id)}" data-y="${x.fecha.slice(0,4)}" data-ym="${ym}">Usar para ${esc(mesDe(ym))}</button></div>`;
let PRE=null;
function registrarFijo(f,ym){
  PRE={tipo:'gasto',monto:f.montoPlan||f.monto,cat:f.cat,concepto:f.nombre+' de '+mesDe(ym)+(f.cuota?' (cobro '+f.cuota+')':''),periodo:ym,recientes:pagosPrevios(f,ym,62).slice(0,4),fijoId:f.virtual?'':f.id,metodo:f.clase==='suscripcion'?'Cargo domiciliado':'Transferencia SPEI'};
  const [y,m]=ym.split('-').map(Number),limite=iso(new Date(y,m-1,-9));
  const cercanos=pagosPrevios(f,ym,10).filter(x=>x.fecha<iso(new Date(y,m-1,1))&&x.fecha>=limite).slice(0,3);
  if(!cercanos.length)return abrirMov(PRE);
  abrirHoja('¿Ya lo tienes registrado?',`<div class="form">
    <p>Tienes ${cercanos.length===1?'un pago registrado':'pagos registrados'} a finales del mes anterior. Si es el cobro de <b>${esc(mesDe(ym))}</b> que te hicieron antes, úsalo: ${esc(mesDe(ym))} queda como pagado con esa misma captura.</p>
    <div class="req">${cercanos.map(x=>filaPrevio(x,ym)).join('')}</div>
    <div class="pie"><button type="button" class="btn" data-a="cerrar">Cancelar</button><button type="button" class="btn" data-a="pagar-nuevo">Es otro pago, registrar uno nuevo</button></div>
    <p class="error" id="frm-error" hidden></p></div>`);
}
// Movimientos que pueden pertenecer a un proyecto: compras de inversión e ingresos del negocio.
const enProyecto=m=>(m.tipo==='gasto'&&m.cat==='inversion')||(m.tipo==='ingreso'&&m.cat==='negocio');
const proyDe=m=>S.proyectos.find(p=>p.id===m.proyectoId)||null;
const sinId=m=>{const c=clon(m);delete c.id;return c};
// Compras que se pagan en partes: `total` es el precio completo; cada abono es otro movimiento con `abonoDe`.
const abonosDe=id=>todos().filter(m=>m.abonoDe===id);
const pagadoDe=m=>m.monto+total(abonosDe(m.id));
const debeDe=m=>m.total>0?Math.max(0,Math.round((m.total-pagadoDe(m))*100)/100):0;
const tipoDeCat=cat=>CATS.ingreso.some(c=>c.id===cat)?'ingreso':'gasto';
const optsCatTodo=sel=>`<optgroup label="Pagos y gastos">${optsCat('gasto',sel)}</optgroup><optgroup label="Ingresos">${optsCat('ingreso',sel)}</optgroup>`;
async function moverA(id,y,pid){
  const m=delAnio(y).find(x=>x.id===id);if(!m)return;
  if((proyDe(m)?m.proyectoId:'')===pid)return;
  const doc=sinId(m);if(pid)doc.proyectoId=pid;else delete doc.proyectoId;
  try{await db.doc('libro/'+y+'/movs/'+id).set(doc);
    for(const a of abonosDe(id)){const c=sinId(a);if(pid)c.proyectoId=pid;else delete c.proyectoId;await db.doc('libro/'+a.fecha.slice(0,4)+'/movs/'+a.id).set(c)}
    const p=S.proyectos.find(x=>x.id===pid);toast(p?'Movido a '+p.nombre:'Quedó sin proyecto');pintar()}
  catch(e){toast(msgError(e))}
}
// Mensaje claro cuando no se puede hablar con Supabase (sin internet o proyecto en pausa).
const PAUSA='No se pudo conectar con tu base de datos. Si llevas varios días sin abrir la app, tu proyecto de Supabase se pausó: entra a supabase.com, abre el proyecto y presiona "Restore project". Tarda unos minutos y tus datos siguen ahí.';
const sinConexion=e=>{const m=String((e&&e.message)||''),st=+((e&&(e.status||e.statusCode))||0);return st===0||st>=500||/fetch|network|load failed|timeout|retryable/i.test(m)};
const nombreGuardado=()=>{try{return localStorage.getItem('nombreApp')||''}catch(e){return ''}};
const nombreApp=()=>S.aj.nombreApp||nombreGuardado()||'AXORA';
const puedeFotos=()=>S.modo!=='db'||!!assets;
const casaVirtual=()=>S.aj.casa.mensualidad>0&&!S.fijos.some(f=>f.cat==='casa');
const fechaObj=f=>{const [y,m,d]=f.split('-').map(Number);return new Date(y,m-1,d)};
// Fecha en que toca un cobro: el día `d` del mes `ym` (o el último día si el mes es más corto).
function vencimiento(ym,d){const [y,m]=ym.split('-').map(Number);return new Date(y,m-1,Math.min(d||1,new Date(y,m,0).getDate()))}
function estadoFijo(f,ym){
  if(f.pagado)return{k:'ok',txt:'Pagado'};
  const h=hoy(),hm=h.slice(0,7),d=+h.slice(8);
  if(ym<hm){
    // cobros anteriores a tu primer pago registrado: no se marcan como faltantes
    const antes=!f.primero||vencimiento(ym,f.dia).getTime()<fechaObj(f.primero).getTime()-5*864e5;
    return antes?{k:'',txt:'Antes de tu registro',fuera:true}:{k:'mal',txt:'Sin registrar'};
  }
  if(ym>hm)return{k:'',txt:'Próximo'};
  if(f.clase==='suscripcion')return !f.dia||d>=f.dia?{k:'pend',txt:'Cargo por registrar'}:{k:'',txt:'Se cobra el día '+f.dia};
  if(!f.dia)return{k:'pend',txt:'Pendiente'};
  const fin=Math.max(f.dia,f.diaFin||0);
  if(d<f.dia)return{k:'',txt:'Abre el día '+f.dia};
  if(d<=fin){const q=fin-d;return{k:'pend',txt:q===0?'Vence hoy':q===1?'Queda 1 día':'Quedan '+q+' días'}}
  return{k:'mal',txt:'Vencido hace '+(d-fin)+(d-fin===1?' día':' días')};
}
function fijosDe(ym){
  const ms=pagosDe(ym),mes=+ym.slice(5,7),l=[],todo=todos();
  // Cada pago del mes se asigna al cobro cuya fecha queda más cerca (un pago del 14 cubre el cobro del 15).
  // El monto que se muestra en un cobro pagado es lo que realmente pagaste.
  const partir=(f,pagos,esSuyo)=>{
    const dias=(f.dia2>0?[f.dia||0,f.dia2]:[f.dia||0]).sort((a,b)=>a-b),libres=dias.map((_,i)=>i),asign={};
    [...pagos].sort((a,b)=>a.fecha.localeCompare(b.fecha)).forEach(p=>{
      if(!libres.length)return;
      const t=fechaObj(p.fecha).getTime(),dist=i=>Math.abs(vencimiento(ym,dias[i]).getTime()-t);
      let k=0;libres.forEach((ci,j)=>{if(dist(ci)<dist(libres[k]))k=j});
      asign[libres[k]]=p;libres.splice(k,1);
    });
    const primero=todo.filter(esSuyo).reduce((a,m)=>!a||m.fecha<a?m.fecha:a,'');
    dias.forEach((d,i)=>{const p=asign[i];l.push({...f,dia:d,diaFin:d===f.dia?f.diaFin:0,cuota:dias.length>1?i+1:0,pagado:!!p,pago:p||null,montoPlan:f.monto,monto:p?p.monto:f.monto,primero})});
  };
  S.fijos.filter(f=>f.ciclo!=='anual'||(+f.mes||1)===mes).forEach(f=>partir(f,ms.filter(m=>m.fijoId===f.id),m=>m.tipo==='gasto'&&m.fijoId===f.id));
  const c=S.aj.casa;
  if(casaVirtual())partir({id:'__casa',virtual:true,nombre:'Mensualidad de la casa',monto:c.mensualidad,dia:c.diaPago,dia2:c.diaPago2,diaFin:c.diaFin,cat:'casa',captura:c.captura!==false},ms.filter(m=>m.cat==='casa'),m=>m.tipo==='gasto'&&m.cat==='casa');
  return l.map(f=>({...f,est:estadoFijo(f,ym)})).sort((a,b)=>(a.dia||99)-(b.dia||99));
}
// Días de cobro de un pago fijo o de la casa, para sugerir a qué mes corresponde un pago.
function diasCobro(fijoId,cat){
  const f=S.fijos.find(x=>x.id===fijoId),o=f||(cat==='casa'&&casaVirtual()?{dia:S.aj.casa.diaPago,dia2:S.aj.casa.diaPago2}:null);
  if(!o||!o.dia)return[];
  return o.dia2>0?[o.dia,o.dia2]:[o.dia];
}
// Un pago hecho hasta 5 días antes de un cobro del mes siguiente (ej. el 29 por el cobro del día 1) cubre ese mes.
function periodoSugerido(fecha,dias){
  const [y,m]=fecha.split('-').map(Number),sig=new Date(y,m,1),ymSig=sig.getFullYear()+'-'+p2(sig.getMonth()+1),t=fechaObj(fecha).getTime();
  return dias.some(d=>{const falta=(vencimiento(ymSig,d).getTime()-t)/864e5;return falta>0&&falta<=5})?ymSig:fecha.slice(0,7);
}
const avisosHoy=()=>fijosDe(hoy().slice(0,7)).filter(f=>f.clase!=='suscripcion'&&(f.est.k==='pend'||f.est.k==='mal'));
const pideCaptura=(fijoId,tipo,cat)=>{
  if(tipo!=='gasto'||!puedeFotos())return false;
  const f=S.fijos.find(x=>x.id===fijoId);
  if(f)return f.captura===true;
  return cat==='casa'&&casaVirtual()&&S.aj.casa.captura!==false;
};

/* ---------- datos ---------- */
function errSub(){S.modo==='db'&&aviso('Se perdió la conexión con tus datos. Recarga la página para volver a intentarlo.')}
function subAnio(y){
  y=String(y);if(subs[y])return;
  S.libro[y]=S.libro[y]||[];
  subs[y]=db.collection('libro/'+y+'/movs').limit(1000).onSnapshot(q=>{
    S.libro[y]=q.docs.map(d=>({id:d.id,...clon(d.data())})).filter(m=>m.fecha&&m.tipo);pintar();
  },errSub);
}
function asegurarAnios(){new Set([...(S.aj.anios||[]),+S.ym.slice(0,4),new Date().getFullYear()]).forEach(subAnio)}
function suscribir(){
  db.doc('ajustes/principal').onSnapshot(s=>{
    const d=s.exists?clon(s.data()):{},b=AJ_DEF();
    S.aj={...b,...d,casa:{...b.casa,...(d.casa||{})},renta:{...b.renta,...(d.renta||{})},presupuestos:{...(d.presupuestos||{})},anios:[...(d.anios||[])]};
    if(S.aj.nombreApp){try{localStorage.setItem('nombreApp',S.aj.nombreApp)}catch(e){}}
    document.title=nombreApp();
    asegurarAnios();pintar();
  },errSub);
  const col=(n,k)=>db.collection(n).limit(500).onSnapshot(q=>{S[k]=q.docs.map(d=>({id:d.id,...clon(d.data())}));pintar()},errSub);
  col('fijos','fijos');col('metas','metas');col('proyectos','proyectos');
  asegurarAnios();
}
const guardarAj=()=>db.doc('ajustes/principal').set(clon(S.aj));
async function guardarMov(doc,idPrevio,anioPrevio,idNuevo){
  const y=doc.fecha.slice(0,4),col=db.collection('libro/'+y+'/movs');
  const ref=idPrevio&&anioPrevio===y?col.doc(idPrevio):col.doc(idNuevo||undefined);
  await ref.set(doc);
  if(idPrevio&&anioPrevio!==y)await db.doc('libro/'+anioPrevio+'/movs/'+idPrevio).delete();
  if(!S.aj.anios.includes(+y)){S.aj.anios=[...S.aj.anios,+y].sort();await guardarAj()}
  subAnio(y);
}
async function redibujar(file,max,tipo){
  const url=URL.createObjectURL(file);
  try{
    const img=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=url});
    const k=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));
    const c=document.createElement('canvas');c.width=Math.round(img.naturalWidth*k);c.height=Math.round(img.naturalHeight*k);
    const x=c.getContext('2d');if(tipo==='image/jpeg'){x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height)}x.drawImage(img,0,0,c.width,c.height);
    const b=await new Promise(r=>c.toBlob(r,tipo,0.86));
    return b||file;
  }catch(e){return file}finally{URL.revokeObjectURL(url)}
}
async function subirImagen(file,max,tipoSalida){
  const blob=await redibujar(file,max,tipoSalida);
  if(S.modo!=='db')return URL.createObjectURL(blob);
  const tipo=['image/jpeg','image/png','image/webp','image/gif'].includes(blob.type)?blob.type:'';
  if(!tipo)throw{code:'unsupported_type'};
  return (await assets.upload(blob,{type:tipo})).id;
}
const subirFoto=file=>subirImagen(file,1800,'image/jpeg');
function borrarFoto(id){
  if(!id)return;
  if(/^blob:/.test(id)){URL.revokeObjectURL(id);return}
  if(assets&&!/^data:/.test(id))assets.delete(id).catch(()=>{});
}
function msgError(e){
  console.error(e);
  const c=e&&e.code,m=String((e&&e.message)||''),st=+((e&&(e.status||e.statusCode))||0);
  if(c==='unsupported_type'||/mime type/i.test(m))return 'Ese tipo de archivo no se puede subir. Usa una captura de pantalla o una foto JPG o PNG.';
  if(st===413||/too large|exceeded the maximum/i.test(m))return 'La imagen pesa demasiado. Prueba con una captura de pantalla.';
  if(st===401||st===403||/jwt|row-level security|not authorized/i.test(m))return 'Tu sesión venció o no tiene permiso. Recarga la página e inicia sesión de nuevo.';
  if(/failed to fetch|network|load failed/i.test(m))return 'Sin conexión. Revisa tu internet y vuelve a intentarlo.';
  return 'No se pudo guardar. Vuelve a intentarlo en un momento.';
}

/* ---------- pintado ---------- */
let pend=false;
function pintar(){if(pend)return;pend=true;setTimeout(()=>{pend=false;pintarAhora()},0)}
function aviso(t){$('aviso').innerHTML=t?`<div class="aviso">${esc(t)}</div>`:''}
function toast(t){const e=$('toast');e.textContent=t;e.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>{e.hidden=true},2600)}
function marcaHtml(){return (S.aj.logo?`<img data-logo data-fid="${esc(S.aj.logo)}" src="${esc(fotoUrl(S.aj.logo))}" alt="">`:'<i></i>')+`<span>${esc(nombreApp())}</span>`}
function marco(){
  const n=avisosHoy().length,v=S.vista;
  const btn=(id,t,on,icono)=>`<button type="button" data-a="ir" data-v="${id}" class="${on?'on':''}" ${on?'aria-current="page"':''}>${ic(icono||id)}<span>${t}</span>${id==='pagos'&&n?`<span class="globo" aria-label="${n} pagos por hacer">${n}</span>`:''}</button>`;
  $('riel').innerHTML=`<div class="marca">${marcaHtml()}</div>`+VISTAS.map(([id,t])=>btn(id,t,v===id)).join('')+`<div class="pie">${S.modo==='db'?'Sesión iniciada':S.modo==='memoria'?'Modo de prueba':'Abriendo…'}<br>Versión ${VERSION}</div>`;
  $('pestanas').innerHTML=VISTAS.slice(0,4).map(([id,t])=>btn(id,t,v===id)).join('')+btn('mas','Más',v==='mas'||EN_MAS.includes(v),'mas_menu');
  $('marca-movil').innerHTML=marcaHtml();
  $('titulo').textContent=v==='mas'?'Más':(VISTAS.find(x=>x[0]===v)||VISTAS[0])[1];
  $('mes-txt').textContent=nombreMes(S.ym);
}
function pintarAhora(){
  marco();
  if(S.vista==='movimientos'&&$('lista')){$('lista').innerHTML=listaMovs();return}
  $('vista').innerHTML=({inicio:vInicio,movimientos:vMovs,capturas:vCapturas,pagos:vPagos,inversion:vInversion,casa:vCasa,plan:vPlan,ajustes:vAjustes,mas:vMas}[S.vista]||vInicio)();
  const g=document.querySelector('.graf');if(g)g.scrollLeft=(g.scrollWidth-g.clientWidth)*((+S.ym.slice(5,7)-1)/11);
}
function filaMov(m){
  const c=catDe(m.cat);
  return `<button type="button" class="mov" data-a="ver" data-id="${esc(m.id)}" data-y="${m.fecha.slice(0,4)}">
    <span class="punto" style="--c:${c.c}"></span>
    <span class="mov-t"><b>${esc(m.concepto||c.n)}</b><small>${m.total>0?`Pagado ${$m(pagadoDe(m))} de ${$m(m.total)}${debeDe(m)>0?' · faltan '+$m(debeDe(m)):' · liquidado'}`:esc(c.n)+(m.abonoDe?' · abono':'')+(m.periodo&&m.periodo!==m.fecha.slice(0,7)?' · cubre '+esc(mesDe(m.periodo)):'')+(m.metodo?' · '+esc(m.metodo):'')}</small></span>
    ${m.fotos&&m.fotos.length?`<span class="clip" title="Capturas">${ic('capturas',13)}${m.fotos.length}</span>`:'<span></span>'}
    <span class="monto ${m.tipo}">${m.tipo==='ingreso'?'+':'−'}${$m(m.monto)}</span></button>`;
}
function agrupado(ms,conAnio){
  let h='',f='';
  ms.forEach(m=>{if(m.fecha!==f){f=m.fecha;h+=`<div class="dia">${esc(fechaLarga(f))}${conAnio?' '+f.slice(0,4):''}</div>`}h+=filaMov(m)});
  return h;
}
function plazoTxt(f){
  let t=f.dia?(f.diaFin>f.dia?`Del ${f.dia} al ${f.diaFin}`:'Día '+f.dia):'Sin día fijo';
  if(f.ciclo==='anual')t+=' de '+MESES[(+f.mes||1)-1]+' · anual';
  return t;
}
function filaFijo(f,editable,ym){
  const sub=f.clase==='suscripcion';
  return `<div class="fila"><span class="punto" style="--c:${catDe(f.cat).c}"></span>
    <div class="cuerpo"><b>${esc(f.nombre)}${f.cuota?` · cobro ${f.cuota} de 2`:''}</b><small>${esc(plazoTxt(f))}${f.pago?' · pagado el '+esc(fechaCorta(f.pago.fecha)):(sub?'':' · '+esc(catDe(f.cat).n))+(f.captura?' · pide captura':'')}</small></div>
    <div class="der"><b>${$m(f.monto)}</b><span class="chip ${f.est.k}">${esc(f.est.txt)}</span>
    ${f.pagado?'':`<button type="button" class="btn chico" data-a="pagar-fijo" data-id="${esc(f.id)}" data-c="${f.cuota||0}" data-ym="${ym}">${sub?'Registrar cargo':'Registrar pago'}</button>`}
    ${editable&&!f.virtual&&f.cuota!==2?`<button type="button" class="enlace" data-a="fijo" data-id="${esc(f.id)}">Editar</button>`:''}</div></div>`;
}
function avisosHtml(){
  const l=avisosHoy(),hm=hoy().slice(0,7);if(!l.length)return '';
  return `<div><div class="sec-t"><h2>Avisos de hoy</h2><small>${l.length} ${l.length===1?'pago por hacer':'pagos por hacer'} · ${$m(total(l))}</small></div><div class="panel alerta">${l.map(f=>filaFijo(f,false,hm)).join('')}</div></div>`;
}
function grafica(y){
  const d=Array.from({length:12},(_,i)=>{const ms=delMes(y+'-'+p2(i+1));return{i,ing:suma(ms,'ingreso'),gas:suma(ms,'gasto')}});
  const max=Math.max(...d.map(x=>Math.max(x.ing,x.gas)));
  if(!(max>0))return `<div class="vacio"><b>Tu año, mes a mes</b>Cuando registres ingresos y gastos de ${y}, aquí verás las barras de cada mes.</div>`;
  const top=techo(max),W=720,H=236,L=54,R=10,T=14,B=30,pw=(W-L-R)/12,ph=H-T-B,yv=v=>T+ph-(v/top)*ph;
  let g='';const ms=+S.ym.slice(5,7)-1,sel=S.ym.slice(0,4)===String(y);
  if(sel)g+=`<rect class="sel" x="${L+ms*pw+3}" y="${T-6}" width="${pw-6}" height="${ph+B+2}" rx="10"/>`;
  [0,.5,1].forEach(t=>{const v=top*t;g+=`<line class="gr" x1="${L}" x2="${W-R}" y1="${yv(v)}" y2="${yv(v)}"/><text class="tx" x="${L-8}" y="${yv(v)+4}" text-anchor="end">${corto(v)}</text>`});
  d.forEach(x=>{const cx=L+x.i*pw+pw/2,bw=13;
    g+=`<rect class="b-ing" x="${cx-bw-1.5}" y="${yv(x.ing)}" width="${bw}" height="${Math.max(0,T+ph-yv(x.ing))}" rx="4"><title>${MES_C[x.i]}: ingresos ${$m(x.ing)}</title></rect>`;
    g+=`<rect class="b-gas" x="${cx+1.5}" y="${yv(x.gas)}" width="${bw}" height="${Math.max(0,T+ph-yv(x.gas))}" rx="4"><title>${MES_C[x.i]}: gastos ${$m(x.gas)}</title></rect>`;
    g+=`<text class="tx ${sel&&x.i===ms?'on':''}" x="${cx}" y="${H-10}" text-anchor="middle">${MES_C[x.i]}</text>`});
  return `<div class="graf"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Ingresos y gastos por mes de ${y}">${g}</svg></div>
    <div class="leyenda"><span><i style="background:var(--gold)"></i>Ingresos</span><span><i style="background:var(--rose)"></i>Gastos</span></div>`;
}

function vInicio(){
  const ym=S.ym,ms=delMes(ym),ing=suma(ms,'ingreso'),vales=S.aj.vales||0;
  // con vales configurados, lo pagado con la tarjeta de vales sale de esa bolsa y no de tu dinero
  const conVales=vales>0?total(ms.filter(m=>m.tipo==='gasto'&&m.metodo===VALES)):0,gas=suma(ms,'gasto')-conVales,queda=ing-gas;
  const fj=fijosDe(ym).filter(f=>!f.est.fuera),pendiente=total(fj.filter(f=>!f.pagado));
  const c=S.aj.casa,nada=!todos().length;
  const pasos=[
    ['sueldo','Anota tu sueldo mensual',S.aj.sueldo>0],
    ['fijo','Agrega un pago con plazo, como el mantenimiento del 1 al 9',S.fijos.some(f=>f.clase!=='suscripcion')],
    ['suscripcion','Anota tus suscripciones',S.fijos.some(f=>f.clase==='suscripcion')],
    ['casa-form','Captura los datos de tu casa',c.mensualidad>0||c.credito>0],
    ['nuevo','Registra tu primer pago con su captura',!nada]];
  const faltan=pasos.some(p=>!p[2]);
  const porCat={};ms.filter(m=>m.tipo==='gasto').forEach(m=>{porCat[m.cat]=(porCat[m.cat]||0)+m.monto});
  const cats=Object.entries(porCat).sort((a,b)=>b[1]-a[1]),maxCat=cats.length?cats[0][1]:0;
  const ult=[...todos()].sort(orden).slice(0,6);
  return `<div class="pila">
    <div class="tarjeta">
      <div class="et">${esc(nombreMes(ym))} · te queda</div>
      <div class="cifra ${queda<0?'rojo':''}">${queda<0?'−':''}${$m(Math.abs(queda))}</div>
      <p class="nota">${ing||gas?(pendiente>0?`Después de tus pagos fijos y suscripciones pendientes te quedarían ${$m(queda-pendiente)}.`:'Ya no tienes pagos fijos pendientes este mes.'):'Registra tu sueldo y tus pagos de este mes para ver cuánto te queda.'}</p>
      <div class="tres">
        <div><span>Ingresos</span><b>${$m(ing)}</b></div>
        <div><span>${vales>0?'Gastos (sin vales)':'Gastos'}</span><b>${$m(gas)}</b></div>
        <div><span>Fijos pendientes</span><b>${$m(pendiente)}</b></div>
        ${vales>0?`<div><span>Vales: ${$m(conVales)} usados de ${$m(vales)}</span><b style="color:var(${vales-conVales<0?'--neg':'--ink'})">${vales-conVales<0?'Te pasaste '+$m(conVales-vales):'Te quedan '+$m(vales-conVales)}</b></div>`:''}
      </div>
    </div>
    ${avisosHtml()}
    ${faltan?`<div><div class="sec-t"><h2>Empieza por aquí</h2><small>${pasos.filter(p=>p[2]).length} de ${pasos.length} listos</small></div>
      <div class="panel">${pasos.map(p=>`<div class="fila"><div class="cuerpo"><b>${p[1]}</b></div><div class="der">${p[2]?'<span class="chip ok">Listo</span>':`<button type="button" class="btn chico" data-a="${p[0]}">Hacerlo</button>`}</div></div>`).join('')}</div></div>`:''}
    <div class="dos">
      <div><div class="sec-t"><h2>En qué se fue</h2><small>${esc(nombreMes(ym))}</small></div>
        <div class="panel">${cats.length?cats.map(([id,v])=>`<div class="medida"><div class="arriba"><b>${esc(catDe(id).n)}</b><span>${$m(v)} · ${gas?Math.round(v/gas*100):0}%</span></div><div class="barra"><i style="width:${pct(v,maxCat)}%;background:${catDe(id).c}"></i></div></div>`).join(''):`<div class="vacio"><b>Sin gastos este mes</b>Aquí aparecerá el desglose por categoría.</div>`}</div></div>
      <div><div class="sec-t"><h2>Últimos movimientos</h2><button type="button" class="enlace" data-a="ir" data-v="movimientos">Ver todos</button></div>
        <div class="panel lista">${ult.length?ult.map(filaMov).join(''):`<div class="vacio"><b>Aún no hay movimientos</b>Cada pago que transfieras se guarda aquí con su fecha y su captura.<br><button type="button" class="btn pri chico" data-a="nuevo">Registrar el primero</button></div>`}</div></div>
    </div>
    <div><div class="sec-t"><h2>Ingresos y gastos de ${ym.slice(0,4)}</h2></div><div class="panel">${grafica(ym.slice(0,4))}</div></div>
  </div>`;
}

function movsFiltrados(){
  const f=S.f,base=f.alcance==='mes'?delMes(S.ym):f.alcance==='anio'?delAnio(S.ym.slice(0,4)):todos();
  const q=f.q.trim().toLowerCase();
  return base.filter(m=>(f.tipo==='todos'||m.tipo===f.tipo)&&(!f.cat||m.cat===f.cat)&&(!q||[m.concepto,m.nota,m.folio,m.metodo,catDe(m.cat).n].join(' ').toLowerCase().includes(q))).sort(orden);
}
function listaMovs(){
  const ms=movsFiltrados(),ing=suma(ms,'ingreso'),gas=suma(ms,'gasto');
  const donde=S.f.alcance==='mes'?nombreMes(S.ym):S.f.alcance==='anio'?S.ym.slice(0,4):'todos los años';
  return `<div class="sec-t"><small>${ms.length} ${ms.length===1?'movimiento':'movimientos'} en ${esc(donde)}</small><small>Ingresos ${$m(ing)} · Gastos ${$m(gas)}</small></div>
    <div class="panel lista">${ms.length?agrupado(ms,S.f.alcance!=='mes'):`<div class="vacio"><b>Nada por aquí</b>No hay movimientos con estos filtros.<br><button type="button" class="btn pri chico" data-a="nuevo">Nuevo movimiento</button></div>`}</div>`;
}
function vMovs(){
  const f=S.f,seg=(k,v,t)=>`<button type="button" data-a="filtro" data-k="${k}" data-val="${v}" class="${f[k]===v?'on':''}">${t}</button>`;
  return `<div class="filtros">
      <div class="seg" role="group" aria-label="Periodo">${seg('alcance','mes','Mes')}${seg('alcance','anio','Año')}${seg('alcance','todo','Todo')}</div>
      <div class="seg" role="group" aria-label="Tipo">${seg('tipo','todos','Todos')}${seg('tipo','gasto','Gastos')}${seg('tipo','ingreso','Ingresos')}</div>
    </div>
    <div class="filtros">
      <input type="search" id="f-q" placeholder="Buscar por concepto, folio o nota" value="${esc(f.q)}" aria-label="Buscar">
      <select id="f-cat" aria-label="Categoría"><option value="">Todas las categorías</option>${[...CATS.gasto,...CATS.ingreso].map(c=>`<option value="${c.id}" ${f.cat===c.id?'selected':''}>${esc(c.n)}</option>`).join('')}</select>
    </div>
    <div id="lista">${listaMovs()}</div>`;
}

function fotosDe(ms){const l=[];[...ms].sort(orden).forEach(m=>(m.fotos||[]).forEach(id=>l.push({id,m})));return l}
function miniFoto(x,i,grupo){
  return `<button type="button" class="foto" data-a="visor" data-g="${grupo}" data-i="${i}"><img data-foto data-fid="${esc(x.id)}" src="${esc(fotoUrl(x.id))}" alt="Captura de ${esc(x.m.concepto||catDe(x.m.cat).n)}" loading="lazy"><span class="pie-f"><b>${$m(x.m.monto)}</b>${esc(fechaCorta(x.m.fecha))}</span></button>`;
}
function vCapturas(){
  const y=S.ym.slice(0,4),ms=delAnio(y),n=fotosDe(ms).length;
  const anios=[...new Set([...S.aj.anios.map(String),y,String(new Date().getFullYear())])].sort().reverse();
  let h=`<div class="filtros"><div class="seg" role="group" aria-label="Año">${anios.map(a=>`<button type="button" data-a="anio" data-y="${a}" class="${a===y?'on':''}">${a}</button>`).join('')}</div></div>`;
  if(!n)return h+`<div class="panel vacio"><b>Tu archivo de capturas de ${y}</b>Cuando guardes un pago con su captura, quedará aquí ordenada por mes y por fecha para que la encuentres dentro de unos años.<br><button type="button" class="btn pri chico" data-a="nuevo">Subir la primera captura</button></div>`;
  h+='<div class="pila">';
  for(let i=11;i>=0;i--){
    const ym=y+'-'+p2(i+1),fs=fotosDe(delMes(ym));if(!fs.length)continue;
    h+=`<div><div class="sec-t"><h2 style="text-transform:capitalize">${MESES[i]} ${y}</h2><small>${fs.length} ${fs.length===1?'captura':'capturas'}</small></div><div class="fotos galeria">${fs.map((x,j)=>miniFoto(x,j,ym)).join('')}</div></div>`;
  }
  return h+'</div>';
}

function vPagos(){
  const ym=S.ym,todosFj=fijosDe(ym),fj=todosFj.filter(f=>!f.est.fuera),pagos=todosFj.filter(f=>f.clase!=='suscripcion'),sus=todosFj.filter(f=>f.clase==='suscripcion');
  const todas=S.fijos.filter(f=>f.clase==='suscripcion'),alMes=todas.reduce((a,f)=>a+(f.ciclo==='anual'?f.monto/12:f.monto),0);
  const pagadas=fj.filter(f=>f.pagado).length;
  return `<div class="pila">
    <div class="tarjeta">
      <div class="et">${esc(nombreMes(ym))} · pagos fijos y suscripciones</div>
      <div class="cifra">${$m(total(fj))}</div>
      <p class="nota">${fj.length?`${pagadas} de ${fj.length} ya registrados.${S.aj.sueldo>0?` Son el ${Math.round(total(fj)/S.aj.sueldo*100)}% de tu sueldo.`:''}`:'Agrega tus pagos con plazo y tus suscripciones para saber qué falta por pagar.'}</p>
      <div class="tres">
        <div><span>Por pagar</span><b>${$m(total(fj.filter(f=>!f.pagado)))}</b></div>
        <div><span>Suscripciones al mes</span><b>${$m(alMes)}</b></div>
        <div><span>Suscripciones al año</span><b>${$m(alMes*12)}</b></div>
      </div>
    </div>
    ${avisosHtml()}
    <div><div class="sec-t"><h2>Pagos fijos de ${esc(mesDe(ym))}</h2><button type="button" class="enlace" data-a="fijo">Agregar pago</button></div>
      <div class="panel">${pagos.length?pagos.map(f=>filaFijo(f,true,ym)).join(''):`<div class="vacio"><b>Sin pagos fijos</b>Por ejemplo, el mantenimiento que se paga del 1 al 9. Si le pides captura, no se marca como pagado hasta que la subas.<br><button type="button" class="btn pri chico" data-a="fijo">Agregar pago fijo</button></div>`}</div></div>
    <div><div class="sec-t"><h2>Suscripciones</h2><button type="button" class="enlace" data-a="suscripcion">Agregar suscripción</button></div>
      <div class="panel">${sus.length?sus.map(f=>filaFijo(f,true,ym)).join(''):`<div class="vacio"><b>${todas.length?'Ninguna se cobra este mes':'Sin suscripciones anotadas'}</b>${todas.length?'Tus suscripciones anuales aparecen en el mes en que se cobran.':'Anota Prime, Netflix, Spotify y las demás para ver cuánto suman al mes y al año.'}<br><button type="button" class="btn pri chico" data-a="suscripcion">Agregar suscripción</button></div>`}</div></div>
  </div>`;
}

function filaArr(m){
  const y=m.fecha.slice(0,4),at=`data-id="${esc(m.id)}" data-y="${y}"`;
  return `<div class="arr" draggable="true" ${at}><span class="asa" title="Arrastra a otro proyecto" aria-hidden="true">${ic('asa',16)}</span>${filaMov(m)}<span class="arr-acc">${debeDe(m)>0?`<button type="button" class="btn pri chico" data-a="abonar-compra" ${at}>Abonar</button>`:''}${S.proyectos.length?`<button type="button" class="btn chico" data-a="mover" ${at}>Mover</button>`:''}</span></div>`;
}
function vInversion(){
  const todo=todos().filter(enProyecto).sort(orden),gastos=todo.filter(m=>m.tipo==='gasto'),ingresos=todo.filter(m=>m.tipo==='ingreso');
  const y=S.ym.slice(0,4),tot=total(gastos),ing=total(ingresos),bal=ing-tot,delA=total(gastos.filter(m=>m.fecha.startsWith(y))),r=S.aj.renta.monto;
  const sueltos=todo.filter(m=>!proyDe(m)),porPagar=ms=>ms.reduce((a,m)=>a+debeDe(m),0),deuda=porPagar(todo);
  const bloque=(titulo,ms,p)=>{
    const g=total(ms.filter(m=>m.tipo==='gasto')),i=total(ms.filter(m=>m.tipo==='ingreso')),b=i-g,dp=porPagar(ms);
    return `<div data-drop="${p?esc(p.id):''}"><div class="sec-t"><h2>${esc(titulo)}</h2><small>${ms.length} ${ms.length===1?'movimiento':'movimientos'}</small></div>
    <div class="panel">
      <div class="medida"><div class="datos"><div><span>Invertido</span><b>${$m(g)}</b></div><div><span>Ingresos</span><b style="color:var(--pos)">${$m(i)}</b></div><div><span>${b>=0?'Ganancia':'Falta por recuperar'}</span><b style="color:var(${b>=0?'--pos':'--neg'})">${$m(Math.abs(b))}</b></div>${dp>0?`<div><span>Por pagar</span><b style="color:var(--gold-ink)">${$m(dp)}</b></div>`:''}</div></div>
      ${p&&p.presupuesto>0?`<div class="medida"><div class="arriba"><b>Presupuesto</b><span>${$m(g)} de ${$m(p.presupuesto)}</span></div><div class="barra ${g>p.presupuesto?'pasado':'oro'}"><i style="width:${pct(g,p.presupuesto)}%"></i></div></div>`:''}
      <div class="lista" style="border-top:1px solid var(--line)">${ms.length?ms.map(filaArr).join(''):`<div class="vacio">Aún no hay compras ni ingresos aquí. Agrégalos, o trae los que ya registraste con Mover o arrastrándolos.</div>`}</div>
      ${p?`<div class="fila"><div class="der" style="flex:1;justify-content:flex-start"><button type="button" class="btn pri chico" data-a="invertir" data-id="${esc(p.id)}">Agregar compra</button><button type="button" class="btn chico" data-a="ingreso-proy" data-id="${esc(p.id)}">Agregar ingreso</button><button type="button" class="enlace" data-a="proyecto" data-id="${esc(p.id)}">Editar proyecto</button></div></div>`:''}
    </div></div>`;
  };
  return `<div class="pila">
    <div class="tarjeta">
      <div class="et">Inversión total</div>
      <div class="cifra">${$m(tot)}</div>
      <p class="nota">${ing>0?`Tus proyectos han dejado ${$m(ing)} de ingresos. ${bal>=0?'Ya recuperaste lo invertido y llevas '+$m(bal)+' de ganancia.':'Te falta recuperar '+$m(-bal)+'.'}`:tot>0?(r>0?`Equivale a ${(tot/r).toFixed(1)} meses de la renta que quieres cobrar.`:'Lo que has puesto en material, equipo y mejoras.'):'Aquí llevas lo que inviertes en tu casa o en tu negocio, y lo que te deja. Agrúpalo por proyecto.'}</p>
      <div class="tres">
        <div><span>Invertido en ${y}</span><b>${$m(delA)}</b></div>
        <div><span>Ingresos de tus proyectos</span><b>${$m(ing)}</b></div>
        <div><span>Proyectos</span><b>${S.proyectos.length}</b></div>
        ${deuda>0?`<div><span>Por pagar de compras a pagos</span><b>${$m(deuda)}</b></div>`:''}
      </div>
      <div class="acciones"><button type="button" class="btn oro" data-a="invertir">Agregar compra</button><button type="button" class="btn" data-a="ingreso-proy">Agregar ingreso</button><button type="button" class="btn" data-a="proyecto">Nuevo proyecto</button></div>
    </div>
    ${S.proyectos.length&&todo.length?`<p class="ayuda">Para pasar algo a otro proyecto usa <b>Mover</b>, o en la laptop arrástralo desde los puntitos y suéltalo sobre el proyecto.</p>`:''}
    ${S.proyectos.map(p=>bloque(p.nombre,todo.filter(m=>m.proyectoId===p.id),p)).join('')}
    ${sueltos.length?bloque('Sin proyecto',sueltos,null):''}
    ${!S.proyectos.length&&!todo.length?`<div class="panel vacio"><b>Tu primer proyecto</b>Por ejemplo "Pintar la casa para rentarla" o "Venta de pines". Cada compra y cada venta se suma al proyecto.<br><button type="button" class="btn pri chico" data-a="proyecto">Crear proyecto</button></div>`:''}
  </div>`;
}
function hojaMover(id,y){
  const m=delAnio(y).find(x=>x.id===id);if(!m)return;
  const act=proyDe(m),at=`data-a="mover-a" data-id="${esc(id)}" data-y="${y}"`;
  abrirHoja('Mover a un proyecto',`<div class="form">
    <p><b>${esc(m.concepto||catDe(m.cat).n)}</b> · ${m.tipo==='ingreso'?'+':'−'}${$m(m.monto)} · ${esc(fechaCorta(m.fecha))}</p>
    <div class="panel">${S.proyectos.map(p=>`<button type="button" class="fila" ${at} data-p="${esc(p.id)}"><div class="cuerpo"><b>${esc(p.nombre)}</b></div>${act&&act.id===p.id?'<span class="chip ok">Aquí está</span>':ic('der',18)}</button>`).join('')}
      ${act?`<button type="button" class="fila" ${at} data-p=""><div class="cuerpo"><b>Sin proyecto</b></div>${ic('der',18)}</button>`:''}</div>
    <div class="pie"><button type="button" class="btn" data-a="cerrar">Cancelar</button><button type="button" class="btn" data-a="proyecto">Crear proyecto nuevo</button></div>
  </div>`);
}

function vCasa(){
  const c=S.aj.casa,r=S.aj.renta,all=todos(),ym=S.ym,y=ym.slice(0,4);
  const pagos=all.filter(m=>m.cat==='casa');
  // Saldo estimado: parte del saldo de tu estado de cuenta (o del crédito original) y resta los pagos registrados después.
  const base=c.saldo>0?c.saldo:c.credito,desde=c.saldo>0?(c.saldoFecha||''):'';
  const abonos=pagos.filter(m=>!desde||m.fecha>desde),abonado=total(abonos);
  const saldo=Math.max(0,base-abonado),avance=c.credito>0?pct(c.credito-saldo,c.credito):0;
  const nCasa=pagosDe(ym).filter(m=>m.cat==='casa').length,cobros=cobrosCasa(),pagadoMes=nCasa>=cobros,mensMes=c.mensualidad*cobros,rentaMes=total(delMes(ym).filter(m=>m.cat==='renta'));
  const an=delAnio(y),rentasA=total(an.filter(m=>m.cat==='renta')),costoA=total(an.filter(m=>['casa','mant','predial'].includes(m.cat)));
  const cubre=mensMes>0&&r.monto>0?Math.round(r.monto/mensMes*100):0,dif=r.monto-mensMes;
  const est={vivo:'Vivo en ella',buscando:'Buscando inquilino',rentada:'Rentada'}[r.estado]||'Buscando inquilino';
  const hist=all.filter(m=>CAT_CASA.includes(m.cat)).sort(orden);
  const lista=c.credito>0||c.mensualidad>0;
  return `<div class="pila">
    <div class="tarjeta">
      <div class="et">${esc(c.nombre||'Mi casa')}${c.institucion?' · '+esc(c.institucion):''}</div>
      ${lista?`<div class="cifra">${$m(saldo)}</div>
      <p class="nota">Saldo estimado: ${c.saldo>0?'tu saldo'+(desde?' del '+esc(fechaCorta(desde)):' del estado de cuenta'):'el crédito de '+$m(c.credito)} menos ${abonos.length} ${abonos.length===1?'pago registrado':'pagos registrados'} (${$m(abonado)}). Llevas pagado el ${avance.toFixed(avance<10?1:0)}%.</p>
      <p class="nota" style="font-size:13px">El saldo real baja menos, porque parte de cada pago son intereses. Corrígelo en Editar datos cuando te llegue tu estado de cuenta.</p>
      <div class="barra" style="margin-top:12px"><i style="width:${avance}%"></i></div>
      <div class="tres">
        <div><span>${cobros>1?'Pago al mes (2 cobros)':'Pago mensual'}</span><b>${$m(mensMes)}</b></div>
        <div><span>Mensualidad de ${esc(mesDe(ym))}</span><b>${pagadoMes?'Pagada':nCasa?nCasa+' de '+cobros+' cobros':'Pendiente'}</b></div>
        <div><span>Mensualidades registradas</span><b>${pagos.length} · ${$m(total(pagos))}</b></div>
      </div>`:`<div class="cifra texto">Tu primera casa</div><p class="nota">Captura el precio, tu crédito y la mensualidad para seguir cuánto llevas pagado.</p>`}
      <div class="acciones">${lista&&!pagadoMes?`<button type="button" class="btn oro" data-a="pagar-casa">Registrar mensualidad</button>`:''}<button type="button" class="btn ${lista?'':'oro'}" data-a="casa-form">${lista?'Editar datos de la casa':'Capturar datos de la casa'}</button></div>
    </div>
    <div class="dos par">
      <div><div class="sec-t"><h2>Renta</h2><span class="chip ${r.estado==='rentada'?'ok':r.estado==='buscando'?'pend':''}">${est}</span></div>
        <div class="panel pad"><div class="datos">
          <div><span>${r.estado==='rentada'?'Renta mensual':'Renta que quieres cobrar'}</span><b>${$m(r.monto)}</b></div>
          <div><span>Cubre de la mensualidad</span><b>${cubre?cubre+'%':'Sin calcular'}</b></div>
          <div><span>${dif>=0?'Te sobra al mes':'Pones de tu bolsa al mes'}</span><b style="color:var(${dif>=0?'--pos':'--neg'})">${c.mensualidad>0&&r.monto>0?$m(Math.abs(dif)):'Sin calcular'}</b></div>
          ${r.estado==='rentada'?`<div><span>Inquilino</span><b>${esc(r.inquilino||'Sin nombre')}</b></div><div><span>Día de pago</span><b>${r.diaPago||'Sin día'}</b></div><div><span>Depósito en garantía</span><b>${$m(r.deposito)}</b></div><div><span>Contrato</span><b>${r.inicio?esc(fechaCorta(r.inicio)):'Sin fecha'}${r.fin?' a '+esc(fechaCorta(r.fin)):''}</b></div><div><span>Cobrado en ${esc(mesDe(ym))}</span><b>${$m(rentaMes)}</b></div>`:''}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px"><button type="button" class="btn chico" data-a="renta-form">Editar renta</button>${r.estado==='rentada'?`<button type="button" class="btn pri chico" data-a="cobrar-renta">Registrar renta cobrada</button>`:''}</div></div></div>
      <div><div class="sec-t"><h2>La casa en ${y}</h2></div>
        <div class="panel pad"><div class="datos">
          <div><span>Rentas cobradas</span><b style="color:var(--pos)">${$m(rentasA)}</b></div>
          <div><span>Mensualidades, mantenimiento y predial</span><b>${$m(costoA)}</b></div>
          <div><span>Diferencia del año</span><b style="color:var(${rentasA-costoA>=0?'--pos':'--neg'})">${rentasA-costoA<0?'−':''}${$m(Math.abs(rentasA-costoA))}</b></div>
          <div><span>Precio de la casa</span><b>${c.precio?$m(c.precio):'Sin capturar'}</b></div>
          <div><span>Enganche</span><b>${c.enganche?$m(c.enganche):'Sin capturar'}</b></div>
          <div><span>Plazo</span><b>${c.plazo?c.plazo+' meses':'Sin capturar'}</b></div>
        </div></div></div>
    </div>
    <div><div class="sec-t"><h2>Historial de la casa</h2><small>Mensualidades, mantenimiento, predial y rentas</small></div>
      <div class="panel lista">${hist.length?agrupado(hist,true):`<div class="vacio"><b>Sin pagos de la casa todavía</b>Cada mensualidad que registres queda aquí con su captura, año tras año.</div>`}</div></div>
  </div>`;
}

function vPlan(){
  const ym=S.ym,ms=delMes(ym),pres=S.aj.presupuestos||{},gas={};
  ms.filter(m=>m.tipo==='gasto').forEach(m=>{gas[m.cat]=(gas[m.cat]||0)+m.monto});
  const filas=CATS.gasto.filter(c=>pres[c.id]>0),totalP=filas.reduce((a,c)=>a+pres[c.id],0);
  return `<div class="pila">
    <div><div class="sec-t"><h2>Presupuesto de ${esc(nombreMes(ym))}</h2><button type="button" class="enlace" data-a="presupuesto">Editar límites</button></div>
      <div class="panel">${filas.length?filas.map(c=>{const g=gas[c.id]||0,l=pres[c.id],p=g/l,cl=p>1?'pasado':p>=.8?'cerca':'';
        return `<div class="medida"><div class="arriba"><b>${esc(c.n)}</b><span>${$m(g)} de ${$m(l)}</span></div><div class="barra ${cl}"><i style="width:${pct(g,l)}%"></i></div><small style="color:var(${p>1?'--neg':'--muted'})">${p>1?'Te pasaste por '+$m(g-l):'Te quedan '+$m(l-g)}</small></div>`}).join('')
        +`<div class="medida"><div class="arriba"><b>Total presupuestado</b><span>${$m(totalP)}${S.aj.sueldo>0?' de un sueldo de '+$m(S.aj.sueldo):''}</span></div></div>`
        :`<div class="vacio"><b>Ponle límite a cada categoría</b>Con tu sueldo ajustado, un tope por categoría te avisa antes de pasarte.<br><button type="button" class="btn pri chico" data-a="presupuesto">Crear presupuesto</button></div>`}</div></div>
    <div><div class="sec-t"><h2>Metas de ahorro</h2><button type="button" class="enlace" data-a="meta">Agregar</button></div>
      <div class="panel">${S.metas.length?S.metas.map(m=>`<div class="medida"><div class="arriba"><b>${esc(m.nombre)}</b><span>${$m(m.ahorrado)} de ${$m(m.objetivo)}${m.limite?' · para el '+esc(fechaCorta(m.limite)):''}</span></div><div class="barra oro"><i style="width:${pct(m.ahorrado,m.objetivo)}%"></i></div><div style="display:flex;gap:14px"><button type="button" class="enlace" data-a="abonar" data-id="${esc(m.id)}">Abonar</button><button type="button" class="enlace" data-a="meta" data-id="${esc(m.id)}">Editar</button></div></div>`).join('')
        :`<div class="vacio"><b>Sin metas todavía</b>Un fondo para arreglos de la casa o para un mes sin inquilino es un buen comienzo.</div>`}</div></div>
  </div>`;
}

function vMas(){
  const f=(v,t,d)=>`<button type="button" class="fila" data-a="ir" data-v="${v}">${ic(v)}<div class="cuerpo"><b>${t}</b><small>${d}</small></div>${ic('der',18)}</button>`;
  return `<div class="panel">${f('inversion','Inversión','Pintura, material y mejoras por proyecto')}${f('casa','Casa','Crédito, mensualidades y renta')}${f('plan','Plan','Presupuesto por categoría y metas de ahorro')}${f('ajustes','Ajustes','Nombre, logo, modo claro u oscuro, sueldo y respaldo')}</div>`;
}

function vAjustes(){
  const n=todos().length,u=S.uso,seg=(v,t)=>`<button type="button" data-a="tema" data-val="${v}" class="${tema===v?'on':''}">${t}</button>`;
  return `<div class="pila">
    <div><div class="sec-t"><h2>Nombre y logo</h2><button type="button" class="enlace" data-a="marca">Editar</button></div>
      <div class="panel pad" style="display:flex;gap:16px;align-items:center">${S.aj.logo?`<img class="logo-prev" data-logo data-fid="${esc(S.aj.logo)}" src="${esc(fotoUrl(S.aj.logo))}" alt="Tu logo">`:'<div class="logo-vacio">Sin logo</div>'}<div><b style="font-family:var(--f-display);font-size:26px">${esc(nombreApp())}</b><p style="color:var(--muted)">Tu logo y el nombre aparecen arriba en el teléfono y en el menú de la laptop.</p></div></div></div>
    <div><div class="sec-t"><h2>Apariencia</h2></div>
      <div class="panel pad"><div class="seg" role="group" aria-label="Modo">${seg('auto','Automático')}${seg('claro','Claro')}${seg('oscuro','Oscuro')}</div><p style="margin-top:10px;color:var(--muted);font-size:13px">Automático sigue el modo de tu dispositivo. La elección se guarda en cada dispositivo por separado.</p></div></div>
    <div><div class="sec-t"><h2>Tu ingreso</h2><button type="button" class="enlace" data-a="sueldo">Editar</button></div>
      <div class="panel pad"><div class="datos"><div><span>Sueldo mensual</span><b>${S.aj.sueldo?$m(S.aj.sueldo):'Sin capturar'}</b></div><div><span>Te pagan</span><b style="text-transform:capitalize">${esc(S.aj.frecuencia||'quincenal')}</b></div><div><span>Vales al mes</span><b>${S.aj.vales?$m(S.aj.vales):'Sin capturar'}</b></div></div></div></div>
    <div><div class="sec-t"><h2>Respaldo</h2></div>
      <div class="panel pad"><p style="margin-bottom:12px;color:var(--muted)">Descarga todos tus movimientos (${n}) en un archivo que abre en Excel.</p>
      ${descargas?`<button type="button" class="btn" data-a="exportar">${ic('bajar',18)}Descargar movimientos en CSV</button>`:`<span class="chip">La descarga no está disponible en esta vista</span>`}</div></div>
    <div><div class="sec-t"><h2>Espacio de capturas</h2></div>
      <div class="panel pad">${u?`<div class="medida" style="padding:0"><div class="arriba"><b>${u.files} ${u.files===1?'imagen guardada':'imágenes guardadas'}</b><span>${(u.bytes/1048576).toFixed(1)} MB usados</span></div></div>`:`<p style="color:var(--muted)">${assets?'Revisando el espacio usado…':'Disponible cuando inicias sesión.'}</p>`}
      <p style="margin-top:10px;color:var(--muted);font-size:13px">Cada captura se reduce antes de subirse para que te alcance el espacio por muchos años.</p></div></div>
    <div><div class="sec-t"><h2>Privacidad</h2></div>
      <div class="panel pad"><p style="color:var(--muted)">Tus datos y capturas viven en tu propio proyecto de Supabase y solo se abren con tu correo y contraseña. Verás lo mismo en tu laptop y en tu iPhone.</p><p style="color:var(--muted);margin-top:8px;font-size:13px">Versión ${VERSION}</p></div></div>
    ${S.modo==='db'?`<div><div class="sec-t"><h2>Sesión</h2></div>
      <div class="panel pad" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><span style="flex:1;min-width:160px;overflow-wrap:anywhere">${esc(Backend.correo())}</span><button type="button" class="btn" data-a="salir">Cerrar sesión</button></div></div>`:''}
  </div>`;
}

/* ---------- hoja ---------- */
function abrirHoja(t,html){$('hoja-t').textContent=t;$('hoja-c').innerHTML=html;$('capa').hidden=false;document.body.classList.add('fijo');const p=$('hoja-c').querySelector('input:not([type=radio]):not([type=file]):not([type=checkbox]),select,textarea');if(p&&window.matchMedia('(min-width:700px)').matches)p.focus()}
function cerrarHoja(){$('capa').hidden=true;$('hoja-c').innerHTML='';document.body.classList.remove('fijo');if(F){F.nuevas.forEach(n=>URL.revokeObjectURL(n.url));F=null}}
const campo=(id,et,html,ayuda)=>`<label class="campo" for="${id}"><span>${et}</span>${html}${ayuda?`<small>${ayuda}</small>`:''}</label>`;
const inDinero=(id,v,req)=>`<input type="text" inputmode="decimal" id="${id}" name="${id}" value="${v?esc(v):''}" placeholder="0.00" autocomplete="off" ${req?'required':''}>`;
const inDia=(id,v)=>`<input type="number" inputmode="numeric" id="${id}" name="${id}" min="1" max="31" value="${v||''}" placeholder="1 a 31">`;
const casilla=(id,txt,on)=>`<label class="casilla" for="${id}"><input type="checkbox" id="${id}" name="${id}" ${on?'checked':''}>${txt}</label>`;
const pieForm=(txt,extra='')=>`<p class="error" id="frm-error" hidden></p><p class="estado" id="frm-estado" hidden></p><div class="pie">${extra}<button type="button" class="btn" data-a="cerrar">Cancelar</button><button type="submit" class="btn pri" id="frm-ok">${txt}</button></div>`;
function errF(t){const e=$('frm-error');if(e){e.textContent=t;e.hidden=false}}
function ocupado(si,t){const b=$('frm-ok'),e=$('frm-estado');if(b)b.disabled=si;if(e){e.textContent=t||'';e.hidden=!t}}
const optsCat=(tipo,sel)=>CATS[tipo].map(c=>`<option value="${c.id}" ${sel===c.id?'selected':''}>${esc(c.n)}</option>`).join('');
function fechaSugerida(){const h=hoy();return h.startsWith(S.ym)?h:S.ym+'-01'}

function abrirMov(pre,edit){
  pre=pre||{};
  const m=edit||{tipo:pre.tipo||'gasto',monto:pre.monto||'',fecha:pre.fecha||fechaSugerida(),cat:pre.cat||(pre.tipo==='ingreso'?'sueldo':'comida'),concepto:pre.concepto||'',metodo:pre.metodo||'Transferencia SPEI',folio:'',nota:'',fotos:[],fijoId:pre.fijoId||'',proyectoId:pre.proyectoId||'',periodo:pre.periodo||'',total:'',abonoDe:pre.abonoDe||''};
  F={id:edit?edit.id:null,y:edit?edit.fecha.slice(0,4):null,creado:edit?edit.creado:null,fotos:[...(m.fotos||[])],quitar:[],nuevas:[],perFijo:!!m.periodo,abonoDe:m.abonoDe||''};
  const padre=F.abonoDe?todos().find(x=>x.id===F.abonoDe):null;
  const rec=(!edit&&pre.recientes)||[];
  abrirHoja(edit?'Editar movimiento':'Nuevo movimiento',`<form class="form" data-f="mov" novalidate>
    ${padre?`<p class="req">Abono a <b>${esc(padre.concepto||'tu compra')}</b>. Faltan ${$m(debeDe(padre)+(edit?edit.monto:0))} de ${$m(padre.total)}.</p>`:''}
    <div class="campo"><span>¿Es un gasto o un ingreso?</span><div class="seg" role="radiogroup" aria-label="Tipo de movimiento">
      <input type="radio" name="tipo" id="t-gasto" value="gasto" ${m.tipo==='gasto'?'checked':''}><label for="t-gasto">Pago o gasto</label>
      <input type="radio" name="tipo" id="t-ingreso" value="ingreso" ${m.tipo==='ingreso'?'checked':''}><label for="t-ingreso">Ingreso</label>
    </div></div>
    <div class="par2">${campo('monto','Monto (MXN)',inDinero('monto',m.monto,true))}${campo('fecha','Fecha',`<input type="date" id="fecha" name="fecha" value="${esc(m.fecha)}" required>`)}</div>
    ${campo('cat','Categoría',`<select id="cat" name="cat">${optsCatTodo(m.cat)}</select>`)}
    <div id="campo-fijo">${campo('fijoId','¿Es uno de tus pagos fijos o suscripciones?',`<select id="fijoId" name="fijoId"><option value="">No</option>${S.fijos.map(f=>`<option value="${esc(f.id)}" ${m.fijoId===f.id?'selected':''}>${esc(f.nombre)}</option>`).join('')}</select>`)}</div>
    <div id="campo-per">${campo('periodo','Corresponde al mes de',`<select id="periodo" name="periodo">${optsPer(m.periodo||m.fecha.slice(0,7))}</select>`,'Si te lo cobraron antes (por ejemplo el día 29 por el cobro del día 1), deja la fecha real y elige aquí el mes que cubre.')}</div>
    <div id="campo-total">${campo('total','Precio total, si la pagas en partes',inDinero('total',m.total),'Opcional. En Monto pon solo lo que ya pagaste; lo que falta sale como "Por pagar" en el proyecto y luego lo vas abonando.')}</div>
    <div id="campo-proy">${campo('proyectoId','Proyecto',`<select id="proyectoId" name="proyectoId"><option value="">Sin proyecto</option>${S.proyectos.map(p=>`<option value="${esc(p.id)}" ${m.proyectoId===p.id?'selected':''}>${esc(p.nombre)}</option>`).join('')}</select>`)}</div>
    ${campo('concepto','Concepto',`<input type="text" id="concepto" name="concepto" value="${esc(m.concepto)}" maxlength="80" placeholder="Ej. Mantenimiento de octubre">`)}
    <div class="par2">${campo('metodo','Forma de pago',`<select id="metodo" name="metodo">${METODOS.map(x=>`<option ${m.metodo===x?'selected':''}>${x}</option>`).join('')}</select>`)}
    ${campo('folio','Clave de rastreo o folio',`<input type="text" id="folio" name="folio" value="${esc(m.folio)}" maxlength="60" placeholder="Opcional">`)}</div>
    ${campo('nota','Nota',`<textarea id="nota" name="nota" maxlength="400" placeholder="Opcional">${esc(m.nota)}</textarea>`)}
    <div class="campo"><span>Capturas del pago</span>
      <p class="req" id="frm-req" hidden>Este pago pide captura. Sin ella no se marca como pagado.</p>
      ${rec.length?`<div class="req"><b>¿Ya subiste esta captura en otro pago?</b><br>Elígelo y ${esc(mesDe(pre.periodo))} queda pagado sin subirla otra vez.${rec.map(x=>filaPrevio(x,pre.periodo)).join('')}</div>`:''}
      <div class="fotos" id="frm-fotos"></div>
      ${puedeFotos()?`<label class="subir" for="archivos">${ic('subir',18)}Subir captura o foto<input type="file" id="archivos" accept="image/*" multiple></label>`:`<small>Las capturas se pueden subir cuando inicias sesión.</small>`}
    </div>
    ${pieForm(edit?'Guardar cambios':'Guardar movimiento')}
  </form>`);
  fotosForm();ajustarForm();
}
function ajustarForm(){
  const f=$('hoja-c').querySelector('form[data-f=mov]');if(!f)return;
  const tipo=f.querySelector('input[name=tipo]:checked').value,cat=$('cat').value;
  $('campo-fijo').hidden=tipo!=='gasto'||!S.fijos.length;
  $('campo-proy').hidden=!enProyecto({tipo,cat});
  $('campo-total').hidden=!(tipo==='gasto'&&cat==='inversion'&&!F.abonoDe);
  $('campo-per').hidden=!(tipo==='gasto'&&($('fijoId').value||cat==='casa'));
  $('frm-req').hidden=!pideCaptura($('fijoId').value,tipo,cat);
  if(F&&!F.perFijo&&/^\d{4}-\d{2}-\d{2}$/.test($('fecha').value))$('periodo').innerHTML=optsPer(periodoSugerido($('fecha').value,diasCobro($('fijoId').value,cat)));
}
function fotosForm(){
  const c=$('frm-fotos');if(!c||!F)return;
  c.innerHTML=F.fotos.map((id,i)=>`<div class="foto"><img data-foto data-fid="${esc(id)}" src="${esc(fotoUrl(id))}" alt="Captura guardada"><button type="button" class="x" data-a="quitar-foto" data-i="${i}" aria-label="Quitar captura">${ic('x',14)}</button></div>`).join('')
    +F.nuevas.map((n,i)=>`<div class="foto"><img src="${n.url}" alt="Captura nueva"><button type="button" class="x" data-a="quitar-nueva" data-i="${i}" aria-label="Quitar captura">${ic('x',14)}</button></div>`).join('');
  c.hidden=!(F.fotos.length+F.nuevas.length);
}
function verMov(id,y){
  const m=delAnio(y).find(x=>x.id===id);if(!m)return;
  const c=catDe(m.cat),fs=m.fotos||[],fj=S.fijos.find(f=>f.id===m.fijoId),pr=S.proyectos.find(p=>p.id===m.proyectoId);
  V={lista:fs.map(f=>({id:f,m}))};
  abrirHoja(m.concepto||c.n,`<div class="form detalle">
    <div class="cifra" style="color:var(${m.tipo==='ingreso'?'--pos':'--ink'})">${m.tipo==='ingreso'?'+':'−'}${$m(m.monto)}</div>
    <div class="datos">
      <div><span>Fecha</span><b>${esc(fechaLarga(m.fecha))} ${m.fecha.slice(0,4)}</b></div>
      <div><span>Categoría</span><b>${esc(c.n)}</b></div>
      ${m.metodo?`<div><span>Forma de pago</span><b>${esc(m.metodo)}</b></div>`:''}
      ${m.folio?`<div><span>Clave de rastreo o folio</span><b>${esc(m.folio)}</b></div>`:''}
      ${fj?`<div><span>Pago fijo</span><b>${esc(fj.nombre)}</b></div>`:''}
      ${m.periodo&&m.periodo!==m.fecha.slice(0,7)?`<div><span>Corresponde a</span><b>${esc(Mes(m.periodo))}</b></div>`:''}
      ${pr?`<div><span>Proyecto</span><b>${esc(pr.nombre)}</b></div>`:''}
      ${m.total>0?`<div><span>Precio total</span><b>${$m(m.total)}</b></div><div><span>Pagado hasta hoy</span><b>${$m(pagadoDe(m))}</b></div><div><span>Por pagar</span><b>${$m(debeDe(m))}</b></div>`:''}
      ${m.abonoDe?`<div><span>Abono de</span><b>${esc((todos().find(x=>x.id===m.abonoDe)||{}).concepto||'una compra a pagos')}</b></div>`:''}
    </div>
    ${m.nota?`<p>${esc(m.nota)}</p>`:''}
    ${fs.length?`<div class="fotos">${fs.map((f,i)=>`<button type="button" class="foto" data-a="visor" data-g="_hoja" data-i="${i}"><img data-foto data-fid="${esc(f)}" src="${esc(fotoUrl(f))}" alt="Captura ${i+1}"></button>`).join('')}</div>`:`<p style="color:var(--muted)">Este movimiento no tiene capturas.</p>`}
    <div class="pie" id="det-pie"><button type="button" class="btn peligro" data-a="pedir-borrar">Eliminar</button><button type="button" class="btn pri" data-a="editar" data-id="${esc(id)}" data-y="${y}">Editar</button></div>
    <div class="pie" id="det-conf" hidden><span style="flex:1;min-width:180px;font-weight:500">¿Eliminar este movimiento y sus capturas? No se puede deshacer.</span><button type="button" class="btn" data-a="no-borrar">Conservar</button><button type="button" class="btn peligro" data-a="borrar" data-id="${esc(id)}" data-y="${y}">Sí, eliminar</button></div>
  </div>`);
}
function abrirVisor(lista,i){
  V={lista,i};
  const x=lista[i];
  $('visor').innerHTML=`<div class="arriba"><p><b>${esc(x.m.concepto||catDe(x.m.cat).n)}</b> · ${$m(x.m.monto)} · ${esc(fechaCorta(x.m.fecha))}</p><button type="button" class="btn chico" data-a="cerrar-visor">Cerrar</button></div>
    <div class="lienzo"><img data-fid="${esc(x.id)}" src="${esc(fotoUrl(x.id))}" alt="Captura del pago"></div>
    <div class="abajo"><div style="display:flex;gap:8px"><button type="button" class="btn chico" data-a="visor-mov" data-d="-1" ${i<=0?'disabled':''}>${ic('izq',16)}Anterior</button><button type="button" class="btn chico" data-a="visor-mov" data-d="1" ${i>=lista.length-1?'disabled':''}>Siguiente${ic('der',16)}</button></div>
    <p>${i+1} de ${lista.length}</p>${descargas?`<button type="button" class="btn chico" data-a="guardar-img">${ic('bajar',16)}Guardar imagen</button>`:''}</div>`;
  $('visor').hidden=false;
}

/* ---------- formularios ---------- */
const FORMS={
  async login(form){
    const d=new FormData(form),correo=String(d.get('l-correo')||'').trim(),clave=String(d.get('l-clave')||'');
    if(!correo||!clave)return errF('Escribe tu correo y tu contraseña.');
    ocupado(true);
    try{await Backend.entrar(correo,clave)}
    catch(e){console.error(e);ocupado(false);const m=String((e&&e.message)||'');return errF(/invalid login|invalid credentials/i.test(m)?'Correo o contraseña incorrectos.':/not confirmed/i.test(m)?'Tu correo no está confirmado. En Supabase, Authentication → Users, confirma tu usuaria.':sinConexion(e)?PAUSA:'No se pudo iniciar sesión: '+m)}
    abrir();
  },
  async mov(form){
    const d=new FormData(form),monto=num(d.get('monto')),fecha=String(d.get('fecha')||''),cat=String(d.get('cat')),tipo=tipoDeCat(cat),precio=tipo==='gasto'&&cat==='inversion'&&!F.abonoDe?num(d.get('total')):0;
    const fijoId=tipo==='gasto'&&S.fijos.some(f=>f.id===d.get('fijoId'))?String(d.get('fijoId')):'';
    if(!(monto>0))return errF('Escribe un monto mayor a cero.');
    if(!/^\d{4}-\d{2}-\d{2}$/.test(fecha)||+fecha.slice(0,4)<2000||+fecha.slice(0,4)>2100)return errF('Elige una fecha válida.');
    if(pideCaptura(fijoId,tipo,cat)&&!(F.fotos.length+F.nuevas.length))return errF('Sube la captura de este pago. Sin captura no se marca como pagado.');
    if(precio>0&&precio<monto)return errF('El precio total no puede ser menor a lo que ya pagaste.');
    if(F.enCurso)return;
    // aviso si parece repetido (mismo tipo, fecha, categoría y monto)
    if(!F.id&&!F.dupOk){
      const dup=todos().find(m=>m.tipo===tipo&&m.fecha===fecha&&m.cat===cat&&Math.abs(m.monto-monto)<0.005);
      if(dup){F.dupOk=true;return errF(`Ya tienes "${dup.concepto||catDe(cat).n}" con el mismo monto, fecha y categoría. Si este es otro distinto, presiona Guardar otra vez.`)}
    }
    // un mismo formulario siempre escribe el mismo movimiento, aunque se reintente
    if(!F.id&&!F.nuevoId)F.nuevoId=(window.crypto&&crypto.randomUUID?crypto.randomUUID().replace(/-/g,''):Date.now().toString(36)+Math.random().toString(36).slice(2,12)).slice(0,20);
    F.enCurso=true;ocupado(true,'Guardando…');
    try{
      while(F.nuevas.length){
        ocupado(true,`Subiendo captura (faltan ${F.nuevas.length})…`);
        const n=F.nuevas[0];F.fotos.push(await subirFoto(n.file));URL.revokeObjectURL(n.url);F.nuevas.shift();
      }
      const doc={tipo,monto,fecha,cat,concepto:String(d.get('concepto')||'').trim(),metodo:String(d.get('metodo')||''),folio:String(d.get('folio')||'').trim(),nota:String(d.get('nota')||'').trim(),fotos:[...F.fotos],creado:F.creado||new Date().toISOString()};
      if(fijoId)doc.fijoId=fijoId;
      const per=String(d.get('periodo')||'');
      if(tipo==='gasto'&&(fijoId||cat==='casa')&&/^\d{4}-\d{2}$/.test(per)&&per!==fecha.slice(0,7))doc.periodo=per;
      if(enProyecto(doc)&&S.proyectos.some(p=>p.id===d.get('proyectoId')))doc.proyectoId=String(d.get('proyectoId'));
      if(precio>0)doc.total=precio;
      if(F.abonoDe&&tipo==='gasto'&&cat==='inversion')doc.abonoDe=F.abonoDe;
      await guardarMov(doc,F.id,F.y,F.nuevoId);
      F.quitar.forEach(borrarFoto);
      S.ym=doc.periodo||fecha.slice(0,7);asegurarAnios();cerrarHoja();toast('Movimiento guardado');pintar();
    }catch(e){if(F)F.enCurso=false;ocupado(false);fotosForm();errF(msgError(e))}
  },
  async casa(form){
    const d=new FormData(form),c=S.aj.casa;
    Object.assign(c,{nombre:String(d.get('c-nombre')||'').trim()||'Mi casa',institucion:String(d.get('c-inst')||'').trim(),precio:num(d.get('c-precio')),enganche:num(d.get('c-enganche')),credito:num(d.get('c-credito')),saldo:num(d.get('c-saldo')),saldoFecha:num(d.get('c-saldo'))>0?(String(d.get('c-saldof')||'')||hoy()):'',mensualidad:num(d.get('c-mens')),diaPago:dia31(d.get('c-dia')),diaPago2:dia31(d.get('c-dia2')),diaFin:dia31(d.get('c-fin')),captura:!!d.get('c-cap'),plazo:Math.round(num(d.get('c-plazo')))});
    await salvarAj('Datos de la casa guardados');
  },
  async renta(form){
    const d=new FormData(form);
    Object.assign(S.aj.renta,{estado:String(d.get('r-estado')),monto:num(d.get('r-monto')),inquilino:String(d.get('r-inq')||'').trim(),diaPago:dia31(d.get('r-dia')),deposito:num(d.get('r-dep')),inicio:String(d.get('r-ini')||''),fin:String(d.get('r-fin')||'')});
    await salvarAj('Renta guardada');
  },
  async sueldo(form){
    const d=new FormData(form);S.aj.sueldo=num(d.get('s-monto'));S.aj.vales=num(d.get('s-vales'));S.aj.frecuencia=String(d.get('s-frec'));
    await salvarAj('Sueldo guardado');
  },
  async presupuesto(form){
    const d=new FormData(form),p={};CATS.gasto.forEach(c=>{const v=num(d.get('p-'+c.id));if(v>0)p[c.id]=v});S.aj.presupuestos=p;
    await salvarAj('Presupuesto guardado');
  },
  async marca(form){
    const d=new FormData(form),nombre=String(d.get('n-app')||'').trim(),arch=$('logo-arch').files[0],quitar=form.dataset.quitar==='1';
    if(!nombre)return errF('Escribe un nombre para tu app.');
    ocupado(true,'Guardando…');
    try{
      const previo=S.aj.logo;
      if(arch){ocupado(true,'Subiendo tu logo…');S.aj.logo=await subirImagen(arch,512,'image/png')}
      else if(quitar)S.aj.logo='';
      S.aj.nombreApp=nombre.slice(0,24);
      await guardarAj();
      if(previo&&previo!==S.aj.logo)borrarFoto(previo);
      cerrarHoja();toast('Nombre y logo guardados');pintar();
    }catch(e){ocupado(false);errF(msgError(e))}
  },
  async fijo(form){
    const d=new FormData(form),nombre=String(d.get('x-nombre')||'').trim(),monto=num(d.get('x-monto')),sub=form.dataset.clase==='suscripcion';
    if(!nombre)return errF(sub?'Escribe el nombre de la suscripción.':'Ponle nombre al pago.');
    if(!(monto>0))return errF('Escribe un monto mayor a cero.');
    const dia=dia31(d.get('x-dia')),fin=dia31(d.get('x-fin'));
    if(fin&&dia&&fin<dia)return errF('El último día del plazo debe ser igual o mayor al primero.');
    const doc={nombre,monto,dia,dia2:sub?0:dia31(d.get('x-dia2')),diaFin:fin,cat:sub?'suscripciones':String(d.get('x-cat')),clase:sub?'suscripcion':'pago',captura:!!d.get('x-cap'),ciclo:d.get('x-ciclo')==='anual'?'anual':'mensual',mes:Math.max(1,Math.min(12,Math.round(num(d.get('x-mes')))||1))},id=form.dataset.id;
    await escribir(()=>(id?db.doc('fijos/'+id):db.collection('fijos').doc()).set(doc),sub?'Suscripción guardada':'Pago fijo guardado');
  },
  async proyecto(form){
    const d=new FormData(form),nombre=String(d.get('y-nombre')||'').trim();
    if(!nombre)return errF('Ponle nombre al proyecto.');
    const doc={nombre,presupuesto:num(d.get('y-pres')),nota:String(d.get('y-nota')||'').trim()},id=form.dataset.id;
    const ref=id?db.doc('proyectos/'+id):db.collection('proyectos').doc(),marcados=d.getAll('y-mov').map(String);
    await escribir(async()=>{
      await ref.set(doc);
      for(const v of marcados){const [y,mid]=v.split('|'),m=delAnio(y).find(x=>x.id===mid);if(!m)continue;const c=sinId(m);c.proyectoId=ref.id;await db.doc('libro/'+y+'/movs/'+mid).set(c)}
    },'Proyecto guardado');
  },
  async meta(form){
    const d=new FormData(form),nombre=String(d.get('m-nombre')||'').trim(),objetivo=num(d.get('m-obj'));
    if(!nombre)return errF('Ponle nombre a la meta.');
    if(!(objetivo>0))return errF('Escribe cuánto quieres juntar.');
    const doc={nombre,objetivo,ahorrado:num(d.get('m-aho')),limite:String(d.get('m-lim')||'')},id=form.dataset.id;
    await escribir(()=>(id?db.doc('metas/'+id):db.collection('metas').doc()).set(doc),'Meta guardada');
  },
  async abono(form){
    const d=new FormData(form),monto=num(d.get('a-monto')),m=S.metas.find(x=>x.id===form.dataset.id);
    if(!m)return cerrarHoja();
    if(!(monto>0))return errF('Escribe un monto mayor a cero.');
    await escribir(async()=>{
      await db.doc('metas/'+m.id).set({nombre:m.nombre,objetivo:m.objetivo,ahorrado:Math.round((m.ahorrado+monto)*100)/100,limite:m.limite||''});
      if(d.get('a-mov'))await guardarMov({tipo:'gasto',monto,fecha:hoy(),cat:'ahorro',concepto:'Abono a meta: '+m.nombre,metodo:'',folio:'',nota:'',fotos:[],creado:new Date().toISOString()},null,null);
    },'Abono registrado');
  }
};
async function escribir(fn,ok){ocupado(true,'Guardando…');try{await fn();cerrarHoja();toast(ok);pintar()}catch(e){ocupado(false);errF(msgError(e))}}
const salvarAj=ok=>escribir(guardarAj,ok);

function formCasa(){const c=S.aj.casa;abrirHoja('Datos de la casa',`<form class="form" data-f="casa" novalidate>
  <div class="par2">${campo('c-nombre','Nombre',`<input type="text" id="c-nombre" name="c-nombre" value="${esc(c.nombre)}" maxlength="40">`)}${campo('c-inst','Crédito con',`<input type="text" id="c-inst" name="c-inst" value="${esc(c.institucion)}" maxlength="40" placeholder="Infonavit, banco…">`)}</div>
  <div class="par2">${campo('c-precio','Precio de la casa',inDinero('c-precio',c.precio))}${campo('c-enganche','Enganche que diste',inDinero('c-enganche',c.enganche))}</div>
  <div class="par2">${campo('c-credito','Crédito original',inDinero('c-credito',c.credito))}${campo('c-saldo','Saldo según tu estado de cuenta',inDinero('c-saldo',c.saldo),'Opcional. Si lo dejas vacío se usa el crédito original.')}</div>
  ${campo('c-saldof','Fecha de ese saldo',`<input type="date" id="c-saldof" name="c-saldof" value="${esc(c.saldoFecha||'')}">`,'Los pagos que registres después de esta fecha se restan solos del saldo.')}
  ${campo('c-mens','Monto aproximado de cada cobro',inDinero('c-mens',c.mensualidad),'Si varía, pon lo normal. Al registrar cada pago escribes lo que te cobraron de verdad.')}
  <div class="par2">${campo('c-dia','Primer cobro del mes (día)',inDia('c-dia',c.diaPago))}${campo('c-dia2','Segundo cobro del mes (día)',inDia('c-dia2',c.diaPago2),'Vacío si es uno solo.')}</div>
  <p style="color:var(--muted);font-size:13px">Pon los días oficiales, por ejemplo 1 y 15. Si a veces te cobran unos días antes (el 29 o el 14), la app lo acomoda sola en el cobro que corresponde.</p>
  ${casilla('c-cap','Pedir captura para marcar la mensualidad como pagada',c.captura!==false)}
  ${campo('c-plazo','Plazo en meses',`<input type="number" inputmode="numeric" id="c-plazo" name="c-plazo" min="0" max="600" value="${c.plazo||''}" placeholder="Ej. 240">`)}
  ${pieForm('Guardar')}</form>`)}
function formRenta(){const r=S.aj.renta;abrirHoja('Renta de la casa',`<form class="form" data-f="renta" novalidate>
  ${campo('r-estado','Estado',`<select id="r-estado" name="r-estado"><option value="buscando" ${r.estado==='buscando'?'selected':''}>Buscando inquilino</option><option value="rentada" ${r.estado==='rentada'?'selected':''}>Rentada</option><option value="vivo" ${r.estado==='vivo'?'selected':''}>Vivo en ella</option></select>`)}
  <div class="par2">${campo('r-monto','Renta mensual',inDinero('r-monto',r.monto))}${campo('r-dia','Día en que te pagan',inDia('r-dia',r.diaPago))}</div>
  <div class="par2">${campo('r-inq','Inquilino',`<input type="text" id="r-inq" name="r-inq" value="${esc(r.inquilino)}" maxlength="60" placeholder="Opcional">`)}${campo('r-dep','Depósito en garantía',inDinero('r-dep',r.deposito))}</div>
  <div class="par2">${campo('r-ini','Inicio del contrato',`<input type="date" id="r-ini" name="r-ini" value="${esc(r.inicio)}">`)}${campo('r-fin','Fin del contrato',`<input type="date" id="r-fin" name="r-fin" value="${esc(r.fin)}">`)}</div>
  ${pieForm('Guardar')}</form>`)}
function formSueldo(){abrirHoja('Tu sueldo',`<form class="form" data-f="sueldo" novalidate>
  ${campo('s-monto','Sueldo mensual (lo que recibes)',inDinero('s-monto',S.aj.sueldo),'Si te pagan por quincena, suma las dos.')}
  ${campo('s-vales','Vales de despensa al mes',inDinero('s-vales',S.aj.vales),'Opcional. Lo que pagues con "Tarjeta de vales" se descuenta de aquí y no de tu sueldo.')}
  ${campo('s-frec','Te pagan',`<select id="s-frec" name="s-frec">${['semanal','quincenal','mensual'].map(x=>`<option value="${x}" ${S.aj.frecuencia===x?'selected':''}>${x[0].toUpperCase()+x.slice(1)}</option>`).join('')}</select>`)}
  ${pieForm('Guardar')}</form>`)}
function formPresupuesto(){const p=S.aj.presupuestos||{};abrirHoja('Límites por categoría',`<form class="form" data-f="presupuesto" novalidate>
  <p style="color:var(--muted)">Deja en blanco las categorías que no quieras limitar.</p>
  ${CATS.gasto.map(c=>campo('p-'+c.id,esc(c.n),inDinero('p-'+c.id,p[c.id]))).join('')}
  ${pieForm('Guardar')}</form>`)}
function formMarca(){abrirHoja('Nombre y logo',`<form class="form" data-f="marca" novalidate>
  ${campo('n-app','Nombre de tu app',`<input type="text" id="n-app" name="n-app" value="${esc(nombreApp())}" maxlength="24">`)}
  <div class="sugerencias">${NOMBRES.map(n=>`<button type="button" class="chip" data-a="sugerir" data-campo="n-app" data-n="${esc(n)}">${esc(n)}</button>`).join('')}</div>
  <div class="campo"><span>Tu logo</span>
    <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><span id="logo-prev">${S.aj.logo?`<img class="logo-prev" data-logo data-fid="${esc(S.aj.logo)}" src="${esc(fotoUrl(S.aj.logo))}" alt="Logo actual">`:'<div class="logo-vacio">Sin logo</div>'}</span>
    ${puedeFotos()?`<label class="subir" for="logo-arch" style="flex:1;min-width:160px">${ic('subir',18)}Elegir imagen<input type="file" id="logo-arch" accept="image/*"></label>`:'<input type="file" id="logo-arch" hidden>'}</div>
    <small>Se ve mejor una imagen cuadrada. PNG o JPG.</small>
    ${S.aj.logo?`<button type="button" class="enlace" data-a="quitar-logo" style="align-self:flex-start">Quitar logo</button>`:''}
  </div>
  ${pieForm('Guardar')}</form>`)}
function formFijo(id,clase){
  const f=S.fijos.find(x=>x.id===id)||{nombre:'',monto:'',dia:'',diaFin:'',cat:'mant',clase:clase||'pago',captura:clase!=='suscripcion',ciclo:'mensual',mes:new Date().getMonth()+1};
  const sub=f.clase==='suscripcion';
  abrirHoja(id?(sub?'Editar suscripción':'Editar pago fijo'):(sub?'Nueva suscripción':'Nuevo pago fijo'),`<form class="form" data-f="fijo" data-id="${esc(id||'')}" data-clase="${sub?'suscripcion':'pago'}" novalidate>
  ${campo('x-nombre','Nombre',`<input type="text" id="x-nombre" name="x-nombre" value="${esc(f.nombre)}" maxlength="50" placeholder="${sub?'Ej. Amazon Prime':'Ej. Mantenimiento'}">`)}
  ${sub?`<div class="sugerencias">${SUBS.map(n=>`<button type="button" class="chip" data-a="sugerir" data-campo="x-nombre" data-n="${esc(n)}">${esc(n)}</button>`).join('')}</div>`:''}
  ${campo('x-monto',sub?'Cuánto te cobran':'Monto',inDinero('x-monto',f.monto))}
  ${sub?`<div class="par2">${campo('x-ciclo','Se cobra',`<select id="x-ciclo" name="x-ciclo"><option value="mensual" ${f.ciclo!=='anual'?'selected':''}>Cada mes</option><option value="anual" ${f.ciclo==='anual'?'selected':''}>Una vez al año</option></select>`)}${campo('x-dia','Día del cobro',inDia('x-dia',f.dia))}</div>
    <div id="campo-mes" ${f.ciclo==='anual'?'':'hidden'}>${campo('x-mes','Mes del cobro anual',`<select id="x-mes" name="x-mes">${MESES.map((n,i)=>`<option value="${i+1}" ${(+f.mes||1)===i+1?'selected':''}>${n[0].toUpperCase()+n.slice(1)}</option>`).join('')}</select>`)}</div>`
  :`<div class="par2">${campo('x-dia','Se puede pagar desde el día',inDia('x-dia',f.dia))}${campo('x-fin','Hasta el día',inDia('x-fin',f.diaFin),'Ej. del 1 al 9. Vacío si es un solo día.')}</div>
    ${campo('x-dia2','Segundo cobro del mes (día)',inDia('x-dia2',f.dia2),'Opcional. Para pagos que se cobran dos veces al mes.')}
    ${campo('x-cat','Categoría',`<select id="x-cat" name="x-cat">${optsCat('gasto',f.cat)}</select>`)}`}
  ${casilla('x-cap',sub?'Pedir captura para registrar el cargo':'Pedir captura: sin ella no se marca como pagado',!!f.captura)}
  ${pieForm('Guardar',id?`<button type="button" class="btn peligro" data-a="borrar-doc" data-col="fijos" data-id="${esc(id)}" style="margin-right:auto">Eliminar</button>`:'')}</form>`)}
function formProyecto(id){const p=S.proyectos.find(x=>x.id===id)||{nombre:'',presupuesto:'',nota:''},sueltos=todos().filter(m=>enProyecto(m)&&!proyDe(m)).sort(orden);abrirHoja(id?'Editar proyecto':'Nuevo proyecto',`<form class="form" data-f="proyecto" data-id="${esc(id||'')}" novalidate>
  ${campo('y-nombre','Nombre',`<input type="text" id="y-nombre" name="y-nombre" value="${esc(p.nombre)}" maxlength="50" placeholder="Ej. Venta de pines">`)}
  ${campo('y-pres','Presupuesto',inDinero('y-pres',p.presupuesto),'Opcional. Te muestra cuánto llevas contra lo que pensabas gastar.')}
  ${campo('y-nota','Nota',`<textarea id="y-nota" name="y-nota" maxlength="300" placeholder="Opcional">${esc(p.nota||'')}</textarea>`)}
  ${sueltos.length?`<div class="campo"><span>Agregar lo que ya registraste</span><div class="marcas">${sueltos.map((m,i)=>`<label class="casilla" for="y-mov-${i}"><input type="checkbox" id="y-mov-${i}" name="y-mov" value="${m.fecha.slice(0,4)}|${esc(m.id)}"><span>${esc(m.concepto||catDe(m.cat).n)} · ${esc(fechaCorta(m.fecha))} · ${m.tipo==='ingreso'?'+':'−'}${$m(m.monto)}</span></label>`).join('')}</div><small>Marca las compras o ingresos sin proyecto que pertenecen a este.</small></div>`:''}
  ${pieForm('Guardar',id?`<button type="button" class="btn peligro" data-a="borrar-doc" data-col="proyectos" data-id="${esc(id)}" style="margin-right:auto">Eliminar</button>`:'')}</form>`)}
function formMeta(id){const m=S.metas.find(x=>x.id===id)||{nombre:'',objetivo:'',ahorrado:'',limite:''};abrirHoja(id?'Editar meta':'Nueva meta de ahorro',`<form class="form" data-f="meta" data-id="${esc(id||'')}" novalidate>
  ${campo('m-nombre','Nombre',`<input type="text" id="m-nombre" name="m-nombre" value="${esc(m.nombre)}" maxlength="50" placeholder="Ej. Fondo para arreglos">`)}
  <div class="par2">${campo('m-obj','Quiero juntar',inDinero('m-obj',m.objetivo))}${campo('m-aho','Ya tengo',inDinero('m-aho',m.ahorrado))}</div>
  ${campo('m-lim','Fecha límite',`<input type="date" id="m-lim" name="m-lim" value="${esc(m.limite||'')}">`)}
  ${pieForm('Guardar',id?`<button type="button" class="btn peligro" data-a="borrar-doc" data-col="metas" data-id="${esc(id)}" style="margin-right:auto">Eliminar</button>`:'')}</form>`)}
function formAbono(id){const m=S.metas.find(x=>x.id===id);if(!m)return;abrirHoja('Abonar a '+m.nombre,`<form class="form" data-f="abono" data-id="${esc(id)}" novalidate>
  ${campo('a-monto','Monto',inDinero('a-monto',''))}
  ${casilla('a-mov','Registrarlo también como movimiento de Ahorro de hoy',true)}
  ${pieForm('Abonar')}</form>`)}

/* ---------- acciones ---------- */
function ir(v){S.vista=v==='mas'||VISTAS.some(x=>x[0]===v)?v:'inicio';try{history.replaceState(null,'','#'+S.vista)}catch(e){}$('vista').innerHTML='';pintarAhora();window.scrollTo(0,0);if(S.vista==='ajustes')medirEspacio()}
function medirEspacio(){if(!assets)return;assets.list().then(r=>{S.uso=r.usage;if(S.vista==='ajustes')pintar()}).catch(()=>{})}
function listaVisor(g){return g==='_hoja'?(V?V.lista:[]):fotosDe(delMes(g))}
const ACC={
  ir:b=>ir(b.dataset.v),
  mes:b=>{const [y,m]=S.ym.split('-').map(Number),d=new Date(y,m-1+(+b.dataset.d),1);if(d.getFullYear()<2000||d.getFullYear()>2100)return;S.ym=d.getFullYear()+'-'+p2(d.getMonth()+1);asegurarAnios();pintar()},
  anio:b=>{S.ym=b.dataset.y+S.ym.slice(4);asegurarAnios();pintar()},
  nuevo:()=>abrirMov(),
  cerrar:()=>cerrarHoja(),
  salir:async()=>{await Backend.salir();location.reload()},
  recargar:()=>location.reload(),
  probar:()=>{db=memDb();S.modo='memoria';puerta(null);aviso('Modo de prueba: lo que captures aquí no se guarda. Conecta Supabase para guardar tus datos.');suscribir();pintar()},
  tema:b=>{aplicarTema(b.dataset.val,true);pintar()},
  'tema-cambiar':()=>{aplicarTema(esOscuro()?'claro':'oscuro',true);pintar()},
  sugerir:b=>{const c=$(b.dataset.campo);if(c){c.value=b.dataset.n;c.focus()}},
  'quitar-logo':b=>{const f=b.closest('form');f.dataset.quitar='1';$('logo-prev').innerHTML='<div class="logo-vacio">Sin logo</div>';b.hidden=true},
  filtro:b=>{S.f[b.dataset.k]=b.dataset.val;if(b.dataset.k==='alcance'&&b.dataset.val==='todo')asegurarAnios();$('vista').innerHTML=vMovs()},
  ver:b=>verMov(b.dataset.id,b.dataset.y),
  editar:b=>{const m=delAnio(b.dataset.y).find(x=>x.id===b.dataset.id);if(m)abrirMov(null,m)},
  'pedir-borrar':()=>{$('det-pie').hidden=true;$('det-conf').hidden=false},
  'no-borrar':()=>{$('det-pie').hidden=false;$('det-conf').hidden=true},
  borrar:async b=>{const y=b.dataset.y,m=delAnio(y).find(x=>x.id===b.dataset.id);if(!m)return cerrarHoja();b.disabled=true;
    try{await db.doc('libro/'+y+'/movs/'+m.id).delete();(m.fotos||[]).forEach(borrarFoto);cerrarHoja();toast('Movimiento eliminado');pintar()}catch(e){b.disabled=false;toast(msgError(e))}},
  'quitar-foto':b=>{const id=F.fotos.splice(+b.dataset.i,1)[0];if(id)F.quitar.push(id);fotosForm()},
  'quitar-nueva':b=>{const n=F.nuevas.splice(+b.dataset.i,1)[0];if(n)URL.revokeObjectURL(n.url);fotosForm()},
  visor:b=>{const l=listaVisor(b.dataset.g);if(l.length)abrirVisor(l,+b.dataset.i)},
  'visor-mov':b=>{const i=V.i+(+b.dataset.d);if(i>=0&&i<V.lista.length)abrirVisor(V.lista,i)},
  'cerrar-visor':()=>{$('visor').hidden=true;$('visor').innerHTML=''},
  'guardar-img':async b=>{const x=V.lista[V.i];b.disabled=true;
    try{const blob=/^(blob:|data:)/.test(x.id)?await (await fetch(x.id)).blob():await Backend.bajarFoto(x.id);const ext=blob.type==='image/png'?'png':blob.type==='image/webp'?'webp':'jpg';
      await descargas.save({filename:`pago-${x.m.fecha}.${ext}`,data:blob});toast('Descarga iniciada')}
    catch(e){if(!e||e.code!=='declined')toast('No se pudo guardar la imagen.')}b.disabled=false},
  'casa-form':formCasa,'renta-form':formRenta,sueldo:formSueldo,presupuesto:formPresupuesto,marca:formMarca,
  fijo:b=>formFijo(b.dataset.id,'pago'),suscripcion:b=>formFijo(b.dataset.id,'suscripcion'),
  proyecto:b=>formProyecto(b.dataset.id),meta:b=>formMeta(b.dataset.id),abonar:b=>formAbono(b.dataset.id),
  invertir:b=>abrirMov({tipo:'gasto',cat:'inversion',proyectoId:b.dataset.id||'',metodo:'Tarjeta de débito'}),
  'ingreso-proy':b=>abrirMov({tipo:'ingreso',cat:'negocio',proyectoId:b.dataset.id||''}),
  mover:b=>hojaMover(b.dataset.id,b.dataset.y),
  'abonar-compra':b=>{const m=delAnio(b.dataset.y).find(x=>x.id===b.dataset.id);if(m)abrirMov({tipo:'gasto',cat:'inversion',proyectoId:proyDe(m)?m.proyectoId:'',concepto:'Abono: '+(m.concepto||'compra'),abonoDe:m.id,metodo:m.metodo})},
  'mover-a':async b=>{const {id,y,p}=b.dataset;cerrarHoja();await moverA(id,y,p||'')},
  'pagar-fijo':b=>{const ym=b.dataset.ym||S.ym,f=fijosDe(ym).find(x=>x.id===b.dataset.id&&String(x.cuota||0)===(b.dataset.c||'0'));if(!f)return;S.ym=ym;registrarFijo(f,ym)},
  'pagar-nuevo':()=>{if(PRE)abrirMov(PRE)},
  'usar-pago':async b=>{
    const y=b.dataset.y,ym=b.dataset.ym,m=delAnio(y).find(x=>x.id===b.dataset.id);if(!m)return;
    b.disabled=true;
    try{const doc=clon(m);delete doc.id;doc.periodo=ym;await db.doc('libro/'+y+'/movs/'+m.id).set(doc);S.ym=ym;cerrarHoja();toast('Pago asignado a '+mesDe(ym));pintar()}
    catch(e){b.disabled=false;errF(msgError(e))}
  },
  'pagar-casa':()=>{const f=fijosDe(S.ym).find(x=>x.virtual&&!x.pagado)||{virtual:true,nombre:'Mensualidad de la casa',monto:S.aj.casa.mensualidad,cat:'casa'};registrarFijo(f,S.ym)},
  'cobrar-renta':()=>abrirMov({tipo:'ingreso',monto:S.aj.renta.monto,cat:'renta',concepto:'Renta de '+mesDe(S.ym)}),
  'borrar-doc':async b=>{if(b.dataset.seguro!=='1'){b.dataset.seguro='1';b.textContent='Sí, eliminar';return}await escribir(()=>db.doc(b.dataset.col+'/'+b.dataset.id).delete(),'Eliminado')},
  exportar:async b=>{
    const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"',pn=id=>(S.proyectos.find(p=>p.id===id)||{}).nombre||'';
    const filas=[['Fecha','Corresponde a','Tipo','Categoría','Concepto','Monto','Forma de pago','Folio','Proyecto','Nota','Capturas'],...[...todos()].sort((a,c)=>a.fecha.localeCompare(c.fecha)).map(m=>[m.fecha,perDe(m),m.tipo==='ingreso'?'Ingreso':'Gasto',catDe(m.cat).n,m.concepto,m.monto,m.metodo,m.folio,pn(m.proyectoId),m.nota,(m.fotos||[]).length])];
    b.disabled=true;
    try{await descargas.save({filename:'movimientos-'+hoy()+'.csv',data:'﻿'+filas.map(f=>f.map(q).join(',')).join('\r\n')});toast('Descarga iniciada')}
    catch(e){if(!e||e.code!=='declined')toast('No se pudo descargar el archivo.')}b.disabled=false}
};
document.addEventListener('click',e=>{
  if(e.target===$('capa'))return cerrarHoja();
  const b=e.target.closest('[data-a]');if(!b||b.disabled)return;
  const f=ACC[b.dataset.a];if(f)f(b,e);
});
document.addEventListener('submit',e=>{e.preventDefault();const f=e.target,h=FORMS[f.dataset.f];const er=$('frm-error');if(er)er.hidden=true;if(h)h(f)});
document.addEventListener('change',e=>{
  const t=e.target;
  if(t.name==='tipo'&&$('cat')){
    // al cambiar de gasto a ingreso (o al revés) se elige la categoría equivalente
    const c=$('cat');if(tipoDeCat(c.value)!==t.value)c.value=t.value==='ingreso'?(c.value==='inversion'?'negocio':'sueldo'):(c.value==='negocio'?'inversion':'comida');
    ajustarForm();
  }
  else if(t.id==='cat'){const r=$('t-'+tipoDeCat(t.value));if(r)r.checked=true;ajustarForm()}
  else if(t.id==='periodo'&&F)F.perFijo=true;
  else if(t.id==='fecha'&&F&&$('periodo'))ajustarForm();
  else if(t.id==='fijoId'){const f=S.fijos.find(x=>x.id===t.value);if(f){$('cat').value=f.cat;if(!$('monto').value)$('monto').value=f.monto;if(!$('concepto').value)$('concepto').value=f.nombre+' de '+mesDe(S.ym)}ajustarForm()}
  else if(t.id==='x-ciclo'){$('campo-mes').hidden=t.value!=='anual'}
  else if(t.id==='archivos'&&F){[...t.files].forEach(file=>F.nuevas.push({file,url:URL.createObjectURL(file)}));t.value='';fotosForm()}
  else if(t.id==='logo-arch'&&t.files[0]){$('logo-prev').innerHTML=`<img class="logo-prev" src="${URL.createObjectURL(t.files[0])}" alt="Logo nuevo">`}
  else if(t.id==='f-cat'){S.f.cat=t.value;$('lista').innerHTML=listaMovs()}
});
document.addEventListener('input',e=>{if(e.target.id==='f-q'){S.f.q=e.target.value;$('lista').innerHTML=listaMovs()}});
let ARR=null;
const elem=e=>e.target&&e.target.nodeType===1?e.target:(e.target&&e.target.parentElement);
document.addEventListener('dragstart',e=>{const t=elem(e),r=t&&t.closest('.arr');if(!r)return;ARR={id:r.dataset.id,y:r.dataset.y};e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain',r.dataset.id)}catch(_){}r.classList.add('arrastrando')});
document.addEventListener('dragend',()=>{ARR=null;document.querySelectorAll('.arrastrando,.soltar').forEach(x=>x.classList.remove('arrastrando','soltar'))});
document.addEventListener('dragover',e=>{if(!ARR)return;const t=elem(e),z=t&&t.closest('[data-drop]');if(!z)return;e.preventDefault();e.dataTransfer.dropEffect='move';document.querySelectorAll('.soltar').forEach(x=>{if(x!==z)x.classList.remove('soltar')});z.classList.add('soltar')});
document.addEventListener('drop',e=>{const t=elem(e),z=t&&t.closest('[data-drop]');if(!ARR||!z)return;e.preventDefault();const a=ARR;ARR=null;document.querySelectorAll('.arrastrando,.soltar').forEach(x=>x.classList.remove('arrastrando','soltar'));moverA(a.id,a.y,z.dataset.drop||'')});
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(!$('visor').hidden)ACC['cerrar-visor']();else if(!$('capa').hidden)cerrarHoja()});
document.addEventListener('error',e=>{const t=e.target;if(!t||t.tagName!=='IMG')return;
  if(t.hasAttribute('data-foto')&&t.parentElement)t.parentElement.classList.add('rota');
  else if(t.hasAttribute('data-logo'))t.hidden=true},true);

/* ---------- puerta: configuración e inicio de sesión ---------- */
function puerta(tipo,msg){
  const p=$('puerta'),c=$('puerta-c');
  if(!tipo){p.hidden=true;c.innerHTML='';return}
  c.innerHTML=`<div class="marca"><i></i><span>${esc(nombreApp())}</span></div>`+({
    cargando:`<p class="puerta-t">Abriendo tus datos…</p>`,
    login:`<form class="form" data-f="login" novalidate>
      <p class="puerta-t">Inicia sesión para ver tus finanzas.</p>
      ${campo('l-correo','Correo',`<input type="text" inputmode="email" autocomplete="username" autocapitalize="none" spellcheck="false" id="l-correo" name="l-correo">`)}
      ${campo('l-clave','Contraseña',`<input type="password" autocomplete="current-password" id="l-clave" name="l-clave">`)}
      <p class="error" id="frm-error" hidden></p>
      <button type="submit" class="btn pri" id="frm-ok">Entrar</button></form>`,
    config:`<p class="puerta-t">Falta conectar tu base de datos.</p>
      <p class="puerta-n">Abre <code>js/config.js</code> y pega la URL y la llave pública de tu proyecto de Supabase. Los pasos están en <code>LEEME.md</code>.</p>
      <button type="button" class="btn" data-a="probar">Probar sin guardar</button>`,
    error:`<p class="puerta-t">No se pudieron abrir tus datos.</p><p class="puerta-n">${esc(msg||'')}</p>
      <button type="button" class="btn pri" data-a="recargar">Reintentar</button><button type="button" class="btn" data-a="salir">Cerrar sesión</button>`
  }[tipo]||'');
  p.hidden=false;
}
async function abrir(){
  puerta('cargando');
  try{await Backend.cargar()}
  catch(e){console.error(e);return puerta('error',/relation|does not exist|schema cache/i.test(String(e&&e.message))?'Parece que falta crear la tabla. Ejecuta supabase/esquema.sql en el editor SQL de tu proyecto.':PAUSA)}
  db=Backend.db();assets=Backend.assets;S.modo='db';puerta(null);suscribir();pintar();
  if(S.vista==='ajustes')medirEspacio();
}

/* ---------- arranque ---------- */
async function arrancar(){
  let t='auto';try{t=localStorage.getItem('tema')||'auto'}catch(e){}
  aplicarTema(['auto','claro','oscuro'].includes(t)?t:'auto',false);
  $('mes-ant').innerHTML=ic('izq',18);$('mes-sig').innerHTML=ic('der',18);$('btn-nuevo').innerHTML=ic('mas',18)+'Nuevo movimiento';
  $('fab').innerHTML=ic('mas',26);$('hoja-x').innerHTML=ic('x',18);
  descargas={save:async({filename,data})=>{
    const blob=data instanceof Blob?data:new Blob([data],{type:'text/csv;charset=utf-8'});
    const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(u),4000);return{status:'saved'}}};
  const h=(location.hash||'').slice(1);if(h==='mas'||VISTAS.some(v=>v[0]===h))S.vista=h;
  db=memDb();pintarAhora();puerta('cargando');
  if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js').catch(()=>{});
  let r={estado:'sin-config'};try{r=await Backend.iniciar()}catch(e){console.error(e)}
  if(r.estado==='listo')return abrir();
  puerta(r.estado==='sin-sesion'?'login':'config');
}
arrancar();