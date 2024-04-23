DROP TABLE IF EXISTS bookings;

CREATE TABLE bookings (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          film VARCHAR(255) NOT NULL,
                          antall INT NOT NULL,
                          fornavn VARCHAR(255) NOT NULL,
                          etternavn VARCHAR(255) NOT NULL,
                          telefon VARCHAR(15) NOT NULL,
                          epost VARCHAR(255) NOT NULL
);
