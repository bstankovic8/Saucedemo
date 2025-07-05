# Object-Oriented Programming in Test Automation

This project demonstrates how to apply Object-Oriented Programming (OOP) principles to create a robust, maintainable, and scalable test automation framework using Playwright and TypeScript.

## 🏗️ OOP Principles Implemented

### 1. **Encapsulation** 📦
**Definition**: Bundling data and methods that operate on that data within a single unit (class) and hiding internal state.

**Examples in our code**:
- `LoginPage` class encapsulates all login-related locators and methods
- `TestData` class encapsulates user credentials with private fields
- `BasePage` class encapsulates common page functionality

```typescript
export class LoginPage extends BasePage {
  private usernameInput: Locator;  // Private field - encapsulation
  private passwordInput: Locator;  // Private field - encapsulation
  
  async login(username: string, password: string): Promise<void> {
    // Encapsulated login logic
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### 2. **Inheritance** 🧬
**Definition**: Creating new classes that are built upon existing classes, inheriting their properties and methods.

**Examples in our code**:
- `LoginPage` and `InventoryPage` inherit from `BasePage`
- Common functionality like `waitForPageLoad()` is inherited

```typescript
export abstract class BasePage {
  protected page: Page;
  
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}

export class LoginPage extends BasePage {
  // Inherits waitForPageLoad() method
  async waitForPageLoad(): Promise<void> {
    await super.waitForPageLoad(); // Call parent method
  }
}
```

### 3. **Polymorphism** 🔄
**Definition**: The ability to present the same interface for different underlying forms (data types or classes).

**Examples in our code**:
- Different user types have different behaviors in `validateUserSpecificBehavior()`
- Abstract method `getPageUrl()` is implemented differently in each page class

```typescript
async validateUserSpecificBehavior(userType: string): Promise<void> {
  switch (userType) {
    case 'locked_out_user':
      // Different behavior for locked out user
      await expect(errorMessage).toHaveText('Sorry, this user has been locked out');
      break;
    case 'problem_user':
      // Different behavior for problem user
      await this.testHelper.randomDelay(500, 1500);
      break;
    default:
      // Default behavior for other users
      await expect(title).toHaveText('Products');
  }
}
```

### 4. **Abstraction** 🎯
**Definition**: Hiding complex implementation details and showing only necessary features.

**Examples in our code**:
- `BasePage` abstract class defines the contract for all page objects
- `TestHelper` class abstracts complex utility operations

```typescript
export abstract class BasePage {
  // Abstract method - must be implemented by derived classes
  abstract getPageUrl(): string;
  
  // Concrete method - provides default implementation
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
```

## 🏛️ Design Patterns Used

### 1. **Page Object Model (POM)**
- Separates page logic from test logic
- Makes tests more maintainable and readable
- Reduces code duplication

### 2. **Singleton Pattern**
- `TestData` class uses singleton pattern
- Ensures only one instance of test data exists
- Provides global access point

```typescript
export class TestData {
  private static instance: TestData;
  
  public static getInstance(): TestData {
    if (!TestData.instance) {
      TestData.instance = new TestData();
    }
    return TestData.instance;
  }
}
```

### 3. **Factory Pattern** (Conceptual)
- `TestHelper` class acts as a factory for utility methods
- Creates and manages test data and helper functions

## 📁 Project Structure

```
Saucedemo/
├── pages/                 # Page Object classes
│   ├── BasePage.ts       # Abstract base class
│   ├── LoginPage.ts      # Login page implementation
│   └── InventoryPage.ts  # Inventory page implementation
├── data/                 # Data management
│   └── TestData.ts       # Singleton for test data
├── utils/                # Utility classes
│   └── TestHelper.ts     # Helper methods and utilities
├── tests/                # Test files
│   ├── login.spec.ts     # Basic login tests
│   └── enhanced-login.spec.ts # Advanced OOP tests
├── playwright.config.ts  # Playwright configuration
└── tsconfig.json         # TypeScript configuration
```

## 🚀 Benefits of OOP in Test Automation

### 1. **Maintainability**
- Changes to page elements only require updates in one place
- Easy to modify test logic without affecting page objects

### 2. **Reusability**
- Page objects can be reused across multiple test files
- Common functionality is inherited from base classes

### 3. **Readability**
- Test code reads like business requirements
- Clear separation of concerns

### 4. **Scalability**
- Easy to add new pages and test scenarios
- Consistent structure across the entire framework

## 🧪 Running the Tests

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run specific test file
npx playwright test enhanced-login.spec.ts

# Run tests in headed mode
npx playwright test --headed

# Generate HTML report
npx playwright show-report
```

## 📚 Key Takeaways

1. **Encapsulation** keeps related functionality together and hides complexity
2. **Inheritance** promotes code reuse and maintains consistency
3. **Polymorphism** allows flexible behavior based on different conditions
4. **Abstraction** simplifies complex operations and provides clear interfaces

This OOP approach makes your test automation framework more professional, maintainable, and easier to extend as your application grows. 