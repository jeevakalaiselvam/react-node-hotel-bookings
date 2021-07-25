import { LoadingOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAccountStatus } from '../actions/stripe';
import { updateUserInLocalStorage } from '../actions/auth';

const StripeCallback = ({ history }) => {
  //Get Auth from Redux state
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  //When the component mounts, Make a request to backend using useEffect to store user information sent by Stripe afte user successfully completed onboarding process
  //This useEffect runs everytime component mounts or auth state changes
  useEffect(() => {
    if (auth && auth.token) accountStatus(auth.token);
    //Do any clean up needed
    return () => {};
  }, [auth]);

  //Get Account status from backend, Check if user has completed stripe onboarding
  const accountStatus = async () => {
    try {
      const res = await getAccountStatus(auth.token);
      console.log('USER ACCOUNT STATUS OBTAINED FROM STRIPE CALLBACK');
      //console.log(res);
      //Store user data after stripe onboarding into local storage and redux
      updateUserInLocalStorage(res.data, () => {
        dispatch({
          type: 'LOGGED_IN_USER', //Save user data into local storage
          payload: res.data,
        });

        //Redirect to seller dashboard
        window.location.href = '/dashboard/seller';
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='d-flex justify-content-center p-5'>
      <LoadingOutlined className='display-1 p-5 text-danger' />
    </div>
  );
};

export default StripeCallback;
