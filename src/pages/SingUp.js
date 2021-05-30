import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import { Formik, Field, Form } from "formik";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignup } from "../actions/user";
import useToken from "../hooks/useToken";
import LandingHeader from "../components/LandningHeader";
import { Box, fade, useTheme } from "@material-ui/core";
import { Loader } from "../components/Loader";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  text: {
    margin: theme.spacing(2),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mainClass: {
    padding: "2%",
    marginTop: "10%",
    boxShadow: "rgb(13 13 13 / 25%) 0px 3px 6px 0px",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    borderRadius: "7%",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setToken } = useToken();
  const [login, setLogin] = useState(false);
  const [msg, setMsg] = useState(false);
  const theme = useTheme();

  const initalValues = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  };

  const onSubmit = async (values) => {
    setLogin(true);
    const data = await dispatch(userSignup(values));
    if (data.payload.token) {
      setToken(data.payload.token);
      var rootLocation = window.location.origin;
      window.location.replace(rootLocation);
    } else {
      setLogin(false);
      setMsg(true);
      console.log(data.payload.message);
    }
  };

  return login ? (
    <Container component="main" maxWidth="xs">
      <div className={classes.loader}>
        <Loader></Loader>
      </div>
    </Container>
  ) : (
    <>
      <LandingHeader></LandingHeader>
      <Container component="main" maxWidth="xs" className={classes.mainClass}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6" className={classes.text}>
            Create an account
          </Typography>
          <Typography variant="body1" align="center">
            Use these QR codes to login or create new account in your business
            for free.
          </Typography>
          {msg ? (
            <Box
              bgcolor={fade(theme.palette.error.main, 0.9)}
              color="error.contrastText"
              p={1}
              width="100%"
            >
              <Typography align="center">Account creation failed</Typography>
            </Box>
          ) : (
            <></>
          )}
          <Formik
            initialValues={initalValues}
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
          >
            {({ isSubmitting, submitForm }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="firstName"
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="lastName"
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      label="Last Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="username"
                      fullWidth
                      variant="outlined"
                      label="User Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="password"
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      label="Password"
                      type="password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item xs={3}>
                    <Link to="/">
                      <Typography>Back</Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={9}>
                    <Link to="/signin">
                      <Typography align="right">
                        Already have an account? Sign in{" "}
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
}
