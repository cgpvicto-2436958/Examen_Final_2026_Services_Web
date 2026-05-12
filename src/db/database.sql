DROP DATABASE IF EXISTS Service_web_projet_final;
CREATE DATABASE Service_web_projet_final;
USE Service_web_projet_final;

-- Table bibliotheque
DROP TABLE IF EXISTS prets;
DROP TABLE IF EXISTS livres;
DROP TABLE IF EXISTS bibliotheque;

CREATE TABLE bibliotheque (
    id        INTEGER      AUTO_INCREMENT PRIMARY KEY,
    nom       VARCHAR(100) NOT NULL,
    courriel  VARCHAR(255) NOT NULL UNIQUE,
    cle_api   VARCHAR(36)  NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL
);

-- Table livres
CREATE TABLE livres (
    id               INTEGER      AUTO_INCREMENT PRIMARY KEY,
    bibliotheque_id  INTEGER      NOT NULL,
    titre            VARCHAR(100) NOT NULL,
    auteur           VARCHAR(100) NOT NULL,
    isbn             VARCHAR(20)  NOT NULL,
    description      TEXT,
    date_ajout       DATE         DEFAULT (CURRENT_DATE),
    disponible       TINYINT(1)   DEFAULT 1,
    FOREIGN KEY (bibliotheque_id) REFERENCES bibliotheque(id)
);

-- Table prets
CREATE TABLE prets (
    id          INTEGER      AUTO_INCREMENT PRIMARY KEY,
    livre_id    INTEGER      NOT NULL,
    emprunteur  VARCHAR(100) NOT NULL,
    date_debut  DATE         NOT NULL DEFAULT (CURRENT_DATE),
    date_retour DATE         NOT NULL,
    FOREIGN KEY (livre_id) REFERENCES livres(id)
);

-- Données initiales : bibliothèques
INSERT INTO bibliotheque (id, nom, courriel, cle_api, `password`) VALUES
(1, 'Bibliothèque Centrale', 'central@biblio.ca', 'API123456', 'pass123'),
(2, 'Biblio Est',            'est@biblio.ca',     'API789456', 'pass456'),
(3, 'Biblio Ouest',          'ouest@biblio.ca',   'API321654', 'pass789');

-- Données initiales : livres
INSERT INTO livres (id, bibliotheque_id, titre, auteur, isbn, date_ajout, disponible) VALUES
(1, 1, 'Le Petit Prince',                     'Antoine de Saint-Exupéry', '9782070612758', '2024-01-10', 1),
(2, 1, '1984',                                'George Orwell',            '9780451524935', '2024-02-15', 0),
(3, 1, 'L\'Étranger',                         'Albert Camus',             '9782070360024', '2024-03-01', 1),
(4, 2, 'Harry Potter à l\'école des sorciers','J.K. Rowling',             '9782070643028', '2024-01-20', 0),
(5, 2, 'Le Seigneur des Anneaux',             'J.R.R. Tolkien',           '9780261102385', '2024-02-10', 1),
(6, 3, 'One Piece Tome 1',                    'Eiichiro Oda',             '9782344000001', '2024-03-12', 1),
(7, 3, 'Naruto Tome 1',                       'Masashi Kishimoto',        '9782505000002', '2024-03-15', 0);

-- Données initiales : prêts
INSERT INTO prets (id, livre_id, emprunteur, date_debut, date_retour) VALUES
(1, 2, 'Jean Dupont',    '2024-04-01', '2024-05-01'),
(2, 4, 'Marie Tremblay', '2024-04-01', '2024-04-20'),
(3, 7, 'Alex Gagnon',    '2024-04-01', '2024-04-25');

-- Vérification
SELECT * FROM bibliotheque;
SELECT * FROM livres;
SELECT * FROM prets;