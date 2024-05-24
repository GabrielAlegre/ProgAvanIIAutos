function confirmarEliminarAuto(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma la eliminación, enviar una solicitud DELETE al servidor
            fetch(`/autos/eliminar/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el auto');
                }
                // Opcional: mostrar un mensaje de éxito
                return response.json("Error al eliminar");
            })
            .then(data => {
                console.log(data.message); // Mensaje de éxito del servidor
                // Opcional: recargar la página o actualizar la lista de autos
                Swal.fire({
                    title: 'Excelente!!',
                    text: 'Auto eliminado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result)=>{
                    if(result.isConfirmed)
                        {
                            window.location.reload(); // Recargar la página después de eliminar el auto

                        }
                }) ;
            })
            .catch(error => {
                console.error(error);
                // Opcional: mostrar un mensaje de error al usuario
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al intentar eliminar el auto',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });
        }
    });
}


// function mensajeConfirmacionRegistro(exito) {
//     let title, text, icon;
//     if (exito) {
//         title = 'Excelente!!';
//         text = 'Te registraste con exito, ahora puedes iniciar sesion';
//         icon = 'success';
//     } else {
//         title = 'Error';
//         text = 'Ocurrió un error al intentar registrarte';
//         icon = 'error';
//     }

//     Swal.fire({
//         title: title,
//         text: text,
//         icon: icon,
//         confirmButtonText: 'Aceptar'
//     }).then((result) => {
//         if (result.isConfirmed && exito) {
//             window.location.href = '/usuarios/login'; // Redireccionar al login si el registro fue exitoso
//         } else if (!exito){
//             console.log("eerror"); // Recargar la página si hubo un error
//         }
//     });
// }

