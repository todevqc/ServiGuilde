import React from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';

import useStyles from './styles';
import CarteSection from '../CarteSection/CarteSection';

export default function Home() {
  const classes = useStyles();
  return (
    <Container>
      <Grid className={classes.HomeContainer}>
        <Box className={classes.boxTitle} textAlign="center" fontWeight="fontWeightMedium">
          <Typography variant="h1">Servi Guilde</Typography>
          <Typography variant="h4">La solidarité avant tout !</Typography>
          <Typography variant="h6">La référence pour toutes les prestations de services entre membres de votre communauté.</Typography>
        </Box>
        <Box className={classes.boxCantent} textAlign="center" fontWeight="fontWeightMedium">
          <Typography variant="subtitle1">
            ServiGuilde vous servira à vous mettre en liaison avec la communauté afin d’avoir accès à
            des services à moindre coût tout en permettant aux prestataires de faire des revenus supplémentaires.
          </Typography>
          <Typography variant="subtitle1">
            Que ce soit de l’ordre du jardinage, mécanique générale, plomberie, informatique,
            meuble, réparation électronique, et plus encore…
          </Typography>
        </Box>
      </Grid>

      <CarteSection />

    </Container >
  )
}
