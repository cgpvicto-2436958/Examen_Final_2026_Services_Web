import { bibliothequeParCle } from '../models/bibliotheque.model.js';

export const validerCleApi = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            erreur: "Clé API manquante"
        });
    }

    const cle_api = authorization;

    try {
        const rows = await bibliothequeParCle(cle_api);

        if (rows.length === 0) {
            return res.status(401).json({
                erreur: "Clé API invalide"
            });
        }

        // On attache la bibliothèque à la requête pour l'utiliser dans les contrôleurs
        req.bibliotheque = rows[0];

        next();

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};