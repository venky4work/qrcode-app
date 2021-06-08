import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from "@material-ui/core/AppBar";
import { Box, IconButton, Toolbar } from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import UserMenu from "./UserMenu";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  icons: {
    marginRight: 10,
  },
}));

const Header = ({ open, setOpen }) => {
  const classes = useStyles();

  const toggleNav = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleNav}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex" flexGrow={1}></Box>
        <NotificationsActiveIcon className={classes.icons} />
        <UserMenu></UserMenu>
      </Toolbar>
    </AppBar>
  );
};

Header.defaultProps = {
  open: true,
  setOpen: () => {}
};
export default Header;
