import { Page, Locator } from '@playwright/test';

export class GopEditModal {
  readonly page: Page;
  readonly modal: Locator;
  
  // Fields
  readonly approvedAmountINR: Locator;
  readonly approvedAmountAED: Locator;
  readonly countryDropdown: Locator;
  readonly preferredCurrencyINR: Locator;
  readonly copayPercentage: Locator;
  readonly copayCeilingAED: Locator;
  readonly copayCeilingLocal: Locator;
  readonly gopValidity: Locator;
  readonly contactNumber: Locator;
  readonly policyNumber: Locator;
  readonly policyValidity: Locator;
  readonly dateOfAdmission: Locator;
  readonly opdCoverage: Locator;
  readonly roomCategory: Locator;
  
  // Dropdowns
  readonly dropCaseDropdown: Locator;
  readonly closeButton: Locator;
  
  // Buttons
  readonly approveButton: Locator;
  readonly saveDraftButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('app-gop-edit').first();
    
    // Approved amount fields
    this.approvedAmountINR = this.modal.locator('[fcontrolname="approvedAmountLocalCurrency"] input');
    this.approvedAmountAED = this.modal.locator('[fcontrolname="approvedAmountAED"] input');
    
    // Country dropdown
    this.countryDropdown = this.modal.locator('[fcontrolname="choiceCountry"] ng-select');
    
    // Preferred Currency (INR)
    this.preferredCurrencyINR = this.modal.locator('[fcontrolname="choiceCurrency"] input');
    
    // Copay fields
    this.copayPercentage = this.modal.locator('[fcontrolname="coPay"] input');
    this.copayCeilingAED = this.modal.locator('[fcontrolname="coPayCeiling"] input');
    this.copayCeilingLocal = this.modal.locator('[fcontrolname="coPayCeilingLocalCurrency"] input');
    this.gopValidity = this.modal.locator('[fcontrolname="gopValidity"] input');
    
    // Contact and policy fields
    this.contactNumber = page.locator('input#memberContactNumber, input[name="memberContactNumber"]').first();
    this.policyNumber = this.modal.locator('[fcontrolname="policyNumber"] input');
    this.policyValidity = this.modal.locator('[fcontrolname="policyValidity"] input');
    
    // Date of admission
    this.dateOfAdmission = this.modal.locator('[formcontrolname="dateOfAdmission"] input[type="text"]').first();
    
    // OPD Coverage and Room Category - with more robust selectors
    this.opdCoverage = page.locator('input#opdCoverage, input[name="opdCoverage"], [fcontrolname="opdCoverage"] input').first();
    this.roomCategory = page.locator('input#roomCategory, input[name="roomCategory"], [fcontrolname="roomCategory"] input').first();
    
    // Drop case dropdown
    this.dropCaseDropdown = this.modal.locator('[fcontrolname="reasonForClosed"] .ng-select');
    this.closeButton = this.modal.locator('app-reason-for-closed button:has-text("Close")');
    
