import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../actions/auth';
import LoginForm from '../components/LoginForm';
import { useDispatch } from 'react-redux';

const Login = ({ history }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('LOGIN FORM SUBMITTED');
    try {
      let res = await login({ email, password });
      console.log('LOGIN RESPONSE OBTAINED', res);
      if (res.data) {
        console.log(
          'SAVING USER INFORMATION IN REDUX AND LOCAL STORAGE AND REDIRECTING TO LOGIN PAGE'
        );
        window.localStorage.setItem('auth', JSON.stringify(res.data));

        //Dispatch event to Redux
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: res.data,
        });
        history.push('/dashboard');
      }
    } catch (err) {
      console.log(err);
      //if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className='container-fluid bg-secondary p-5 text-center'>
        <h1>Login</h1>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
