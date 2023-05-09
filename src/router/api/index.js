import { Router } from "express";
import products_router from './product.js'
import cart_router from './cart.js'
const api_router = Router()

api_router.use('/product',products_router)
api_router.use('/cart',cart_router)
export default api_router;

//enrutador principal de la API (para enviar datos)
//aca llamo al enrutador de los recursos (product,cart, user)