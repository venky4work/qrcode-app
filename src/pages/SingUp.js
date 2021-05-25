import React from "react";
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
import { userSignup } from '../actions/user';
import useToken from "../hooks/useToken";

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

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setToken } = useToken();

  const initalValues = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  };

  const onSubmit = async (values) => {
    const data = await dispatch(userSignup(values));
    if(data.payload.token) {
      setToken(data.payload.token);
      var rootLocation = window.location.origin;
      window.location.replace(rootLocation);
    } else {
      console.log(data.payload.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={initalValues}
          onSubmit={onSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          validateOnMount={false}
        >
          {({ isSubmitting, submitForm }) => (
            <Form className={classes.form} >
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
                  <Link to="/"> Back </Link>
                </Grid>
                <Grid item xs={9}>
                  <Link to="/signin"> Already have an account? Sign in </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
