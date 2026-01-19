# Orden de arranque de las aplicaciones del proyecto

1. Levanto el backend

```sh
npm run server
```

2. Levanto el frontend

```sh
npm i # npm install
```

```sh
npm run dev
```

# ¿Para qué sirve el archivo 'manifest.json'?

Es un archivo de configuración en formato JSON que describe una aplicación y le dice al navegador como debe comportarse y como debe mostrarse.

* Nombre de la app
* Iconos
* Colores (tema y fondo)
* Página de inicio
* Modos de previsualización (Pantalla completa, standalone, etc)

## Recursos útiles para crear el manifest y trabajar con PWA

<https://progressier.com/pwa-manifest-generator>
<https://app-manifest.firebaseapp.com/>
<https://developer.mozilla.org/es/docs/Web/Progressive_web_apps/Manifest>
<https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest>
<https://web.dev/articles/add-manifest?hl=es>
<https://www.w3.org/TR/appmanifest/>

```json
{
  "short_name": "Weather",
  "name": "Weather: Do I need an umbrella?",
  "icons": [
    {
      "src": "/images/icons-vector.svg",
      "type": "image/svg+xml",
      "sizes": "512x512"
    },
    {
      "src": "/images/icons-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/images/icons-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/?source=pwa",
  "background_color": "#3367D6",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#3367D6",
  "shortcuts": [
    {
      "name": "How's weather today?",
      "short_name": "Today",
      "description": "View weather information for today",
      "url": "/today?source=pwa",
      "icons": [{ "src": "/images/today.png", "sizes": "192x192" }]
    },
    {
      "name": "How's weather tomorrow?",
      "short_name": "Tomorrow",
      "description": "View weather information for tomorrow",
      "url": "/tomorrow?source=pwa",
      "icons": [{ "src": "/images/tomorrow.png", "sizes": "192x192" }]
    }
  ],
  "description": "Weather forecast information",
  "screenshots": [
    {
      "src": "/images/screenshot1.png",
      "type": "image/png",
      "sizes": "540x720"
    },
    {
      "src": "/images/screenshot2.jpg",
      "type": "image/jpg",
      "sizes": "540x720"
    }
  ]
}
```

* short_name: Nombre corto de la aplicación. (Si el nombre completo no se puedo representar por tamaño, se utilizar el nombre corto)
* name: Nombre de la aplicación
* icons: Lista de iconos de la app para diferentes contextos y resoluciones. 
    * src -> ruta al archivo
    * type -> tipo MIME de la imagen -> MIME-TYPE -> (image/png, image/jpg, image/webp) [https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types]    
* start_url: URL que se abre cuando el usuario lanza la aplicación (instalda)
* background_color: Color de fondo que se muestra mientras carga la aplicación (o en el splash screen)
* display: Define como se ve la app
    * standalone -> Parece una aplicación nativa (Más utilizado en las PWA)
    * fullscreen -> Patalla completa
    * minimal-ui -> Barra mínima
    * browser -> Como un siito normal 
* scope: Define que URLs pertenecen a la app: Si el usuario sale del scope, se abre el navegador normal.
* theme_color: Color principal de la app -> Afecta a la barrera de navegación, barra de estado en el celular
* shortcuts: Accesos rápidos que aparecen al
    * Matener presionado el icon de la app
        * name
        * short_name
        * description
        * url
        * icons
* description: Descripción general de la aplicación (Durante la instalación, Tiendas) -> Ayuda al SEO y la accesibilidad
* screenshots: Imágenes que muestran como se ve la app. 

# Service Worker

Un Service Worker es un script que corre en segundo plano en el navegador(separado de la página web) y permite la creación de PWA, offline, notificaciones push y sincronización en segundo plano. Esta basado en eventos

## Eventos del Service Worker

* Install
Cuando el service worker se registrar por primera vez o se actualiza.
> ¿Para que sirve?
Normalmente se usa para cacher archivos (Html, css, js, imágenes)
**IMPORTANTE**: Si no está el evento de install el SW no se activa

* activate
Después del install, cuando el service worker toma el control
> ¿Para qué sirve?
Limpiar caches viejos y activar la neuva versión
Después del activate el SW empieza controlar las páginas

* fetch
Cada vez que la app hace una petición (HTML, CSS, API, imágenes, etc)
> ¿Para qué sirve?
Para interceptar perticiones y decidir.
  * Usar la caché
  * Ir a la red
  * Combinación de ambos (estrategias offline)
