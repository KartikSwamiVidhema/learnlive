export const BASE_URL = '';
export const PRODUCTS_API = `${BASE_URL}/data/products.json`;
export const SELLERS_API = `${BASE_URL}/data/sellers.json`;


export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetching data failed:", error);
    throw error;
  }
};

export const fetchProducts = () => fetchData(PRODUCTS_API);
export const fetchSellers = () => fetchData(SELLERS_API);

export const fetchProductById = async (id) => {
  const products = await fetchProducts();
  return products.find(product => product.id === parseInt(id));
};

export const fetchSellerById = async (id) => {
  const sellers = await fetchSellers();
  return sellers.find(seller => seller.id === parseInt(id));
};

export const fetchProductsForSeller = async (sellerId) => {
  const products = await fetchProducts();
  return products.filter(product => product.sellerId === parseInt(sellerId));
};

// export const fetchProductsByCategory = async () => {
//   try {
//     const response = await fetch("your_api_url_here");
//     if (!response.ok) {
//       throw new Error(`Oops! Something went wrong. Status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Uh-oh! We hit a snag while fetching products:", error);
//     throw error;
//   }
// };