//const fs = require('fs')
import fs from 'fs'
class ProductManager {
    constructor(path) {
        this.products = []     //para guardar en la memoria todos los productos
        this.path = path    //para guardar en la memoria la ruta del archivo
        this.init(path)     //para iniciar la instancia y crear el archivo en caso de no existir o cargar la memoria en caso de existir producto/s
    }
    init(path) {
        //verifico si existe el archivo
        let file = fs.existsSync(path)
        //console.log(file)
        if (!file) {
            //si no existe lo creo
            fs.writeFileSync(path,'[]')
            console.log('file created at path: '+this.path)
            return 'file created at path: '+this.path
        } else {
            //si existe cargo los productos en la memoria del programa
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'

        }
    }
    async addProduct({title,description,price,thumbnail,stock})  {
        try {    
           
            if (!title || !description || !price || !thumbnail) {
       
            console.log("Debes completar todos los campos");
          
            return null;
          
           }else{
            //defino el objeto que necesito agregar al array
            let data = {title,description,price,thumbnail,stock}
            //si la memoria tiene productos
            if (this.products.length>0) {
                //busco el id del último elemento y le sumo 1
                let next_id = this.products[this.products.length-1].id+1
                //agrego la propiedad al objeto
                data.id = next_id
            } else {
                //en caso que no tenga: asigno el primer id
                data.id = 1
            }
            if(stock === undefined){data.stock = 0}
            //agrego el objeto (producto) a la memoria del programa
            this.products.push(data)
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            return data
        }
        } catch(error) {
            console.log(error)
            return 'addProduct: error'
        }
    }
    read_products() {
        return this.products;
    }

    read_product(id) {
        let productFound = this.products.find((each) => each.id === id);
        //console.log(productFound)
        return productFound;
    }    
    getProducts() {
        try {
        if (this.products.length === 0) {
            console.log('Not found');
        }
        console.log(this.products);
        return this.products;
        } catch (error) {
        console.log(error);
        return 'getProduct: Error';
        }
    }
  
 getProductById(pid) {
        let buscar = this.read_product(pid);
        try {
        if (buscar) {
            console.log(buscar);
            return buscar;
        }
        console.log('not found');
        return 'Not found'
        } catch (error) {
        console.log(error);
        return 'getProductById: Error';
        }
    }
        async upDateProduct(id,data) {
        //data es el objeto con las propiedades que necesito modificar del producto
        try {
            //busco el producto
            let productFound = this.read_product(id);
            //itero para modificar la propiedad correspondiente
            if(productFound){
            for (let prop in data) {
                //console.log(prop)
                productFound[prop] = data[prop]
            }
        }else{ console.log('Not found')
        return 'Not found'
        }
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.products,data_json)
            console.log('updateProduct: done'+id)
            return 'updateProduct: done'+id
        } catch(error) {
            console.log(error)
            return 'updateProduct: error'
        }
    }
    async deleteProduct(id) {
        try {
            let productFound = this.read_product(id);
            if(productFound){
            //saco el producto
            this.products = this.products.filter(each=>each.id!==id)
            //console.log( this.products)
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('deleteProduct: done'+id)
            return 'deleteProduct: done'+id
        }else{
            console.log('Not found')
            return 'Not found'
        }
             
        } catch(error) {
            console.log(error)
            return 'deleteProduct: error'
        }
    }
}

let prod_manager  = new ProductManager('./src/data/products.json')


export default prod_manager