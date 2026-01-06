import Swal from 'sweetalert2'
import './style.css'
import handleNotificacion from './utils/handle-notificacion'
import handleHttp from './utils/handle-http'

// ! -------------------
// ! Variables GLOBALES
// ! -------------------

let listaProductos = []

let crearLista = true // Creo esta bandera para evitar que se vuelva a renderizar todo el array
let ul

const overlay = document.getElementById('overlay')
const sidebar = document.getElementById('sidebar')
const closeButton = document.getElementById('close-sidebar')
const toggleBotton = document.getElementById('toogle-sidebar')

//console.log(overlay);
//console.log(sidebar);
//console.log(closeSidebar);
//console.log(toogleSidebar);

const openSidebar = () => {
    console.log('openSidebar')
    sidebar.classList.remove('-translate-x-full')
    overlay.classList.remove('hidden')
}

const closeSidebar = () => {
    console.log('closeSidebar')
    sidebar.classList.add('-translate-x-full')
    overlay.classList.add('hidden')
}

toggleBotton.addEventListener('click', openSidebar)
closeButton.addEventListener('click', closeSidebar)
overlay.addEventListener('click', closeSidebar)

function renderLista() {
    console.log('Se hace el renderizado...')
    const lista = document.querySelector('#lista')
    
    if (crearLista) {
        ul = document.createElement('ul')
    }

    ul.innerHTML = ''

    listaProductos.forEach((prod, indice) => {
        ul.innerHTML += `
            <li class="flex items-center justify-between bg-white rounded-lg shadow p-3 mb-2 hover:bg-gray-50 trasition">
                  <!-- Icono de producto -->
                   <span class="flex items-center justify-center w-10 text-indigo-600">
                    <i class="material-icons text-2xl">shopping_cart</i>
                   </span>
                  <!-- Nombre de producto -->
                   <span class="flex-1 text-gray-800 font-medium truncate w-32">
                    ${prod.nombre}
                   </span>
                  <!-- Cantidad -->
                   <span class="w-24">
                    <label for="lbl-cantidad-${indice}" class="block text-xs text-gray-500">Cantidad</label>
                    <input data-tipo="cantidad" type="text" id="lbl-cantidad-${indice}" value="${prod.cantidad}" class="input-cantidad mt-1 w-full border border-gray-300 rounded-md text-sm p-1 text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                   </span>
                  <!-- Precio -->
                    <span class="w-24">
                      <label for="lbl-precio-${indice}" class="block text-xs text-gray-500">Precio</label>
                      <input data-tipo="precio" type="text" id="lbl-precio-${indice}" value="${prod.precio}" class="input-precio mt-1 w-full border border-gray-300 rounded-md text-sm p-1 text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    </span>
                  <!-- Borrar un producto -->
                   <span class="w-12 flex justify-center">
                    <button 
                        class="material-icons btn-borrar flex items-center justify-around bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 shadow transition cursor-pointer ms-2"
                        data-indice="${indice}"
                        data-id="${prod.id}">
                        remove_shopping_cart
                    </button>
                   </span>
            </li>
        `
    })

    lista.appendChild(ul)

    crearLista = false


}

function eventoIngresoProducto() {
    document.querySelector('#btn-entrada-producto').addEventListener('click', async () => {
        console.log('btn-entrada-producto')

        const input = document.getElementById('ingreso-producto')
        const producto = input.value

        console.log(producto)

        if (producto) {
            const nuevoProducto = { nombre: producto, cantidad: 1, precio: 1}

            // ! 1. Modificar el back (Agregar el producto en el back)
            // Lo que tenemos que hacer es un petición POST (C:CREATE -> CRUD)
            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(nuevoProducto) // un obj de js -> en una cadena (string)
            }
            
            try {
                const productoCreado = await handleHttp('http://localhost:8080/productos/', options)

                // ! 2. Modifico el array del front
                listaProductos.push(productoCreado)

                renderLista()
                input.value = ''
            } catch (error) {
                console.error(error)
            }

        } else {
            Swal.fire("Debe ingresar un producto válido");
            //console.log('Debe ingresar un producto válido');
        }

    })
}

