import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '30px 0',
        borderRadius: '10px',
    },
    name: {
        fontSize: 15,
        fontWeight: 500,
    },
    media: {
        // height: 350,
        width: '100%',
        objectFit: 'contain',
        // boxShadow: 'inset 0px 10px 8px -10px #c6c6c6, inset 0px -10px 8px -10px #c6c6c6',
        // backgroundSize: 'contain',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: 'all .3s',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
        width: '55px',
        height: '55px',
    },
    postTopRight: {
        position: 'relative'
    },
    postTopRight_morevert: {
        position: 'absolute',
        width: '200px',
        right: '15px',
        top: '47px',
        backgroundColor: '#fff',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.4)',
        borderRadius: '5px',
        border: '1px solid rgba(0,0,0,0.1)',
        zIndex: 2,
        '&:before': {
            content: '""',
            position: 'absolute',
            top: '-5px',
            right: '2px',
            width: '10px',
            height: '10px',
            backgroundColor: '#fff',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            borderLeft: '1px solid rgba(0,0,0,0.1)',
            transform: 'rotate(45deg)',
        }
    },
    actionText: {
        color: '#000',
    },
    favorite: {
        animation: `$scale 500ms ease-in-out`
    },
    "@keyframes scale": {
        "0%": {
            transform: "scale(1)"
        },
        "80%": {
            transform: "scale(1.5)"
        },
        "100%": {
            transform: "scale(1)"
        }
    },
    cmtButton: {
        margin: '0 10px 0 20px'
    },
    
}));

export default useStyles;