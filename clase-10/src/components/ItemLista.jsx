function ItemLista({prod}) {
  
  return (
        <>
             <li className="flex items-center justify-between bg-white rounded-lg shadow p-3 mb-2 hover:bg-gray-50 trasition">
                  {/* <!-- Icono de producto --> */}
                   <span className="flex items-center justify-center w-10 text-indigo-600">
                    <i className="material-icons text-2xl">shopping_cart</i>
                   </span>
                 {/*  <!-- Nombre de producto --> */}
                   <span className="flex-1 text-gray-800 font-medium truncate w-32">
                    {prod.nombre}
                   </span>
                 {/*  <!-- Cantidad --> */}
                   <span className="w-24">
                    <label for="lbl-cantidad-${indice}" className="block text-xs text-gray-500">Cantidad</label>
                    <input data-tipo="cantidad" type="text" id="lbl-cantidad-${indice}" value={prod.cantidad} className="input-cantidad mt-1 w-full border border-gray-300 rounded-md text-sm p-1 text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                   </span>
                 {/*  <!-- Precio --> */}
                    <span className="w-24">
                      <label for="lbl-precio-${indice}" className="block text-xs text-gray-500">Precio</label>
                      <input data-tipo="precio" type="text" id="lbl-precio-${indice}" value={prod.precio} className="input-precio mt-1 w-full border border-gray-300 rounded-md text-sm p-1 text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    </span>
                 {/*  <!-- Borrar un producto --> */}
                   <span className="w-12 flex justify-center">
                    <button 
                        className="material-icons btn-borrar flex items-center justify-around bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 shadow transition cursor-pointer ms-2"
                        data-indice="${indice}"
                        data-id={prod.id}>
                        remove_shopping_cart
                    </button>
                   </span>
            </li>
        </>
    )
}

export default ItemLista