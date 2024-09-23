const replaceTemplate = function (str, product) {
    return str
        .replaceAll(
            "[[PRODUCT_IS_ORGANIC]]",
            `${product.organic ? "org" : "not-org"}`
        )
        .replaceAll("[[PRODUCT_IMAGE]]", product.image)
        .replaceAll("[[PRODUCT_NAME]]", product.name)
        .replaceAll("[[PRODUCT_FROM]]", product.from)
        .replaceAll("[[PRODUCT_NUTRIENTS]]", product.nutrients)
        .replaceAll("[[PRODUCT_PRICE]]", product.price)
        .replaceAll("[[PRODUCT_DESCRIPTION]]", product.description)
        .replaceAll("[[PRODUCT_QUANTITY]]", product.quantity)
        .replaceAll("[[PRODUCT_ID]]", product.id);
};

module.exports = { replaceTemplate };
