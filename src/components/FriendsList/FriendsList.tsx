import styles from './FriendsList.module.scss';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineUser } from 'react-icons/ai';
import { buttonVariants } from '../../animations/Animations';
import { CurrentUserProps } from '../../types/user';
import AvatarLoading from '../SkeletonLoading/AvatarLoading/AvatarLoading';

interface FriendsListProps {
  friends: CurrentUserProps[];
  isFriendsLoading: boolean;
}

const FriendsList = ({ friends, isFriendsLoading }: FriendsListProps) => {
  return (
    <div className={styles.friendsList}>
      {isFriendsLoading &&
        [1, 2, 3].map((postId) => <AvatarLoading key={postId} />)}
      {friends?.length > 0 &&
        friends.map((friend) => (
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            className={styles.friend}
            key={friend.id}
          >
            <NavLink
              to={`/profile/${friend?.username}`}
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <div className={styles.userImage}>
                <div className={styles.statusBadge}></div>
                {friend?.avatar ? (
                  <img src={friend?.avatar} alt={``} />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <AiOutlineUser />
                  </div>
                )}
              </div>

              <h3 style={{ textTransform: 'capitalize' }}>{friend?.name}</h3>
            </NavLink>
          </motion.div>
        ))}
    </div>
  );
};

export default FriendsList;
