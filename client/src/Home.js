import './App.css';
import { Alldata,RegisterUser,getUser,deleteUser,updateUser,searchUser, getAdmin } from './connection';
import {useState,useEffect} from "react";
import List from './Lists.js';
import { FaSearch,FaPlus,FaWindowClose, FaCheck, FaSave,  FaRegSave, FaChevronRight, FaUser, FaMailBulk, FaMailchimp, FaEnvelope, FaEdit, FaTrash } from 'react-icons/fa';
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";


import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function Home(){
// get token from local storage

   let token=localStorage.getItem('auth')
    
  
  

    const [all,setAll]=useState([])
    const [div, setDiv] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const[user,setUser]=useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    dob:"",
    gender:"",
    addressId:"",
    landmark:"",
    city:"",
    state:"",
    country:"",
    pinCode:""
})

    function add() {
        setShow(true);
      }
// get all from connection
console.log(token)
async function getAll(){
    await Alldata(token)
    .then(res=>{
    console.log(res.data)
    setAll(res.data)
})
.catch(error=>console.log(error))
}
// render once before updating
useEffect(()=>{
    getAll()
    
},[])

// add user from connection

async function addUser(){
    // console.log(user)
 let data={     
first_name:user.first_name,
last_name:user.last_name,
email:user.email,
password:user.password,
dob:user.dob,
gender:user.gender,
address:{
    addressId:user.addressId,
    landmark:user.landmark,
    city:user.city,
    state:user.state,
    country:user.country,
    pinCode:user.pinCode
  }
    }
    // console.log(data)
  await RegisterUser(token,data)
  .then(res=>
    console.log(res.data))
    .catch(error=>
        console.log(error))
}

function  handleChange(e){
    setUser({...user,[e.target.name]:e.target.value})
      
}
function  handleEdChange(e){
  
    setEdit({...edit,[e.target.name]:e.target.value})   
}

const[one,setOne]=useState()
const[view,setView]=useState(false)
 
 async function getaUser(e,val){
   val=e.target.value
    console.log(val);
    setId(val)
   
    await getUser(token,val)
    .then(res=>{console.log(res.data)
    setOne(res.data)
setView(true)})
    .catch(err=>console.log(err))
 }
const[id,setId]=useState()

async function delUser(e,val){
  
    val=e.target.value
    await deleteUser(token,val)
    .then(res=>{alert(res.data)})
    .catch(err=>console.log(err))
}

const[edit,setEdit]=useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    dob:"",
    gender:"",
    addressId:"",
    landmark:"",
    city:"",
    state:"",
    country:"",
    pinCode:""
})
const[eshow,seteshow]=useState(false)

async function updateuser(e,val){
    seteshow(true)
    //  val=e.target.value

     let data={
        first_name:edit.first_name ||one.first_name,
        last_name:edit.last_name ,
    
        address:{
            addressId:edit.addressId,
            city:edit.city,
            state:edit.state,
            country:edit.country,
            pinCode:edit.pinCode
          }
     }
    await updateUser(token,id,data)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
}

const[search,setSearch]=useState({customerId:''})


async function searchF(e){
    await searchUser(token,search.customerId)
    .then((res)=>setAll(res.data))
    .catch(err=>console.log(err))
 }
 const style = {
  backgroundColor:"grey",
  height: "30px",
  width: "30px",
  border:"none",
  marginLeft:"1em"
};
// pagination content
const perPage = 5;
const [cpage, setCpage] = useState(1);

let arr = [];
const page = 20 ;
const cal = page / perPage;
for (let i = 1; i <= cal; i++) {
  arr.push(i);
}
const start = (cpage - 1) * perPage;
const end = start + perPage;
let p = all.slice(start, end);

function handle(e) {
  setCpage(e.target.value);
  e.target.style.backgroundColor = "maroon";
}

