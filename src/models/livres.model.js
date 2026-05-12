import db from '../config/db_pg.js';

// Liste des livres d'une bibliothèque (disponibles par défaut)
export const listeLivres = async (bibliotheque_id, tous = false) => {
    let requete = `
        SELECT id, titre, auteur, isbn, description, date_ajout, disponible
        FROM livres
        WHERE bibliotheque_id = $1
    `;

    if (!tous) {
        requete += ` AND disponible = true`;
    }

    const result = await db.query(requete, [bibliotheque_id]);
    return result.rows;
};

// Détail d'un livre avec ses prêts
export const livreParId = async (id, bibliotheque_id) => {
    const requete = `
        SELECT id, titre, auteur, isbn, description, date_ajout, disponible
        FROM livres
        WHERE id = $1 AND bibliotheque_id = $2
    `;

    const result = await db.query(requete, [id, bibliotheque_id]);
    return result.rows;
};

// Ajouter un livre
export const ajouterLivre = async (bibliotheque_id, titre, auteur, isbn, description) => {
    const requete = `
        INSERT INTO livres (bibliotheque_id, titre, auteur, isbn, description)
        VALUES ($1, $2, $3, $4, $5)
    `;

    const result = await db.query(requete, [bibliotheque_id, titre, auteur, isbn, description]);
    return result;
};

// Modifier un livre
export const modifierLivre = async (id, bibliotheque_id, titre, auteur, isbn, description) => {
    const requete = `
        UPDATE livres
        SET titre = $1, auteur = $2, isbn = $3, description = $4
        WHERE id = $5 AND bibliotheque_id = $6
    `;

    const result = await db.query(requete, [titre, auteur, isbn, description, id, bibliotheque_id]);
    return result;
};

// Modifier le statut d'un livre (disponible/emprunté)
export const modifierStatutLivre = async (id, bibliotheque_id, disponible) => {
    const requete = `
        UPDATE livres
        SET disponible = $1
        WHERE id = $2 AND bibliotheque_id = $3
    `;

    const result = await db.query(requete, [disponible, id, bibliotheque_id]);
    return result;
};

// Supprimer un livre
export const supprimerLivre = async (id, bibliotheque_id) => {
    const requete = `
        DELETE FROM livres
        WHERE id = $1 AND bibliotheque_id = $2
    `;

    const result = await db.query(requete, [id, bibliotheque_id]);
    return result;
};