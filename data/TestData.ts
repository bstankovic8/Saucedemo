export class TestData {
  private static instance: TestData;
  private userCredentials: Map<string, UserCredential>;

  private constructor() {
    this.userCredentials = new Map();
    this.initializeCredentials();
  }

  // Singleton pattern implementation
  public static getInstance(): TestData {
    if (!TestData.instance) {
      TestData.instance = new TestData();
    }
    return TestData.instance;
  }

  private initializeCredentials(): void {
    this.userCredentials.set('standard_user', {
      username: 'standard_user',
      password: 'secret_sauce',
      description: 'Standard user with full access'
    });

    this.userCredentials.set('locked_out_user', {
      username: 'locked_out_user',
      password: 'secret_sauce',
      description: 'User account that is locked out'
    });

    this.userCredentials.set('problem_user', {
      username: 'problem_user',
      password: 'secret_sauce',
      description: 'User with problematic behavior'
    });

    this.userCredentials.set('performance_glitch_user', {
      username: 'performance_glitch_user',
      password: 'secret_sauce',
      description: 'User experiencing performance issues'
    });
  }

  public getUserCredential(userType: string): UserCredential | undefined {
    return this.userCredentials.get(userType);
  }

  public getAllUserTypes(): string[] {
    return Array.from(this.userCredentials.keys());
  }

  public getInvalidCredentials(): UserCredential {
    return {
      username: 'invalid_user',
      password: 'wrong_password',
      description: 'Invalid credentials for negative testing'
    };
  }
}

export interface UserCredential {
  username: string;
  password: string;
  description: string;
} 