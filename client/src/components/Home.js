import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

//local imports
import Edituserdetails from "./Edituserdetails";

//package imports
import Moment from "moment";
import axios from "axios";

//material-ui imports
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { Typography, Paper, CircularProgress } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
    head: {
        color: theme.palette.common.black,
        fontSize: 16,
    },
    body: {
        fontSize: 12,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    Container: {
        padding: theme.spacing(5),
    },
    tableContainer: {
        maxHeight: 500,
        maxWidth: 200,
    },
    AppBarDiv: {
        display: "flex",
        justifyContent: "spaceBetween",
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const useStyles1 = makeStyles((theme) => ({
    root: {
        // flexShrink: 0,
        display: "flex",
        width: 270,
        alignItems: "center",
        justifyContent: "center",
    },
}));

export default function Home(props) {
    const [data, setData] = useState([])
    const [editData, setEditdata] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [id, setID] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {

        if (localStorage.getItem('token')) {
            console.log("here")
            console.log(localStorage.getItem('token'))


        } else {
            console.log("not here")
            window.location.href = "/"
        }
        const url = "http://localhost:5000/api/users/getall"                    //getting all the user information here

        axios
            .get(url, {
                headers: {                                                      //settting the headers here and sending the token for auth
                    'x-auth-token': token,
                }
            })
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const logout = () => {                                                      //logout function
        setLoading(true)
        localStorage.removeItem('token')
        window.location.href = "/"
    }

    if (loading) {
        return (
            <div style={{ marginTop: "25%" }}>
                <CircularProgress />
            </div>
        )
    }

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    if (editData) {
        return <Edituserdetails id={id} name={name} phone={phone} email={email} />

    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    return (
        <React.Fragment>
            <div>
                <Typography variant="h1" style={{ margin: "2%" }}>
                    User Management System
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={6}>

                        <div className="card w3-animate-bottom">
                            <Paper elevation={3} style={{ padding: "3%" }}>
                                <Typography variant="h3" style={{ margin: "2%" }}>
                                    Manage your users here
                                </Typography>
                                <Table aria-label="simple table" stickyHeader>
                                    <TableHead>
                                        <TableRow>

                                            <StyledTableCell align='left' style={{ color: 'red' }}>
                                                Name
                                            </StyledTableCell>
                                            <StyledTableCell align='left' style={{ color: 'red' }}>
                                                Email
                                            </StyledTableCell>
                                            <StyledTableCell align='left' style={{ color: 'red' }}>
                                                Phone
                                            </StyledTableCell>
                                            <StyledTableCell align='left' style={{ color: 'red' }}>
                                                Action
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : data
                                        ).map((row) => (
                                            <StyledTableRow key={row._id}>
                                                <StyledTableCell align="left">{row.name}</StyledTableCell>
                                                <StyledTableCell align="left">{row.email}</StyledTableCell>
                                                <StyledTableCell align="left">{row.phone}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Grid container>
                                                        <Grid item xs={6}>
                                                            <Button
                                                                variant="contained"
                                                                onClick={() => {
                                                                    setEditdata(true)
                                                                    setID(row._id)
                                                                    setName(row.name)
                                                                    setEmail(row.email)
                                                                    setPhone(row.phone)
                                                                }}
                                                            >
                                                                Edit
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                colSpan={3}
                                                count={data.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    inputProps: { "aria-label": "rows per page" },
                                                    native: true,
                                                }}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>

                            </Paper>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    logout()
                                    setLoading(true)
                                }}
                                style={{ marginTop: "3%" }}
                            >
                                Logout
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                </Grid>

            </div>
        </React.Fragment>
    );
}

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                        <KeyboardArrowLeft />
                    )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                        <KeyboardArrowRight />
                    )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}
