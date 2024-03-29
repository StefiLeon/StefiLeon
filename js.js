const IVA = 1.21

//Defino el carrito
let carrito = [];
let contador = 0;

//Agregar productos desde el JSON estatico
const URLJSON = "../productos.json";
$.getJSON(URLJSON, function(respuesta, estado){
    let total = 0;
    if(estado === "success") {
        let productos = respuesta.productos;
        for (const producto of productos) {
            $("#carritoEnJS").append(`<div class="col-lg-6 pb-4">
            <div class ="tarjeta-productos d-flex align-items-center">
            <img src="${producto.imagen}">
            <div class="container text-center">
            <h4 class="mt=4 mb-4"> ${producto.tipoDeProducto} ${producto.modelo}</h4><br>
            <p> $ ${producto.precio}</p><br>
            <button class="btn btn-lg btn-info" id="btn${producto.id}">Comprar</button>
            </div>
            </div>
            </div>`);
            $(`#btn${producto.id}`).popover({
                content: "Producto agregado al carrito",
                trigger: 'focus',
                delay: {"show": 100, "hide": 100},
                placement: 'top',
                container: $(`#btn${producto.id}`)
            });
            $(`#btn${producto.id}`).on('click', function(){
                let idDeCompra = false;
                for (item of carrito) {
                    if(item.id == producto.id) {
                        console.log("Hay coincidencia.")
                        //Sumar item
                        item.cantidad = item.cantidad+1;
                        console.log(carrito);
                        idDeCompra = true;
                        //Sumar precio
                        total += producto.precio;
                        console.log(total);
                        //Actualizar total
                        presupuestoTotal.innerHTML = "El precio total es de $ " + total;
                        document.getElementById(`cantidadProd${producto.id}`).innerHTML = producto.cantidad;
                        const enJSON = JSON.stringify(producto);
                        localStorage.setItem(`${producto.tipoDeProducto} ${producto.modelo}`, enJSON);
                        return total;
                    }
                }
                if (idDeCompra == false) {
                    productoParaAgregar = productos[producto.id - 1];
                    agregarProducto(productoParaAgregar);
                    total += producto.precio;
                    console.log(total);
                    presupuestoTotal.innerHTML = "El precio total es de $ " + total;
                    const enJSON = JSON.stringify(producto);
                    localStorage.setItem(`${producto.tipoDeProducto} ${producto.modelo}`, enJSON);
                    //agregar al modal carrito
                    $('#listaDeCarrito').append(`<tr>
                    <td class="w-25 compras">
                    <img src="${producto.imagen}" class="img-fluid img-thumbnail" alt="${producto.tipoDeProducto} ${producto.modelo}">
                    </td>
                    <td class="compras">${producto.tipoDeProducto} ${producto.modelo}</td>
                    <td class="compras">$ ${producto.precio}</td>
                    <td class="compras" id="cantidadProd${producto.id}">${producto.cantidad}</td>
                    <td class="compras">
                    </td>
                    </tr>`)
                    return total;
                }
            });
        }
        if(contador>0){
            document.getElementById("presupuestoTotal").innerHTML = "El precio total es de $ " + total;
        }
        contador++;
    }
});

//Definir cantidad como propiedad que se puede sobreescribir
function agregarProducto(producto) {
    Object.defineProperty(producto, 'cantidad', {value: 1, writable: true});
    carrito.push(producto);
    console.log(carrito);
}

//Animacion del titulo
$(document).ready(function(){
    $(".animacionDelay").delay(1500)
    .slideDown("slow");
});

//Modal carrito
$("#carritoDeCompras").on('click', function() {
    $('#carritoModal').slideDown("slow");
    $('#carritoModal').modal('show');
});
$('.close').on('click', function() {
    $('#carritoModal').modal('hide');
});

//Finalizar compra
$('#finalizarCompra').on('click', function() {
    if(carrito.length != 0) {
        Swal.fire({
        title: '¡Gracias!',
        text: 'Compra realizada',
        icon: 'success',
        backdrop: false,
        confirmButtonText: 'Cerrar',
    }).then((result) => {
        if(result.isConfirmed) {
            location.reload();
        }
    });
    } else {
        Swal.fire({
            title: '¡Error!',
            text: 'Agregue productos para continuar',
            icon: 'error',
            backdrop: false,
            confirmButtonText: 'Cerrar'
        });
    }
    localStorage.clear();
    $('#carritoModal').modal('hide');
});