Base de la applicación funcionando offline. (Modo offline)

* push
Cuando el servidor envía una notifiación push, incluso si la app esta cerrada
> ¿Para qué sirve?
Mostrar notificaciones al usuario. Funciona incluso con la app cerrada.

* sync
(Background Sync)
Cuando el navegador recupera conexión a internet
> ¿Para qué sirve?
Enviar datos pendientes (formularios, mensajes) cuando vuelva la conexión
PWA -> Offline first

* menssage
Cuando la pñágina web le envía mensajes al service worker (o viceversa)
> ¿Para qué sirve?
Comunicación directa entre la app y el service worker

## NOTA
El service worker tiene que estar en la raíz del proyecto.

# DOM y BOM

BOM -> Browser Object Model (window)
DOM -> Document Object Model (document)

# Service Worker -> (BOM)
<https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API>

# Caches -> (BOM)
<https://developer.mozilla.org/es/docs/Web/API/CacheStorage>

# Service Worker y Manifest

## Ubicación recomendable SW

* En aplicaciones tradicionales en la raíz de la aplicación
* En aplicaciones tipo Vite va dentro de la carpeta /public

Nota: Dentro de 'public' en general lo que se coloca son archivos estáticos (jpg, png, webp, ico, pdf, mp4, mp3).

## Modo desarrollo vs Producción (Para probar la aplicación)

### Modo desarrollo

```sh
npm run dev
```

### Modo Producción (Probar app)

```sh
npm run build # Lo que hace es generar los archivos de producción (deploy)
npm run preview
```  

# Push Notification

<https://www.innovaportal.com/innovaportal/v/667/1/innova.front/web-push-notifications-que-son>

## Servidor Web Push (node)

<https://www.npmjs.com/package/web-push>

```sh
npm i web-push -g # Instala web push como un cli, dentro de nuestro sistema
``` 

> Verificar

```sh
web-push --version
```

# Con Web Push (App)
Hacemos un proceso manual

## Generar VAPID KEYS (Servidor)

Son indentifacadores para colocar en nuestro backend y que Google sepa quienes somos

```sh
web-push generate-vapid-keys --json
# --
{"publicKey":"BKgJWSOh7qVltagSKPJcozMDRVkoCMmRXACK6k_kPkuj-sF4O57tJpUow3q4P-OP9-aMCfxzOGz0Q2zz-BqS0GU","privateKey":"chck0E-S2Vpyit4_41guLTe_5UzdjtKb76BJ3IzsKeM"}
```

# Suscribirme en PWA (Nuestra aplicación)

# Pasos para que nuestra aplicación empiece a recibir notificaciones push

## Agrego en el index.html

```html
<!-- ---------------------------------------- -->
<!--                   Push                   -->
<!-- ---------------------------------------- -->
<section>
    <p>
        <button disabled
            class="js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
            Habilitar Notificaciones Push
        </button>
    </p>
    <div class="subscription-details js-subscription-details is-invisible">
        <pre><code class="js-subscription-json"></code></pre>
    </div>

</section>
```

## Agrego en public el archivo push.js

```js
const applicationServerPublicKey = 'BN0cjaW6di6rcemJvO0jnPv28yMQSui3m39CQUkvALukIrLUMsdIJ3JWqJphscBaysJDx4BCfjE8SU8wQxTYb7g'

let pushButton = null;
let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    //console.log(outputArray)
    return outputArray;
}


function updateBtn() {
    if (isSubscribed) {
        pushButton.textContent = 'DesHabilitar Notificaciones Push';
    } else {
        pushButton.textContent = 'Habilitar Notificaciones Push';
    }

    pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server

    const subscriptionJson = document.querySelector('.js-subscription-json');
    const subscriptionDetails =
        document.querySelector('.js-subscription-details');

    if (subscription) {
        subscriptionJson.textContent = JSON.stringify(subscription);
        subscriptionDetails.classList.remove('is-invisible');
    } else {
        subscriptionDetails.classList.add('is-invisible');
    }
}


function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
        .then(function (subscription) {
            console.log('User is subscribed:', subscription);

            updateSubscriptionOnServer(subscription);

            isSubscribed = true;

            updateBtn();
        })
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
            updateBtn();
        });
}


function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription) {
                return subscription.unsubscribe();
            }
        })
        .catch(function (error) {
            console.log('Error unsubscribing', error);
        })
        .then(function () {
            updateSubscriptionOnServer(null);

            console.log('User is unsubscribed.');
            isSubscribed = false;

            updateBtn();
        });
}


function initialiseUI(reg) {

    swRegistration = reg
    pushButton = document.querySelector('.js-push-btn');

    pushButton.addEventListener('click', function () {
        pushButton.disabled = true;
        if (isSubscribed) {
            unsubscribeUser();
        } else {
            subscribeUser();
        }
    });

    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            isSubscribed = !(subscription === null);

            if (isSubscribed) {
                console.log('User IS subscribed.');
            } else {
                console.log('User is NOT subscribed.');
            }

            updateBtn();
        });
}
```  

