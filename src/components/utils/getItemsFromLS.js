export const getItemsFromLs = () => {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
}

export const getTotalPriceFromLS = () => {
    const price = localStorage.getItem('totalPrice');
    return price ? JSON.parse(price) : 0;
}