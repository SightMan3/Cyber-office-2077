import React from 'react';
import './App.scss';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route
} from "react-router-dom";

// components
import Login from './components/Login';
import Register from "./components/Register";
import Home from "./components/home/Home";
import CalendarScreen from "./components/calendar/CalendarScreen";
import EmailScreen from "./components/email/EmailScreen"

function App() {
<<<<<<< HEAD
  // return (
  //   <Router>
  //     <div className="App">

  //       <Switch>
  //         <Route path="/login" exact component={Login}/>
  //         <Route path="/register" component={Register}/>
     
  //       </Switch>
  //     </div>
  //   </Router>
=======
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </div>
    </Router>
>>>>>>> 716c1cfff1fddcba78ecfbcfe19067b7d6dbc41a

  // )

  // return (
    
<<<<<<< HEAD
    <div className="App">
      <EmailScreen />
    </div>
  )
=======
  //   <div className="App">
  //     <CalendarScreen />
  //   </div>
  // )
>>>>>>> 716c1cfff1fddcba78ecfbcfe19067b7d6dbc41a
}

export default App;

