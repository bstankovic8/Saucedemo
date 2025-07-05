import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  private title: Locator;
  private inventoryItems: Locator;
  private addToCartButtons: Locator;
  private shoppingCartBadge: Locator;
  private shoppingCartLink: Locator;
  private menuButton: Locator;
  private logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async getTitle(): Promise<Locator> {
    return this.title;
  }

  async getInventoryItemsCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addItemToCart(itemIndex: number): Promise<void> {
    const addButton = this.addToCartButtons.nth(itemIndex);
    await addButton.click();
  }

  async getCartItemCount(): Promise<string> {
    return await this.shoppingCartBadge.textContent() || '0';
  }

  async openShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async waitForPageLoad(): Promise<void> {
    await super.waitForPageLoad();
  }

  async isOnInventoryPage(): Promise<boolean> {
    return await this.title.isVisible();
  }

  getPageUrl(): string {
    return 'https://www.saucedemo.com/inventory.html';
  }
} 