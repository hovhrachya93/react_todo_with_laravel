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
import Modal from '../Modal/Modal';
import Spinner from '../Spinner/Spinner';

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
});

const Companies = () => {
  const classes = useStyles();
  const [companies, setCompanies] = useState([]);
  const [companyModalRow, setCompanyModalRow] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const [openModal, setOpenModal] = React.useState(false);
  const handleClickOpenModal = (row) => {
    console.log("rowrow???",row)
    setCompanyModalRow(row)
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("components.json");
      setCompanies(response.data);
    };
    fetchData();
  }, []);

  const assignCompanies = Object.assign({}, companies);
  // console.log(assignCompanies)

  const columns = [
    { id: "id", label: "id" },
    { id: "name", label: "name" },
    { id: "email", label: "email" },
    { id: "logo", label: "logo" },
    { id: "website", label: "website" },
  ];

  const createData = (id, name, email, logo, website) => {
    return { id, name, email, logo, website };
  };

  const row = () => {
    const newRow = [];
    if (assignCompanies.data) {
      for (var i = 0; i < assignCompanies.data.length; i++) {
        newRow.push(
          createData(
            assignCompanies.data[i][0],
            assignCompanies.data[i][1],
            assignCompanies.data[i][2],
            assignCompanies.data[i][3],
            assignCompanies.data[i][4]
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
{!assignCompanies.data  ?
 <Spinner/>
 : (<Paper className={classes.root}>
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
                            <TableCell key={column.id} align={column.align} onClick={()=>handleClickOpenModal(row)}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}

                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                <Modal  open={openModal} onClose={handleCloseModal} modalFields={companyModalRow} title="company" />

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
        </Paper>)}
      </div>
    </div>
  );
};

export default Companies;

