import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    mainContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    actionDiv: {
        textAlign: 'center'
    },
    cardError: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '15px',
        height: '50%',
        width: '350px',
        color: 'red',
        margin: 'auto'

    },
}))