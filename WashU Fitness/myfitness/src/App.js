import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import LoginAndRegister from "./components/login-and-register.component";
import onlyRegister from "./components/onlyRegister.component";
import Welcome from "./components/welcome.component";



function App() {

  return (
    <Router>
        <Route exact path="/" component={LoginAndRegister} />
        <Route exact path="/onlyRegister" component={onlyRegister} />
        <Route exact path="/welcome/:id" component={Welcome}>
       </Route>
    </Router>
  );
}

export default App; 
 