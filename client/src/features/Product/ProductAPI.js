export async function fetchProducts() {
    const response = await fetch('/products');
    return await response.json();
}
  