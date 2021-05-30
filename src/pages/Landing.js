import { makeStyles } from "@material-ui/core";
import React from "react";
import LandingHeader from "../components/LandningHeader";
import { Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SingUp";
import LandingMain from "../components/LandingMain";
import Footer from "../components/Footer";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    // background: 'linear-gradient(to right bottom, #ffffff, #3f51b5d9)',
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          <div>
            <LandingHeader />
            <LandingMain></LandingMain>
            <Footer></Footer>
          </div>
        </Route>
        <Route>
          <p>404 Not found</p>
        </Route>
      </Switch>
    </div>
  );
};
export default Landing;
