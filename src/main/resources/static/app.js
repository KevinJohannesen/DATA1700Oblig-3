function registrerBillett() {
    $('.feil').html('');
//kommentar til koden under: her henter jeg ut verdien fra inputfeltene og sjekker om de er tomme eller ugyldige
    const film = $("#film").val();
    const antall = parseInt($("#antall").val());
    const fornavn = $("#fornavn").val().trim();
    const etternavn = $("#etternavn").val().trim();
    const epost = $("#epost").val().trim();
    const telefon = $("#telefon").val().trim();
    const sjekkMail = /^[\w\.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    let valid = true;

    if (!film) {
        $("#feilFilm").html("Vennligst velg en film.");
        valid = false;
    }
    if (!antall || isNaN(antall)) {
        $("#feilAntall").html("Vennligst velg antall billetter.");
        valid = false;
    }
    if (!fornavn) {
        $("#feilFornavn").html("Vennligst oppgi fornavn.");
        valid = false;
    }
    if (!etternavn) {
        $("#feilEtternavn").html("Vennligst oppgi etternavn.");
        valid = false;
    }
    if (!telefon.match(/^\d{8}$/)) {
        $("#feilTelefon").html("Ugyldig telefonnummer, må inneholde 8 siffer.");
        valid = false;
    }
    if (!sjekkMail.test(epost)) {
        $("#feilEpost").html("Ugyldig e-postadresse.");
        valid = false;
    }

    if (!valid) {
        return;
    }
//kommentar til koden under: her lager jeg et objekt med verdiene fra inputfeltene og sender det til serveren
    const Booking = {
        film: $("#film").val(),
        antall: parseInt($("#antall").val()),
        fornavn: $("#fornavn").val().trim(),
        etternavn: $("#etternavn").val().trim(),
        epost: $("#epost").val().trim(),
        telefon: $("#telefon").val().trim()
    };

    $.post("/lagre", Booking, function () {
        // Lagre bookingen i sessionStorage når den er opprettet
        sessionStorage.setItem('booking', JSON.stringify(Booking));
        hentAlle();
    });

    $("#film").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#epost").val("");
    $("#telefon").val("");

}

function endreEnBooking(object, id){
    let row = object.parentNode.parentNode;
    let cells = row.querySelectorAll("td:not(:last-child):not(:nth-last-child(2))");
    let booking = {id: id}; // Legg til id i booking objektet

    // Sjekk om knappen er i "Endre" tilstand
    if (object.innerText === "Endre billett") {
        // Endre cellene til input felt
        for(let i = 0; i < cells.length; i++){
            let input = document.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.value = cells[i].innerText;
            cells[i].innerHTML = "";
            cells[i].appendChild(input);
            booking[cells[i].getAttribute("data-field")] = input.value;
        }

        // Endre knappen til "Lagre" tilstand
        object.innerText = "Lagre";
    } else {
        // Knappen er i "Lagre" tilstand
        // Hent verdiene fra input feltene, oppdater booking objektet og cellene
        for(let i = 0; i < cells.length; i++){
            let value = cells[i].firstChild.value;
            booking[cells[i].getAttribute("data-field")] = value;
            cells[i].innerText = value; // Oppdater cellen til å være verdien
        }

        // Send det oppdaterte booking objektet til serveren
        $.post("/endreEnBooking", booking, function (){
            hentAlle();
        });

        // Endre knappen tilbake til "Endre" tilstand
        object.innerText = "Endre billett";
    }
}
//denne funksjonen gjør slik at tabellen i html blir fylt med data fra databasen og man kan slette hver enkel billett

function hentAlle() {
    $.get("/hentalle", function (bookinger) {
        let ut = "";
        for (let b of bookinger) {
            ut += "<tr>" +
                "<td data-field='film'>" + b.film + "</td>" +
                "<td data-field='antall'>" + b.antall + "</td>" +
                "<td data-field='fornavn'>" + b.fornavn + "</td>" +
                "<td data-field='etternavn'>" + b.etternavn + "</td>" +
                "<td data-field='telefon'>" + b.telefon + "</td>" +
                "<td data-field='epost'>" + b.epost + "</td>" +
                "<td><a class='btn btn-primary' onclick='endreEnBooking(this," + b.id + ")'>Endre billett</a></td>" +
                "<td><button class='btn btn-danger' onclick='slettEn(" + b.id + ")'>Slett billett</button></td>" +
                "</tr>";
        }
        $("#bookinger").html(ut);
    });
}
function slettallebilletter(){
    $.ajax({
        type: "DELETE",
        url: "/slettalle",
        success: function () {
            $("#bookinger").html("");
            $("#film").val("");
            $("#seter").val("");
            $("#fornavn").val("");
            $("#etternavn").val("");
            $("#mail").val("");
            $("#tlf").val("");
        }
    });
}

function formaterData(bookinger){
    var ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefon</th><th>E-post</th><th></th><th></th>" +
        "</tr>";
    for(let b of bookinger){
        ut +="<tr>" +
            "<td>"+b.film +"</td><td>"+b.antall +"</td><td>"+b.fornavn +"</td><td>"+b.etternavn +"</td><td>"+b.telefon +"</td><td>"+b.epost +"</td>"+
            "<td><a class='btn btn-primary' href='endre.html?id= "  + b.id + "'>Endre</a> </td>"+
            "<td> <button class='btn btn-danger' onclick='slettEn(" + b.id + ")'>Slett</button></td>"+
            "</tr>";
    }
    $("#bookinger").html(ut);
}


//Her sender jeg med tilsvarende $.ajax DELETE type som er en @DeleteMapping i controlleren
function slettEn(id) {
    $.ajax({
        type: "DELETE",
        url: "/slettEn?id=" + id,
        success: function () {
            hentAlle();
        }
    });
};

$(document).ready(function() {
    // Hent bookingen fra sessionStorage når siden lastes
    const booking = JSON.parse(sessionStorage.getItem('booking'));

    if (booking) {
        // Fyll inn formen med booking data
        $("#film").val(booking.film);
        $("#antall").val(booking.antall.toString());
        $("#fornavn").val(booking.fornavn);
        $("#etternavn").val(booking.etternavn);
        $("#epost").val(booking.epost);
        $("#telefon").val(booking.telefon);
    }

    // ... resten av ready funksjonen ...
});

