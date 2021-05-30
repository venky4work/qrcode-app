// import { useState } from "react";
import { css } from "@emotion/react";
import GridLoader from "react-spinners/GridLoader";
import { useTheme } from "@material-ui/core";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

export function Loader() {
    const theme = useTheme();
  return (
    <div>
      <GridLoader color={theme.palette.primary.main} css={override} size={50} margin={2}/>
    </div>
  );
}
