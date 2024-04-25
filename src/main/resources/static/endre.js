$(function (){
    hentEnBooking();
});

function hentEnBooking(){
    const id = window.location.search.substring(1);
    const url = "/hentEnBooking?id="+id;
    $.get(url, function (booking){
        $("#id").val(booking.id);
        $("#film").val(booking.film);
        $("#seter").val(booking.seter);
        $("#fornavn").val(booking.fornavn);
        $("#etternavn").val(booking.etternavn);
        $("#mail").val(booking.mail);
        $("#tlf").val(booking.tlf);
    });
}

function endreEnBooking(){

    $("#errorFilm").html(" ");
    $("#errorSeter").html(" ");
    $("#errorFornavn").html(" ");
    $("#errorEtternavn").html(" ");
    $("#errorMail").html(" ");
    $("#errorTlf").html(" ");

    const filmVerdi = $("#film").val();
    const seterVerdi = $("#seter").val();
    const fornavnVerdi = $("#fornavn").val();
    const etternavnVerdi = $("#etternavn").val();
    const mailVerdi = $("#mail").val();
    const sjekkMail = /^[\w\.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const tlfVerdi = $("#tlf").val();

    if (filmVerdi === "") {
        $("#errorFilm").html("<span style='color:red; font-weight:bold;'> UGYLDIG INPUT, VELG FILM! </span>");
        return;
    }
    if (isNaN(seterVerdi) || !Number.isInteger(Number(seterVerdi)) || Number(seterVerdi) <=  0) {
        $("#errorSeter").html("<span style='color:red; font-weight:bold;'> UGYLDIG INPUT, SKRIV ANTALL SETER! </span>");
        return;
    }
    if (fornavnVerdi.trim() === "" || /^\d+$/.test(fornavnVerdi)) {
        $("#errorFornavn").html("<span style='color:red; font-weight:bold;'> UGYLDIG INPUT, SKRIV FORNAVNET DITT! </span>");
        return;
    }
    if (etternavnVerdi.trim() === "" || /^\d+$/.test(etternavnVerdi)) {
        $("#errorEtternavn").html("<span style='color:red; font-weight:bold;'> UGYLDIG INPUT, SKRIV ETTERNAVNET DITT! </span>");
        return;
    }
    if (!sjekkMail.test(mailVerdi)) {
        $("#errorMail").html("<span style='color:red; font-weight:bold;'> UGYLDIG INPUT, SKRIV MAILEN DIN! </span>");
        return;
    }
    if (isNaN(tlfVerdi || !Number.isFinite(tlfVerdi))){
        $("#errorTlf").html("<span style='color:red; font-weight:bold;'> UGYLDIG INPUT, SKRIV NUMMERET DITT!</span>");
        return;
    }

    const booking = {
        id: $("#id").val(),
        film: $("#film").val(),
        seter: $("#seter").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        mail: $("#mail").val(),
        tlf: $("#tlf").val()
    }
    $.post("/endreEnBooking",booking,function (){
    });

    window.location.href ="/";
}