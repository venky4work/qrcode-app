import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
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
  },
}));

const Main = ({ open }) => {
  const classes = useStyles();
  return (
    <Container className={classes.content}>
      <div className={classes.toolbar} />
      <Home> </Home>
    </Container>
  );
};
Main.defaultProps = {
  open: true,
};

export default Main;
