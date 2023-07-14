
import classes from './Header.module.css';
import Search_icon from '../../assets/Search_icon.svg';
const Header = (props) =>{
    return <div className={classes.header}>
      <div className={classes.mainpart}>
      <h1>Employee List</h1>
      <div className={classes.searchDiv}>
      <input 
      type="search" 
      name="search" 
      id="search" 
      placeholder='Search Users...'
      // eslint-disable-next-line react/prop-types
      value={props.searchUser}
      // eslint-disable-next-line react/prop-types
      onChange={props.search}
       />
       <img src={Search_icon} alt="" />
      </div>
      </div>
      <hr />
    </div>
};

export default Header;