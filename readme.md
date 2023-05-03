
Tercer desafio- Curso Backend:
            Tercer desafio sobre un ecommerce llamado Memorivent del curso de Backender- Comisión 39770
            

            Pasos:
            1-Desarrolle un servidor basado en express donde pude hacer consultas a nuestro archivo de productos y carritos.
            1a-Desarrolle un servidor de express que, en un archivo server.js.
            1b-Desarrolle los endpoints para productos.
            1c-Desarrolle la clase y endpoints para CartManager (para gestionar carritos).

            2a-Endpoints de productos:GET /api/products 
            lee el archivo de productos y lo devuelve dentro de un objeto. Puede recibir por query el valor ?limit= el cual mostrando un límite de resultados.
            Si no se recibe query de límite devulve un objeto con las propiedades:
            success: true
            response: [todos los productos]
            Si se recibe un límite devolver un objeto con las propiedades:
            success: true
            response: [productos con límite]
            Se captura el error.
	        2b-Endpoints de productos:GET /api/products/:pid:
            Lee el archivo de productos y devuelve el producto buscado
            Si no se encuentra el producto se devuelve un objeto con las propiedades:
            success: false
            response: {}
            Si se encuentra devuelve un objeto con las propiedades:
            success: true
            response: {producto}
             Se captura el error.

             3-Clase CartManager:
            La clase recibe como parámetro la ruta donde se crea el archivo y el constructor tiene incluida esta ruta en la variable this.path.
            En esta entrega únicamente desarrolle los métodos para crear y leer carritos.

            4-Métodos de la clase “Carrito”:
            4a-addCart agrega un carrito al arreglo de carritos del archivo. Cada carrito tiene las siguientes propiedades:
            id: que se agrega automáticamente  y autoincrementable
            products: es un array vacío al que se le agrega objetos las propiedades: pid (id del producto) y quantity (cantidad).
            En caso de éxito devuelve el id del carrito.
            En caso de error devuelve un mensaje que dice: “addCart: error”
            4b-GetCarts debe devuelve el arreglo con todos los carritos guardados en el archivo y en caso de que no haya carritos devuelve: “Not found”
            En caso de error devuelve un mensaje que dice: “getCarts: error”

            4c-getCartById(pid) debe recibir como parámetro el id del carrito y debe devuelve un objeto con todas las propiedades del carrito y en caso de no coincidir devuelve: “Not found”
            En caso de error devuelve un mensaje que dice: “getCartById: error”
            
            4d-GET /api/carts debe leer el archivo de carritos y devolver un objeto con las propiedades:
            success: true
            response: [todos los carritos]
            Se atrapa los errores.

            4e-GET /api/carts/:cid debe leer el archivo de carritos y devolver un objeto con las siguientes propiedades:
            success: true
            response: {carrito encontrado}
	        Se atrapa los errores.

            El servidor se activa:
            npm run dev
            
            Tambien se establecieron los querys de limit para que muestre la cantidad que el usuario determine.

           Se configuro un endpoint para los productos (/:pid) y para los carts (/:cip) para que muestre el id buscado.



           
            Construido con:
            Html- Javascript
            

            Construido por:
            MArtin G Utrera
