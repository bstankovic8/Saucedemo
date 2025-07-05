import { Page } from '@playwright/test';
import { TestData, UserCredential } from '../data/TestData';

export class TestHelper {
  private testData: TestData;

  constructor() {
    this.testData = TestData.getInstance();
  }

  // Utility method for random delays (useful for performance testing)
  async randomDelay(minMs: number = 100, maxMs: number = 1000): Promise<void> {
    const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // Method to generate random test data
  generateRandomString(length: number = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Method to get credentials by user type
  getCredentialsByType(userType: string): UserCredential | undefined {
    return this.testData.getUserCredential(userType);
  }

  // Method to get all available user types
  getAllUserTypes(): string[] {
    return this.testData.getAllUserTypes();
  }

  // Method to get invalid credentials for negative testing
  getInvalidCredentials(): UserCredential {
    return this.testData.getInvalidCredentials();
  }

  // Method to validate URL format
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Method to format test name with timestamp
  formatTestName(baseName: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${baseName}_${timestamp}`;
  }

  // Method to wait for network idle with custom timeout
  async waitForNetworkIdle(page: Page, timeout: number = 30000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }
} 