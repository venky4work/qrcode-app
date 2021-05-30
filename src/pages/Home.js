import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EnhancedTable from "../components/EnhancedTable";
import CustomizedBreadcrumbs from "../components/CustomizedBreadcrumbs";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Button } from "@material-ui/core";
import { Switch, Route, useHistory } from "react-router-dom";
import CreateQr from "../components/CreateQr";
import DetailQr from "../components/DetailQr";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    height: "100%",
    overflowWrap: "break-word",
  },
}));

export default function Home() {
  const classes = useStyles();
  //   let { path } = useRouteMatch();
  const history = useHistory();

  const handleClick = (event) => {
    history.push("/add");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={9}>
        <CustomizedBreadcrumbs></CustomizedBreadcrumbs>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={handleClick}
          startIcon={<AddCircleIcon />}
        >
          Create QR code
        </Button>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path="/">
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper}>
                    Total Codes
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper}>Scans</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper}>Visits</Paper>
                </Grid>
                <Grid item xs={12}>
                  <EnhancedTable> </EnhancedTable>
                </Grid>
              </Grid>
            </Route>
            <Route path="/add">
              <CreateQr> </CreateQr>
            </Route>
            <Route path="/detail/:id">
              <DetailQr edit={false}> </DetailQr>
            </Route>
            <Route path="/edit/:id">
              <DetailQr edit={true}> </DetailQr>
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </Grid>
  );
}
