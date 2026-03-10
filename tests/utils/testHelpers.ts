import { Page, expect } from '@playwright/test';
import enquiryData from '../../test-data/enquiryData.json';

export class TestHelpers {
  /**
   * Wait for element visibility with custom timeout
   */
  static async waitForElement(page: Page, selector: string, timeout: number = 5000) {
    return await page.waitForSelector(selector, { timeout });
  }

  /**
   * Check if element is visible on page
   */
  static async isElementVisible(page: Page, selector: string): Promise<boolean> {
    try {
      const element = page.locator(selector);
      return await element.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Get all visible errors on the page
   */
  static async getVisibleErrors(page: Page): Promise<string[]> {
    const errorElements = page.locator('[class*="error"], [role="alert"]');
    const count = await errorElements.count();
    const errors: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = await errorElements.nth(i).textContent();
      if (text?.trim()) {
        errors.push(text.trim());
      }
    }

    return errors;
  }

  /**
   * Fill form field with retries
   */
  static async fillFieldWithRetry(
    page: Page,
    selector: string,
    value: string,
    retries: number = 3
  ): Promise<boolean> {
    for (let i = 0; i < retries; i++) {
      try {
        await page.locator(selector).fill(value);
        const filledValue = await page.locator(selector).inputValue();
        if (filledValue === value) {
          return true;
        }
      } catch {
        if (i === retries - 1) {
          throw new Error(`Failed to fill field ${selector} after ${retries} retries`);
        }
        await page.waitForTimeout(100);
      }
    }
    return false;
  }

  /**
   * Scroll element into view
   */
  static async scrollIntoView(page: Page, selector: string) {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Wait for specific text to appear
   */
  static async waitForText(page: Page, text: string, timeout: number = 5000) {
    await page.waitForFunction(
      (searchText) => {
        return document.body.textContent?.includes(searchText);
      },
      text,
      { timeout }
    );
  }

  /**
   * Get all form field values
   */
  static async getAllFormValues(page: Page): Promise<Record<string, string>> {
    const values: Record<string, string> = {};
    const inputs = await page.locator('input, select, textarea').all();

    for (const input of inputs) {
      const name = await input.getAttribute('name');
      const value = await input.inputValue().catch(() => '');
      if (name) {
        values[name] = value;
      }
    }

    return values;
  }

  /**
   * Assert multiple conditions
   */
  static async assertMultiple(
    conditions: Array<{ condition: boolean; message: string }>
  ): Promise<boolean> {
    const failures: string[] = [];

    for (const { condition, message } of conditions) {
      if (!condition) {
        failures.push(message);
      }
    }

    if (failures.length > 0) {
      throw new Error(`Assertions failed:\n${failures.join('\n')}`);
    }

    return true;
  }

  /**
   * Take screenshot with timestamp
   */
  static async takeScreenshot(page: Page, testName: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${testName}-${timestamp}.png`;
    await page.screenshot({ path: `screenshots/${filename}` });
  }

  /**
   * Simulate slow network
   */
  static async simulateSlowNetwork(page: Page) {
    await page.route('**/*', (route) => {
      setTimeout(() => route.continue(), 1000);
    });
  }

  /**
   * Block specific resources
   */
  static async blockResources(page: Page, resourceType: string[]) {
    await page.route('**/*', (route) => {
      if (resourceType.includes(route.request().resourceType())) {
        route.abort();
      } else {
        route.continue();
      }
    });
  }

  /**
   * Get network requests during action
   */
  static async getNetworkRequests(
    page: Page,
    action: () => Promise<void>
  ): Promise<Array<{ url: string; method: string; status: number }>> {
    const requests: Array<{ url: string; method: string; status: number }> = [];

    page.on('response', (response) => {
      requests.push({
        url: response.url(),
        method: response.request().method(),
        status: response.status()
      });
    });

    await action();

    page.removeAllListeners('response');
    return requests;
  }

  /**
   * Verify form field validation
   */
  static async verifyFieldValidation(
    page: Page,
    fieldName: string,
    validValue: string,
    invalidValue: string
  ): Promise<void> {
    const selector = `input[name="${fieldName}"], select[name="${fieldName}"]`;

    // Test with valid value
    await this.fillFieldWithRetry(page, selector, validValue);
    let error = await page.locator(`[data-error-for="${fieldName}"]`).textContent();
    expect(error || '').toBe('');

    // Test with invalid value
    await this.fillFieldWithRetry(page, selector, invalidValue);
    error = await page.locator(`[data-error-for="${fieldName}"]`).textContent();
    expect(error).toBeTruthy();
  }

  /**
   * Compare two objects with tolerance for specific fields
   */
  static compareObjects(
    expected: any,
    actual: any,
    toleranceFields: string[] = []
  ): { match: boolean; differences: string[] } {
    const differences: string[] = [];

    for (const [key, value] of Object.entries(expected)) {
      if (toleranceFields.includes(key)) {
        // Skip validation for tolerance fields
        continue;
      }

      if (actual[key] !== value) {
        differences.push(`${key}: expected "${value}", got "${actual[key]}"`);
      }
    }

    return {
      match: differences.length === 0,
      differences
    };
  }

  /**
   * Wait for API response
   */
  static async waitForApiResponse(
    page: Page,
    urlPattern: string | RegExp,
    timeout: number = 5000
  ): Promise<any> {
    const response = await page.waitForResponse(
      (resp) => {
        const url = resp.url();
        if (typeof urlPattern === 'string') {
          return url.includes(urlPattern);
        } else {
          return urlPattern.test(url);
        }
      },
      { timeout }
    );

    return await response.json().catch(() => null);
  }

  /**
   * Mock API response
   */
  static async mockApiResponse(
    page: Page,
    urlPattern: string | RegExp,
    responseData: any,
    statusCode: number = 200
  ) {
    await page.route(urlPattern, (route) => {
      route.abort('failed');
    });

    // Alternative: Use intercept
  
  }

  /**
   * Get validation messages from data
   */
  static getValidationMessage(messageType: string): string {
    return enquiryData.enquiries.validationMessages[
      messageType as keyof typeof enquiryData.enquiries.validationMessages
    ] || '';
  }

  /**
   * Get dropdown options from data
   */
  static getDropdownOptions(optionType: string): string[] {
    return enquiryData.enquiries.dropdownOptions[
      optionType as keyof typeof enquiryData.enquiries.dropdownOptions
    ] || [];
  }

  /**
   * Retry action with exponential backoff
   */
  static async retryWithBackoff(
    action: () => Promise<boolean>,
    maxRetries: number = 3,
    initialDelay: number = 100
  ): Promise<boolean> {
    let delay = initialDelay;

    for (let i = 0; i < maxRetries; i++) {
      try {
        if (await action()) {
          return true;
        }
      } catch {
        if (i === maxRetries - 1) {
          throw new Error('Action failed after retries');
        }
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }

    return false;
  }

  /**
   * Performance measurement
   */
  static async measurePerformance(
    page: Page,
    action: () => Promise<void>
  ): Promise<{ duration: number; metrics: Record<string, number> }> {
    const startTime = performance.now();

    await action();

    const duration = performance.now() - startTime;

    const metrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart
      };
    });

    return { duration, metrics };
  }

  /**
   * Generate test report
   */
  static generateTestReport(
    testName: string,
    status: 'passed' | 'failed',
    duration: number,
    details?: any
  ): any {
    return {
      testName,
      status,
      duration,
      timestamp: new Date().toISOString(),
      details
    };
  }
}

export class FormTestHelper {
  /**
   * Test all required field validations
   */
  static async testRequiredFields(
    page: Page,
    requiredFields: string[]
  ): Promise<{ field: string; hasError: boolean }[]> {
    const results: { field: string; hasError: boolean }[] = [];

    for (const field of requiredFields) {
      const selector = `input[name="${field}"], select[name="${field}"]`;
      const errorSelector = `${selector} ~ [class*="error"]`;

      // Leave field empty
      await page.locator(selector).fill('').catch(() => {});

      // Trigger validation
      await page.locator(selector).blur();

      const hasError = await page.locator(errorSelector).isVisible().catch(() => false);
      results.push({ field, hasError });
    }

    return results;
  }

  /**
   * Test field length validation
   */
  static async testFieldLength(
    page: Page,
    fieldName: string,
    minLength: number,
    maxLength: number
  ): Promise<void> {
    const selector = `input[name="${fieldName}"]`;

    // Test minimum length
    const minString = 'a'.repeat(minLength - 1);
    await page.locator(selector).fill(minString);
    await page.locator(selector).blur();
    const minError = await page.locator(`${selector} ~ [class*="error"]`).isVisible().catch(() => false);
    expect(minError).toBeTruthy();

    // Test maximum length
    const maxString = 'a'.repeat(maxLength + 1);
    await page.locator(selector).fill(maxString);
    await page.locator(selector).blur();
    const maxError = await page.locator(`${selector} ~ [class*="error"]`).isVisible().catch(() => false);
    expect(maxError).toBeTruthy();

    // Test valid length
    const validString = 'a'.repeat(minLength + 5);
    await page.locator(selector).fill(validString);
    await page.locator(selector).blur();
    const validError = await page.locator(`${selector} ~ [class*="error"]`).isVisible().catch(() => false);
    expect(validError).toBeFalsy();
  }

  /**
   * Test field-specific patterns
   */
  static async testFieldPattern(
    page: Page,
    fieldName: string,
    validValues: string[],
    invalidValues: string[]
  ): Promise<void> {
    const selector = `input[name="${fieldName}"]`;

    // Test valid values
    for (const value of validValues) {
      await page.locator(selector).fill(value);
      await page.locator(selector).blur();
      const error = await page.locator(`${selector} ~ [class*="error"]`).isVisible().catch(() => false);
      expect(error).toBeFalsy();
    }

    // Test invalid values
    for (const value of invalidValues) {
      await page.locator(selector).fill(value);
      await page.locator(selector).blur();
      const error = await page.locator(`${selector} ~ [class*="error"]`).isVisible().catch(() => false);
      expect(error).toBeTruthy();
    }
  }
}
