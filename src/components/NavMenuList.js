import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import BarChartRoundedIcon from "@material-ui/icons/BarChartRounded";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import { useState } from "react";
const NavMenuList = () => {
  // const [active, useActive] = useState(true);

  const handleClick= (event) => {

    console.log(event)

  }

  return (
    <List>
      {["Home", "Graphs"].map((text, index) => (
        <ListItem button key={text} onClick={handleClick} value={text}>
          <ListItemIcon>
            {index % 2 === 0 ? (
              <HomeRoundedIcon color="primary" />
            ) : (
              <BarChartRoundedIcon color="primary" />
            )}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
};

export default NavMenuList;
