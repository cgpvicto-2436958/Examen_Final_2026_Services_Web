import {
    pretsParLivre,
    pretParId,
    ajouterPret,
    modifierPret,
    modifierStatutPret,
    supprimerPret
} from '../models/prets.model.js';

import { livreParId } from '../models/livres.model.js';

// GET /api/prets/:id
export const getPret = async (req, res) => {
    const { id } = req.params;

    try {
        const rows = await pretParId(id);

        if (rows.length === 0) {
            return res.status(404).json({ erreur: "Prêt introuvable" });
        }

        const pret = rows[0];
        const today = new Date();

        res.json({
            ...pret,
            en_cours: new Date(pret.date_retour) >= today
        });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};

// POST /api/prets
export const postPret = async (req, res) => {
    const { livre_id, emprunteur, date_debut, date_retour } = req.body;
    const { id: bibliotheque_id } = req.bibliotheque;

    if (!livre_id || !emprunteur || !date_retour) {
        return res.status(400).json({ erreur: "livre_id, emprunteur et date_retour sont requis" });
    }

    try {
        const livre = await livreParId(livre_id, bibliotheque_id);

        if (livre.length === 0) {
            return res.status(404).json({ erreur: "Livre introuvable" });
        }

        const debut = date_debut || new Date().toISOString().split('T')[0];
        await ajouterPret(livre_id, emprunteur, debut, date_retour);

        res.status(201).json({ message: "Prêt ajouté avec succès" });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};

// PUT /api/prets/:id
export const putPret = async (req, res) => {
    const { id } = req.params;
    const { emprunteur, date_debut, date_retour } = req.body;

    if (!emprunteur || !date_retour) {
        return res.status(400).json({ erreur: "Emprunteur et date_retour sont requis" });
    }

    try {
        const result = await modifierPret(id, emprunteur, date_debut?.split('T')[0], date_retour.split('T')[0]);

        if (result.rowCount === 0) {
            return res.status(404).json({ erreur: "Prêt introuvable" });
        }

        res.json({ message: "Prêt modifié avec succès" });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};

// PATCH /api/prets/:id/statut
export const patchStatutPret = async (req, res) => {
    const { id } = req.params;
    const { date_retour } = req.body;

    if (!date_retour) {
        return res.status(400).json({ erreur: "date_retour est requis" });
    }

    try {
        const result = await modifierStatutPret(id, date_retour);

        if (result.affectedRows === 0) {
            return res.status(404).json({ erreur: "Prêt introuvable" });
        }

        res.json({ message: "Statut du prêt modifié avec succès" });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};

// DELETE /api/prets/:id
export const deletePret = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await supprimerPret(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ erreur: "Prêt introuvable" });
        }

        res.json({ message: "Prêt supprimé avec succès" });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};