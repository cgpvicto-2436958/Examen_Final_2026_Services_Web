import express from 'express';
import { creerBibliotheque, recupererCle } from '../controllers/bibliotheque.controller.js';

const bibliothequeRouter = express.Router();

bibliothequeRouter.post('/cle', recupererCle);
bibliothequeRouter.post('/', creerBibliotheque);

export default bibliothequeRouter;