import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Modal from '../Modal/Modal';
import Spinner from '../Spinner/Spinner';

const useStyles = makeStyles({
  background:{
     width: "100%", 
     height: '100vh', 
    backgroundColor: "#8F80E8",
  },
  main:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
  },
  root: {
    width: '70%',
    backgroundColor: "#8C9BFF"
  },

});

  const Employees=() =>{
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const [employeeModalRow, setEmployeeModalRow] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleClickOpenModal = (row) => {
    setEmployeeModalRow(row)
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns = [
    { id: 'id', label: 'id'},
    { id: 'first_name', label: 'First name'},
    { id: 'last_name', label: 'last name'},
    { id: 'company', label: 'Company'},
    { id: 'email', label: 'Email'},
    { id: 'phone', label: 'Phone'}
  ];
  
  const createData = (id, first_name,  last_name, company, email, phone)=> {
    return {id,  first_name, last_name, company, email, phone};
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
   const fetchData = async () => {
   const response = await axios.get('employees.json');
   setEmployees(response.data);
   }
   fetchData();
 },[]);
 
 const assignEmployees=Object.assign({}, employees)

 const row = () =>{
  const newRow = []
  if(assignEmployees.data){
  for(var i = 0; i<assignEmployees.data.length; i++){
    newRow.push(createData(
      assignEmployees.data[i][0],
      assignEmployees.data[i][1],
      assignEmployees.data[i][2],
      assignEmployees.data[i][3],
      assignEmployees.data[i][4],
      assignEmployees.data[i][5],
    ))
  }
}
  return newRow
}

const rows = row()

  return (
    <div className={classes.background}>
    <div className={classes.main}>
      <h1>Employees</h1>
      
{!assignEmployees.data  ? 
   <Spinner/>
 :   (<Paper className={classes.root}>
      <TableContainer className="table_container">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{backgroundColor:"#C499FF"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} onClick={()=>handleClickOpenModal(row)}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            <Modal  open={openModal} onClose={handleCloseModal} modalFields={employeeModalRow} title="employee" />
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
}

export default Employees