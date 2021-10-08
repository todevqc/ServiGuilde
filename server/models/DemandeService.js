import mongoose from 'mongoose';

//representation ou declaration du shema que doit avoir chaque demande
const DemandeServiceSchema = mongoose.Schema({
    title: String,
    message: String,
    //  ici le name va etre utiliser pour les autorisations de modifications etc
    name: String,
    creator: String,
    categorie: String,
    prix: String,
    localisation: String,
    selectedFile: String,
    //avec une valeur par defaut
    //  like/dislike
    likes: {
        type: [String],
        default: []
    },
    //objet qui sauvegarde la date de creation de la demande
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const DemandeService = mongoose.model('DemandeService', DemandeServiceSchema);

export default DemandeService;