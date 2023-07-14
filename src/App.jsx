
import { useState } from 'react'
import './App.css'
import Users from './components/Users/Users';
import Header from './components/Header/Header';
function App() {

  const [searchUser,setsearchUser] =useState("");

  const searchHandler = (e) =>{

    setsearchUser(e.target.value.trim());
  }


  return (
    <>
   <Header searchUser={searchUser} search={searchHandler} />
    <Users searchUser={searchUser}  />
    </>
  )
}

export default App
