import { useState } from 'react';
import styles from './Account.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PopUp from '../../../components/PopUp/PopUp';
import { useAuth } from '../../../context/Auth/AuthContext';

const Account = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser, currentUser } = useAuth();

  const deleteAccount = async () => {
    if (currentUser?.email === 'admin@myfeed.com') {
      window.alert("You can't delete Admin account!");
      return;
    }

    try {
      await axios.delete('/api/auth/delete');
      setCurrentUser(null);
      navigate('/signin');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PopUp
        title="Are you sure you want to delete your account ?"
        isActive={isActive}
        setIsActive={setIsActive}
        callback={deleteAccount}
      />
      <div className={styles.account}>
        <div className={styles.accountItem}>
          <h2 className={styles.accountItemTitle}>Delete Account</h2>
          <button
            className={styles.accountItemDelete}
            onClick={() => setIsActive(true)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;