## API Notification

<https://developer.mozilla.org/es/docs/Web/API/Notification>

# Agrego en el sw.js el evento de SW push

```js
self.addEventListener('push', e => {
    console.log('push', e)
    const datos = e.data.text() // TEXT | JSON
    console.log(datos)
})
``` 

## Una vez pedidas la public key y la private key
Copio en el archivo push.js la publicKey

## Activo mis notificaciones push
Presionando el botón de habilitar las notificaciones push

```json
{"endpoint":"https://fcm.googleapis.com/fcm/send/doehr_pSYVo:APA91bEh3WH10811MYXuu6YCW6CRp3MaEZIhoZ8n4ZGF3qmb1zsfq6qD-JJxhHyqV-NV1trEg9MEfhwE0d2pNYt78qjDqOoxOJ5ijurmzFIjbRnS0NOztmVgDMjN0H8P86l-V2T3dNtc","expirationTime":null,"keys":{"p256dh":"BA6YCGNCBik7jcnScLON4utyvCAbKBNh2DAs8_EKcl4rXzsOgrWwCBdS6QX5YGlG848C3cop-r72Vq_Pbc90SB8","auth":"daNrHD-2hThdoNjaEdlY3A"}}
``` 

## Enviamos la notificacion

```sh
web-push send-notification --endpoint=<url> [--key=<browser key>] [--auth=<auth secret>] [--payload=<message>] [--ttl=<seconds>] [--encoding=<encoding type>] [--vapid-subject=<vapid subject>] [--vapid-pubkey=<public key url base64>] [--vapid-pvtkey=<private key url base64>] [--proxy=<http proxy uri, e.g: http://127.0.0.1:8889>] [--gcm-api-key=<api key>]
```

```sh
web-push generate-vapid-keys --json
# --
{"publicKey":"BKgJWSOh7qVltagSKPJcozMDRVkoCMmRXACK6k_kPkuj-sF4O57tJpUow3q4P-OP9-aMCfxzOGz0Q2zz-BqS0GU","privateKey":"chck0E-S2Vpyit4_41guLTe_5UzdjtKb76BJ3IzsKeM"}
```

```sh
web-push send-notification --endpoint="https://fcm.googleapis.com/fcm/send/doehr_pSYVo:APA91bEh3WH10811MYXuu6YCW6CRp3MaEZIhoZ8n4ZGF3qmb1zsfq6qD-JJxhHyqV-NV1trEg9MEfhwE0d2pNYt78qjDqOoxOJ5ijurmzFIjbRnS0NOztmVgDMjN0H8P86l-V2T3dNtc" --key="BA6YCGNCBik7jcnScLON4utyvCAbKBNh2DAs8_EKcl4rXzsOgrWwCBdS6QX5YGlG848C3cop-r72Vq_Pbc90SB8" --auth="daNrHD-2hThdoNjaEdlY3A" --payload="Hola WEB-PUSH!!! 123" --ttl=0 --vapid-subject="mailto: maxi@gmail.com" --vapid-pubkey="BKgJWSOh7qVltagSKPJcozMDRVkoCMmRXACK6k_kPkuj-sF4O57tJpUow3q4P-OP9-aMCfxzOGz0Q2zz-BqS0GU" --vapid-pvtkey="chck0E-S2Vpyit4_41guLTe_5UzdjtKb76BJ3IzsKeM"
``` 

## Web Push
Servidor backend que se comunica con el servicio de Google

```sh
cd 02-web-push/
``` 
## Web Push automático
Aplicación completa integrada al servidor web push

```sh
cd 04-super-lista-push-automatico
```