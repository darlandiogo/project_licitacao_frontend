import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { deleteItemAll } from "../../../../store/ducks/item";
import { setDialogDeleteAll } from "../../../../store/ducks/dialog";

const  DeleteAllDialog = ({ type, type_id, dialog, deleteItemAll, setDialogDeleteAll }) => {

  const handleDialog = (value) => {
    setDialogDeleteAll(value);
  };

  const handleConfirmDialog = (value) => {
    deleteItemAll({type_id, type });
    setDialogDeleteAll(value);
  }

  return (
      <Dialog
        open={dialog}
        onClose={() =>handleDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"> Deseja Deletar todos os items? </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleConfirmDialog(false)} color="primary" autoFocus>
            Confimar
          </Button>
        </DialogActions>
      </Dialog>
  );
}


const mapStateToProps = ( state ) => {
    return {
        dialog: state.dialog.deleteAll,
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ 
    deleteItemAll, setDialogDeleteAll
 }, 
dispatch);

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(DeleteAllDialog);