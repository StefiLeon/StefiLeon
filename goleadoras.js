//Generar dinámicamente tabla de goleadoras
const URLGOLEADORAS = "../goleadoras.json";
$.getJSON(URLGOLEADORAS, function(respuesta, estado){
    if(estado === "success") {
        let goleadoras = respuesta.goleadoras;
        for (const goleadora of goleadoras) {
            $('#goleadorasApertura').append(`
            <div class="col-lg-6 pb-4">
                <div class="tarjeta d-flex align-items-center">
                    <img src="${goleadora.imagen}" alt="${goleadora.nombre} ${goleadora.apellido}">
                    <div class="container text-center">
                        <h4 class="mt-4 mb-4">${goleadora.nombre} ${goleadora.apellido}</h4>
                        <p>${goleadora.equipo}</p>
                        <p><strong>${goleadora.goles} goles</strong></p>
                        <p>${goleadora.fechaDeNacimiento}</p>
                        <p>Último gol: ${goleadora.ultimoGol}</p>
                    </div>
                </div>
            </div>`)
        }
    }
});