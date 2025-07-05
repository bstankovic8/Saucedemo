import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { TestHelper } from '../utils/TestHelper';
import { TestData } from '../data/TestData';

// Test class demonstrating OOP principles
class LoginTestSuite {
  private loginPage: LoginPage;
  private inventoryPage: InventoryPage;
  private testHelper: TestHelper;
  private testData: TestData;

  constructor(loginPage: LoginPage, inventoryPage: InventoryPage) {
    this.loginPage = loginPage;
    this.inventoryPage = inventoryPage;
    this.testHelper = new TestHelper();
    this.testData = TestData.getInstance();
  }

  // Method demonstrating encapsulation and business logic
  async performLoginTest(userType: string): Promise<boolean> {
    const credentials = this.testData.getUserCredential(userType);
    if (!credentials) {
      throw new Error(`No credentials found for user type: ${userType}`);
    }

    await this.loginPage.login(credentials.username, credentials.password);
    
    // Wait for page load using inherited method
    await this.loginPage.waitForPageLoad();
    
    // Check if login was successful
    const isOnInventoryPage = await this.inventoryPage.isOnInventoryPage();
    
    // Take screenshot for debugging
    await this.loginPage.takeScreenshot(`login_${userType}`);
    
    return isOnInventoryPage;
  }

  // Method demonstrating polymorphism - different behavior for different user types
  async validateUserSpecificBehavior(userType: string): Promise<void> {
    switch (userType) {
      case 'locked_out_user':
        const errorMessage = await this.loginPage.getErrorMessage();
        await expect(errorMessage).toHaveText('Sorry, this user has been locked out');
        break;
      
      case 'problem_user':
        // Problem user might have different behavior
        await this.testHelper.randomDelay(500, 1500);
        break;
      
      case 'performance_glitch_user':
        // Performance glitch user might be slower
        await this.testHelper.waitForNetworkIdle(this.loginPage['page'], 60000);
        break;
      
      default:
        // Standard behavior for other users
        const title = await this.inventoryPage.getTitle();
        await expect(title).toHaveText('Products');
    }
  }
}

test.describe('Enhanced Login Tests with OOP', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let loginTestSuite: LoginTestSuite;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    loginTestSuite = new LoginTestSuite(loginPage, inventoryPage);
    
    await loginPage.navigateTo();
  });

  test('should login with all valid user types', async () => {
    const testHelper = new TestHelper();
    const userTypes = testHelper.getAllUserTypes();

    for (const userType of userTypes) {
      if (userType !== 'locked_out_user') {
        const loginSuccess = await loginTestSuite.performLoginTest(userType);
        expect(loginSuccess).toBeTruthy();
        
        await loginTestSuite.validateUserSpecificBehavior(userType);
        
        // Logout for next iteration
        await inventoryPage.logout();
        await loginPage.navigateTo();
      }
    }
  });

  test('should handle locked out user correctly', async () => {
    const loginSuccess = await loginTestSuite.performLoginTest('locked_out_user');
    expect(loginSuccess).toBeFalsy();
    
    await loginTestSuite.validateUserSpecificBehavior('locked_out_user');
  });

  test('should show error with invalid credentials', async () => {
    const testHelper = new TestHelper();
    const invalidCredentials = testHelper.getInvalidCredentials();
    
    await loginPage.login(invalidCredentials.username, invalidCredentials.password);
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toHaveText('Epic sadface');
  });

  test('should validate page URLs', async () => {
    const testHelper = new TestHelper();
    
    expect(testHelper.isValidUrl(loginPage.getPageUrl())).toBeTruthy();
    expect(testHelper.isValidUrl(inventoryPage.getPageUrl())).toBeTruthy();
  });
}); 