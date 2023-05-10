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
            return 201
        } else {
            //si existe cargo los productos en la memoria del programa
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 200

        }
    }
    async addProduct({title,description,price,thumbnail,stock})  {
        try {
            if (title&&description&&price&&thumbnail&&stock) {
                let data = { title,description,price,thumbnail,stock }
                if (this.products.length>0) {
                    let next_id = this.products[this.products.length-1].id+1
                    data.id = next_id
                } else {
                    data.id = 1
                }
                this.products.push(data)
                let data_json = JSON.stringify(this.products,null,2)
                await fs.promises.writeFile(this.path,data_json)
                console.log('id´s created product: '+data.id)
                return 201
            }
            console.log('complete data')
            return null
        } catch(error) {
            console.log(error)
            return null
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
        let search = this.read_product(pid);
        try {
        if (search) {
            console.log(search);
            return search;
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
            let productFound  = await this.read_product(id)
            //itero para modificar la propiedad correspondiente
            for (let prop in data) {
                //console.log(prop)
                productFound[prop] = data[prop]
            }
        
        
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('updateProduct: done'+id)
            return 200
        } catch(error) {
            console.log(error)
            return null
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
            return 200
        }else{
            console.log('Not found')
            return null
        }
             
        } catch(error) {
            console.log(error)
            return null
        }
    }
}

let prod_manager  = new ProductManager('./src/data/products.json')


export default prod_manager