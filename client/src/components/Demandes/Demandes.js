import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Button } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Demande from './Demande/Demande';

import useStyles from './styles';

export default function Demandes({ setCurrentId }) {
  //recuperer ou fetch les demandes
  const demandes = useSelector((state) => state.demandes);
  const classes = useStyles();

  //  affichage selon preference du plus récent ou du plus ancien
  const [newToOld, setNewToOld] = useState(true);

  return (
    //test si aucun post dans la BD, alors afficher le cercle d'attente
    !demandes.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={2}>

        <Button className={classes.sortButton} onClick={() => setNewToOld(true)}>
          <ExpandMoreIcon /> récent
        </Button>
        <Button className={classes.sortButton} onClick={() => setNewToOld(false)}>
          <ExpandMoreIcon /> ancien
        </Button>
        {
          /* 
              mapper les demandes contenu dans le tableux un par un  
              ne pas oublier le key lors de l'utilisation du map
          */
        }
        {
          //  le sort sert a ordonner les post de façon a afficher du plus resent au plus ancient
          newToOld ?
            demandes.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
              .map((demande) => (
                <Grid key={demande._id} item xs={12}>
                  <Demande demande={demande} setCurrentId={setCurrentId} />
                </Grid>
              ))
            :
            demandes.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
              .map((demande) => (
                <Grid key={demande._id} item xs={12}>
                  <Demande demande={demande} setCurrentId={setCurrentId} />
                </Grid>
              ))

        }
      </Grid >
    )
  );
}
