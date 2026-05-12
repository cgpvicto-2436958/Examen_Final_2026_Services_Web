import {
    listeLivres,
    livreParId,
    ajouterLivre,
    modifierLivre,
    modifierStatutLivre,
    supprimerLivre
} from '../models/livres.model.js';

import { pretsParLivre } from '../models/prets.model.js';


// GET /api/livres?tous=1
export const getLivres = async (req, res) => {
    const { tous } = req.query;
    const { id: bibliotheque_id } = req.bibliotheque;

    try {
        const livres = await listeLivres(bibliotheque_id, tous == 1);
        res.json(livres);

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};

// GET /api/livres/:id
export const getLivre = async (req, res) => {
    const { id } = req.params;
    const { id: bibliotheque_id } = req.bibliotheque;

    try {
        const rows = await livreParId(id, bibliotheque_id);

        if (rows.length === 0) {
            return res.status(404).json({ erreur: "Livre introuvable" });
        }

        const livre = rows[0];
        const prets = await pretsParLivre(id);

        const today = new Date();

        res.json({
            ...livre,
            prets: prets.map(p => ({
                ...p,
                en_cours: new Date(p.date_retour) >= today
            }))
        });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};

// POST /api/livres
export const postLivre = async (req, res) => {
    const { titre, auteur, isbn } = req.body;
            const description = req.body.description?.trim() || null;
    const { id: bibliotheque_id } = req.bibliotheque;

    if (!titre || !auteur || !isbn) {
        return res.status(400).json({ erreur: "Titre, auteur et ISBN sont requis" });
    }

    try {
        await ajouterLivre(bibliotheque_id, titre, auteur, isbn, description);
        res.status(201).json({ message: "Livre ajouté avec succès" });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};

// PUT /api/livres/:id
export const putLivre = async (req, res) => {
    const { id } = req.params;
    const { titre, auteur, isbn, description } = req.body;
    const { id: bibliotheque_id } = req.bibliotheque;

    if (!titre || !auteur || !isbn) {
        return res.status(400).json({ erreur: "Titre, auteur et ISBN sont requis" });
    }

    try {
        const result = await modifierLivre(id, bibliotheque_id, titre, auteur, isbn, description);

        if (result.affectedRows === 0) {
            return res.status(404).json({ erreur: "Livre introuvable" });
        }

        res.json({ message: "Livre modifié avec succès" });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};

// PATCH /api/livres/:id/statut
export const patchStatutLivre = async (req, res) => {
    const { id } = req.params;
    const { disponible } = req.body;
    const { id: bibliotheque_id } = req.bibliotheque;

    if (disponible === undefined) {
        return res.status(400).json({ erreur: "Le champ disponible est requis" });
    }

    try {
        const result = await modifierStatutLivre(id, bibliotheque_id, disponible);

        if (result.affectedRows === 0) {
            return res.status(404).json({ erreur: "Livre introuvable" });
        }

        res.json({ message: "Statut du livre modifié avec succès" });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};

// DELETE /api/livres/:id
export const deleteLivre = async (req, res) => {
    const { id } = req.params;
    const { id: bibliotheque_id } = req.bibliotheque;

    try {
        const result = await supprimerLivre(id, bibliotheque_id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ erreur: "Livre introuvable" });
        }

        res.json({ message: "Livre supprimé avec succès" });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};