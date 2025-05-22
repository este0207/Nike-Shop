

export class ProductModel{
    constructor(clientSQL){
        this.client = clientSQL;
        this.client.execute(`
            CREATE TABLE IF NOT EXISTS product(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name TINYTEXT,
            price FLOAT,
            img TINYTEXT,
            cart BOOL
        )`).catch(console.error);
    }

    async getAllProducts(){
        const [products] = await this.client.execute(`SELECT * FROM product`).catch(console.error);
        return products;
    }

    async deleteAllProducts(){
        const [products] = await this.client.execute(`DROP TABLE product`).catch(console.error);
        return products;
    }

    async getProductById(id){
        const [product] = await this.client.execute(`SELECT * FROM product WHERE id =?`, [id]).catch(console.error);
        return product;
    }

    async deleteProduct(id){
        const [product] = await this.client.execute(`DELETE FROM product WHERE id =?`, [id]).catch(console.error);
        return product;
    }

    async addProduct(name,price,img){
        const [insertProduct] = await this.client.execute(`INSERT INTO product (name,price,img) VALUES (?,?,?)`,[name,price,img]).catch(console.error);
        return insertProduct;
    }
}