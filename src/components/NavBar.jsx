import React from 'react';
import { AppBar, Toolbar, makeStyles, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import logo from '../img/LogoAlma.png';
import { Link } from 'wouter';
import useLogin from '../hooks/useLogin';
import DrawerC from './DrawerC'
import { updateOpen } from '../actions/openDrawerAction'
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({

    offset: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(1),
    },
    tittle: {
        flexGrow: 1,
        margin: 'auto'
    },
    btnLogin: {
        fontSize: 20
    },
    fondoappbar: {
        background: "#fd9eef",
    },
    imagen: {
        height: theme.spacing(6),
        margin: 'auto'
    },
}));

function NavBar({ updateOpen }) {
    const classes = useStyles();

    const { isLogged, logout } = useLogin()
    const handleLogout = e => {
        updateOpen(false)
        logout()
    }

    return (
        <div>
            <AppBar className={classes.fondoappbar} position="fixed" color="primary">
                <Toolbar>
                    {
                        isLogged
                            ?
                            <>
                                <IconButton className={classes.menuButton} aria-label="menu" color="inherit" onClick={() => { updateOpen(true) }}>
                                    <MenuIcon  >
                                    </MenuIcon>
                                </IconButton>
                                <div className={classes.tittle}>
                                    <Link to='/' className="link">
                                        <IconButton >
                                            <img src={logo} className={classes.imagen} alt="Logo"></img>
                                        </IconButton>
                                    </Link>
                                </div>
                                <Link to='/' onClick={handleLogout} className="link">
                                    <IconButton color="inherit" className={classes.btnLogin}>
                                        <ExitToAppIcon>
                                        </ExitToAppIcon>
                                    Cerrar Sesion
                                </IconButton>
                                </Link>
                            </>
                            :
                            <>
                                <Link to='/needHelp' className="link">
                                    <IconButton color="inherit" className={classes.btnLogin}>
                                        <HelpIcon>
                                        </HelpIcon>
                                        SOS
                                    </IconButton>
                                </Link>
                                <div className={classes.tittle}>
                                    <Link to='/' className="link">
                                        <IconButton >
                                            <img src={logo} className={classes.imagen} alt="Logo"></img>
                                        </IconButton>
                                    </Link>
                                </div>
                                <Link to='/login' className="link">
                                    <IconButton color="inherit" className={classes.btnLogin}>
                                        <ExitToAppIcon>
                                        </ExitToAppIcon>
                                        Login
                                </IconButton>
                                </Link>
                            </>
                    }
                </Toolbar>
            </AppBar>
            <DrawerC />
            <div className={classes.offset}></div>
        </div>
    );
}

export default connect(null, { updateOpen })(NavBar)
