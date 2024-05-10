import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { useAuth } from '../../hooks/useAuth';
import css from './UserMenu.module.css'

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
    
    return (
    <div className={css.container}>
      <p className={css.text}>Welcome, {user.name}</p>
        <button type="button" onClick={() => dispatch(logOut())} className={css.btn}>
        Logout
      </button>
    </div>
  );
}

