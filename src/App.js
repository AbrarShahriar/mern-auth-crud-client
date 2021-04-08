import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';

function App() {
  return (
      <div className="App">
        <Router>

          <Header></Header>

          <Switch>

            <Route exact path='/'>
              <Home />
            </Route>

            <Route path='/register'>
              <Register />
            </Route>

            <Route path='/login'>
              <Login />
            </Route>
            
          </Switch>

        </Router>

      </div>
  );
}

export default App;
