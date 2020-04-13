import React, { useEffect } from "react";
import {
  NavLink 
} from "react-router-dom";

const Header = () =>
{
  const styles = {
    header: {
      margin: 0,
      width: "100%",
      height: "70px",
      backgroundColor: "#C499FF",
      display: 'flex',
      justifyContent: 'space-between',
    },
    pages:{
        display: 'flex',
    }
  };

  return (
    <div style={styles.header}>
        <NavLink style={{textDecoration: 'none', color: "red", fontSize: '160px'}}  to="/"> <h1 style={{color: "#fff", fontSize: 30, paddingLeft: 30}}>Main</h1></NavLink >
      <div style={styles.pages}>
      <NavLink  style={{ textDecoration: 'none'}} to="/companies">  <h1 style={{ color: "#fff", fontSize: 30}} >Companies</h1></NavLink>
       <NavLink  style={{ textDecoration: 'none'}} to="/employees">  <h1 style={{ color: "#fff", fontSize: 30, paddingLeft: 30, paddingRight: 30}}>Employees</h1></NavLink>
      </div>
    </div>
  );
};



export default Header;
