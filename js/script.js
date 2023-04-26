const fs = require('fs')

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
            //agrego el objeto (producto) a la memoria del programa
            this.products.push(data)
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('id´s created user: '+data.id)
            return 'id´s user: '+data.id
        } catch(error) {
            console.log(error)
            return 'error: creating user'
        }
    }
    getProduct() {
        //console.log(this.users)
        return this.products
    }
    getProductById(id) {
        try{
        let productFound = this.products.find(each=>each.id===id)
        if(!productFound){
            console.log('Not found')
    
                
        }else{
                console.log(productFound)
           
                return productFound
        }
    }catch(error) {
        console.log(error)
        return 'updateProduct: error'
    }
}
    async upDateProduct(id,data) {
        //data es el objeto con las propiedades que necesito modificar del producto
        try {
            //busco el producto
            let productFound = this.getProductById(id)
            //itero para modificar la propiedad correspondiente
            for (let prop in data) {
                //console.log(prop)
                productFound[prop] = data[prop]
            }
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.products,data_json)
            console.log('updateProduct: done'+id)
            return 'updated user: '+id
        } catch(error) {
            console.log(error)
            return 'updateProduct: error'
        }
    }
    async deleteProduct(id) {
        try {
            //saco el producto
            this.products = this.products.filter(each=>each.id!==id)
            //console.log( this.products)
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('deleteProduct: done'+id)
            return 'deleteProduct: done'+id
        } catch(error) {
            console.log(error)
            return 'deleteProduct: error'
        }
    }
}
async function up() {
    let product = new ProductManager('./data/products.json')
    await product.addProduct({title:'pendrive1',description:'50G',price:'5000',thumbnail:"imagen",stock:50})
    await product.addProduct({title:'pendrive2',description:'100G',price:'10000',thumbnail:"imagen",stock:100})
    await product.addProduct({title:'pendrive3',description:'150G',price:'30000',thumbnail:"imagen",stock:150})
   
   

}
up()