import { useDispatch } from "react-redux";
import "../Styles/Navbar.scss"
import { BiSolidImageAdd } from 'react-icons/bi';
import { searchImage } from "../slice/gallerySlice";



const Navbar = ({ openModel }) => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(searchImage(e.target.value));
  }

  return (
    <div className="container">
      <header className='header'>
        <h3 className="header__title">My Unsplash</h3>
        <div className="mobile">
          <div className="header__search">
            <input type="text" className="search" onChange={handleSearch} placeholder='Search by name'/>
          </div>
            <button className='btn-nav' onClick={openModel}>
              <BiSolidImageAdd className="icon" />
              <span className="btn-text"> Add a photo</span>           
            </button>        
        </div>
      </header>
    </div>
  )
}

export default Navbar