import styles from './UserListModal.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { useEffect } from 'react';
import { User } from '../../../types/user';
import { scaleVariants } from '../../../animations/Animations';
import CloseButton from '../../CloseButton/CloseButton';

interface UserListModalProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  activeModal: boolean;
  users: User[];
  title?: string;
}

const UserListModal = ({
  close,
  activeModal,
  users,
  title,
}: UserListModalProps) => {
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModal]);

  return (
    <AnimatePresence mode="wait" onExitComplete={() => close(false)}>
      {activeModal && (
        <div className={styles.userListModal} onClick={() => close(false)}>
          <motion.div
            variants={scaleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.top}>
              <h1>{title ? title : 'Followers'}</h1>
              <CloseButton handleClick={() => close(false)} />
            </div>
            <hr />
            <ul className={styles.users}>
              {users?.length > 0 &&
                users.map((user) => (
                  <li className={styles.users} key={user.id}>
                    <Link
                      to={`/profile/${user.username}`}
                      className={`${styles.link} ${styles.user}`}
                      onClick={() => close(false)}
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt="" />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          <AiOutlineUser />
                        </div>
                      )}
                      <div>{user.name}</div>
                    </Link>
                    <hr />
                  </li>
                ))}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default UserListModal;
