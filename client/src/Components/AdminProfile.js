import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useState,useContext} from 'react';
import {useFormik} from 'formik'
import {object,string} from 'yup'
import { FaUserAlt,FaUserLock } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaCheck,FaWindowClose } from "react-icons/fa";


export default function AdminLogin(){
  
 let token=localStorage.getItem('auth')

  useEffect(()=>{
    if(!token)
        open1()
  },[])
  
    const LoginValidation = object().shape({
      email: string().required(),
      password: string().min(6).required(),
    });

   
   
  const formik = useFormik({
    initialValues:{
      email:"",password:""
    },
  
    onSubmit: values => {
      login()
    },
    validationSchema:LoginValidation
  });
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
    
 async function login(){
       setShow(true)
      const url='https://gdkn-zxy.herokuapp.com/api/admin/login'
      let payload={
        email:formik.values.email,
        password:formik.values.password,
      }
    
        await axios.post(url,payload,
          {
            validateStatus: function (status) {
              return status >= 200 && status < 300 || (status === 401);
           },
          })
        .then(res=>{
          if(res.status===401){
            console.log(res.data)
          }
          else{
            console.log(res.data)
            localStorage.setItem('auth',res.data)
            setShow(false)
            window.location.href='#/Home'
            
          }                          
     })
     .catch(err=>{
      return console.log(err)
     })        
  }


  function open1(){
   
    setShow(true)
  }
 
  return(
  <>
 
 <div className="container">

    <form className="admin-form" onSubmit={formik.handleSubmit}>
      

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <hr style={{ color: "green" }} className="div1hr"></hr>
            </Modal.Title>
            <Modal.Title>
              <hr style={{ color:"green" }} className="div2hr"></hr>
            </Modal.Title>
          </Modal.Header>
          <Modal.Title>Admin Login</Modal.Title>
          <Modal.Body>
          
                <Form id="div1">
                  <Form.Group
                    className="mb-3"
                  >
                    <Form.Control placeholder="Enter your email" 
                           type="email" id="email" name="email"
                     onChange={formik.handleChange}  value={formik.values.email} autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    >
                    <Form.Control id="password" name="password"  placeholder="Enter your password" type="password"
                     onChange={formik.handleChange}   value={formik.values.password} autoFocus />
                  </Form.Group><br />
                  
                </Form>
                <button className='cancel' onClick={() =>{
                   
                }}>
                  <FaWindowClose />&nbsp;Cancel
                </button>
                <button
                  className='proceed'
                  onClick={() => {
                   login()
                    
                  }}
                >
                 <FaCheck />proceed
                </button>
          </Modal.Body>

        </Modal>
        </form>
        </div>
       
  

                                                                          
</>
)
}