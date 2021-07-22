import Home from './booking/Home';
import Register from './auth/Register';
import Login from './auth/Login';
import TopNav from './components/TopNav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        {TopNav()}
        <Switch>
          {/* Exact route is important */}
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
