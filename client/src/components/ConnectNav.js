import { useSelector } from 'react-redux';
import moment from 'moment';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
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
            <div>Pending Balance</div>
            <div>Payout Settings</div>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
