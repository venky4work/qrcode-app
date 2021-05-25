import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import logo from './assets/logo.png';
import { Typography } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    menuButton: {
        padding: 0,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    image: {
        height: 40,
        paddingRight: 20,
    },
    icons: {
        marginLeft: -5,
    }
}));

const SideNav = ({ open, setOpen }) => {
    const classes = useStyles();

    const toggleNav = () => {
        setOpen(!open);
    };
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <Toolbar>
                <img src={logo} alt='test' className={classes.image} />
                <Typography variant='h6' color='primary'>
                  QR Generator
                </Typography>
            </Toolbar>
            <Divider />
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleNav}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        // [classes.hide]: open,
                    })}
                >
                    {open ? <> <ChevronLeftIcon className={classes.icons} color="primary"/> <MenuIcon color="primary"/> </> : <> <ChevronRightIcon className={classes.icons} color="primary"/> <MenuIcon color="primary"/> </>}
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                {['Home','Graphs'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <HomeRoundedIcon color="primary"/> : <BarChartRoundedIcon color="primary"/>}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

SideNav.defaultProps = {
    open: true,
    setOpen: () => { },
}
export default SideNav;
