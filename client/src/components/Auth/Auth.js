import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isMember, setIsMember] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  //  valeur a tester pour switcher entre un input de type Text et un input de type Password
  const [showPassword, setShowPassword] = useState(false);
  //  sert amontrer le mot de passe en claire ou a le cacher
  //  en changant la valeur de showPassword de True-> False et inversement
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsMember((prevIsMember) => !prevIsMember);
    setShowPassword(false);
  };

  //  fonction appelé au click sur le boutton
  const handleSubmit = (e) => {
    //  pour empecher le refresh automatique
    e.preventDefault();

    //  avec le meme bouton de submit, faire une connexion ou une inscription selon la valeur de isMember
    //  signup = s'inscrire    ///   signin = connexion
    if (isMember) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/services');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  //  faire le setForm qui corresponds a chaque fois que la valeur de l'un des champs est changer
  //  pour identifier quel champs a changer on utilise e.target.name, car chaque champs a un name different
  //  s'assurer que les noms des champs sont identique aux initialState déclaré plus haut
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  //  affichage des formulaire de connexion et d'inscription
  //  des affichage conditionnel avec la valeur de isMember, qui affiche ou non certains champs
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isMember ? "S'inscrire" : "Se Connecter"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isMember && (
              <>
                <Input name="firstName" label="Nom" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Prénom" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email" handleChange={handleChange} type="email" />
            {/* test la valeur de showPassword pour afficher ou non le mot de passe en claire */}
            <Input name="password" label="Mot de passe" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isMember ? "S'inscrire" : "Se Connecter"}
          </Button>

          <GoogleLogin
            clientId="702824142022-honc0m4kvcimppkii2330atatn6isdru.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                Google Connection
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              {/* Boutton pour switcher entre la connexion et l'inscription si on a pas encore de compte */}
              <Button onClick={switchMode}>
                {isMember ? "Vous procédez déjà un compte? Se connecter" : "Pas encore de compte? S'inscrire"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
