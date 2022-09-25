import bcrypt from 'bcrypt'
import Customer from "../schema/customer.js"

const PostCustomer=async(req,res)=>{
       

    const excustomer=await Customer.find();
    
        try {
          const hash=await bcrypt.hash(req.body.password,10)
          console.log(hash)
            let customer=new Customer({ 
                customerId:`cuid${excustomer.length+1}`,
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                user_name:req.body.first_name,
                email:req.body.email,
                password:hash,
                dob:req.body.dob,
                gender:req.body.gender,
                image:req.body.image,
                address:{
                  addressId:req.body.address.addressId,
                   city:req.body.address.city,
                   state:req.body.address.state,
                   country:req.body.address.country,
                   pinCode:req.body.address.pinCode 
                }
            });
            let result=await customer.save();
            return res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error.message)
        }}

//Get All Customer
const GetAllCustomer=async(req,res)=>{
    try{
      const view=await Customer.find()
      res.send(view)
  
    }catch(error){
      res.status(400).send(error.message)
    }
}
//get customerid wise

const customeridWise=async(req,res)=>{
    const cidwise=await Customer.findOne({customerId:req.params.customerId})
    if(cidwise===null)  return res.status(400).send("There is no customer in this id")
    res.send(cidwise)
}

const search=async(req,res)=>{
  const cidwise=await Customer.find({customerId:req.params.customerId})
  if(cidwise===null)  return res.status(400).send("There is no customer in this id")
  console.log(cidwise)
  res.send(cidwise)
}


//delete customer id
const deleteCustomer=async(req,res)=>{
    try{
      let id=req.params.customerId
      console.log(id);
      const view=await Customer.findOne({customerId:id})
      if(!view) return res.status(400).send("There is no customer")

      let del=await Customer.deleteOne({_id:view._id})
      console.log(del)
      return res.send(`${view.customerId} Successfully deleted`)
  
    }catch(error){
      return res.status(400).send(error.message)
    }
}
//UpdateCustomer
const UpdateCustomer=async(req,res)=>{

    try {
     let user=await Customer.findOne({customerId:req.params.customerId})
     console.log(user)
     if(!user) return res.send('user not found')
    
     const updatedata={  
       first_name: req.body.first_name || user.first_name,
       last_name: req.body.last_name || user.last_name,
       user_name:req.body.user_name || user.user_name,
       email:req.body.email || user.email,
       dob:req.body.dob || user.dob ,
       image:req.body.incharge || user.image,
       address:{
           addressId:req.body.addressId ||user.address.addressId,
           landmark:req.body.landmark|| user.address.landmark,
            city:req.body.city|| user.address.city,
            state:req.body.state|| user.address.state,
            country:req.body.country || user.address.country,
            pinCode:req.body.pinCode || user.address.pinCode
       }
       }
   
     let result=await Customer.findOneAndUpdate({customerId:req.params.customerId},{$set:updatedata},{new:true})
     res.send(result)
      
     
    } catch (error) {
     res.status(400).send(error.message)
    }

}
export {PostCustomer,GetAllCustomer,customeridWise,deleteCustomer,UpdateCustomer,search}