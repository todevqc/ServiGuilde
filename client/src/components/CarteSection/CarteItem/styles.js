import { makeStyles } from "@material-ui/core/styles";

//declaration et exportation des styles
export default makeStyles(() => ({
    root: {
        margin: '0.6em',
        borderRadius: 8,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    CarteText: {
        fontSize: '0.9em',
        maxWidth: 345,//pour que toutes les carte soient du meme size
    },
    cardTitle: {
        padding: '0.8em 0.6em',
        textAlign: 'center',
    },

}));
