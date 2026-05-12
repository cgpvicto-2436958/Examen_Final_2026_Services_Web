-- Supprimer les tables si elles existent déjà (ordre inverse pour respecter les FK)
DROP TABLE IF EXISTS prets;
DROP TABLE IF EXISTS livres;
DROP TABLE IF EXISTS bibliotheque;

-- Table bibliotheque
CREATE TABLE bibliotheque (
    id        SERIAL PRIMARY KEY,
    nom       VARCHAR(100)  NOT NULL,
    courriel  VARCHAR(255)  NOT NULL UNIQUE,
    cle_api   VARCHAR(36)   NOT NULL UNIQUE,
    password  VARCHAR(255)  NOT NULL
);

-- Table livres
CREATE TABLE livres (
    id               SERIAL PRIMARY KEY,
    bibliotheque_id  INTEGER       NOT NULL REFERENCES bibliotheque(id),
    titre            VARCHAR(100)  NOT NULL,
    auteur           VARCHAR(100)  NOT NULL,
    isbn             VARCHAR(20)   NOT NULL,
    description      TEXT,
    date_ajout       DATE          DEFAULT CURRENT_DATE,
    disponible       BOOLEAN       DEFAULT TRUE
);

-- Table prets
CREATE TABLE prets (
    id           SERIAL PRIMARY KEY,
    livre_id     INTEGER       NOT NULL REFERENCES livres(id),
    emprunteur   VARCHAR(100)  NOT NULL,
    date_debut   DATE          NOT NULL DEFAULT CURRENT_DATE,
    date_retour  DATE          NOT NULL
);

-- Données initiales : bibliothèques
INSERT INTO bibliotheque (id, nom, courriel, cle_api, password) VALUES
(1, 'Bibliothèque Centrale', 'central@biblio.ca', 'API123456', 'pass123'),
(2, 'Biblio Est',            'est@biblio.ca',     'API789456', 'pass456'),
(3, 'Biblio Ouest',          'ouest@biblio.ca',   'API321654', 'pass789');

-- Resynchroniser la séquence SERIAL après insertion manuelle d'ids
SELECT setval('bibliotheque_id_seq', (SELECT MAX(id) FROM bibliotheque));

-- Données initiales : livres
INSERT INTO livres (id, bibliotheque_id, titre, auteur, isbn, date_ajout, disponible) VALUES
(1, 1, 'Le Petit Prince',                    'Antoine de Saint-Exupéry', '9782070612758', '2024-01-10', TRUE),
(2, 1, '1984',                               'George Orwell',            '9780451524935', '2024-02-15', FALSE),
(3, 1, 'L''Étranger',                        'Albert Camus',             '9782070360024', '2024-03-01', TRUE),
(4, 2, 'Harry Potter à l''école des sorciers','J.K. Rowling',            '9782070643028', '2024-01-20', FALSE),
(5, 2, 'Le Seigneur des Anneaux',            'J.R.R. Tolkien',           '9780261102385', '2024-02-10', TRUE),
(6, 3, 'One Piece Tome 1',                   'Eiichiro Oda',             '9782344000001', '2024-03-12', TRUE),
(7, 3, 'Naruto Tome 1',                      'Masashi Kishimoto',        '9782505000002', '2024-03-15', FALSE);

SELECT setval('livres_id_seq', (SELECT MAX(id) FROM livres));

-- Données initiales : prêts
INSERT INTO prets (id, livre_id, emprunteur, date_debut, date_retour) VALUES
(1, 2, 'Jean Dupont',    '2024-04-01', '2024-05-01'),
(2, 4, 'Marie Tremblay', '2024-04-01', '2024-04-20'),
(3, 7, 'Alex Gagnon',    '2024-04-01', '2024-04-25');

SELECT setval('prets_id_seq', (SELECT MAX(id) FROM prets));

-- Vérification
SELECT * FROM bibliotheque;
SELECT * FROM livres;
SELECT * FROM prets;