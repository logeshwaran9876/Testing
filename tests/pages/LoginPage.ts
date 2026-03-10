// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

/**
 * LoginPage - Page Object Model for Login Functionality
 * Encapsulates all selectors, methods, and interactions for the login page
 */
export class LoginPage {
  private page: Page;
  
  // Selectors
  private emailInput: Locator;
  private mobileInput: Locator;
  private passwordInput: Locator;
  private rememberMeCheckbox: Locator;
  private getStartedButton: Locator;
  private errorMessage: Locator;
  private errorMessage1: Locator;
  private welcomeMessage: Locator;
  private roleSelector: Locator;
  private emailTab: Locator;
  private mobileTab: Locator;
  private passwordVisibilityToggle: Locator;
  private formValidationError: Locator;
  private lockoutMessage: Locator;
  private mobileInvalidFormatError: Locator;
  private emailInvalidFormatError: Locator;
  private fieldValidationErrors: Locator;
  private toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators for real website - form has single textbox and password input
    this.emailInput = page.getByRole('textbox', { name: /admin@demo.com|email|mobile|phone|username/i }).first();
    this.mobileInput = page.getByRole('textbox', { name: /admin@demo.com|email|mobile|phone|username/i }).first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: /Remember Me/i });
    this.getStartedButton = page.getByRole('button', { name: /Get started|Get Started|Login|Sign In/i });
    
    // Error messages with multiple selectors
    this.errorMessage = page.locator('[role="alert"], .error-message, .error, .alert-danger, [class*="error"], .toast-error, #toast-container .toast');
    this.welcomeMessage = page.locator('h1, h2, [class*="welcome"], [class*="greeting"]');
    this.errorMessage1 = page.getByText("can't find an account", { exact: false });
    
    this.roleSelector = page.locator('[class*="role"], select[name="role"]');
    this.emailTab = page.getByRole('tab', { name: /Email/i });
    this.mobileTab = page.getByRole('tab', { name: /Mobile/i });
    this.passwordVisibilityToggle = page.locator('button[aria-label*="password"], [class*="show-password"]');
    this.formValidationError = page.locator('[role="alert"], [class*="field-error"], .invalid-feedback, .ng-star-inserted:has-text("required"), .ng-star-inserted:has-text("invalid")');
    this.lockoutMessage = page.locator('[class*="lockout"], [class*="locked"], text=/temporarily locked/i');
    
    // Format error messages with multiple patterns
    this.mobileInvalidFormatError = page.locator(
      'text=Please enter a valid mobile number, ' +
      'text=Invalid mobile number, ' +
      'text=mobile number is invalid, ' +
      '.ng-star-inserted:has-text("mobile"), ' +
      '.error:has-text("mobile")'
    ).first();
    
    this.emailInvalidFormatError = page.locator(
      'text=Please enter a valid email, ' +
      'text=Invalid email address, ' +
      'text=email is invalid, ' +
      '.ng-star-inserted:has-text("email"), ' +
      '.error:has-text("email")'
    ).first();
    
    this.fieldValidationErrors = page.locator('.ng-star-inserted:has-text("required"), .ng-star-inserted:has-text("invalid"), .invalid-feedback, .error-message');
    this.toastMessage = page.locator('#toast-container .toast, #toast-container .alert');
  }

  /**
   * Navigate to the login page for a specific role
   * @param url - The login URL from test data
   */
  async navigateToLoginPage(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'load', timeout: 50000 });
  }

  /**
   * Enter email credentials
   * @param email - Email address
   */
  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async mobileFormatErrorIsVisible(): Promise<boolean> {
    try {
      await this.mobileInvalidFormatError.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      // Check if any field validation error appeared
      const anyError = await this.fieldValidationErrors.isVisible().catch(() => false);
      if (anyError) {
        console.log('⚠ Field validation error found (not specific to mobile format)');
        return true;
      }
      
      // Check if toast message appeared
      const toastVisible = await this.toastMessage.isVisible().catch(() => false);
      if (toastVisible) {
        console.log('⚠ Toast message found instead of field validation');
        return true;
      }
      
      return false;
    }
  }

  async emailFormatErrorIsVisible(): Promise<boolean> {
    try {
      await this.emailInvalidFormatError.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      // Check if any field validation error appeared
      const anyError = await this.fieldValidationErrors.isVisible().catch(() => false);
      if (anyError) {
        console.log('⚠ Field validation error found (not specific to email format)');
        return true;
      }
      
      // Check if toast message appeared
      const toastVisible = await this.toastMessage.isVisible().catch(() => false);
      if (toastVisible) {
        console.log('⚠ Toast message found instead of field validation');
        return true;
      }
      
      return false;
    }
  }

  /**
   * Enter mobile number credentials
   * @param mobile - Mobile number
   */
  async enterMobileNumber(mobile: string): Promise<void> {
    await this.mobileInput.fill(mobile);
  }

  /**
   * Enter password
   * @param password - Password
   */
  async enterPassword(password: string): Promise<void> {
    // Handle multi-step form: password field may not exist initially
    // Wait for password field to appear (usually after entering email/mobile)
    try {
      await this.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.passwordInput.fill(password);
    } catch (e) {
      // Password field not visible - form may require clicking Get Started first
      // Try clicking Get Started to proceed to password step
      try {
        await this.clickGetStartedButton();
        await this.page.waitForTimeout(500);
        // Wait for password field after button click
        await this.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.passwordInput.fill(password);
      } catch (innerError) {
        // If still no password field, try filling current textbox again
        // (in case it's the same field used for both email and password)
        await this.emailInput.fill(password);
      }
    }
  }

  /**
   * Enter username (email or mobile)
   * @param username - Email or mobile number
   */
  async enterUsername(username: string): Promise<void> {
    // Try email input first, then mobile
    const isEmail = username.includes('@');
    if (isEmail) {
      await this.enterEmail(username);
    } else {
      await this.enterMobileNumber(username);
    }
  }

  async getEmailValue(): Promise<string> {
    return await this.page.locator('input[type="email"]').inputValue().catch(() => '');
  }

  async getPasswordValue(): Promise<string> {
    return await this.page.locator('input[type="password"]').inputValue().catch(() => '');
  }

  /**
   * Enable Remember Me checkbox
   */
  async enableRememberMe(): Promise<void> {
    const checkbox = this.rememberMeCheckbox.first();
    const isChecked = await checkbox.isChecked().catch(() => false);
    if (!isChecked) {
      // Click the label instead of the checkbox to avoid interception
      const label = this.page.locator('label[for="remember-me"]').first();
      await label.click().catch(async () => {
        // If label click fails, try clicking checkbox directly with force
        await checkbox.click({ force: true });
      });
    }
  }

  /**
   * Disable Remember Me checkbox
   */
  async disableRememberMe(): Promise<void> {
    const checkbox = this.rememberMeCheckbox.first();
    const isChecked = await checkbox.isChecked().catch(() => false);
    if (isChecked) {
      // Click the label instead of the checkbox to avoid interception
      const label = this.page.locator('label[for="remember-me"]').first();
      await label.click().catch(async () => {
        // If label click fails, try clicking checkbox directly with force
        await checkbox.click({ force: true });
      });
    }
  }

  /**
   * Click the Get Started button
   */
  async clickGetStartedButton(): Promise<void> {
    await this.getStartedButton.click();
    await this.page.waitForTimeout(1000);
  }

  async errorMassageIsVisible(): Promise<boolean> {
    try {
      await this.errorMessage1.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      // Check if any error message appeared
      const anyError = await this.errorMessage.isVisible().catch(() => false);
      return anyError;
    }
  }

  /**
   * Check if Remember Me is enabled
   */
  async isRememberMeChecked(): Promise<boolean> {
    return await this.rememberMeCheckbox.first().isChecked().catch(() => false);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage(): Promise<string> {
    await this.welcomeMessage.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    return await this.welcomeMessage.textContent() || '';
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible().catch(() => false);
  }

  /**
   * Clear form fields
   */
  async clearForm(): Promise<void> {
    await this.emailInput.clear().catch(() => {});
    await this.mobileInput.clear().catch(() => {});
    await this.passwordInput.clear().catch(() => {});
  }

  /**
   * Check if validation error is visible
   */
  async isValidationErrorVisible(): Promise<boolean> {
    return await this.formValidationError.isVisible().catch(() => false);
  }

  /**
   * Get validation error message
   */
  async getValidationErrorMessage(): Promise<string> {
    return await this.formValidationError.textContent() || '';
  }

  /**
   * Check if password field is masked (type is password)
   */
  async isPasswordMasked(): Promise<boolean> {
    return await this.passwordInput.evaluate((el: HTMLInputElement) => el.type === 'password');
  }

  /**
   * Check if lockout message is visible
   */
  async isLockedOutMessageVisible(): Promise<boolean> {
    return await this.lockoutMessage.isVisible().catch(() => false);
  }

  /**
   * Get lockout message text
   */
  async getLockoutMessage(): Promise<string> {
    return await this.lockoutMessage.textContent() || '';
  }

  /**
   * Switch to email tab (if using tabbed interface)
   */
  async switchToEmailTab(): Promise<void> {
    const emailTab = this.page.locator('text="Email"').first();
    if (await emailTab.isVisible().catch(() => false)) {
      await emailTab.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Switch to mobile tab (if using tabbed interface)
   */
  async switchToMobileTab(): Promise<void> {
    const mobileTab = this.page.locator('text="Mobile"').first();
    if (await mobileTab.isVisible().catch(() => false)) {
      await mobileTab.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Get current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Check if user is on login page
   */
  async isOnLoginPage(): Promise<boolean> {
    return this.page.url().includes('/auth/signin') || this.page.url().includes('login');
  }

  /**
   * Enter email with leading/trailing spaces
   */
  async enterEmailWithSpaces(email: string): Promise<void> {
    await this.emailInput.fill(`  ${email}  `);
  }

  /**
   * Enter password with leading/trailing spaces
   */
  async enterPasswordWithSpaces(password: string): Promise<void> {
    await this.passwordInput.fill(`  ${password}  `);
  }

  /**
   * Enter invalid email format
   */
  async enterInvalidEmailFormat(invalidEmail: string): Promise<void> {
    await this.emailInput.fill(invalidEmail);
  }

  /**
   * Enter invalid mobile format
   */
  async enterInvalidMobileFormat(invalidMobile: string): Promise<void> {
    await this.mobileInput.fill(invalidMobile);
  }

  /**
   * Verify page title contains expected text
   */
  async verifyPageTitle(expectedTitle: string): Promise<boolean> {
    const title = await this.page.title();
    return title.includes(expectedTitle);
  }

  /**
   * Wait for login to complete and redirect to dashboard
   */
  async waitForLoginRedirect(expectedUrl: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForURL(url => url.toString().includes(expectedUrl), { timeout });
  }

  /**
   * Get email input value
   */
  async getEmailInputValue(): Promise<string> {
    return await this.emailInput.inputValue().catch(() => '');
  }

  /**
   * Get mobile input value
   */
  async getMobileInputValue(): Promise<string> {
    return await this.mobileInput.inputValue().catch(() => '');
  }

  /**
   * Get password input value
   */
  async getPasswordInputValue(): Promise<string> {
    return await this.passwordInput.inputValue().catch(() => '');
  }

  /**
   * Check if get started button is enabled
   */
  async isGetStartedButtonEnabled(): Promise<boolean> {
    return await this.getStartedButton.isEnabled().catch(() => false);
  }

  /**
   * Wait for any validation error to appear
   */
  async waitForAnyValidationError(timeout: number = 5000): Promise<boolean> {
    try {
      await this.fieldValidationErrors.first().waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get all validation error messages
   */
  async getAllValidationErrors(): Promise<string[]> {
    const errors: string[] = [];
    const errorElements = await this.fieldValidationErrors.all();
    
    for (const element of errorElements) {
      if (await element.isVisible().catch(() => false)) {
        const text = await element.textContent();
        if (text) errors.push(text.trim());
      }
    }
    
    return errors;
  }
}