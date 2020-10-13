import React from "react";
import Container from '@material-ui/core/Container';
import { withStyles, } from '@material-ui/core';

import styles from "./styles";

const CustomContainer = ({ classes, children }) => {

    return (
        <Container maxWidth="xl" className={classes.root}>
             {children}
          </Container>
    );
}

export default withStyles(styles)(CustomContainer);