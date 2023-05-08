import fs from 'fs'
import manager from './script.js'

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


    async addCart(data) {
        try {
          let cart = { id: null, products: [] };
          if (this.carts.length > 0) {
            let next_id = this.carts[this.carts.length - 1].id + 1;
            cart.id = next_id;
          } else {
            cart.id = 1;
          }
    
          let dataToCart = data.map((e) => {
            return { id: e.id, quantity: e.quantity ?? 1 };
          });
    
          cart.products = dataToCart;
    
          this.carts.push(cart);
    
          let data_json = JSON.stringify(this.carts, null, 2);
    
          await fs.promises.writeFile(this.path, data_json);
          console.log("Cart added successfully: " + cart.id);
          return "El carrito fue agregado exitosamente con el id: " + cart.id;
        } catch (error) {
          console.error("addCart: error", error);
          return "addCart: error";
        }
      }
    getCarts() {
        try {
        if (this.carts.length === 0) {
            console.log('Not found');
        } else {
            console.log(this.carts);
        }
        } catch (error) {
        console.log(error);
        return 'getCart: Error';
        }
    }

    read_Carts() {
        return this.carts;
    }

    read_Cart(id) {
        let productFound = this.carts.find((each) => each.id === id);
        return productFound;
    }



    getCartById(pid) {
        let search = this.read_Cart(pid);
        try {
        if (search) {
            console.log(search);
            return search;
        } else {
            console.log('not found');
            return 'Not found';
        }
        } catch (error) {
        console.log(error);
        return 'getCartById: Error';
        }
    }



async updateProduct(id, data) {
    try {
      let cartToUpdate = this.getCartById(id);
      if (!cartToUpdate) {
        console.log("Cart not found");
        return `Cart with id: ${id} not found`;
      }
      if (data.length === 0) {
        return "No hay elementos que modificar";
      }
      for (let productToUpdate of cartToUpdate.products) {
        let matchingProduct = data.find((p) => p.id === productToUpdate.id);
        if (matchingProduct) {
          productToUpdate.quantity = matchingProduct.quantity;
        }
      }

      let data_json = JSON.stringify(this.carts, null, 2);
      await fs.promises.writeFile(this.path, data_json);
      console.log("Updated cart: " + id);
      return "Updated cart: " + id;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}
let carts = new CartManager('./src/data/cart.json')

export default carts