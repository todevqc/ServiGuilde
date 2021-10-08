import React from 'react';
import { Grid, Paper, ButtonBase, Typography, Button, Hidden } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { useDispatch } from 'react-redux';
//importation des methodes d'action
import { deleteDemande, likeDemande } from '../../../actions/demandes';

//modifier format l'affichage des dates
import 'moment/locale/fr-ca';

import useStyles from './styles';


import informatique from '../../../images/services_icons/informatique.png';
import plomberie from '../../../images/services_icons/plombier.png';
import jardinage from '../../../images/services_icons/jardinage.png';
import peinture from '../../../images/services_icons/painture.png';
import meuble from '../../../images/services_icons/meuble.png';
import mecanique from '../../../images/services_icons/mecanique.png';
import SGFavicon from '../../../images/SGFavicon.png';


export default function Demande({ demande, setCurrentId }) {

  const user = JSON.parse(localStorage.getItem('profile'));

  const classes = useStyles();

  //pour le delete d'un poste
  const dispatch = useDispatch();

  //  Logique des likes
  //  affichage intelligents du nombre likes
  //  si l'utilisateur ne like pas afficher juste le nombre de like(s)
  //  et si l'utilisateur like afficher petit texte pour le dire aussi 
  const Likes = () => {
    if (demande.likes.length > 0) {
      return demande.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{demande.likes.length > 2 ? `Vous et ${demande.likes.length - 1} autres` : `${demande.likes.length} like${demande.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{demande.likes.length} {demande.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const renderSwitch = (param) => {
    switch (param) {
      case 'informatique':
        return informatique;
      case 'plomberie':
        return plomberie;
      case 'jardinage':
        return jardinage;
      case 'peinture':
        return peinture;
      case 'meuble':
        return meuble;
      case 'mecanique':
        return mecanique;
      default:
        return SGFavicon;
    }
  }

  //Scroll la page vers le haut pour faire la modification en meme temps que onClick de modifier
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} >
        <Grid container>
          <Hidden smDown>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt={demande.categorie} src={renderSwitch(demande.categorie)} />
              </ButtonBase>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm container className={classes.textcontainer}>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  {demande.title}
                </Typography>
                <Typography variant="body2" gutterBottom paragraph>
                  {demande.message}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Createur: {demande.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Localisation: {demande.localisation}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  categorie:  # {demande.categorie}
                </Typography>
              </Grid>
              <Grid item className={classes.buttonsGroupe}>
                {/* Application de la logique des likes 
                    disabled reçois true ou false selon si l'utilisateur est connecté ou non
                    en utilisant le component declarer plus haut
                */}
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeDemande(demande._id))}>
                  <Likes />
                </Button>
                {/* Afficher ou non le bouton si c'est l'utilisateur connécté qui l'a ecrit
                */}
                {(user?.result?.googleId === demande?.creator || user?.result?._id === demande?.creator) && (
                  <>{/*le onClick fait 2 action en meme temps */}
                    <Button size="small" color="default" onClick={() => { setCurrentId(demande._id); scrollToTop(); }}>
                      <DeleteIcon fontSize="small" /> Modifier
                    </Button>
                    <Button size="small" color="secondary" onClick={() => dispatch(deleteDemande(demande._id))}>
                      <DeleteIcon fontSize="small" /> Supprimer
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                {moment(demande.createdAt).fromNow()}
              </Typography>
              <Typography variant="h6" gutterBottom>Prix offert : {demande.prix ? `${demande.prix}$` : "N/A"}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div >
  )
}
