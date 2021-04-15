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
function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" component={Register}/>
     
        </Switch>
      </div>
    </Router>

  )

  return (
    
    <div className="App">
      <CalendarScreen />
    </div>
  )
}

export default App;

