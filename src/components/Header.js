import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Box, Toolbar } from '@material-ui/core';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import UserMenu from './UserMenu';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        borderBottom: '1px dotted white'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        borderBottom: '1px dotted white'
    },
    icons: {
        marginRight: 10,
    }
}));

const Header = ({ open }) => {
    const classes = useStyles();
    return (
        <AppBar
            position="absolute"
            elevation={0}
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <Box  display='flex' flexGrow={1}></Box>
                <NotificationsActiveIcon className={classes.icons}/>
                <UserMenu></UserMenu>
            </Toolbar>
        </AppBar>
    );
}

Header.defaultProps = {
    open: true,
}
export default Header;
