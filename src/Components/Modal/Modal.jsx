import React, { useState } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./modal.css";

const useStyles = makeStyles(() => ({
  input: {
    display: "none",
  },
}));

const Modal = (props) => {
  const {
    onClose,
    selectedValue,
    open,
    title,
    modalFields,
    isImageModal,
  } = props;
  const classes = useStyles();
  const handleClose = () => {
    onClose(selectedValue);
  };
  const isEmployee = title === "employee";

  const [first_name, setFirstName] = useState(modalFields.first_name);
  const [last_name, setLastName] = useState(modalFields.last_name);
  const [company, setCompany] = useState(modalFields.company);
  const [email, setEmail] = useState(modalFields.email);
  const [phone, setPhone] = useState(modalFields.phone);

  const [name, setName] = useState(modalFields.name);
  const [companyEmail, setCompanyEmail] = useState(modalFields.email);
  const [logo, setLogo] = useState(modalFields.logo);
  const [website, setWebsite] = useState(modalFields.website);

  const addFirstNameHandler = (e) => setFirstName(e.target.value);
  const addLastNameHandler = (e) => setLastName(e.target.value);
  const addCompanyHandler = (e) => setCompany(e.target.value);
  const addEmailHandler = (e) => setEmail(e.target.value);
  const addPhoneHandler = (e) => setPhone(e.target.value);

  const addNameHandler = (e) => setName(e.target.value);
  const addSetCompanyEmailHandler = (e) => setCompanyEmail(e.target.value);
  const addLogoHandler = (e) => setLogo(e.target.value);
  const addWebsiteHandler = (e) => setWebsite(e.target.value);

  const employeeDataForSend = {
    first_name,
    last_name,
    company,
    email,
    phone,
  };
  const companyDataForSend = {
    name,
    email: companyEmail,
    logo,
    website,
  };

  const sendEmployeeData = (e) => {
    e.preventDefault();
     axios.put(`http://127.0.0.1:8000/api/employees/${modalFields.id}`,    
      employeeDataForSend
      )
  };

  const sendCompanyData = (e) => {
    e.preventDefault();
     axios.put(`http://127.0.0.1:8000/api/companies/${modalFields.id}`,    
     companyDataForSend
      )
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      {isImageModal ? (
        // <img
        //   // src="https://s.yimg.com/uu/api/res/1.2/DdytqdFTgtQuxVrHLDdmjQ--~B/aD03MTY7dz0xMDgwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2019-11/7b5b5330-112b-11ea-a77f-7c019be7ecae"
        //   src="modalFields.logo"
        //   alt="Logo"
        // />
        <p>{modalFields.logo}</p>
      ) : (
        <div className="modal_rectangle">
          <h1 className="modal_title">rename {title}</h1>
          <div className="modal_inputs">
            <TextField
              style={{ paddingBottom: "30px" }}
              id="outlined-helperText"
              label={isEmployee ? "First name" : "name"}
              defaultValue={
                isEmployee ? modalFields.first_name : modalFields.name
              }
              variant="outlined"
              onChange={ isEmployee ? addFirstNameHandler : addNameHandler}
            />
            <TextField
              style={{ paddingBottom: "30px" }}
              id="outlined-helperText"
              label={isEmployee ? "last name" : "email"}
              defaultValue={
                isEmployee ? modalFields.last_name : modalFields.email
              }
              variant="outlined"
              onChange={ isEmployee ? addLastNameHandler : addSetCompanyEmailHandler}
            />

            {isEmployee ? (
              <TextField
                style={{ paddingBottom: "30px" }}
                label="Company"
                defaultValue={modalFields.company}
                variant="outlined"
                onChange={addCompanyHandler}
              />
            ) : (
              <>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={addLogoHandler}
                />
                <label
                  htmlFor="contained-button-file"
                  style={{ textAlign: "center", marginBottom: "30px" }}
                >
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
              </>
            )}
            <TextField
              style={{ paddingBottom: "30px" }}
              id="outlined-helperText"
              label={isEmployee ? "Email" : "website"}
              defaultValue={
                isEmployee ? modalFields.email : modalFields.website
              }
              variant="outlined"
              onChange={ isEmployee ? addEmailHandler : addWebsiteHandler}
            />
            {isEmployee && (
              <TextField
                style={{ paddingBottom: "30px" }}
                id="outlined-helperText"
                label="Phone"
                defaultValue={isEmployee && modalFields.phone}
                variant="outlined"
                onChange={addPhoneHandler}
              />
            )}
            <Fab onClick={isEmployee ? sendEmployeeData : sendCompanyData} color="primary" variant="extended">
              <NavigationIcon />
              Rename
            </Fab>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default Modal;