function eventoBorradoProductos() {
    
    document.querySelector('#btn-borrar-productos').addEventListener('click', () => {
                
        /* if (confirm('¿Estás seguro que querés borrar todos los productos de tu super lista')) {
            console.log('Borrado todos los productos...')
            listaProductos = []
            renderLista()
        } */

        /* Swal.fire({
            title: "¿Estás seguro que querés borrar todos los productos de tu super lista?",
            text: "No vas a poder volver atrás",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    listaProductos = []
                    renderLista()

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                }
        }); */

        const objetoMensajes = {
            textoPrincipal: "¿Estás seguro que queres borrar toda la super lista?",
            descripcion:  "No vas a poder volver a atrás",
            textoSecundario: "Lista borrada!",
            descripcionSecundaria: "La lista quedo sin ningún producto",
        }

        handleNotificacion(objetoMensajes, () => {
            // ! 1. Borrado en el backend 
            listaProductos.forEach( async producto => {

                try {
                    console.log(producto)

                    const options = {
                        method: 'DELETE'
                    }

                    const urlEliminacion = 'http://localhost:8080/productos/' + producto.id


                    await handleHttp(urlEliminacion, options)
                } catch (error) {
                    console.error(error)
                }


            })
            // ! 2. Borrado en el frontend
            listaProductos = []
            renderLista()
        })

    })
}

function borrarProducto(indice) {

    const productoAEliminar = listaProductos[indice]    
    const nombreProducto = productoAEliminar.nombre
    const objMensajes = {
        textoPrincipal: `¿Estás seguro que queres borrar ${nombreProducto}?`,
        descripcion:  "No vas a poder volver a atrás",
        textoSecundario: "Borrado el producto!",
        descripcionSecundaria: `Se borró ${nombreProducto}`,
    }

    handleNotificacion(objMensajes, async () => {
        try {
            // 1. Borrado producto backend
            const urlEliminar = 'http://localhost:8080/productos/' + productoAEliminar.id
            
            const options = {
                method: 'DELETE'
            }

        await handleHttp(urlEliminar, options)

        // 2. Borrado producto frontend
        listaProductos.splice(indice, 1)
        renderLista()
        } catch (error) {
            console.error(error)
        }
    })

    
}

function eventoBorradoUnProducto() {
    document.getElementById('lista').addEventListener('click', e => {
        //console.log('Hicieron clic sobre cualquier elemento dentro de la lista')
        //console.log(e.target);

        //console.log(e.target.classList.contains('btn-borrar')) // true o false
        if ( e.target.classList.contains('btn-borrar') ) {
            
            //console.log(e.target.dataset.indice)

            const indice = e.target.dataset.indice

            borrarProducto(indice)

        }
    })
}

function eventoCambiarCantidadYPrecio() {

    async function cambiarValor(tipo, elemento) {
        // Actualización de productos en el back
        // PATCH -> Me sirve para actualizar las key que justo se esten editando
        // PUT -> Me permite editar todo el objeto completo. O sea la petición tiene que viajar lo que tenía más lo que se edito

        // PATCH
        /* const productoAActualizar = {
            nombre: 'PC Gamer'
        }

        const producto = {
            nombre: 'PC Gamer',
            categoria: 'Informatica',
            precio: 2323,
        } */

        // PUT
       /*  const productoAActualizar = {
            nombre: 'PC',
            categoria: 'Informatica',
            precio: 2323,
        }


        const producto = {
            nombre: 'PC Gamer',
            categoria: 'Informatica',
            precio: 2323,
        } */

        const boton = elemento.parentElement.parentElement.querySelector('button')
        const indice = boton.dataset.indice
        const id = boton.dataset.id
        let valor = elemento.value
        valor = Number(valor)

        try {

            const urlEdicion = 'http://localhost:8080/productos/' + id
            //console.log(urlEdicion)

            const options = {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify( { [tipo]: valor } ) // precio: valor || cantidad: valor
            }

            handleHttp(urlEdicion, options)
            
        } catch (error) {
            
        }

        listaProductos[indice][tipo] = valor // input -> nos van devolver un cadena
    }

    document.getElementById('lista').addEventListener('change', e => {
        const tipo = e.target.dataset.tipo
        const input = e.target
        cambiarValor(tipo, input)
        console.log(listaProductos)
    })
}

