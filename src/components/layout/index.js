import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import clsx from 'clsx';
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Link from '@material-ui/core/Link';

import { logoutUser } from '../../store/ducks/login';
import config from "../../config";

import styles from './styles';
const useStyles = makeStyles(styles);


const Layout = ({ logoutUser, children }) => {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawer = (value) => {
        setOpen(value);
    };

    const _logoutUser = () => {
        logoutUser();
        window.location.replace(config("route_basename"));
    }
    
    return (
        <div className={classes.root}>
            <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                    })}
                >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => handleDrawer(true)}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                       Projeto Licitação
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                <IconButton onClick={() => handleDrawer(false)}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </div>
                <Divider />
                    <List>
                        {[
                            {label: 'Dashboard', path: '/dashboard' },
                            {label: 'Pessoa',  path: '/pessoa'}
                        ].map((elem, index) => (
                            <Link key={index} to={elem.path} component={RouterLink}>
                                <ListItem button key={index}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={elem.label} /> 
                                </ListItem>
                            </Link>
                            
                        ))}
                        <Link component={RouterLink} to="/" onClick={_logoutUser}>
                            <ListItem button key="index-logout">
                                <ListItemIcon> <MailIcon /> </ListItemIcon>
                                <ListItemText primary="Logout" /> 
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            <main className={clsx(classes.content, {[classes.contentShift]: open,})}>
                {children}
            </main>
        </div>
    );

};  


  
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ logoutUser }, dispatch);
  
export default connect(null,mapDispatchToProps)(Layout);
  