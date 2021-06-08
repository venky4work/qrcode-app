import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EnhancedTable from "../components/EnhancedTable";
import CustomizedBreadcrumbs from "../components/CustomizedBreadcrumbs";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import { Button, Typography } from "@material-ui/core";
import { Switch, Route, useHistory } from "react-router-dom";
import CreateQr from "../components/CreateQr";
import DetailQr from "../components/DetailQr";
import { listUrl } from "../actions/urls";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    height: "100%",
    overflowWrap: "break-word",
  },
  count: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: 500,
    color: theme.palette.secondary.main,
    height: "100%",
    overflowWrap: "break-word",
    // background: theme.palette.text.primary,
  },
  title: {
    textAlign: "center",
    color: theme.palette.primary.main,
    height: "100%",
    overflowWrap: "break-word",
    fontWeight: 900,
    // background: theme.palette.text.primary,
  },
}));

export default function Home() {
  const classes = useStyles();
  //   let { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    history.push("/add");
  };

  const { folders } = useSelector((state) => ({
    folders:
      state.urls.results.length === 0
        ? 0
        : [...new Set(state.urls.results.data.map(item => item.title))],
  }));

  useEffect(() => {
    dispatch(listUrl());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <CustomizedBreadcrumbs />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Button
          variant="text"
          color="primary"
          size="large"
          onClick={handleClick}
          startIcon={<AddCircleIcon />}
        >
          Create QR
        </Button>
      </Grid>
      <Switch>
        <Route exact path="/">
          <Grid item xs={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={3} lg={3}>
                <Paper className={classes.paper}>
                  <Grid container>
                    <Grid item xs={8} lg={8}>
                      <FolderOpenRoundedIcon color="primary" fontSize="large"/>
                      <Typography className={classes.title}> Folders </Typography>
                    </Grid>
                    <Grid item xs={4} lg={4}>
                      <Typography className={classes.count}> {folders.length }</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {/* <Grid item xs={3} lg={3}>
                <Paper className={classes.paper}>Scans</Paper>
              </Grid>
              <Grid item xs={3} lg={3}>
                <Paper className={classes.paper}>Visits</Paper>
              </Grid> */}
              <Grid item>
                <EnhancedTable> </EnhancedTable>
              </Grid>
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
  );
}
