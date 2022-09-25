import React,{useEffect, useState} from 'react';
import {getAdmin} from '../connection.js';
import user from '../../src/user1.jfif'
import '../App.css'
import { FaSignInAlt } from 'react-icons/fa';
function Header({heading}) {
  
 
 const[admin,setAdmin]=useState()

 

// get admin details 
  async function getadmin(){     
    await getAdmin()
    .then((res)=>setAdmin(res.data))
    .catch((err)=>console.log(err))

}
useEffect(()=>{
  if(token){
    getadmin()
  }
  return 0
},[])

let token=localStorage.getItem('auth')
  return (
  <>
  <div className='headers'>
    <h2 className='h2-title'>{heading}</h2>
    <div>
      {!token?(
        <a className="admin-login" href="#/AdminProfile"><FaSignInAlt />&nbsp;Login</a>
      ):(
        <>
        {!admin?null:(
         <>
         <div className='head-div'>
        <img className="head-img" src={user} alt="user"></img>
        <div className='text-mail'>
        <span>{admin.name}</span>
         <p>{admin.email}</p>
         </div>
        </div>
         </>
        )}
        </>
        
      )}
     
    </div>
  </div>
  </>
  );
}


export default Header;