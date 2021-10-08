import express from "express";
const router = express.Router();

//ici recuper la logique de la route
import { signin, signup } from "../controllers/user.js";

//implementation de la route connexion
router.post("/signin", signin);
//implementation de la route d'inscription
router.post("/signup", signup);


export default router;