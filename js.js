//Definir valores de foto y video

function calcularPresupuesto () {
    let eleccion = prompt("Seleccione la opción deseada: foto o video.");
    if (eleccion == (("foto") || ("FOTO"))) {
        let cotizacion = 150;
        let cantidad = parseInt(prompt("Ingrese cantidad de fotos aproximada."));
        alert("La cotización es de $" + (cotizacion * cantidad));
    } else if (eleccion == (("video") || ("VIDEO"))) {
        let cotizacion = 1500;
        let cantidad = parseInt(prompt("Ingrese cantidad de minutos deseada."));
        alert("La cotización es de $" + (cotizacion * cantidad));
    } else {
        alert("Valor erróneo, intente nuevamente.");
    }
}

calcularPresupuesto();
calcularPresupuesto();
calcularPresupuesto();