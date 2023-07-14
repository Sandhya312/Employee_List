import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import classes from "./Users.module.css";

const pageReducer = (state,action)=>{

  if(action.type==='PREV'){
    return state -1;
  }
  if(action.type ==='NEXT'){

    return state+1;
  }
}

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPage,setTotalPage] =useState(0);
  const [pageState,pageDispatch] =useReducer (pageReducer,1);

 let url = `https://reqres.in/api/users?page=${pageState}`;

  useEffect(() => {
    fetchUsers(url);
  }, [url]);

  const fetchUsers = async (url) => {
    setError(null);
    try {
      const response = await axios.get(url);
      const users = response.data.data;
      const total_page = response.data.total_pages;
      setTotalPage(total_page);
      setIsLoading(false);
      setUsers(users);
    } catch (err) {
      setError(err.message);
    }
  };

  // eslint-disable-next-line react/prop-types
  const filteredUser = users.filter((user) =>
    // eslint-disable-next-line react/prop-types
    user.first_name.toLowerCase().includes(props.searchUser.toLowerCase())
  );

  const prevPageHandler = () =>{

       if(pageState>1){
        pageDispatch({
          type:'PREV'
        })
       }
  }

  const nextPageHandler =() =>{
    
       if(pageState<totalPage){
        pageDispatch({
          type:'NEXT'
        })
       }
  }

  let content =
    filteredUser.length > 0 ? (
      <div className={classes.UsersContainer}>
        {filteredUser.map((user) => {
          return (
            <div key={user.id} className={classes.user}>
              <div className={classes.userId}>{user.id}</div>
              <div className={classes.card}>
                <img src={user.avatar} alt={user.first_name} />
              </div>
              <p>{user.first_name}</p>
            </div>
          );
        })}
      </div>
    ) : (
      <div className={classes.notFound}>
        <h3>User Not found</h3>
      </div>
    );

  return (
    <>
      {!isLoading && !error && content}
      {isLoading && !error && (
        <div className={classes.notFound}>
          <h1>Loading...</h1>
        </div>
      )}
      {error && (
        <div className={classes.notFound}>
          <h1> {error} </h1>
        </div>
      )}
      <div className={classes.btnContainer}>
        <button  onClick={prevPageHandler}>
          <h3>← Prev</h3>
        </button>
        <button onClick={nextPageHandler}>
          <h3>Next →</h3>
        </button>
      </div>
    </>
  );
};

export default Users;
