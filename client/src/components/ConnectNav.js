import { useSelector } from 'react-redux';
import moment from 'moment';
import { Card, Avatar, Badge } from 'antd';
import { currencyFormatter, getAccountBalance } from '../actions/stripe';
import { useEffect, useState } from 'react';
import { log } from '../util/log';
import { payoutSetting } from '../actions/stripe';
import { SettingOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';

const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      log('ACCOUNT BALANCE OBTAINED FROM BACKEND', res.data);
      console.log(res.data);
      setBalance(res.data);
    });
  }, []);

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(token);
      console.log('RESPONSE FOR GETTING PAYOUT SETTING LINK -> ', res);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (err) {
      log('UNABLE TO ACCESS SETTINGS -> ', err);
      setLoading(false);
      toast.error('Unable to access settings. Try again');
    }
  };

  return (
    <div className='d-flex justify-content-around'>
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {/* Only show payment related items if user is logged in and is a seller and have charges enabled*/}
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            <Ribbon text='Available' color='geekblue'>
              <Card className='bg-light p-4'>
                {balance &&
                  balance.pending &&
                  balance.pending.map((pendingBalance, index) => (
                    <span key={index} className='lead'>
                      {console.log(
                        'PENDING BALANCE SENT FOR FORMATTING',
                        pendingBalance
                      )}
                      {currencyFormatter(pendingBalance)}
                    </span>
                  ))}
              </Card>
            </Ribbon>
            <Ribbon text='Payouts' color='geekblue'>
              <Card
                className='bg-light p-4 pointer'
                onClick={handlePayoutSettings}
              >
                <SettingOutlined className='h5 pt-2' />
              </Card>
            </Ribbon>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
