import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
//Components
import TopNav from './components/TopNav';
import Home from './booking/Home';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller';
import NewHotel from './hotels/NewHotel';

toast.configure();

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <TopNav />
        <ToastContainer
          position='top-center'
          progressClassName='toastProgress'
          bodyClassName='toastBody'
        />
        <Switch>
          {/* Exact route is important */}
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute
            exact
            path='/dashboard/seller'
            component={DashboardSeller}
          />
          <PrivateRoute exact path='/hotels/new' component={NewHotel} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
