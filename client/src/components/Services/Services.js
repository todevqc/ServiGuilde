import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

//va recuperer des action avec le dispatch
import { getDemandes } from '../../actions/demandes';

import Demandes from '../Demandes/Demandes';
import Form from '../Form/Form';

//utilisation du style css ecrit dans un fichier js
import useStyles from './styles';

function ServList() {

  //creation de la variable qui va recuperer l'id du poste selectionné
  const [currentId, setCurrentId] = useState(null);

  //utilisation des style ecrit dans le fichier js
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDemandes());
  }, [dispatch]);

  return (
    <Container>
      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={2}>
            <Grid item lg={8}>
              {/* ajouter le setCurrentId pour modifier le state avec l'id selectionné  */}
              <Demandes setCurrentId={setCurrentId} />
            </Grid>
            <Grid item md={12} lg={4} style={{ marginTop: 68 }}>
              {/* 
                  Ajouter le setCurrentId pour modifier le state avec l'id selectionné,
                  et le currentId pour savoir quel demande somme nous entrain de modifier  
              */}
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default ServList;

