import React from 'react'
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';

import useStyles from './styles';


export default function CarteItem({ content, titre, imageCarte }) {
    const classes = useStyles();
    return (
        <Card className={classes.root} item xs={12} sm={6} lg={3} >
            <Typography variant="h6" className={classes.cardTitle}>
                {titre}
            </Typography>
            <CardMedia
                className={classes.media}
                image={imageCarte}
                title={titre}
            />
            <CardContent>
                <Typography className={classes.CarteText} color="textSecondary">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
}
