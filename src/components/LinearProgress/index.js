import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { LinearProgress, Typography, Box} from '@mui/material';

function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
};

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
    root: {
      width: '250px',
    },
});

export default function LinearWithValueLabel({prg}) {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(prg);
  
    React.useEffect(() => {
      setProgress(prg);
    }, [prg]);
  
    return (
      <div className={classes.root}>
        <LinearProgressWithLabel value={progress} />
      </div>
    );
}