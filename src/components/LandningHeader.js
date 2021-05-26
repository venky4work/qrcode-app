import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  fade,
  Grid,
  Avatar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import dashboard from "./assets/dashboard1.jpg";
import qr from "./assets/qr.jpg";
import Footer from "./Footer";

const headersData = [
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Register",
    href: "/signup",
  },
  {
    label: "Login",
    href: "/signin",
  },
];

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: fade(theme.palette.primary.main),
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  bodyClass: {
    // backgroundColor: fade(theme.palette.primary.light, 0.95),
    paddingRight: "79px",
    paddingLeft: "118px",
    marginTop: "100px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
    width: "100%",
  },
  css1: {
    paddingRight: "79px",
    paddingLeft: "100px",
    marginTop: "10px",
    "@media (max-width: 150px)": {
      paddingLeft: 0,
    },
    marginBottom: "10px",
    width: "100%",
  },
  cssBox1: {
    boxSizing: "border-box",
    marginTop: "10px",
    "@media (max-width: 150px)": {
      paddingLeft: 0,
    },
    marginBottom: "10px",
    width: "100%",
    height: "100%",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
    padding: 32,
    borderRadius: 10,
  },
  cssFont1: {
    fontSize: "3.75rem",
    fontWeight: 550,
    "@media (max-width: 150px)": {
      paddingLeft: 0,
      fontWeight: 0.35,
    },
    marginBottom: "10px",
    width: "100%",
    color: fade("#3f51b5", 0.95),
  },
  cssFontHeading: {
    fontSize: "2.5rem",
    fontWeight: 600,
    "@media (max-width: 150px)": {
      paddingLeft: 0,
      fontWeight: 0.35,
    },
    margin: "10px",
    textAlign: "center",
    width: "100%",
    lineHeight: "2rem",
    // letterSpacing: "0.1em",
    color: fade("#636161", 0.95),
  },
  cssFontBox: {
    fontSize: "1rem",
    fontWeight: 500,
    "@media (max-width: 150px)": {
      paddingLeft: 0,
      fontWeight: 0.35,
    },
    margin: "10px",
    textAlign: "left",
    width: "100%",
    color: fade("#636161", 0.95),
  },
  cssBoxFooter: {
    "@media (max-width: 150px)": {
      paddingLeft: 0,
    },
    margin: "10px",
    textAlign: "left",
    width: "100%",
    fontSize: "0.85rem",
    color: fade("#636161", 0.95),
    fontFamily: "Inter, sans-serif",
  },
  cssBoxAvatar: {
    margin: "10px",
    borderRadius: "30%",
    backgroundColor: fade("#3f51b5", 0.95),
    // color: fade("#616161",0.95),
  },
  cssFontFeature: {
    fontSize: "2.5rem",
    fontWeight: 500,
    "@media (max-width: 150px)": {
      paddingLeft: 0,
      fontWeight: 0.35,
    },
    margin: "10px",
    textAlign: "center",
    width: "100%",
    color: fade(theme.palette.secondary.main, 0.95),
  },
  cssButton1: {
    fontSize: "1rem",
    fontWeight: 300,
    "@media (max-width: 150px)": {
      paddingLeft: 0,
      fontWeight: 0.35,
    },
    marginBottom: "10px",
    background: fade("#3f51b5", 0.95),
    color: fade(theme.palette.primary.contrastText, 0.95),
  },
  cssFont2: {
    fontWeight: 200,
    "@media (max-width: 150px)": {
      paddingLeft: 0,
      fontWeight: 0.35,
    },
    marginBottom: "10px",
    fontFamily: "Inter, sans-serif",
    width: "100%",
    color: fade("#646e73", 0.95),
  },
  logoClass: {
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 400,
    size: "18px",
    marginLeft: "38px",
    textTransform: "none",
    color: fade(theme.palette.primary.contrastText, 0.95),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
  imgCss1: {
    width: "100%",
    borderRadius: "2%",
    marginTop: "20px",
  },
  imgCss2: {
    width: "80%",
    height: "75%",
    borderRadius: "2%",
    marginTop: "20px",
  },
}));

export default function LandingHeader() {
  const {
    header,
    logoClass,
    menuButton,
    toolbar,
    drawerContainer,
    bodyClass,
    css1,
    cssFont1,
    cssFont2,
    cssButton1,
    imgCss1,
    cssFontHeading,
    cssFontFeature,
    cssBox1,
    cssFontBox,
    cssBoxAvatar,
    cssBoxFooter,
    imgCss2,
  } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {logo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{logo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const logo = (
    <Typography variant="h6" component="h1" className={logoClass}>
      QGEN
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <>
      <header>
        <AppBar className={header}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </header>
      <div className={bodyClass}>
        <Grid container>
          <Grid item xs={6}>
            <div className={css1}>
              <Typography variant="h2" className={cssFont1}>
                The QR code for all your business needs
              </Typography>
            </div>
            <div className={css1}>
              <Typography variant="h6" className={cssFont2}>
                This platform creates QR codes and short urls with multiple
                featues
              </Typography>
            </div>
            <div className={css1}>
              <Typography variant="body1" className={cssFont2}>
                Contact us for more benfits
              </Typography>
            </div>
            <div className={css1}>
              <Button className={cssButton1}> Contact us</Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <img src={dashboard} className={imgCss1} alt="dashboard"></img>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" className={cssFontFeature}>
              Features
            </Typography>
            <Typography variant="h2" className={cssFontHeading}>
              Features have in our platform
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <img src={qr} className={imgCss2} alt="qr"></img>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className={cssBox1}>
                  <Avatar className={cssBoxAvatar}>C</Avatar>
                  <Typography variant="h6" className={cssFontBox}>
                    Colors
                  </Typography>
                  <Typography variant="body1" className={cssBoxFooter}>
                    Customize QR code at different colors
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={cssBox1}>
                  <Avatar className={cssBoxAvatar}>D</Avatar>
                  <Typography variant="h6" className={cssFontBox}>
                    Downloads
                  </Typography>
                  <Typography variant="body1" className={cssBoxFooter}>
                    Download different types of images (JPG, PNG, SVG)
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={cssBox1}>
                  <Avatar className={cssBoxAvatar}>C</Avatar>
                  <Typography variant="h6" className={cssFontBox}>
                    Colors
                  </Typography>
                  <Typography variant="body1" className={cssBoxFooter}>
                    Customize QR code at different colors
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={cssBox1}>
                  <Avatar className={cssBoxAvatar}>C</Avatar>
                  <Typography variant="h6" className={cssFontBox}>
                    Colors
                  </Typography>
                  <Typography variant="body1" className={cssBoxFooter}>
                    Customize QR code at different colors
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={12}>
             <Footer></Footer>
            </Grid>
        </Grid>
      </div>
    </>
  );
}
