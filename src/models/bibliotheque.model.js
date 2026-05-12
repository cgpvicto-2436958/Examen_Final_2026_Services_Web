import db from '../config/db_pg.js';

// Trouver une bibliothèque par courriel
export const bibliothequeParCourriel = async (courriel) => {
    const requete = `
        SELECT * FROM bibliotheque
        WHERE courriel = $1
    `;

    const result = await db.query(requete, [courriel]);
    return result.rows;
};

// Ajouter une bibliothèque
export const ajouterBibliotheque = async (nom, courriel, mot_de_passe, cle_api) => {
    const requete = `
        INSERT INTO bibliotheque (nom, courriel, password, cle_api)
        VALUES ($1, $2, $3, $4)
    `;

    await db.query(requete, [nom, courriel, mot_de_passe, cle_api]);
};

// Trouver une bibliothèque par clé API
export const bibliothequeParCle = async (cle_api) => {
    const requete = `
        SELECT * FROM bibliotheque
        WHERE cle_api = $1
    `;

    const result = await db.query(requete, [cle_api]);
    return result.rows;
};

// Mettre à jour la clé API
export const majCleApi = async (id, nouvelleCle) => {
    const requete = `
        UPDATE bibliotheque
        SET cle_api = $1
        WHERE id = $2
    `;

    await db.query(requete, [nouvelleCle, id]);
};