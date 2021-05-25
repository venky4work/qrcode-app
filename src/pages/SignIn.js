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
import { userSignIn } from "../actions/user";
import useToken from "../hooks/useToken";
import { Loader } from "../components/Loader";
import { Box, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const { setToken } = useToken();
  const { error, setError } = useState(undefined);
  const theme = useTheme();

  const initalValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values) => {
    setLogin(true);
    const data = await dispatch(userSignIn(values));
    if(data.payload.token) {
      setToken(data.payload.token);
      var rootLocation = window.location.origin;
      setLogin(false);
      window.location.replace(rootLocation);
    } else {
      setLogin(false);
      console.log(data.payload.message);
      setError(data.payload.message);
    }
  };

  return login ? (
    <Container component="main" maxWidth="xs">
    <div className={classes.paper}>
      <Loader></Loader>
    </div>
    </Container>
  ) : (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box bgcolor="error.main" color="error.contrastText" p={1}>
          {error}
        </Box>
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
                Sign In
              </Button>
              <Grid container justify="flex-end">
                <Grid item xs={6}>
                  <Link to="/"> Back </Link>
                </Grid>
                <Grid item xs={6}>
                  <Link to="/signup"> Register </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
