import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';


import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import useStyles from './styles';
import { createDemande, updateDemande } from '../../actions/demandes';

//les props sont ajouter pour recuperer l'id de la demande selectionné si c'est pour la modif
export default function Form({ currentId, setCurrentId }) {
  const [demandeData, setDemandeData] = useState({ title: '', message: '', localisation: '', prix: '', categorie: '', selectedFile: '', });

  //recuperer la demande s'il est selectionné
  const demande = useSelector((state) => currentId ? state.demandes.find((p) => p._id === currentId) : null);

  const classes = useStyles();

  const dispatch = useDispatch();


  //  recuperer depuis le navigateur qui est l'utilisateur connecté
  const user = JSON.parse(localStorage.getItem('profile'));

  //utiliser le useEffect et mettre a jour a chaque fois qu'il y a une demande modifié
  useEffect(() => {
    if (demande) setDemandeData(demande)
  }, [demande]);

  //la fonction va demander la cretion d'un objet en BDD , grace aux données de l'objet local  (demandeData)
  //ensuite appeler la methode clear(), pour vider les champs de saisie
  const handleSubmit = (e) => {
    //  eviter la mise a jour automatique, pour eviter la perte de données
    e.preventDefault();
    if (currentId) {
      dispatch(updateDemande(currentId, { ...demandeData, name: user?.result?.name }));
    } else {
      //  identifier le createur due la demande grance a la connexion 
      dispatch(createDemande({ ...demandeData, name: user?.result?.name }));
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null);
    setDemandeData({
      title: '',
      message: '',
      categorie: '',
      localisation: '',
      prix: '',
      selectedFile: '',
    });
  }

  //  tester si l'utilisateur n'est pas connecter alors lui refuser la creation d'une demande
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Il faut etre connecter pour ajouter ou liker une demande de service !
        </Typography>
      </Paper>
    )
  }

  const handleChange = (event) => {
    setDemandeData({ ...demandeData, categorie: event.target.value })
  };


  return (
    <Paper className={classes.paper}>
      {
        /*
            creation du formulaire
            pour utiliser de plusieur classe css venant de js dans un composant il faut suivre la syntaxe qui suit
            className={`${classes.root} ${classes.form}`}
        */
      }
      {
        /*
          la fonction onSubmit va activer au clic sur un bouton submit la fonction qui va lancer l'enregistrement en BDD
          elle va créer un objer demande grace à -> setDemandeData({ ...demandeData, title: e.target.value })}
          qui va changer une valeur precise dans le demandeData, crée plus haut
        */
      }
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <TextField name="title" variant="outlined" label="Titre" fullWidth value={demandeData.title} onChange={(e) => setDemandeData({ ...demandeData, title: e.target.value })} />
        <TextField multiline minRows={4} maxRows={4} name="message" variant="outlined" label="Message" fullWidth value={demandeData.message} onChange={(e) => setDemandeData({ ...demandeData, message: e.target.value })} />
        <TextField name="localisation" variant="outlined" label="Localisation" fullWidth value={demandeData.localisation} onChange={(e) => setDemandeData({ ...demandeData, localisation: e.target.value })} />
        <TextField name="prix" variant="outlined" label="Prix" fullWidth value={demandeData.prix} onChange={(e) => setDemandeData({ ...demandeData, prix: e.target.value })} />

        <FormControl variant="outlined" fullWidth className={classes.formControl}>
          <InputLabel htmlFor="categorie-selector">Catégorie</InputLabel>
          <Select
            native
            value={demandeData.categorie}
            onChange={handleChange}
            label="Catégorie"
            inputProps={{
              name: 'categorie',
              id: 'categorie-selector',
            }}
          >
            <option aria-label="None" value="" />
            <option value="informatique">Informatique</option>
            <option value="plomberie">Plomberie</option>
            <option value="jardinage">Jardinage</option>
            <option value="meuble">Meuble</option>
            <option value="peinture">Peinture</option>
            <option value="mecanique">Mécanique</option>
          </Select>
        </FormControl>

        {/*creation d'un bouton*/}
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Enregistrer</Button>
        <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Annuler</Button>
      </form>
    </Paper>
  )
}