import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    actionDiv: {
        textAlign: 'center',
    },
    sortButton: {
        margin: '5px',
        padding: '8px 12px',
        border: '1px solid #ffffff',
        borderRadius: '8px',
        backgroundColor: 'none',
        color: '#ffffff',
        textTransform: 'none'
    }
}));