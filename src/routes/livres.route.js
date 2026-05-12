import express from 'express';
import { validerCleApi } from '../middlewares/validateApiKey.js';
import {
    getLivres,
    getLivre,
    postLivre,
    putLivre,
    patchStatutLivre,
    deleteLivre
} from '../controllers/livres.controller.js';

const livresRouter = express.Router();

livresRouter.use(validerCleApi);

livresRouter.get('/',           getLivres);
livresRouter.get('/:id',        getLivre);
livresRouter.post('/',          postLivre);
livresRouter.put('/:id',        putLivre);
livresRouter.patch('/:id/statut', patchStatutLivre);
livresRouter.delete('/:id',     deleteLivre);

export default livresRouter;