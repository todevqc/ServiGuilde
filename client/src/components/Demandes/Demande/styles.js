import { makeStyles } from "@material-ui/core/styles";

//declaration et exportation des styles
export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: 'black',
    },
    paper: {
        padding: theme.spacing(2),
        margin: '0.5em auto',
        color: 'black',
    },
    textcontainer: {
        padding: '0 1em',
    },
    categorie: {
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '1em',
        marginBottom: '-0.2em',
        color: '#0cbaba ',
    },
    image: {
        width: 80,
        height: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: "50%",
    },
    buttonsGroupe: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
}));
