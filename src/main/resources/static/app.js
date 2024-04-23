function registrerBillett() {
    $('.feil').html('');

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

    const billett = JSON.stringify({
        film: film,
        antall: antall,
        fornavn: fornavn,
        etternavn: etternavn,
        epost: epost,
        telefon: telefon
    });

    $.ajax({
        url: '/bookings',
        type: 'POST',
        contentType: 'application/json',
        data: billett,
        success: function(data) {
            console.log('Billett registrert:', data);
            hentAlle(); // Oppdater listen over billetter
            $('input[type="text"], input[type="email"], select').val(''); // Tøm formen
        },
        error: function(xhr) {
            console.error("Error:", xhr.responseText);
        }
    });
}



