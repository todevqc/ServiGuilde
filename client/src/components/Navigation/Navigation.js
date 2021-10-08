import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import sgLogoNoir from '../../images/ServiGuildLogo.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

function Navigation() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/auth');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        //  verifier si le token existe et qu'il a expirer et deconnecter l'utilisateur automatiquement
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" exact className={classes.brandContainer}>
                <img src={sgLogoNoir} alt="icon" height="45px" />
            </Link>
            <NavLink to="/" exact className={classes.navlink}>
                Accueil
            </NavLink>
            <NavLink to="/services" exact className={classes.brandContainer}>
                Services
            </NavLink>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button style={{ fontWeight: 'bold' }} variant="contained" className={classes.logout} color="secondary" onClick={logout}>LogOut</Button>
                    </div>
                ) : (
                    <Button className={classes.buttonConnecter} component={Link} to="/auth" variant="contained" >
                        Se Connecter
                    </Button>
                )}
            </Toolbar>
        </AppBar >
    );
};

export default Navigation
