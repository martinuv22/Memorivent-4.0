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
        }
    }


    async addCart({ productId, quantity }) {
        try { 
            let product = await manager.getProductById(productId).title
            let data = { product, quantity };
            let nextCartId = 1;
        if (this.carts.length > 0) {
            nextCartId = this.carts[this.carts.length - 1].id + 1;
        }
        data.id = nextCartId;
        this.carts.push(data);
        let data_json = JSON.stringify(this.carts, null, 2);
        await fs.promises.writeFile(this.path, data_json);
        console.log('cart id created: ' + data.id);
        return data;
        } catch (error) {
        console.log(error);
        return 'Error: Not Creating cart';
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
}
let carts = new CartManager('./data/cart.json')



export default carts