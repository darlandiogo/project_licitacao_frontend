import React, { Fragment, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import clsx from "clsx";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";

import snackBarStyles from "./styles";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const MySnackbarContentWrapper = React.memo(props => {
  const classes = snackBarStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
});

const SnackbarItem = React.memo(({ item, afterClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    afterClose();
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <MySnackbarContentWrapper
        onClose={handleClose}
        variant={item.variant}
        message={item.message}
      />
    </Snackbar>
  );
});


export default React.memo(() => {
    const dispatch = useDispatch();
  
    const handleClose = ()=> {} //useCallback(_id => dispatch(closeSnackbar(_id)), [dispatch]);
  
    const snackbar =  {};
  
    return (
      <Fragment>
        {Object.keys(snackbar).map(key => (
          <SnackbarItem
            item={snackbar[key]}
            afterClose={() => handleClose(key)}
            key={key}
          />
        ))}
      </Fragment>
    );
  });