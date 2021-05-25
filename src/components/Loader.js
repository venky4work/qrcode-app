// import { useState } from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import { useTheme } from "@material-ui/core";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

export function Loader() {
    const theme = useTheme();
//   let [loading, setLoading] = useState(true);
//   let [color, setColor] = useState("#000000");

  return (
    <div className="sweet-loading">
      <HashLoader color={theme.palette.primary.main} css={override} size={100} />
    </div>
  );
}
