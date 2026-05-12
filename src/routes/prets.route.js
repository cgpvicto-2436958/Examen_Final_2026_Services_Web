import express from 'express';
import { validerCleApi } from '../middlewares/validateApiKey.js';
import {
    getPret,
    postPret,
    putPret,
    patchStatutPret,
    deletePret
} from '../controllers/prets.controller.js';

const pretsRouter = express.Router();

pretsRouter.use(validerCleApi);

pretsRouter.get('/:id',          getPret);
pretsRouter.post('/',            postPret);
pretsRouter.put('/:id',          putPret);
pretsRouter.patch('/:id/statut', patchStatutPret);
pretsRouter.delete('/:id',       deletePret);

export default pretsRouter;