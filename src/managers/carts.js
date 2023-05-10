import fs from 'fs'
import prod_manager from './script.js';
class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.init(path);
    }

    init(path) {
        const file = fs.existsSync(path);
        if (!file) {
        fs.writeFileSync(path, '[]');
        console.log('file created at path: ' + this.path);
        } else {
        this.carts = JSON.parse(fs.readFileSync(path, 'UTF-8'));
        console.log('data recovered');
        return 'data recovered'
        }
    }


    async addCart() {
      try {
        let data = { products: [] }
        //por ahora vacío y luego contendrá objetos con pid y quantity
        if (this.carts.length>0) {
            let next_id = this.carts[this.carts.length-1].id+1
            data.id = next_id
        } else {
            data.id = 1
        }
        this.carts.push(data)
        let data_json = JSON.stringify(this.carts,null,2)
        await fs.promises.writeFile(this.path,data_json)
        console.log('id´s created cart: '+data.id)
        return 201
    } catch(error) {
        console.log(error)
        return null
    }
}


    read_carts() {
        return this.carts;
    }

    read_cart(id) {
        let cartFound = this.carts.find((each) => each.id === id);
        return cartFound;
    }

    async update_cart(id,data) {
      try {
          let cartFound = this.read_cart(id)
          for (let prop in data) {
            cartFound[prop] = data[prop]
          }
          console.log(data)
          let data_json = JSON.stringify(this.carts,null,2)
          await fs.promises.writeFile(this.path,data_json)
          console.log('updated cart: '+id)
          return 200
      } catch(error) {
          console.log(error)
          return null
      }
  }


  async update_cart(cid, pid, x) {
    try {
    let auxCart = this.read_cart(cid);
    let auxProducts = prod_manager.read_products();
    let auxProduct = prod_manager.read_product(pid);
    if (auxProduct.stock > x) {
        
        auxCart.products.push({
        id: auxProduct.id,
        title: auxProduct.title,
        units: x
        });
    }

    for (let index = 0; index < auxProducts.length; index++) {
        let element = auxProducts[index];
        if (pid === element.id) {
        auxProducts[index].stock = element.stock - x;
        prod_manager.upDateProduct(pid, element);
        }
    }
    // this.carts.push(auxCart);
    let data_json = JSON.stringify(this.carts, null, 2);
    await fs.promises.writeFile(this.path, data_json);
    return 200;
    } catch (error) {
    console.log(error);
    return null;
    }
}

async delete_cart(cid, pid, x) {
        try {
            let auxCart = this.read_cart(cid);
            let auxCartProduct = findProduct(auxCart, pid, x);
            let auxProducts = prod_manager.read_products();
            console.log(auxProducts);
            let auxProduct = prod_manager.read_product(pid);
            function findProduct(auxCart, pid, x) {
                let foundProduct = auxCart.products.find(product => product.id === pid);
                if (foundProduct) {
                    foundProduct.units -= x;
                }
                return foundProduct;
                } 
        
            for (let index = 0; index < auxProducts.length; index++) {
                let element = auxProducts[index];
                if (pid === element.id) {
                auxProducts[index].stock = element.stock + x;
                prod_manager.upDateProduct(pid, element);
                }
            }
            let data_json = JSON.stringify(this.carts, null, 2);
            await fs.promises.writeFile(this.path, data_json);
            return 200;
            } catch (error) {
            console.log(error);
            return null;
        }
    }
    async destroy_cart(id) {
        try {
            let one = this.carts.find(each=>each.id===id)
            if (one) {
                this.carts = this.carts.filter(each=>each.id!==id)
                let data_json = JSON.stringify(this.carts,null,2)
                await fs.promises.writeFile(this.path,data_json)
                console.log('delete cart: '+id)
                return 200
            }
            console.log('not found')
            return null
        } catch(error) {
            console.log(error)
            return null
        }
    }
}
let carts = new CartManager('./src/data/cart.json')

export default carts