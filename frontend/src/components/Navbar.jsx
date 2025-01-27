
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      await axios.post(BASE_URL+'/logout',{},{withCredentials: true});
      dispatch(removeUser());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="navbar bg-base-300">
    <div className="flex-1 mx-5">
        
      <Link to="/" className="text-xl btn btn-ghost"><img src={Logo} alt="logo" className= "w-10 h-10 " />DevTinder</Link>
    </div>
  {user &&  <div className="flex-none gap-1">
      {/* <div className="form-control">
        <input type="text" placeholder="Search" className="w-24 input input-bordered md:w-auto" />
      </div> */}
      <p className='px-1'>Welcome, {user.firstName}</p>
      <div className="mx-5 dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link to='/profile' className="justify-between">
              Profile 
            </Link>
          </li>
          <li><a>Settings</a></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>}
  </div>
  )
}

export default Navbar