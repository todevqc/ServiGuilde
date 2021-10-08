import bcrypt from 'bcryptjs';
//  le jwt est utilisé pour stocker les infos d'un utilisateur dans le navigateur pour un lapse de temps donné
import jwt from 'jsonwebtoken';

import UserModal from "../models/user.js";

const secret = 'serviguilde';

//  logique de la fonction de connexion
export const signin = async (req, res) => {
    //  recuperer les valeur envoyer depuis de formulaire et qui sont contenu dans la (request) req
    const { email, password } = req.body;

    try {
        //  chercher si l'utilisateur exite deja dans la BDD, avec son email qui est unique
        const oldUser = await UserModal.findOne({ email });

        //si l'utilisateur n'existe pas retourner message erreur
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        //  comparer le mot de passe saise pas l'utilisateur et le mot de passe de la BDD
        //  il faut utiliser le bcrypt car le password de la BD à été crypter (fonction de hachage)
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        //  si les deux ne correspondent pas, alors erreur
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        //  si on arrive ici c'est qu'il n'y a pas d'erreur
        //  crrer le token pour authoriser la connexion grace a JWT avec toutes les infos a y mettre, ici l'email et l'id
        //  en specifiant combient de temps se token seras valide
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        //  retourner le token
        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

//  logique de la fonction d'inscription
export const signup = async (req, res) => {
    //  recuperer les valeur envoyer depuis de formulaire doit correspondre au formulaire
    const { email, password, firstName, lastName } = req.body;

    try {
        //  chercher si l'utilisateur exite deja dans la BDD, avec son email qui est unique
        const oldUser = await UserModal.findOne({ email });

        //si l'utilisateur existe deja retourner message erreur
        if (oldUser) return res.status(400).json({ message: "User already exists" });

        //  crypter le mot de passe
        const hashedPassword = await bcrypt.hash(password, 12);

        //  creation de l'utilisateur grace au model
        //  en les formatant selon nos besoins, ex password crypté, ou combinaison du nom et prenom
        const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        //  créer le token pour se connecter directement après l'inscription
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

        //  retourner le resultat
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
}