class ProductService {
    private products = [
        "product1",
        "product2",
        "product3"
    ];

    async index() {
        return await this.products;
    }
}

export default new ProductService();
