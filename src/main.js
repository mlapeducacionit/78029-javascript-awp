import Swal from 'sweetalert2'
import './style.css'
import handleNotificacion from './utils/handle-notificacion'

// ! -------------------
// ! Variables GLOBALES
// ! -------------------

let listaProductos = [
    { nombre: 'Carne', cantidad: 2, precio: 12.4 },
    { nombre: 'Pan', cantidad: 5, precio: 23.4 },
    { nombre: 'Fideos', cantidad: 3, precio: 21.4 },
    { nombre: 'Leche', cantidad: 8, precio: 32.4 },
    { nombre: 'Pollo', cantidad: 1, precio: 42.4 }
]

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
                    <label for="" class="block text-xs text-gray-500">Cantidad</label>
                    <input type="text" value="${prod.cantidad}" class="mt-1 w-full border border-gray-300 rounded-md text-sm p-1 text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                   </span>
                  <!-- Precio -->
                    <span class="w-24">
                      <label for="" class="block text-xs text-gray-500">Precio</label>
                      <input type="text" value="${prod.precio}" class="mt-1 w-full border border-gray-300 rounded-md text-sm p-1 text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    </span>
                  <!-- Borrar un producto -->
                   <span class="w-12 flex justify-center">
                    <button 
                        class="flex items-center justify-around bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 shadow transition cursor-pointer ms-2"
                        data-indice="${indice}">
                      <i class="material-icons">remove_shopping_cart</i>
                    </button>
                   </span>
            </li>
        `
    })

    lista.appendChild(ul)

    crearLista = false


}

function eventoIngresoProducto() {
    document.querySelector('#btn-entrada-producto').addEventListener('click', () => {
        console.log('btn-entrada-producto')

        const input = document.getElementById('ingreso-producto')
        const producto = input.value

        console.log(producto)

        if (producto) {
            listaProductos.push({ nombre: producto, cantidad: 1, precio: 1})
            renderLista()
            input.value = ''
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
            listaProductos = []
            renderLista()
        })

    })
}

function start() {
    console.log('Se cargó todo el DOM!')
    renderLista()
    eventoIngresoProducto()
    eventoBorradoProductos()
}

document.addEventListener('DOMContentLoaded', start)