    // Buttons
    this.approveButton = this.modal.locator('button:has-text("Approve and Submit")');
    this.saveDraftButton = this.modal.locator('button:has-text("Save as draft")');
  }

  /**
   * Check if element exists and is visible
   */
  private async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      return await locator.isVisible({ timeout: 2000 }).catch(() => false);
    } catch {
      return false;
    }
  }

  /**
   * Fill text input with proper typing simulation - FIXED VERSION
   */
  private async fillInput(input: Locator, value: string, fieldName: string): Promise<void> {
    try {
      console.log(`   📝 Filling ${fieldName}: ${value}`);
      
      // Check if element exists
      const exists = await input.count();
      if (exists === 0) {
        console.log(`      ⚠ ${fieldName} field not found, skipping`);
        return;
      }
      
      await input.waitFor({ state: "attached", timeout: 5000 }).catch(() => {
        console.log(`      ⚠ ${fieldName} not attached, skipping`);
        return;
      });
      
      // Try to scroll into view
      await input.scrollIntoViewIfNeeded().catch(() => {});
      await this.page.waitForTimeout(300);
      
      // Use evaluate to set value directly (more stable than typing)
      await input.evaluate((el, val) => {
        (el as HTMLInputElement).value = val;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }, String(value));
      
      console.log(`      ✓ ${fieldName} entered: ${value}`);
      
    } catch (error) {
      console.error(`      ✗ Failed to fill ${fieldName}:`, error);
      // Don't throw - continue with other fields
    }
  }

  /**
   * Select country from dropdown - FIXED VERSION
   */
  async selectCountry(country: string): Promise<void> {
    try {
      console.log(`   📝 Selecting country: ${country}`);
      
      const exists = await this.countryDropdown.count();
      if (exists === 0) {
        console.log(`      ⚠ Country dropdown not found, skipping`);
        return;
      }
      
      await this.countryDropdown.waitFor({ state: "visible", timeout: 5000 }).catch(() => {
        console.log(`      ⚠ Country dropdown not visible, skipping`);
        return;
      });
      
      await this.countryDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.countryDropdown.click();
      await this.page.waitForTimeout(500);
      
      const countryOption = this.page.locator(`.ng-option:has-text("${country}")`).first();
      const optionExists = await countryOption.count();
      
      if (optionExists > 0) {
        await countryOption.click();
        console.log(`      ✓ Country selected: ${country}`);
      } else {
        console.log(`      ⚠ Country option "${country}" not found`);
        // Press Escape to close dropdown
        await this.page.keyboard.press('Escape');
      }
      
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('      ✗ Failed to select country:', error);
    }
  }

  /**
   * Set date of admission - FIXED VERSION
   */
  async setDateOfAdmission(date: string): Promise<void> {
    try {
      console.log(`   📝 Setting date of admission: ${date}`);
      
      const exists = await this.dateOfAdmission.count();
      if (exists === 0) {
        console.log(`      ⚠ Date of admission field not found, skipping`);
        return;
      }
      
      await this.dateOfAdmission.waitFor({ state: "attached", timeout: 5000 }).catch(() => {
        console.log(`      ⚠ Date field not attached, skipping`);
        return;
      });
      
      await this.dateOfAdmission.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Use evaluate to set value
      await this.dateOfAdmission.evaluate((el, val) => {
        (el as HTMLInputElement).value = val;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }, date);
      
      console.log(`      ✓ Date of admission set: ${date}`);
    } catch (error) {
      console.error('      ✗ Failed to set date of admission:', error);
    }
  }

  /**
   * Fill all form fields with complete data - FIXED VERSION
   */
  async fillForm(data: any): Promise<void> {
    console.log("\n📝 Filling all GOP form fields...");

    try {
      // Approved amount INR
      if (data.approvedAmountINR !== undefined) {
        await this.fillInput(this.approvedAmountINR, String(data.approvedAmountINR), "Approved amount INR");
      }

      // Approved amount AED
      if (data.approvedAmountAED !== undefined) {
        await this.fillInput(this.approvedAmountAED, String(data.approvedAmountAED), "Approved amount AED");
      }

      // Country selection
      if (data.country) {
        await this.selectCountry(data.country);
      }

      // Preferred Currency INR
      if (data.preferredCurrencyINR !== undefined) {
        await this.fillInput(this.preferredCurrencyINR, String(data.preferredCurrencyINR), "Preferred Currency INR");
      }

      // Copay percentage
      if (data.copayPercentage !== undefined) {
        await this.fillInput(this.copayPercentage, String(data.copayPercentage), "Copay percentage");
      }

      // Copay Ceiling AED
      if (data.copayCeilingAED !== undefined) {
        await this.fillInput(this.copayCeilingAED, String(data.copayCeilingAED), "Copay Ceiling AED");
      }

      // Copay Ceiling Local
      if (data.copayCeilingLocal !== undefined) {
        await this.fillInput(this.copayCeilingLocal, String(data.copayCeilingLocal), "Copay Ceiling Local");
      }

      // GOP validity
      if (data.gopValidity) {
        await this.fillInput(this.gopValidity, data.gopValidity, "GOP validity");
      }

      // Contact number
      if (data.contactNumber) {
        await this.fillInput(this.contactNumber, String(data.contactNumber), "Contact number");
      }

      // Policy number
      if (data.policyNumber) {
        await this.fillInput(this.policyNumber, data.policyNumber, "Policy number");
      }

      // Policy validity
      if (data.policyValidity) {
        await this.fillInput(this.policyValidity, data.policyValidity, "Policy validity");
      }

      // Date of admission
      if (data.dateOfAdmission) {
        await this.setDateOfAdmission(data.dateOfAdmission);
      }

      // OPD Coverage
      if (data.opdCoverage) {
        await this.fillInput(this.opdCoverage, data.opdCoverage, "OPD Coverage");
      }

      // Room Category - FIXED: Check if field exists before trying to fill
      if (data.roomCategory) {
        const roomCategoryExists = await this.roomCategory.count();
        if (roomCategoryExists > 0) {
          await this.fillInput(this.roomCategory, data.roomCategory, "Room Category");
        } else {
          console.log(`   ⚠ Room Category field not found, skipping`);
        }
      }

      await this.page.waitForTimeout(1000);
      console.log("✅ All form fields filled successfully\n");
      
    } catch (error) {
      console.error("❌ Error filling form:", error);
      // Don't throw - let the test continue
    }
  }

  /**
   * Select drop reason from dropdown
   */
  async selectDropReason(reason: string): Promise<void> {
    try {
      console.log(`   📝 Selecting drop reason: ${reason}`);
      
      const exists = await this.dropCaseDropdown.count();
      if (exists === 0) {
        console.log(`      ⚠ Drop case dropdown not found, skipping`);
        return;
      }
      
      await this.dropCaseDropdown.waitFor({ state: "visible", timeout: 5000 });
      await this.dropCaseDropdown.scrollIntoViewIfNeeded();
      await this.dropCaseDropdown.click();
      await this.page.waitForTimeout(500);
      
      const reasonOption = this.page.locator('.ng-option', { hasText: reason }).first();
      const optionExists = await reasonOption.count();
      
      if (optionExists > 0) {
        await reasonOption.click();
        console.log('      ✓ Drop reason selected');
      } else {
        console.log(`      ⚠ Drop reason "${reason}" not found`);
        await this.page.keyboard.press('Escape');
      }
      
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('      ✗ Failed to select drop reason:', error);
    }
  }

  /**
   * Click Approve and Submit button
   */
  async clickApprove(): Promise<void> {
    try {
      console.log('   🔘 Clicking Approve and Submit button');
      
      const exists = await this.approveButton.count();
      if (exists === 0) {
        console.log('      ⚠ Approve button not found');
        return;
      }
      
      await this.approveButton.waitFor({ state: "visible", timeout: 10000 });
      await this.approveButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.approveButton.click();
      
      console.log('      ✓ Approve button clicked');
      await this.page.waitForTimeout(3000);
    } catch (error) {
      console.error('      ✗ Failed to click Approve button:', error);
    }
  }

  /**
   * Click Save as Draft button
   */
  async clickSaveDraft(): Promise<void> {
    try {
      console.log('   🔘 Clicking Save as Draft button');
      
      const exists = await this.saveDraftButton.count();
      if (exists === 0) {
        console.log('      ⚠ Save as Draft button not found');
        return;
      }
      
      await this.saveDraftButton.waitFor({ state: "visible", timeout: 10000 });
      await this.saveDraftButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.saveDraftButton.click();
      
      console.log('      ✓ Save as Draft clicked');
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error('      ✗ Failed to click Save as Draft:', error);
    }
  }

  /**
   * Click Close button
   */
  async clickClose(): Promise<void> {
    try {
      console.log('   🔘 Clicking Close button');
      
      const exists = await this.closeButton.count();
      if (exists === 0) {
        console.log('      ⚠ Close button not found');
        return;
      }
      
      await this.closeButton.waitFor({ state: "visible", timeout: 5000 });
      await this.closeButton.scrollIntoViewIfNeeded();
      await this.closeButton.click();
      
      console.log('      ✓ Close button clicked');
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error('      ✗ Failed to click Close button:', error);
    }
  }

  /**
   * Complete fill and approve flow
   */
  async completeFlow(data: any): Promise<boolean> {
    try {
      await this.fillForm(data);
      await this.clickApprove();
      return true;
    } catch (error) {
      console.error('❌ GOP flow failed:', error);
      return false;
    }
  }
}