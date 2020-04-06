import React from "react";
import {
  BrowserRouter as Router,
  Link,
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
        <Link to="/"> <h1 style={{textDecoration: 'none', color: "#fff", fontSize: 30, paddingLeft: 30}}>Main</h1></Link>
      <div  style={styles.pages}>
      <Link to="/companies"><h1 style={{textDecoration: 'none', color: "#fff", fontSize: 30}}>Companies</h1></Link>

      
      <Link to="/employees">  <h1 style={{textDecoration: 'none', color: "#fff", fontSize: 30, paddingLeft: 30, paddingRight: 30}}>Employees</h1></Link>
      </div>
    </div>
  );
};

export default Header;
