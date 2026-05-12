import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import {
    bibliothequeParCourriel,
    ajouterBibliotheque,
    majCleApi
} from '../models/bibliotheque.model.js';

// POST /api/bibliotheques
export const creerBibliotheque = async (req, res) => {
    const { nom, courriel, mot_de_passe } = req.body;

    if (!nom || !courriel || !mot_de_passe) {
        return res.status(400).json({
            erreur: "Tous les champs sont requis"
        });
    }

    try {
        const existant = await bibliothequeParCourriel(courriel);

        if (existant.length > 0) {
            return res.status(400).json({
                erreur: "Ce courriel est déjà utilisé"
            });
        }

        const hash = await bcrypt.hash(mot_de_passe, 10);
        const cle_api = uuidv4();

        await ajouterBibliotheque(nom, courriel, hash, cle_api);

        res.status(201).json({
            message: "Bibliothèque créée avec succès",
            cle_api
        });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};

// GET /api/bibliotheques/cle?nouvelle=1
export const recupererCle = async (req, res) => {
    const { courriel, mot_de_passe } = req.body;
    const { nouvelle } = req.query;

    if (!courriel || !mot_de_passe) {
        return res.status(400).json({
            erreur: "Courriel et mot de passe requis"
        });
    }

    try {
        const rows = await bibliothequeParCourriel(courriel);

        if (rows.length === 0) {
            return res.status(404).json({
                erreur: "Bibliothèque introuvable"
            });
        }

        const bibliotheque = rows[0];

        const valide = await bcrypt.compare(mot_de_passe, bibliotheque.password);

        if (!valide) {
            return res.status(401).json({
                erreur: "Mot de passe invalide"
            });
        }

        let cle_api = bibliotheque.cle_api;

        if (nouvelle == 1) {
            cle_api = uuidv4();
            await majCleApi(bibliotheque.id, cle_api);
        }

        res.json({ cle_api });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
};