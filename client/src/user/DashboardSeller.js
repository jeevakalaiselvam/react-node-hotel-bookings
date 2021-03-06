import DashboardNav from '../components/DashboardNav';
import ConnectNav from '../components/ConnectNav';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { createConnectAccount } from '../actions/stripe';
import { useState } from 'react';
import { toast } from 'react-toastify';

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res); //We need to get login link
      //Get URL for Stripe onboarding sent back from server in response and onboard the user
      //On successful onboarding, User will be sent back to the URL mentioned in RETURN URL by STRIPE
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error('Stripe connect failed, Try again.');
      setLoading(false);
    }
  };

  const connected = () => (
    <div className='container-fluid p-2'>
      <div className='row'>
        <div className='col-md-10'>
          <h2>Your Hotels</h2>
        </div>
        <div className='col-md-2'>
          <Link to='/hotels/new' className='btn btn-primary'>
            + Add New
          </Link>
        </div>
      </div>
    </div>
  );

  const notConnected = () => (
    <div className='container-fluid p-2'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 text-center'>
          <div className='p-5 pointer'>
            <HomeOutlined className='h1' />
            <h2>Setup payouts to post hotel rooms</h2>
            <p className='lead'>
              Upseas partners with stripe to transfer earnings to your bank
              account
            </p>
            <button
              disabled={loading}
              className='btn btn-primary mb-3'
              onClick={handleClick}
            >
              {loading ? 'Processing...' : 'Setup Payouts'}
            </button>
            <p className='text-muted'>
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className='container-fluid bg-secondary p-5'>
        <ConnectNav />
      </div>
      <div className='container-fluid p-4'>
        <DashboardNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
};

export default DashboardSeller;
