import DemandeService from "../models/DemandeService.js";
import mongoose from 'mongoose';


/*
*   se charge de la logique d'affiche des demandes... tous les demandes
*/
//vu que c'est une fonction asyncrone ajouter async
export const getDemandes = async (req, res) => {
    try {
        //chercher tous les messages corespondant au model voulu
        //vu que cela va prendre du temps c'est une fonction asyncrone (en paralèle)
        //d'ou l'utilisation de await
        const DemandeServices = await DemandeService.find();
        res.status(200).json(DemandeServices);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/*
*   se charge de la logique de creation des demandes
*   le create demande est uniquement accessible si l'utilisateur est authentifié
*/
export const createDemande = async (req, res) => {
    //contenu de la demande a créer   (NORMALEMENT)
    const demande = req.body;

    //Creation d'une nouvelle demande en utilisant les informations obtenue precedament 
    const newDemandeService = new DemandeService({ ...demande, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newDemandeService.save();

        //envoie nouvelle demande dans la repense avec le code 201
        //en savoir plus sur les code http  -------->   https://www.restapitutorial.com/httpstatuscodes.html
        res.status(201).json(newDemandeService);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



/*
*   se charge de la logique de modification d'une demande
*/
export const updateDemande = async (req, res) => {
    //recupere l'id demande
    const { id: _id } = req.params;

    //recuperer le contenu demande a modifier
    const demande = req.body;

    //pour verifier s'il y a une demande avec l'id entrer dans l'url (/demande/123)
    //ou si cet id correspond a un objet mongoose
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Aucun poste avec cet id');

    //recuperer les infos depuis la BD
    const updatedDemandeService = await DemandeService.findByIdAndUpdate(_id, { ...demande, _id }, { new: true });

    //renvoyer les infos de la demande en format json
    res.json(updatedDemandeService);
}

/*
*   se charge de la logique de suppression
*/
export const deleteDemande = async (req, res) => {
    //recupere l'id
    const { id: _id } = req.params;

    //pour verifier s'il y a une demande avec l'id entrer dans l'url (/demande/123)
    //ou si cet id correspond a un objet mongoose
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Aucun poste avec cet id');

    //recuperer lea demande depuis la BD, et supprimer
    const deletedPost = await DemandeService.findByIdAndRemove(_id);

    //renvoyer les infos en format json
    res.json({ message: 'Poste supprimé avec succés' });
}

/*
*   se charge de la logique de like
*/
export const likeDemande = async (req, res) => {
    //recupere l'id
    const { id: _id } = req.params;

    //  vu que pour arriver a cette action nous sommes obliger de transiter via AUTH du Middleware
    //  il y a donc une variable (req.userId) a notre disposition qui contient les infos du token de l'utilisateur connécté
    //  si l'utilisateur n'est pas connecté l'action lui est refusé
    if (!req.userId) return res.json({ message: 'Utilisateur non authentifié' });

    //pour verifier s'il y a une demande avec l'id entrer dans l'url (/demande/123)
    //ou si cet id correspond a un objet mongoose
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Aucun poste avec cet id');

    //en premier lieu recuperer la demande
    const demande = await DemandeService.findById(_id);

    //  verifier si l'id de l'utilisateur est deja present, l'utilisateur à déjà liker
    const index = demande.likes.findIndex((_id) => _id === String(req.userId));

    //  si l'utilisateur n'a pas liker
    if (index === -1) {
        //  il like
        demande.likes.push(req.userId);
    } else {
        //  il dislike
        demande.likes = demande.likes.filter((id) => id !== String(req.userId));
    }

    //  modifier la demande recupéré en lui ajoutant +1 a sa valeur initial
    //  changement apporter avec le like/dislike
    const updatedDemandeService = await DemandeService.findByIdAndUpdate(_id, demande, { new: true });

    //renvoyer les infos de la demande en format json
    res.json(updatedDemandeService);
}