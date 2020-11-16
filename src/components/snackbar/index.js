import React, { useCallback, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from "../../store/ducks/snackbar";

import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from '@material-ui/lab/Alert';

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';

export default React.memo(() => {
    const dispatch = useDispatch();
  
    const handleClose = useCallback( value => dispatch(closeSnackbar(!value)), [dispatch]);
  
    const snackbar = useSelector(state => state.snackbar.show);
    const type     = useSelector(state => state.snackbar.type);
    const message  = useSelector(state => state.snackbar.message);

    const Alert = (props) => {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const useStyles = makeStyles((theme) => ({
      root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    }));
  
    return (
      <Fragment>
       <Snackbar 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={snackbar}
          autoHideDuration={3000}
          onClose={() => handleClose(snackbar)}
          
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={() => handleClose(snackbar)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert onClose={() => handleClose(snackbar)} severity={type}>
            {message}
          </Alert>
        </Snackbar>
      </Fragment>
    );
  });