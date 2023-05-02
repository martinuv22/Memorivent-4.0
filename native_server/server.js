import express from 'express' // importo express
import manager from './script.js'
import carts from './carts.js'  
let server = express()

//defino servidor de express

let PORT = 8080                   //defino el puerto donde se va a levantar el servidor
let ready = () => console.log('server ready on port: '+PORT)   //defino la callback que se va a ejecutar cuando se levante el servidor

server.listen(PORT,ready)
server.use(express.json())
server.use(express.urlencoded({extended:true}))


let index_route = '/'
let index_function = (req,res)=> {
    let quantity_prod = manager.read_products().length
    let quantity_cart = carts.read_Carts().length
    console.log(quantity_prod,quantity_cart)
    return res.send(`<strong>Welcome to the index page.</strong><br>There are ${quantity_prod} productos and ${quantity_cart} carts.`)
}

server.get(index_route,index_function)

let api_route = '/api'
let api_function = (req,res)=> {
    let quantity_prod = manager.read_products().length
    let quantity_cart = carts.read_Carts().length
    console.log(quantity_prod,quantity_cart)
    return res.send(`<strong>Welcome to the api page.</strong><br>There are ${quantity_prod} productos and ${quantity_cart} carts.`)
}

server.get(api_route,api_function)

//Products

let one_route = '/api/products/:pid'
let one_function = (request,response)=>{
    let parametros = request.params
    let pid = Number(parametros.pid) 
    // console.log(id)
    // console.log(typeof id)
    let one = manager.read_product(pid)
    console.log(one)
    if (one) {
        return response.send({
            success: true,
            product: one
        })
    } else {
        return response.send({
            success: false,
            product: 'not found'
        })
    }
    
}
server.get(one_route,one_function)

let query_route = '/api/products'
let query_function = (req,res) => {
    try {
        let limit = req.query.limit
        let products = manager.read_products().slice(0,limit)
        return res.send({
            success: true,
            products
        })
    }catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            message: 'error'
        })
    }
}

server.get(query_route,query_function)

server.post(
    '/api/products',
    (req,res)=>{
        try {
            let title = req.body.title ?? null
            let description = req.body.description ?? null
            let price = req.body.price ?? null
            let thumbnail = req.body.thumbnail ?? null
            let stock = req.body.stock ?? null
            if (title&&description&&price&&thumbnail&&stock){
                manager.addProduct({ title, description, price, thumbnail, stock })
                return res.json({
                    status: 201,
                    message: 'created'
                })
            } else {
                return res.json({
                    status: 400,
                    message:  'check data'
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                message: 'error'
            })
        }
    }
)

server.put(
    '/api/products/:uid',
    (req,res)=> {
        try {
            if(req.body&&req.params.uid){
                let id = Number(req.params.uid)
                let data = req.body
                manager.updateProduct(id, data)
                return res.json({
                    status: 200,
                    messahe: 'Product updated'
                })
            } else {
                return res.json({
                    status: 400,
                    message: 'check data'
                })
            }
        } catch (error) {
            return 'Error'
        }
    }
)

// Carts

let carts_route = '/api/carts/:cid'
let carts_function = (request,response)=>{
    let parametros = request.params
    let cid = Number(parametros.cid) 
    let cart = carts.read_Cart(cid)
    console.log(cart)
    if (cart) {
        return response.send({
            success: true,
            product: cart
        })
    } else {
        return response.send({
            success: false,
            product: 'not found'
        })
    }
    
}
server.get(carts_route,carts_function)

let carts_query_route = '/api/carts'
let carts_query_function = (req,res) => {
    try {
        let limit = req.query.limit ?? 10
        let carts = carts.read_Carts().slice(0,limit)
        return res.send({
            success: true,
            carts
        })
    }catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            message: 'error'
        })
    }
}

server.get(carts_query_route,carts_query_function)