async function peticionAsincronica() {

    try {
        // Petición GET -> (R:READ -> CRUD)
        const productos = await handleHttp('http://localhost:8080/productos/')
        console.log(productos)
        listaProductos = productos

    } catch (error) {
        throw error
    }

}

async function registrarServiceWorker() {
    console.log('Se está registrando el SW...');

    if ( 'serviceWorker' in navigator ) {
        console.log('Está disponible el SW...')
        try {
            const reg = await navigator.serviceWorker.register('/sw.js')
            console.log('El service worker se registró correctamente', reg)
        } catch (error) {
            console.error('Erro al registrar el service worker', error)
        }
    } else {
        console.error('serviceWorker no está disponbile en navigator')
    }

}

function testCaches() {
    console.log('Probando caches!')
    /* API CACHES -> BOM -> Browser Object Model */
    /* https://caniuse.com/ */
    /* https://www.caniemail.com/ */

    if ( window.caches ) {
        console.log('El browser soporta caches')

        // ! Creo espacios de caches
        caches.open('prueba-1') // Un espacio de cache, es un contenedor.
        caches.open('prueba-2')
        caches.open('prueba-3')

        // ! Comprobamos si una cache existe o no
        caches.has('prueba-2').then(rta => console.log(rta)) // true o false -> true
        caches.has('prueba-3').then(rta => console.log(rta)) // true
        caches.has('prueba-4').then(rta => console.log(rta)) // false
        // caches.has('prueba-4').then(console.log) // false
        // caches.has('prueba-4').then(alert) // false

        // ! Borrar espacio de cache
        caches.delete('prueba-1').then(rta => console.log(rta))

        // ! Listar todas las caches (Me devuelve un array de nombres de caches)
        //caches.keys().then(rta => console.log(rta))
        /* caches.keys().then(rta => 
            rta.forEach(c => {
                caches.delete(c).then(rta => console.log(rta))
            })
        )
         */

        // ! Abro una cache y trabajo con ese espacio de cache
        caches.open('cache-v1.1').then( cache => {
            console.log(cache) // <----- la cache que estoy abriendo
            console.log(caches) // <---- El objeto gestor de cachesç

            // ! add() Agrego un recurso a la cache
            //cache.add('../index.html')
            //cache.add('./style.css')

            // ! addAll() Agrego varios recurso a la cache
            //console.log(cache)

            cache.addAll([
                '../index.html',
                './style.css',
                './mail.js'
            ]).then(() => {
                console.log('Recursos agregados')

                //cache.delete('./style.css').then(console.log)

                cache.match('./style.css').then( res => {
                    if (res) {
                        console.log('Recurso encontrado...')
                        //res.text().then(console.log)
                    } else {
                        console.error('Recurso inexistente.')
                    }
                })

                // ! creo o modificar el contenido de un recurso
                cache.put('../index.html', new Response('Hola mundo!'))

                // ! Listo doos los recursos que contiene la cache.
                //cache.keys().then(recursos => console.log('Recurso de cache', recursos))
                cache.keys().then( recursos => {
                    //console.log(recursos)
                    recursos.forEach( recurso => {
                        console.log(recurso.url)
                    })
                })

                // ! Listo todos los nombres de los espacios de CACHE que contienen caches.
                caches.keys().then( nombre => {
                    console.log('Nombres de caches', nombre)
                })

            }).catch(error => {
                console.error('No se pudo agregar los recursos a la cache')
                console.error(error)
            })



        })

        

    } else {
        console.error('No soporta caches')
    }
}


async function start() {
    try {
        console.log('Se cargó todo el DOM!')
        await peticionAsincronica()
        registrarServiceWorker()
        // testCaches()
        renderLista()
        eventoIngresoProducto()
        eventoBorradoProductos()
        eventoBorradoUnProducto()
        eventoCambiarCantidadYPrecio()
    } catch (error) {
        console.error(error)
    }
}

document.addEventListener('DOMContentLoaded', start)