import { Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const App = () => {

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/">
          <Dashboard />
        </Route>
        <Route>
          <p>404 Not found</p>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
