import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  createStyles,
  fade,
  lighten,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useDispatch, useSelector } from "react-redux";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { push } from "connected-react-router";
import QrCode from "qrcode.react";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "url", numeric: false, disablePadding: false, label: "URL" },
  { id: "title", numeric: false, disablePadding: false, label: "Title" },
  {
    id: "shortenurl",
    numeric: false,
    disablePadding: false,
    label: "Short URL",
  },
  {
    id: "visit",
    numeric: true,
    disablePadding: false,
    label: "Visits",
  },
  {
    id: "created_at",
    numeric: false,
    disablePadding: false,
    label: "Created",
  },
];

const StyledTableSortLabel = withStyles((theme) =>
  createStyles({
    root: {
      color: "white",
      "&:hover": {
        color: "white",
      },
      "&$active": {
        color: "white",
      },
    },
    active: {},
    icon: {
      color: "inherit !important",
    },
  })
)(TableSortLabel);

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        <TableCell className={classes.tableFontColor}></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              IconComponent={ArrowDropDown}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography className={classes.tableFontColor}>
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </StyledTableSortLabel>
          </TableCell>
        ))}
        <TableCell className={classes.tableFontColor}>Action</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          QR Codes
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableHead: {
    backgroundColor: fade(theme.palette.primary.main, 0.95),
  },
  tableFontColor: {
    color: fade(theme.palette.primary.contrastText, 0.95),
    textAlign: "center",
    fontWeight: "400",
    lineHeight: "0.5rem",
    margin: "2px",
  },
  tableCellStyle: {
    fontWeight: "300",
    lineHeight: "1rem",
    margin: "1px",
    padding: "10px",
  },
  activeSortIcon: {
    opacity: 1,
  },
  inactiveSortIcon: {
    opacity: 0,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("created_at");
  // const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { rows } = useSelector((state) => ({
    rows:
      state.urls.results.length === 0
        ? state.urls.results
        : state.urls.results.data,
  }));
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    dispatch(push(`/detail/${id}`));
  };

  const handleEdit = (event, id) => {
    dispatch(push(`/edit/${id}`));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="qr codes"
          >
            <EnhancedTableHead
              classes={classes}
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              // rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  // const isItemSelected = isSelected(row.id);
                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      // selected={isItemSelected}
                    >
                      <TableCell className={classes.tableCellStyle}>
                        <QrCode
                          id="qrcode"
                          value={row.url}
                          renderAs="svg"
                          // value=""
                          size={25}
                          // level={""}
                          // bgColor={bgcolor}
                          // fgColor={fgcolor}
                        ></QrCode>
                      </TableCell>
                      <TableCell className={classes.tableCellStyle} align="left">{row.url}</TableCell>
                      <TableCell className={classes.tableCellStyle} align="left">{row.title}</TableCell>
                      <TableCell className={classes.tableCellStyle} align="left">{row.shortenurl}</TableCell>
                      <TableCell className={classes.tableCellStyle} align="right">{row.visit}</TableCell>
                      <TableCell className={classes.tableCellStyle} align="left">{row.created_at}</TableCell>
                      <TableCell className={classes.tableCellStyle}>
                        <Tooltip title="Edit">
                          <IconButton
                            aria-label="edit"
                            onClick={(event) => handleEdit(event, row.id)}
                          >
                            <EditOutlinedIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View">
                          <IconButton
                            aria-label="view"
                            onClick={(event) => handleClick(event, row.id)}
                          >
                            <VisibilityOutlinedIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
