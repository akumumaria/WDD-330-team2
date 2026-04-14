// === External Third-Party API Integration (Fake Store API) ===
async function getProducts() {
  const productListElement = document.getElementById('products');   // Common ID in ScholarTrack

  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=12');
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const products = await res.json();

    // === CHANGE THIS LINE to your actual render function name ===
    // Look in your main.js for a function like: renderProducts, displayProducts, showProducts, etc.
    renderProducts(products);     // ←←← Most likely this one – but confirm!

  } catch (err) {
    console.error('Error fetching products:', err);
    
    if (productListElement) {
      productListElement.innerHTML = `
        <p style="color: red; padding: 20px; text-align: center;">
          Failed to load products from API.<br>
          Please check your internet connection.
        </p>`;
    }
    alert('Could not load products. Please try again later.');
  }
}
// === External Third-Party API Integration (Fake Store API) - W05 Requirement ===
async function getProducts() {
  const productListElement = document.getElementById('products');

  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=12');
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const products = await res.json();

    // Call the existing render function in this project
    renderProducts(products);

  } catch (err) {
    console.error('Error fetching products:', err);
    
    if (productListElement) {
      productListElement.innerHTML = `
        <p style="color: red; padding: 20px; text-align: center;">
          Failed to load products from the API.<br>
          Please check your internet connection and try again.
        </p>`;
    }
    alert('Could not load products. Please try again later.');
  }
}

// Initialize when the page is fully loaded
document.addEventListener('DOMContentLoaded', getProducts);''
