// En el service worker no es conveniente colocar lógica fuera de los callback de los eventos de service worker
const CACHE_STATIC_NAME = 'static-v02'
const CACHE_INMUTABLE_NAME = 'inmutable-v02'
const CACHE_DYNAMIC_NAME = 'dynamic-v02'

self.addEventListener('install', e => {
    console.log('sw install...')

    // ! 3 espacios de caches para diferentes tipos de recursos
    // * 1era -> Cache de aplicación (cache estatica)
    // * 2da -> Cache de recursos que no van cambiar [Bootstrap, Google Fonts, Fonts Awesome] (cache inmutable)
    // * 3era -> Cache de lo que no sabe de antemano [cache estatica] (cache dinamica)

    // ! Salta la fase de waiting del Service Wokers. Por defecto cuando un SW se instala no se activa si hay otro SW ya activo. Arraca ahora el nuevo service worker, no esperes nada..
    self.skipWaiting()

    const cacheStatic = caches.open(CACHE_STATIC_NAME).then(cache => {
        return cache.addAll([
            '/',
            '/index.html'
        ])
    })

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME).then(cache => {
        return cache.addAll[
            'https://fonts.googleapis.com/icon?family=Material+Icons'
        ]
    })

    // Esperar hasta que ambas promesas se cumplan
    e.waitUntil(
        Promise.all([cacheStatic, cacheInmutable])
    )

})

self.addEventListener('activate', e => {
    console.log('sw activate...')

    //! Le dice al SW tomá control inmediato de todas las págians abiertas de este sitio.
    // Si no hago esto lo que ocurre es que si actualizo por algún el service worker de la aplicación. Va activarse solamente en la pestaña que estoy.
    self.clients.claim()

    const listaBlancaDeCache = [ // WhiteList
        CACHE_STATIC_NAME,
        CACHE_INMUTABLE_NAME,
        CACHE_DYNAMIC_NAME
    ]

    // ! Borra todas las caches que no estén en la lista actual (versión actual)

    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if ( !listaBlancaDeCache.includes(key) ) {
                        return caches.delete(key)
                    }
                })
            )
        })
    )

})

// ! Lo que hace fetch es interceptar todos los request que hace la aplicación
self.addEventListener('fetch', e => {
    console.log('sw fetch...')
    
    const { request } = e

    /* if (request.method !== 'GET') return */
        
    // No hagas las respuesta vos servidor, la respuesta te la entrego yo service worker.
    // El service está tomando el control de las respuesta que pueda recibir.
    e.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                console.log(cachedResponse)
                cachedResponse || fetch(request).then(netRes => {
                    const clone = netRes.clone()
                    console.log(netRes)
                    caches.open(CACHE_DYNAMIC_NAME).then(cache => {
                        cache.put(request, clone)
                    })
                    return  netRes
                })
            })
            .catch(err => {
                console.error(err)
            })
    
    )

})

self.addEventListener('push', e => {
    console.log('push', e)
    const datos = e.data.text() // TEXT | JSON
    console.log(datos)
})





