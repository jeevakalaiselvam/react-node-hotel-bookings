import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../actions/auth';

toast.configure();

const Register = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password });
      console.log('REGISTERED USER -> ', res);
      toast.success('Register success. Please login now.');
      history.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='container-fluid bg-secondary h1 p-5 text-center'>
        <h1>Register</h1>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <RegisterForm
              handleSubmit={handleSubmit}
              name={name}
              email={email}
              password={password}
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
