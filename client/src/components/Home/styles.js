import { makeStyles } from "@material-ui/core/styles";
import colorful from '../../images/colorful.jpg';


//declaration et exportation des styles
export default makeStyles(() => ({
    HomeContainer: {
        backgroundColor: '#101524',
        backgroundImage: `url(${colorful})`,
        backgroundRepeat: "no-repeat",
        minHeight: '80vh',
        borderRadius: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    boxTitle: {
        padding: '0 20%',
    },
    boxCantent: {
        marginTop: '3em',
        padding: '0 15%',
        marginBottom: '3em',
    },
}));
