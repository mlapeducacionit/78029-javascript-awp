import Swal from "sweetalert2";

const handleNotificacion = (objetoMensajes, cb) => {
    Swal.fire({
            title: objetoMensajes.textoPrincipal,
            text: objetoMensajes.descripcion,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Borrar!",
            cancelButtonText: "Noooo lo borres"
            }).then((result) => {
                if (result.isConfirmed) {
                    cb()

                    Swal.fire({
                        title: objetoMensajes.textoSecundario,
                        text: objetoMensajes.descripcionSecundaria,
                        icon: "success"
                    });

                }
    });
}

export default handleNotificacion