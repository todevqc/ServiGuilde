import { makeStyles } from "@material-ui/core/styles";

//declaration et exportation des styles
export default makeStyles((theme) => ({
    heading: {
        color: '#2f5469',
    },
    image: {
        marginLeft: '15px',
    },
    //ici prise en charge du design en cas de petit ecrant, donc c'est le MediaQuery
    [theme.breakpoints.down('md')]: {
        mainContainer: {
            flexDirection: 'column-reverse',
        }
    },
}));
