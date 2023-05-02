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
            console.log('id´s created product: '+data.id)
            return 'id´s product: '+data.id
        }
        } catch(error) {
            console.log(error)
            return 'addProduct: error'
        }
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
    read_products() {
        return this.products;
    }

    read_product(id) {
        let productFound = this.products.find((each) => each.id === id);
        //console.log(productFound)
        return productFound;
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

let manager = new ProductManager('./data/products.json')
async function up() {
    await manager.addProduct({title:'pendrive1',description:'64GB marca Sandisk',price:'$5.000',thumbnail:"imagen"})
    await manager.addProduct({title:'pendrive2',description:'120GB marca Sandisk',price:'$10.000',thumbnail:"imagen",stock:100})
    await manager.addProduct({title:'pendrive3',description:'500GB marca Sandisk',price:'$20.000',thumbnail:"imagen",stock:150})
    await manager.addProduct({title:'pendrive4',description:'64GB marca Kingtong',price:'$8.000',thumbnail:"imagen",stock:50})
    await manager.addProduct({title:'pendrive5',description:'120GB marca Kingtong',price:'$12.000',thumbnail:"imagen",stock:50})
    await manager.addProduct({title:'pendrive6',description:'500GB marca Kingtong',price:'24.000',thumbnail:"imagen",stock:70})
    await manager.addProduct({title:'Tarjeta de Memoria1',description:'64GB marca Kingtong',price:'$8.000',thumbnail:"imagen",stock:60})
    await manager.addProduct({title:'Tarjeta de Memoria2',description:'128GB marca Kingtong',price:'$12.000',thumbnail:"imagen",stock:90})
    await manager.addProduct({title:'Disco Duro Extraible1',description:'1TB',price:'$50.000',thumbnail:"imagen",stock:10})
    await manager.addProduct({title:'Disco Duro Extraible2',description:'2TB',price:'$80.000',thumbnail:"imagen",stock:8})
    await manager. getProductById(9)
    await manager.deleteProduct(10)
    await manager.getProducts()
}
//up()

export default manager