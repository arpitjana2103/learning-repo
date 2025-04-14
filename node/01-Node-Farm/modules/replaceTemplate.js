module.exports = function (template, product) {
    return template
        .replaceAll("{%PRODUCTIMGAGE%}", product.image)
        .replaceAll("{%PRODUCTNAME%}", product.productName)
        .replaceAll("{%PRODUCTQUANTITY%}", product.quantity)
        .replaceAll("{%PRODUCTPRICE%}", product.price)
        .replaceAll("{%PRODUCTID%}", product.id)
        .replaceAll("{%PRODUCTFROM%}", product.from)
        .replaceAll("{%PRODUCTNUTRIENTS%}", product.nutrients)
        .replaceAll("{%PRODUCTDESCRIPTION%}", product.description);
};
