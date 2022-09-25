import express from 'express'
import { adminReg,adminLogin, getAdmin } from '../controller/admin.js'






const router=express.Router()

//admin register/login
router.post('/register',adminReg)

router.post('/login',adminLogin)

router.get('/get',getAdmin)





export default  router