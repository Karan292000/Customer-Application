import express from 'express'
import { PostCustomer,GetAllCustomer,customeridWise,deleteCustomer,UpdateCustomer, search} from '../controller/customer.js'

import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

const router=express.Router()
//Add New Customer
router.post('/Customer/',[auth,admin],PostCustomer)
//get All Customer
router.get('/GetAll',[auth,admin],GetAllCustomer)
//get customerid wise
router.get("/getbyid/:customerId",[auth,admin],customeridWise)
//delete customer
router.delete("/delete/:customerId",[auth,admin],deleteCustomer)
//update customer
router.put("/update/:customerId",[auth,admin],UpdateCustomer)
export default router
// serach customer
router.get("/search/:customerId",[auth,admin],search)