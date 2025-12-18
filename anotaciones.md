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

<https://progressier.com/pwa-manifest-generator><
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