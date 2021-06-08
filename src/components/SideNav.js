import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Hidden } from "@material-ui/core";
import NavMenuList from "./NavMenuList";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    padding: 0,
  },
  hide: {
    display: "none",
  },
  //   drawer: {
  //     width: drawerWidth,
  //     flexShrink: 0,
  //     whiteSpace: "nowrap",
  //   },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    border: 'none'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: theme.mixins.toolbar,
  image: {
    height: 40,
    paddingRight: 20,
  },
  icons: {
    marginLeft: -5,
  },
}));

const SideNav = ({ open, setOpen }) => {
  const classes = useStyles();
  const theme = useTheme();

  const toggleNav = () => {
    setOpen(!open);
  };
  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          // container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
            // open={mobileOpen}
          open={open}
          onClose={toggleNav}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.toolbar} />
          {/* <Divider /> */}
          <NavMenuList/>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <div className={classes.toolbar} />
          <NavMenuList/>
        </Drawer>
      </Hidden>
    </nav>
  );
};

SideNav.defaultProps = {
  open: true,
  setOpen: () => {},
};
export default SideNav;
