import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';

import bibliothequeRouter from './src/routes/bibliotheque.route.js';
import livresRouter from './src/routes/livres.route.js';
import pretsRouter from './src/routes/prets.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logStream = fs.createWriteStream(
    path.join(__dirname, 'errors.log'),
    { flags: 'a' }
);

const swaggerDocument = JSON.parse(
    fs.readFileSync('./src/config/documentation.json', 'utf8')
);

const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Bibliothèque API'
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(morgan('combined', {
    skip: (req, res) => res.statusCode < 500,
    stream: logStream
}));

app.use('/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerOptions)
);

app.use('/api/bibliotheques', bibliothequeRouter);
app.use('/api/livres', livresRouter);
app.use('/api/prets', pretsRouter);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});