import express from "express";

//  ici recuper la logique de la route
import { getDemandes, createDemande, updateDemande, deleteDemande, likeDemande } from '../controllers/demandes.js';

//  importer le middleware pour les authorisation avant action
import auth from '../middleware/auth.js';

const router = express.Router();

//  routes servant a faire les actions sur la Base de Donnée
//  ici juste get pour recuperer une demande ou toues les demandes

//  implementation de les routes
router.get('/', getDemandes);
router.post('/', auth, createDemande);
router.patch('/:id', auth, updateDemande);
router.delete('/:id', auth, deleteDemande);
router.patch('/:id/likeDemande', auth, likeDemande);

export default router;