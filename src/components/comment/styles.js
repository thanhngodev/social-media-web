import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    headCmtWrap: {
        display: 'flex',
        marginTop: '20px',
    },
    cmtRight: {
        width: '100%',
        marginLeft: '5px',
    },
    cmtMain: {
        padding: '5px',
        backgroundColor: '#f0f2f5',
        borderRadius: '10px'
    },
    cmtAction: {
        display: 'flex',
        gap: '10px',
    },
    group: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '13px',
        color: '#65676b',
        cursor: 'pointer',
        userSelect: 'none',
    },
    cmtTime: {
        marginLeft: '10px !important',
        fontSize: '13px !important'
    },
    cmtAvt: {
        width: '32px !important',
        height: '32px !important'
    },
    cmtContent: {
        whiteSpace: 'pre-wrap',
        color: 'rgba(0,0,0,0.7)',
        fontSize: '15px',
        marginTop: '5px'
    },
    replyBox: {
        position: 'relative',
    },
    replyInput: {
        marginTop: '5px',
    },
    viewReplyText: {
        marginLeft: '35px',
        fontSize: '14px',
        color: 'rgba(0,0,0,0.7)',
        marginTop: '5px',
        cursor: 'pointer',
        "&:hover": {
            color: '#3f51b5',
        }
    },
    dropUp: {
        position: 'absolute',
        right: '10px',
        bottom: '-5px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        "&:hover": {
            color: '#3f51b5',
        }
    }
}));

export default useStyles;