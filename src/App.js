import React from 'react';
import './App.scss';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route
} from "react-router-dom";

// login
import Login from './components/Login';
import Register from "./components/Register";

// Home
import Home from "./components/home/Home";

// Chat
import Selection from "./components/chat/selection";
import Chat from "./components/chat/chat";

//profile
import Profile from "./components/profile/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/register" component={Register}/>
          <Route exact path="/:token/Home" component={Home}/>
          <Route exact path="/:token/Selection" component={Selection}/>
          <Route path="/:token/Chat" component={Chat}/>
        </Switch>
      </div>
    </Router>
  )

 

  // return (
    
  //   <div className="App">
  //     <Profile />
  //   </div>
  // )
}

export default App;

