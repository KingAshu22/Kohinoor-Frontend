export const getCollections = async () => {
  const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`)
  const collectionsData = await collections.json();
  const reversedCollections = collectionsData.reverse();
  return reversedCollections;
}

export const getCollectionDetails = async (collectionId: string) => {
  const collection = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`)
  return await collection.json()
}

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  const productsData = await products.json();
  const reversedProducts = productsData.reverse();
  return reversedProducts;
}

export const getProductDetails = async (productId: string) => {
  const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
  return await product.json()
}

export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`)
  return await searchedProducts.json()
}

export const getOrders = async (customerId: string) => {
  const orders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`)
  return await orders.json()
}

export const getRelatedProducts = async (productId: string) => {
  const relatedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`)
  return await relatedProducts.json()
}