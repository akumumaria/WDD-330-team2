import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = JSON.parse(localStorage.getItem('so-cart')) || [];
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
    
    // Show alert notification
    alert(`${this.product.NameWithoutBrand || this.product.Name} has been added to your cart!`);
  }

  renderProductDetails() {
    // Set page title
    document.title = `Sleep Outside | ${this.product.Name}`;

    // Populate product details
    document.getElementById('product-brand').textContent = this.product.Brand?.Name || '';
    document.getElementById('product-name').textContent = this.product.NameWithoutBrand || this.product.Name;
    document.getElementById('product-image').src = this.product.Image;
    document.getElementById('product-image').alt = this.product.Name;
    document.getElementById('product-price').textContent = `$${this.product.FinalPrice}`;
    document.getElementById('product-color').textContent = this.product.Colors?.[0]?.ColorName || '';
    
    // Handle description - strip HTML tags if present
    let description = this.product.DescriptionHtmlSimple || '';
    if (description.includes('<')) {
      // Simple HTML tag removal
      description = description.replace(/<[^>]*>/g, '');
    }
    document.getElementById('product-description').textContent = description;

    // Set the data-id attribute for the Add to Cart button
    document.getElementById('addToCart').setAttribute('data-id', this.productId);
  }
}