return(
    <>
    <div className="main">
        <div className='div1'>
        <div className="icon-div">
            <input className="search" placeholder="Customers" value={search.customerId} onChange={(e)=>setSearch({...search,customerId:e.target.value})} type="text" />
            <FaSearch onClick={searchF} className="fas" />
            <FaPlus onClick={add} className="fap" />
          </div>
          <hr></hr>
          <select className="select-sort">
            <option>sortby</option>
          </select>
        {/* <p>{JSON.stringify(all)}</p> */}
        {all.map((item,key)=>(
        <><List title={`${item.first_name} ${item.last_name}`} 
        subtitle={item.email}  idvalue={item.customerId}  src={item.image} idClick={getaUser} idchange={((e)=>{getaUser(e)})}></List>
        </> ))}<br />
        
      {arr.map((item) => (
        <button style={style} onClick={handle} value={item}>
          {item}
        </button>
      ))}
        </div>

        <div className='div2'>
           
             {!view?null:(
                
                   <>
                <div className='profile1'>
                    {!one.image?(
                        <FaUser className='prof1-icon'/>
                    ):(
                        <img src={one.image} className="prof1-img" alt="Profile"></img>
                    )}                    
                  
                    <h3 className='usr-flname'>{`${one.first_name} ${one.last_name}`}</h3> <br /> 
                    <div className='content-prof1'>
                    <span className='usr-name'><FaUser />&nbsp;{one.user_name}</span>
                    <span className='usr-mail'><FaEnvelope />&nbsp;{one.email}</span>  
                    </div>
                    <div>
                        <button className='btns1' value={one.customerId} onClick={()=>seteshow(true)} onChange={(e)=>updateuser(e)}><FaEdit />&nbsp;Edit</button>&nbsp;&nbsp;
                        <button className='btns1' value={one.customerId} onChange={(e)=>delUser(e)} onClick={delUser}><FaTrash />&nbsp;Delete Customer</button>
                    </div>   
            </div>
            
            <hr></hr><br />
            <div className='profile2'>
                <h3 className='title-h3'>Profile Details</h3>
                <ul className='first-ul'>
                    <div>
                    <h5>First name</h5>
                    <li>{one.first_name}</li>
                    </div>
                    <div>
                    <h5>Last name</h5><li>{one.first_name}</li></div>
                    <div><h5>Gender</h5><li>{one.gender}</li></div>
                    <div><h5>DOB</h5><li>{one.dob}</li></div>
                </ul><br />
                <h3 className='title-h3'>Address</h3>
               <div className='address-div'>
              
               <ul>
                <li><span>AddressId</span><span className='right-span'>{one.address.addressId}</span></li><br />
                <li><span>City</span><span className='right-span'>{one.address.city}</span></li><br />
                <li><span>State</span><span className='right-span'>{one.address.state}</span></li><br />
                <li><span>Country</span><span className='right-span'>{one.address.country}</span></li><br />
                <li><span>ZipCode</span><span className='right-span'>{one.address.pinCode}</span></li><br />

               </ul>
               </div>
            </div>
            </>
           )}
        </div>
    </div>
    <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <hr style={{ color: "green" }} className="div1hr"></hr>
            </Modal.Title>
            <Modal.Title>
              <hr style={{ color: !div && "green" }} className="div2hr"></hr>
            </Modal.Title>
          </Modal.Header>
          <Modal.Title>AddUser|Profile Details</Modal.Title>

          <Modal.Body>
            {div ? (
              <>
                <Form id="div1">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" name="first_name" onChange={handleChange} value={user.first_name} placeholder="FirstName*" autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" name="last_name" onChange={handleChange} value={user.last_name} placeholder="LastName*" autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="email" placeholder="Email*" onChange={handleChange} value={user.email} name="email" autoFocus />
                  </Form.Group><br />
                  
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="password" placeholder="Password*" onChange={handleChange} value={user.password} name="password"  autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Gender*"onChange={handleChange} value={user.gender} name="gender" />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="date" placeholder="DOB*" onChange={handleChange} value={user.dob} name="dob" />
                  </Form.Group><br />
                  
                </Form>
                <button className='cancel' onClick={() => setDiv(true)}>
                  <FaWindowClose />&nbsp;Cancel
                </button>
                <button
                  className='proceed'
                  onClick={() => {
                    setDiv(false);
                    
                  }}
                >
                 <FaCheck />proceed
                </button>
              </>
            ) : (
              <>
                <Form id="div2">
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Address Line 1*" onChange={handleChange} value={user.addressId} name="addressId" autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Country*" value={user.country} name="country" onChange={handleChange} autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="State*" value={user.state} name="state" onChange={handleChange} autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="City*" value={user.city} name="city" onChange={handleChange} autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Zip code*" value={user.pinCode} name="pinCode" onChange={handleChange} autoFocus />
                  </Form.Group><br />
                  
                </Form>
                <button className='cancel' onClick={() => setDiv(true)}>
                  <FaWindowClose />&nbsp;Cancel
                </button>
           
                <button
                  className='proceed'
                  onClick={() => {
                    setDiv(false) 
                    addUser()
                  }}
                >
                 <FaRegSave />&nbsp;Save
                </button>
              </>
            )}
          </Modal.Body>
        
        </Modal>
      </div>
      {/* edited model box */}
      <div> 
      <Modal show={eshow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <hr style={{ color: "green" }} className="div1hr"></hr>
            </Modal.Title>
            <Modal.Title>
              <hr style={{ color: !div && "green" }} className="div2hr"></hr>
            </Modal.Title>
          </Modal.Header>
          <Modal.Title>Edit Details</Modal.Title>

          <Modal.Body>
            {div ? (
              <>
                <Form id="div1">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" name="first_name" onChange={handleEdChange} value={edit.first_name} placeholder="FirstName*" autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" name="last_name" onChange={handleEdChange} value={edit.last_name} placeholder="LastName*" autoFocus />
                  </Form.Group><br />
                  
                </Form>
                <button className='cancel' onClick={() =>{
                    setDiv(true)
                    seteshow(false)}}>
                  <FaWindowClose />&nbsp;Cancel
                </button>
                <button
                  className='proceed'
                  onClick={() => {
                    setDiv(false);
                    
                  }}
                >
                 <FaCheck />proceed
                </button>
              </>
            ) : (
              <>
                <Form id="div2">
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Address Line 1*" onChange={handleEdChange} value={edit.addressId} name="addressId" autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Country*" value={edit.country} name="country" onChange={handleEdChange} autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="State*" value={edit.state} name="state" onChange={handleEdChange} autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="City*" value={edit.city} name="city" onChange={handleEdChange} autoFocus />
                  </Form.Group><br />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Zip code*" value={edit.pinCode} name="pinCode" onChange={handleEdChange} autoFocus />
                  </Form.Group><br />
                  
                </Form>
                <button className='cancel' onClick={() => setDiv(true)}>
                  <FaWindowClose />&nbsp;Cancel
                </button>
           
                <button
                  className='proceed'
                  onClick={() => {
                    setDiv(false) 
                    updateuser()
                  }}
                >
                 <FaRegSave />&nbsp;Save
                </button>
              </>
            )}
          </Modal.Body>
        
        </Modal>
      </div>
    </>
    )
}