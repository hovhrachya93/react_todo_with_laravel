import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Send from "@material-ui/icons/Send";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";

const useStyles = makeStyles({
  background: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#8F80E8",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    width: "70%",
    backgroundColor: "#8C9BFF",
  },
  addFields: {
    backgroundColor: "#C499FF",
    display: "flex",
    justifyContent: "center",
    marginTop: 50,
    paddingTop: 15,
    paddingBottom: 20,
    width: "70%",
    borderRadius: 20,
  },
  addField: {
    paddingRight: 20,
    width: "12%",
  },
  inputCamera: {
    display: "none",
  },
});

const Companies = () => {
  const classes = useStyles();
  const [companies, setCompanies] = useState([]);
  const [companyModalRow, setCompanyModalRow] = useState([]);
  const [isImageModal, setIsImageModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [logo, setLogo] = useState();
  const [website, setWebsite] = useState();

  const addNameHandler = (e)=> setName(e.target.value)
  const addEmailHandler = (e)=> setEmail(e.target.value)
  const addLogoHandler = (e)=> setLogo(e.target.value)
  const addWebsiteHandler = (e)=> setWebsite(e.target.value)

  const companyDataForSend = {
    name,
    email,
    logo,
    website
  }

  const sendData = e => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/companies", companyDataForSend)
    console.log(companyDataForSend)
  };


  const [openModal, setOpenModal] = React.useState(false);
  const handleClickOpenModal = (row) => {
    setCompanyModalRow(row);
    setOpenModal(true);
  };
  const handleClickOpenImageModal = (row) => {
    setCompanyModalRow(row);
    setIsImageModal(true);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsImageModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/companies");
      setCompanies(response.data);
    };
    fetchData();
  }, []);

  const deleteCompany = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/companies/${id}`);
  };

  const deleteBtn = () => (
    <Fab color="secondary" variant="extended">
      <Delete />
    </Fab>
  );

  const assignCompanies = Object.assign({}, [companies]);
  console.log('1', assignCompanies)
  console.log('2', assignCompanies.length)
  console.log('3', assignCompanies[0])
  console.log('4', assignCompanies[0][0])

  const columns = [
    { id: "id", label: "id" },
    { id: "name", label: "name" },
    { id: "email", label: "email" },
    { id: "logo", label: "logo" },
    { id: "website", label: "website" },
    { id: "del", label: "delete" },
  ];

  const createData = (id, name, email, logo, website, del) => {
    return { id, name, email, logo, website, del };
  };


  const row = () => {
    const newRow = [];
    if (assignCompanies) {
      for (var i = 0; i < assignCompanies[0].length; i++) {
        newRow.push(
          createData(
            assignCompanies[0][i].id,
            assignCompanies[0][i].name,
            assignCompanies[0][i].email,
            assignCompanies[0][i].logo,
            assignCompanies[0][i].website,
            deleteBtn()
          )
        );
      }
    }
    return newRow;
  };

  const rows = row();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.background}>
      <div className={classes.main}>
        <h1>Companies</h1>
        {!assignCompanies ? (
          <Spinner />
        ) : (
          <Paper className={classes.root}>
            <TableContainer className="table_container">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ backgroundColor: "#C499FF" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                onClick={
                                  column.id === "del"
                                    ? () =>
                                    deleteCompany(row.id)
                                    : column.id === "logo"
                                    ? () => handleClickOpenImageModal(row)
                                    : () => handleClickOpenModal(row)
                                }
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    modalFields={companyModalRow}
                    isImageModal={isImageModal}
                    title="company"
                  />
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[1, 2, 5, 10, 15]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className={classes.addFields} autoComplete="off">
          <TextField
            className={classes.addField}
            id="standard-basic"
            label="name"
            onChange={addNameHandler}
          />
          <TextField
            className={classes.addField}
            id="standard-basic"
            label="email"
            onChange={addEmailHandler}
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              accept="image/*"
              className={classes.inputCamera}
              id="icon-button-file"
              type="file"
              onChange={addLogoHandler}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
          <TextField
            onChange={addWebsiteHandler}
            className={[classes.addField]}
            id="standard-basic"
            label="website"
          />
          <Fab onClick={sendData} color="primary" variant="extended">
            <Send />
            send
          </Fab>
        </form>
      </div>
    </div>
  );
};

export default Companies;
