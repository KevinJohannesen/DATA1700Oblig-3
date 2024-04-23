package com.example.data1700oblig3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Filmnavn kan ikke være tomt.")
    private String film;

    @Min(value = 1, message = "Antall må være minst 1.")
    private int antall;

    @NotBlank(message = "Fornavn kan ikke være tomt.")
    @Pattern(regexp = "^[a-zA-ZæøåÆØÅ ]+$", message = "Fornavn kan bare inneholde bokstaver.")
    private String fornavn;

    @NotBlank(message = "Etternavn kan ikke være tomt.")
    @Pattern(regexp = "^[a-zA-ZæøåÆØÅ ]+$", message = "Etternavn kan bare inneholde bokstaver.")
    private String etternavn;

    @NotBlank(message = "Telefon kan ikke være tomt.")
    @Pattern(regexp = "^\\d{8}$", message = "Telefonnummer må inneholde 8 siffer.")
    private String telefon;

    @NotBlank(message = "E-post kan ikke være tom.")
    @Email(message = "E-postadressen er ikke gyldig.")
    private String epost;

    // Standard getters and setters...

    // Standard getters and setters...

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public int getAntall() {
        return antall;
    }

    public void setAntall(int antall) {
        this.antall = antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }
}
