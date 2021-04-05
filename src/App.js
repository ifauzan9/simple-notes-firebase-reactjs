import logo from './logo.svg';
import './style.scss';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from './containers/register';
import Login from './containers/login';
import Dashboard from './containers/dashboard';

import { Provider } from 'react-redux';
import { storeNew } from './config/redux';


function App() {
  return (
    <Provider store={storeNew}>
      <Router>
        <ul className="navbar-menu">
          <Link className="img-logo" to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg" alt="" /></Link>
          <Link to="/">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </ul>
        <Switch>
          <Route path="/" exact component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
