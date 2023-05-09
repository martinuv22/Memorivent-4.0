import { Router } from "express";
import api_router from './api/index.js';
//import view_router from './views/index.js'

const router = Router();
//toda las rutas que importen json van a tener el endpoint "/api"
router.use('/api',api_router)
//toda las rutas que importen vistas van a tener el endpoint "/"
//router.use('/',view_router)
export default router;

//enrutador principal de la aplicacion
//llamo al enrutador de la api y de las vistas