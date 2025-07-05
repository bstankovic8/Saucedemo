import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigateTo();
  });

  test('should login with valid credentials', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.getTitle()).toContain('Products');
  });

  test('should show error with invalid credentials', async () => {
    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.getErrorMessage()).toContain('Epic sadface');
  });

  test('should lock out user after multiple failed attempts', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.getErrorMessage()).toContain('Sorry, this user has been locked out');
  });

  test('should login with problem user', async () => {
    await loginPage.login('problem_user', 'secret_sauce');
    await expect(inventoryPage.getTitle()).toContain('Products');
  });
});
