import React from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';

import {resetError} from '../../store/ducks/error';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '40%',
    },
    error: {
        marginTop: theme.spacing(2),
    }
  }));
  


const Error = ({resetError, errors }) => {

    const [open, setOpen] = React.useState(true);
    const classes = useStyles();
  
    const handleClose = () => {
        resetError();
        setOpen(false);
    };

    setTimeout(handleClose,4000);

    if(!errors.length){
        return null;
    }

    return (
        <div className={classes.root}>
            { errors.map( (elem, index) => (
                <Alert className={classes.error}
                    key={index} 
                    open={open} 
                    severity="error"
                >
                    {elem.message}
                </Alert>
                )
            )}
        </div>
    );
}

const mapStateToProps = ( state ) => {
    return {
      errors: state.error.data || [],
      loaded: state.error.loaded
    };
};
  
const mapDispatchToProps = (dispatch) =>
bindActionCreators({ resetError }, dispatch); 

export default connect(
mapStateToProps,
mapDispatchToProps
)(Error);