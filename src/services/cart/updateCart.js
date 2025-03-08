// add to cart
export const updateCart = (cart, product) => {
    const existingProduct = cart?.listProduct?.find((item) => item?._id === product?._id);
    let newListProduct;
    let totalProduct;

    if (existingProduct) {
        totalProduct = cart.totalProduct;
        newListProduct = cart.listProduct.map((item) =>
            item._id === product._id
                ? { ...item, quantity: product?.quantity ? item.quantity + product?.quantity : item.quantity + 1 }
                : item,
        );
    } else {
        totalProduct = cart.totalProduct + 1;
        newListProduct = [...cart.listProduct, { ...product, quantity: 1 }];
    }

    // const itemPrice = newListProduct.map((item) => item.price * item.quantity);
    // const subTotal = itemPrice.reduce((acc, num) => acc + num, 0);

    // console.log('updateCart', {
    //     totalProduct,
    //     listProduct: newListProduct,
    // });
    return {
        // subTotal,
        totalProduct,
        listProduct: newListProduct,
    };
};
