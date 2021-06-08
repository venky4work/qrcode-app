import { makeStyles } from "@material-ui/core/styles";
import Home from "../pages/Home";
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    marginTop: theme.spacing(8.5),
    height: "100%",
    // marginRight: 4,
    // marginLeft: 2,
    // marginBottom: 4,
    // borderRadius: theme.spacing(2),
    // background: "#e3f2fd",
  },
}));

const Main = ({ open }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div>
        <Home> </Home>
      </div>
    </main>
  );
};
Main.defaultProps = {
  open: true,
};

export default Main;
