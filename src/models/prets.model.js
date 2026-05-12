import db from '../config/db_pg.js';

// Liste des prêts d'un livre
export const pretsParLivre = async (livre_id) => {
    const requete = `
        SELECT id, emprunteur, date_debut, date_retour
        FROM prets
        WHERE livre_id = $1
    `;

    const result = await db.query(requete, [livre_id]);
    return result.rows;
};

// Détail d'un prêt
export const pretParId = async (id) => {
    const requete = `
        SELECT id, livre_id, emprunteur, date_debut, date_retour
        FROM prets
        WHERE id = $1
    `;

    const result = await db.query(requete, [id]);
    return result.rows;
};

// Ajouter un prêt
export const ajouterPret = async (livre_id, emprunteur, date_debut, date_retour) => {
    const requete = `
        INSERT INTO prets (livre_id, emprunteur, date_debut, date_retour)
        VALUES ($1, $2, $3, $4)
    `;

    const result = await db.query(requete, [livre_id, emprunteur, date_debut, date_retour]);
    return result;
};

// Modifier un prêt
export const modifierPret = async (id, emprunteur, date_debut, date_retour) => {
    const requete = `
        UPDATE prets
        SET emprunteur = $1, date_debut = $2, date_retour = $3
        WHERE id = $4
    `;

    const result = await db.query(requete, [emprunteur, date_debut, date_retour, id]);
    return result;
};

// Modifier le statut d'un prêt (changer la date de retour)
export const modifierStatutPret = async (id, date_retour) => {
    const requete = `
        UPDATE prets
        SET date_retour = $1
        WHERE id = $2
    `;

    const result = await db.query(requete, [date_retour, id]);
    return result;
};

// Supprimer un prêt
export const supprimerPret = async (id) => {
    const requete = `
        DELETE FROM prets
        WHERE id = $1
    `;

    const result = await db.query(requete, [id]);
    return result;
};