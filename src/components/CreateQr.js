import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import { Formik, Field, Form } from "formik";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LinkIcon from "@material-ui/icons/Link";
import YouTubeIcon from "@material-ui/icons/YouTube";
import DescriptionIcon from "@material-ui/icons/Description";
import ColorPicker from "material-ui-color-picker";
// import qr from "../components/assets/tenor.gif";
import QRCode from "qrcode.react";
import { Paper } from "@material-ui/core";
import { createUrl } from "../actions/urls";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    height: "100%",
    overflowWrap: "break-word",
  },
  backbutton: {
    marginBottom: theme.spacing(10),
    // backgroundColor: theme.palette.secondary.main,
    width: "15%",
  },
  icons: {
    padding: theme.spacing(2),
    // backgroundColor: theme.palette.secondary.main,
    width: "20%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateQr() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [value, setValue] = useState("Link");
  // const [prefix, setPrefix] = useState("");
  const [fgcolor, setFgColor] = useState("#000000");
  const [bgcolor, setBgColor] = useState("#b9b8b8");
  const [url] = useState("");

  const initalValues = {
    title: "",
    url: "",
  };

  const onSubmit = async (values) => {
    console.log(values);
    dispatch(createUrl(values));
    history.push("/");
  };
  const handleClick = (e) => {
    console.log(e.currentTarget.value);
    setValue(e.currentTarget.value);
  };

  const handleBgChange = (color) => {
    console.log(color);
    setBgColor(color);
  };

  // const handleUrlChange = (e) => {
  //   // console.log(e.target.value);
  //   setUrl(e.target.value);
  // };
  const handleFgChange = (color) => {
    console.log(color);
    setFgColor(color);
  };

  const handleBack = () => {
    history.push("/");
  };

  // const downloadQR = () => {
  //   const canvas = document.getElementById("qrcode");
  //   const pngUrl = canvas
  //     .toDataURL("image/png")
  //     .replace("image/png", "image/octet-stream");
  //   let downloadLink = document.createElement("a");
  //   downloadLink.href = pngUrl;
  //   downloadLink.download = "123456.png";
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Button
          // variant="contained"
          color="secondary"
          className={classes.backbutton}
          onClick={handleBack}
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
        <Typography variant="h6">CREATE YOUR OWN QR</Typography>
        <Formik
          initialValues={initalValues}
          onSubmit={onSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          validateOnMount={false}
        >
          {({ isSubmitting, submitForm }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="title"
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    label="Title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant={value === "Link" ? "contained" : "text"}
                    color="secondary"
                    onClick={handleClick}
                    value="Link"
                    className={classes.icons}
                    startIcon={<LinkIcon />}
                  >
                    Link
                  </Button>
                  <Button
                    variant={value === "Youtube" ? "contained" : "text"}
                    color="secondary"
                    onClick={handleClick}
                    value="Youtube"
                    className={classes.icons}
                    startIcon={<YouTubeIcon />}
                  >
                    Youtube
                  </Button>
                  <Button
                    variant={value === "File" ? "contained" : "text"}
                    color="secondary"
                    value="File"
                    onClick={handleClick}
                    className={classes.icons}
                    startIcon={<DescriptionIcon />}
                  >
                    File
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="url"
                    component={TextField}
                    // onKeyUp ={handleUrlChange}
                    // onChange={(e, value) =>
                    //   setFieldValue("url", value === 'Youtube' ? "https://youtube.com" + e.target.value : e.target.value )
                    // }
                    variant="outlined"
                    fullWidth
                    label="https://www.website.com"
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Grid container spacing={2} direction={"column"} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6">Style Preview</Typography>
            </Grid>
            <Grid item xs={6}>
              <QRCode
                id="qrcode"
                renderAs="svg"
                value={url}
                size={290}
                level={"H"}
                bgColor={bgcolor}
                fgColor={fgcolor}
                includeMargin={true}
              ></QRCode>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <ColorPicker
                    name="color1"
                    value={bgcolor}
                    onChange={(color) => handleBgChange(color)}
                    TextFieldProps={{
                      value: bgcolor,
                      variant: "outlined",
                      // className: classes.formInput,
                      label: "Backgroud Color",
                      helperText: "Choose a color",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ColorPicker
                    name="color2"
                    value={fgcolor}
                    onChange={(color) => handleFgChange(color)}
                    TextFieldProps={{
                      value: fgcolor,
                      variant: "outlined",
                      // className: classes.formInput,
                      label: "Foreground Color",
                      helperText: "Choose a color",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
