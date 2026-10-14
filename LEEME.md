# Nácar Finanzas

App de finanzas personales: pagos con capturas ordenadas por fecha, pagos con plazo,
suscripciones, inversión por proyecto, casa y renta, presupuesto y metas.

Es una página estática (HTML, CSS y JavaScript, sin compilar nada). Los datos y las
capturas se guardan en **tu** proyecto de Supabase; la página se publica gratis en
GitHub Pages.

```
nacar/
├── index.html              página
├── estilos.css             diseño (blanco, dorado y rosa; claro y oscuro)
├── js/config.js            ← aquí pegas la URL y la llave de Supabase
├── js/backend.js           conexión con Supabase (login, datos, capturas)
├── js/app.js               toda la app
├── js/vendor/supabase.js   librería oficial de Supabase (ya incluida)
├── manifest.webmanifest    nombre e íconos al instalarla en el teléfono
├── sw.js                   permite instalarla como app
├── icons/                  íconos (cámbialos por tu logo)
└── supabase/esquema.sql    tabla, reglas de privacidad y bucket de capturas
```

Los nombres de los menús de Supabase y GitHub cambian de vez en cuando; si alguno
no coincide exactamente, busca el más parecido.

## 1. Crear el proyecto en Supabase

1. Entra a https://supabase.com y crea una cuenta (puedes entrar con GitHub).
2. **New project**. Ponle nombre, elige una región cercana y guarda la contraseña
   de la base de datos en un lugar seguro (no se usa en la app, pero es tuya).
3. Espera a que termine de crearse.

## 2. Crear la tabla y el bucket

1. En el menú izquierdo abre **SQL Editor** → **New query**.
2. Abre `supabase/esquema.sql`, copia todo, pégalo y presiona **Run**.
3. Debe decir que terminó sin errores. Ya tienes la tabla `docs` y el bucket
   privado `capturas`, los dos protegidos para que solo tú veas lo tuyo.

## 3. Crear tu usuaria y cerrar el registro

1. **Authentication** → **Users** → **Add user** → **Create new user**.
2. Escribe tu correo y una contraseña larga. Deja marcado **Auto Confirm User**.
3. En **Authentication** → **Sign In / Providers** apaga
   **Allow new users to sign up**. Así nadie más puede crearse una cuenta.

## 4. Conectar la app

1. En **Project Settings** → **API Keys** (o **Data API**) copia:
   - **Project URL**: algo como `https://abcdefgh.supabase.co`
   - la llave pública: **anon public** o **publishable**
2. Abre `js/config.js` y pega los dos valores en su lugar.

La llave pública puede ir en el código y en GitHub: está hecha para eso. Lo que
protege tus datos es tu contraseña y las reglas del paso 2.
**Nunca pegues la llave `service_role` ni la `secret`.**

## 5. Probarla en tu computadora

1. Abre la carpeta `nacar` en Visual Studio Code.
2. Instala la extensión **Live Server**.
3. Clic derecho en `index.html` → **Open with Live Server**.
4. Entra con el correo y la contraseña del paso 3.

Sin configurar el paso 4, la app muestra un botón **Probar sin guardar** para ver
cómo funciona sin guardar nada.

## 6. Subirla a GitHub

Desde Visual Studio Code:

1. Icono de **Source Control** (la ramita) → **Publish to GitHub**.
2. Elige **public repository** (GitHub Pages gratis pide que el repositorio sea
   público; solo se publica el código, tus datos no están ahí).
3. Para cambios posteriores: escribe un mensaje → **Commit** → **Sync Changes**.

O desde la terminal, dentro de la carpeta:

```bash
git init
git add .
git commit -m "Primera versión"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/nacar.git
git push -u origin main
```

## 7. Publicarla con GitHub Pages

1. En el repositorio: **Settings** → **Pages**.
2. **Source**: Deploy from a branch. **Branch**: `main`, carpeta `/ (root)` → **Save**.
3. En uno o dos minutos queda en `https://TU_USUARIO.github.io/nacar/`.

## 8. Instalarla en el iPhone y en la laptop

- **iPhone**: abre la dirección en Safari → botón **Compartir** →
  **Agregar a inicio**. Se abre a pantalla completa, con su ícono.
- **Laptop (Chrome o Edge)**: icono de instalar en la barra de direcciones, o
  simplemente guárdala en favoritos.

## Tu logo como ícono

Reemplaza los archivos de `icons/` por tu logo, con los mismos nombres y tamaños:

| Archivo | Tamaño |
| --- | --- |
| `icon-192.png` | 192 × 192 |
| `icon-512.png` | 512 × 512 |
| `icon-maskable-512.png` | 512 × 512, con el logo al centro y margen alrededor |
| `apple-touch-icon.png` | 180 × 180, sin transparencia |

En el iPhone el ícono se toma al momento de agregarla a inicio: si cambias el
logo después, borra el acceso y agrégalo de nuevo.

El logo que se ve *dentro* de la app se sube aparte, en Ajustes → Nombre y logo.

## Cambiar el nombre

- Dentro de la app: Ajustes → Nombre y logo.
- El nombre al instalarla: `name` y `short_name` en `manifest.webmanifest`,
  y `<title>` y `apple-mobile-web-app-title` en `index.html`.

## Cosas que conviene saber

- **Plan gratis de Supabase**: los proyectos sin actividad por varios días se
  pausan. Si te pasa, entra al panel de Supabase y presiona *Restore*; tus datos
  siguen ahí. Revisa también los límites de espacio del plan actual.
- **Avisos**: los pagos pendientes y vencidos se ven al abrir la app (sección
  Avisos de hoy y el número rojo en Pagos). Esta versión todavía no manda
  notificaciones al teléfono.
- **Respaldo**: Ajustes → Respaldo descarga todos tus movimientos en CSV.
- **Actualizar la app**: cambia los archivos, haz commit y push. GitHub Pages se
  actualiza solo. Si en el teléfono sigues viendo la versión anterior, cierra la
  app y vuelve a abrirla.
