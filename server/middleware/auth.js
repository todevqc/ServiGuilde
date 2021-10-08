import jwt from "jsonwebtoken";

//  utilisation du middleware
//  si l'utilisateur veux modifier un affichage
//  click sur le bouton => auth middleware(NEXT) 
//  va tester s'il est authoriser a faire cette action ensuite avec NEXT l'envoie au point suivant de la procedure
//  => update controller
const secret = 'serviguilde';

const auth = async (req, res, next) => {
  try {
    //  verifier si l'utilisateur est identifié (si le token est valide)
    const token = req.headers.authorization.split(" ")[1];
    //  verifier si le token de l'utilisateur est celui perso de notre appli, et non celui de google 
    const isCustomAuth = token.length < 500;

    let decodedData;

    //  action a faire si l'utilisateur est identifié via notre service
    //  le code secret est le meme que celui créer lors de l'authentification dans le controller
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      //  ici id va identifie de façon unique chaque utilisateur de notre systeme
      req.userId = decodedData.id;
    } else {
      //  actions a faire si l'utilisateur c'est identifié via un comptegoogle
      decodedData = jwt.decode(token);

      //  ici sub est un mot clé google qui identifie de façon unique chaque utilisateur google
      req.userId = decodedData.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
