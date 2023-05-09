import { Router } from "express";

const router = Router()
//next para midderwares de error
router.get('/',(req,res,next)=>res.json({status:ok}))
//router.post()
//router.put()
//router.delete()

export default router