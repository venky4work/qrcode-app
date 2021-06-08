import React from 'react';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
// import HomeIcon from '@material-ui/icons/Home';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(5),
    width: theme.spacing(15), 
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover, &:focus': {
      backgroundColor: emphasize(theme.palette.primary.main),
      color: theme.palette.primary.contrastText,
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.primary.light, 0.12),
      color: theme.palette.grey[800],
    },
  },
  icon: {
    color: theme.palette.primary.main,
    '&:hover, &:focus': {
      color: theme.palette.primary.contrastText,
    },
    '&:active': {
      color: theme.palette.primary.contrastText,
    },
  },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591



function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CustomizedBreadcrumbs() {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <StyledBreadcrumb
        component="a"
        href="#"
        label="HOME"
        // icon={<HomeIcon fontSize="medium" />}
        onClick={handleClick}
      />
      <StyledBreadcrumb component="a" href="#" label="MY CODES" onClick={handleClick} />
    </Breadcrumbs>
  );
}