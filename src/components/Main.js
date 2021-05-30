import { makeStyles } from "@material-ui/core/styles";
import Home from "../pages/Home";
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    borderRadius: 6,
   background : 'linear-gradient(180deg, #3f51b5 30%, #FFFFF 50%)',
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
    // backgroundColor: fade(theme.palette.primary.light, 0.95),
  },
}));

const Main = ({ open }) => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Home> </Home>
    </div>
  );
};
Main.defaultProps = {
  open: true,
};

export default Main;
