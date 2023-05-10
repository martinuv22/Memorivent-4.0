import { Router } from "express";
import api_router from './api/index.js'

const index_router = Router()

index_router.use('/api',api_router) //enrutador de rutas que respondan con json (datos)


export default index_router;

//enrutador principal de la API (para enviar datos)
