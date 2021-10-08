import React from 'react'
import { Grid } from '@material-ui/core';

import useStyles from './styles';
import CarteItem from './CarteItem/CarteItem';

import img_info from '../../images/presentation/informatique.jpg';
import img_jardin from '../../images/presentation/jardinage.jpg';
import img_meca from '../../images/presentation/mecanique.jpg';
import img_paint from '../../images/presentation/painture.jpg';

export default function CarteSection() {
    const classes = useStyles();
    var content1 = "Bonjour, j'aurais besoin d'aide avec mon pc. Mon écran s'est brisé, si quelqu'un pourrait m'aider à la changer"
    var content2 = "Je recherche une personne pour peinturer ma maison, je voudrais y mettre 200$"
    var content3 = "Bonjour, Je cherche quelqu'un pour faire tondre ma pelouse"
    var content4 = "Besoin de faire l'entretient de mon véhicule accent 2016, changement d'huile et pneu pour l'hivers"
    return (
        <Grid className={classes.root} fullWidth>
            <CarteItem content={content1} titre="Informatique" imageCarte={img_info} />
            <CarteItem content={content2} titre="Peinture" imageCarte={img_paint} />
            <CarteItem content={content3} titre="Jardinage" imageCarte={img_jardin} />
            <CarteItem content={content4} titre="Mécanique" imageCarte={img_meca} />
        </Grid>
    )
}
