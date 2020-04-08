import React from "react";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import "./modal.css";

function Modal(props) {
  const { onClose, selectedValue, open, title, modalFields} = props;
  const handleClose = () => {
    onClose(selectedValue);
  };
  const isEmployee = title === "employee";
console.log("????????", modalFields)
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className="modal_rectangle">
        <h1 className="modal_title">rename {title}</h1>
        <div className="modal_inputs">
          <TextField
            style={{paddingBottom: "30px"}}
            id="outlined-helperText"
            label={isEmployee ? "First name" : "name"}
            defaultValue={isEmployee ? modalFields.first_name : modalFields.name}   
            variant="outlined"
          />
          <TextField
            style={{paddingBottom: "30px"}}
            id="outlined-helperText"
            label={isEmployee ? "last name" : "email"}
            defaultValue={isEmployee ? modalFields.last_name : modalFields.email}
            variant="outlined"
          />
          <TextField
            style={{paddingBottom: "30px"}}
            label={isEmployee ? "Email" : "logo"}
            defaultValue={isEmployee ? modalFields.company : modalFields.logo}
            variant="outlined"
          />
          <TextField
            style={{paddingBottom: "30px"}}
            id="outlined-helperText"
            label={isEmployee ? "Email" : "website"}
            defaultValue={isEmployee ? modalFields.email : modalFields.website}
            variant="outlined"
          />
          {isEmployee && (
            <TextField
            style={{paddingBottom: "30px"}}
              id="outlined-helperText"
              label="Phone"
              defaultValue={isEmployee && modalFields.phone}
              variant="outlined"
            />
          )}
        <Fab color="primary" variant="extended">
        <NavigationIcon />
        Rename
      </Fab>
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
