import React from "react";
import {
  BrowserRouter as Router,
  Link,
  NavLink 
} from "react-router-dom";

const Header = () => {
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
        <NavLink  to="/" activeStyle={{fontSize: 60,}}  > <h1 style={{textDecoration: 'none', color: "#fff", fontSize: 30, paddingLeft: 30}}>Main</h1></NavLink >
      <div  style={styles.pages}>
      <NavLink activeStyle={{fontSize: 60}} to="/companies"><h1 style={{textDecoration: 'none', color: "#fff", fontSize: 30}}>Companies</h1></NavLink>

      
      <NavLink activeStyle={{fontSize: 60}} to="/employees">  <h1 style={{textDecoration: 'none', color: "#fff", fontSize: 30, paddingLeft: 30, paddingRight: 30}}>Employees</h1></NavLink>
      </div>
    </div>
  );
};

export default Header;
