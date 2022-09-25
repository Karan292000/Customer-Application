import react from 'react'
import axios from 'axios'

export  const Alldata=(token)=>{
    let headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':token
    }
    return axios.get('https://gdkn-zxy.herokuapp.com/api/post/GetAll',{headers})
}

export const RegisterUser=(token,user)=>{
    let headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':token
    }
    return axios.post('https://gdkn-zxy.herokuapp.com/api/post/Customer',{
        
first_name:user.first_name,
last_name:user.last_name,
email:user.email,
password:user.password,
dob:user.dob,
gender:user.gender,
address:{
    addressId:user.address.addressId,
    landmark:user.address.landmark,
    city:user.address.city,
    state:user.address.state,
    country:user.address.country,
    pinCode:user.address.pinCode
  }
 },{headers})
}


export const getUser=(token,customerId)=>{
    let headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':token
    }
    return axios.get(`https://gdkn-zxy.herokuapp.com/api/post/getbyid/${customerId}`,{headers})
}
export const searchUser=(token,customerId)=>{
    let headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':token
    }
    return axios.get(`https://gdkn-zxy.herokuapp.com/api/post/search/${customerId}`,{headers})
}

export const deleteUser=(token,customerId)=>{
    let headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':token
    }
    return axios.delete(`https://gdkn-zxy.herokuapp.com/api/post/delete/${customerId}`,{headers})
}

export const updateUser= (token,customerId,user) => {
    let headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':token
    }
    
    const url=`https://gdkn-zxy.herokuapp.com/api/post/update/${customerId}`
    return axios.put(url,{
        first_name:user.first_name,
last_name:user.last_name,
email:user.email,
password:user.password,
dob:user.dob,
gender:user.gender,
address:{
    addressId:user.address.addressId,
    landmark:user.address.landmark,
    city:user.address.city,
    state:user.address.state,
    country:user.address.country,
    pinCode:user.address.pinCode
  }
},{headers})
}

export const getAdmin=()=>{
    return axios.get(`https://gdkn-zxy.herokuapp.com/api/admin/get`)
}



