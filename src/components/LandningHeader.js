import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Box, Toolbar, Typography } from '@material-ui/core';
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        borderBottom: '1px dotted white'
    },
    // appBarShift: {
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     marginLeft: drawerWidth,
    //     transition: theme.transitions.create(['width', 'margin'], {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    //     borderBottom: '1px dotted white'
    // },
    icons: {
        marginRight: 10,
    },
    typography: {
        // color: 'white',
        padding: 10,
        cursor: 'pointer',
      }
}));

const LandingHeader = () => {
    const classes = useStyles();
    const history = useHistory();

    const handleSignin = () => {
        history.push("/signin");
      };
      const handleSignUp = () => {
        history.push("/signup");
      };
    return (
        <AppBar
            position="absolute"
            elevation={0}
            className={clsx(classes.appBar, {
//                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <Box  display='flex' flexGrow={1}></Box>
                {/* <NotificationsActiveIcon className={classes.icons}/> */}
                <Typography className={classes.typography} onClick={handleSignin}>Sign in</Typography>
                <Typography className={classes.typography} onClick={handleSignUp}>Sign up</Typography>
            </Toolbar>
        </AppBar>
    );
}
export default LandingHeader;
