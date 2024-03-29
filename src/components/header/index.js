import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

//import styles from './styles';
const useStyles = makeStyles({
    root: {
            position: "relative",
            marginTop: 55,
            marginBottom: 20,
            width:"100%",
            display: 'inline-flex',
            padding:8, 
            borderRadius: '5px',
            backgroundColor: "lightgray",  
    },
  });
const CustomContainer = ({ breadcrumbsConfig }) => {
    
    const classes = useStyles();

    const generateBreadcrumbs = () => {   
        return (
            <Breadcrumbs aria-label="breadcrumb">
                {breadcrumbsConfig?.map( (elem, index) => (
                    <Link key={index} component={RouterLink} to={elem.path}>
                        <Typography key={index} variant="subtitle1">
                            {elem.label}
                        </Typography>
                    </Link>
                ))}
            </Breadcrumbs>
        );
    }
    return (
        <Container maxWidth="xl" className={classes.root}>
            <Box style={{flex:1, textAlign: 'start', marginLeft: 5, marginTop: 5}}>
                {generateBreadcrumbs}
            </Box>
        </Container>
    );
}

export default CustomContainer;