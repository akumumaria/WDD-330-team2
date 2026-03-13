import ProductData from './ProductData.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // You passed in this information to make the class as reusable as possible.
    // Being able to define these things when you use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // dataSource will return a Promise...so you can use await to resolve it.
    const list = await this.dataSource.getData();
    // next, render list – ** future **
    this.renderList(list);
  }

  productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="${product.NameWithoutBrand}">
      <h2 class="card__brand">${product.Brand?.Name || ''}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
  }

  renderList(list) {
    const htmlStrings = list.map(product => this.productCardTemplate(product));
    this.listElement.innerHTML = '';
    this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
  }
}
