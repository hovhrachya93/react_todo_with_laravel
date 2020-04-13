import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,

} from "react-router-dom";
import { Companies, Employees, Header, Main } from "./Components/Components";

function App() {
  return (
    <Router>
      <Header />
      <Switch>

      <Route exact path="/">
        <Main/>
        </Route>
        
      <Route path="/employees">
      <Employees />
          </Route>

     <Route path="/companies">
        <Companies />
          </Route>

      </Switch>
    </Router>
   
  );
}

export default App;



