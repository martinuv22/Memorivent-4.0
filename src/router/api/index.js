import { Router } from "express";
import products_router from "./products.js"
import carts_router from "./carts.js"

const router = Router()


router.use('/products',products_router)
router.use('/carts',carts_router)



export default router
//aca llamo al enrutador de los recursos (product,cart, user)