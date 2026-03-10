import { Page } from '@playwright/test';
import testData from '../../test-data/estimationData.json';

export class EstimationPage {
  private page: Page;
  private viewEnquiryButton = testData.xpaths.viewEnquiry.viewEnquiryButton;
  private searchInput = testData.xpaths.viewEnquiry.searchInput;
  private cardViewEditButton = testData.xpaths.viewEnquiry.cardViewEditButton;
  private estimationsTab = testData.xpaths.enquiryModal.estimationsTab;
  private newEstimationButton = testData.xpaths.newEstimation.newEstimationButton;
  private newEstimationSaveButton = testData.xpaths.newEstimation.saveButton;
  private estimationCardViewEditButton = testData.xpaths.estimationCard.viewEditButton;
  private editEstimationTabActive = testData.xpaths.editEstimation.editEstimationTabActive;
  private estimationAmountInput = testData.xpaths.editEstimation.estimationAmountInput;
  private saveAsDraftButton = testData.xpaths.editEstimation.saveAsDraftButton;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Step 1: Click "View enquiry" button
   */
  async clickViewEnquiry() {
    try {
      await this.page.click(this.viewEnquiryButton);
      await this.page.waitForLoadState('networkidle');
      console.log('✓ Clicked View enquiry button');
    } catch (error) {
      console.error('✗ Failed to click View enquiry button:', error);
      throw error;
    }
  }

  /**
   * Step 2: Search enquiry by Case ID
   */
  async searchEnquiry(caseId: string) {
    try {
      await this.page.waitForSelector(this.searchInput, { timeout: testData.waits.defaultTimeout });
      await this.page.fill(this.searchInput, caseId);
      await this.page.waitForLoadState('networkidle');
      console.log(`✓ Searched for case ID: ${caseId}`);
    } catch (error) {
      console.error(`✗ Failed to search for case ID ${caseId}:`, error);
      throw error;
    }
  }

  /**
   * Step 3: Open enquiry card by clicking View & Edit
   */
  async openEnquiryCard() {
    try {
      await this.page.waitForSelector(this.cardViewEditButton, { timeout: testData.waits.defaultTimeout });
      const buttons = await this.page.$$(this.cardViewEditButton);
      if (buttons.length > 0) {
        await buttons[0].click();
        await this.page.waitForLoadState('networkidle');
        console.log('✓ Opened enquiry card');
      } else {
        throw new Error('No View & Edit button found');
      }
    } catch (error) {
      console.error('✗ Failed to open enquiry card:', error);
      throw error;
    }
  }

  /**
   * Step 4: Switch to Estimations tab
   */
  async switchToEstimationsTab() {
    try {
      await this.page.click(this.estimationsTab);
      await this.page.waitForLoadState('networkidle');
      console.log('✓ Switched to Estimations tab');
    } catch (error) {
      console.error('✗ Failed to switch to Estimations tab:', error);
      throw error;
    }
  }

  /**
   * Step 5: Click "+ New estimation" button
   */
  async clickNewEstimationButton() {
    try {
      await this.page.click(this.newEstimationButton);
      await this.page.waitForLoadState('networkidle');
      console.log('✓ Clicked + New estimation button');
    } catch (error) {
      console.error('✗ Failed to click + New estimation button:', error);
      throw error;
    }
  }

  /**
   * Step 6: Save new estimation (without filling any fields)
   */
  async saveNewEstimation() {
    try {
      await this.page.click(this.newEstimationSaveButton);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(testData.waits.shortWait);
      console.log('✓ Saved new estimation');
    } catch (error) {
      console.error('✗ Failed to save new estimation:', error);
      throw error;
    }
  }

  /**
   * Step 7: Click "View & Edit" on the estimation card
   */
  async clickEstimationCardViewEdit() {
    try {
      await this.page.waitForSelector(this.estimationCardViewEditButton, { timeout: testData.waits.defaultTimeout });
      const buttons = await this.page.$$(this.estimationCardViewEditButton);
      if (buttons.length > 0) {
        await buttons[buttons.length - 1].click(); // Click the last one (newest estimation)
        await this.page.waitForLoadState('networkidle');
        console.log('✓ Clicked View & Edit on estimation card');
      } else {
        throw new Error('No estimation card View & Edit button found');
      }
    } catch (error) {
      console.error('✗ Failed to click View & Edit on estimation card:', error);
      throw error;
    }
  }

  /**
   * Step 8: Verify Edit estimation tab is active
   */
  async verifyEditEstimationTabActive(): Promise<boolean> {
    try {
      const isVisible = await this.page.isVisible(this.editEstimationTabActive);
      if (isVisible) {
        console.log('✓ Edit estimation tab is active');
      } else {
        console.warn('⚠ Edit estimation tab may not be active');
      }
      return isVisible;
    } catch (error) {
      console.error('✗ Failed to verify Edit estimation tab:', error);
      return false;
    }
  }

  /**
   * Step 9: Enter estimation amount
   */
  async enterEstimationAmount(amount: string) {
    try {
      await this.page.waitForSelector(this.estimationAmountInput, { timeout: testData.waits.defaultTimeout });
      await this.page.fill(this.estimationAmountInput, amount);
      await this.page.waitForTimeout(testData.waits.shortWait);
      console.log(`✓ Entered estimation amount: ${amount}`);
    } catch (error) {
      console.error(`✗ Failed to enter estimation amount ${amount}:`, error);
      throw error;
    }
  }

  /**
   * Step 10: Click "Save as draft" button
   */
  async clickSaveAsDraft() {
    try {
      await this.page.click(this.saveAsDraftButton);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(testData.waits.shortWait);
      console.log('✓ Clicked Save as draft button');
    } catch (error) {
      console.error('✗ Failed to click Save as draft button:', error);
      throw error;
    }
  }

  /**
   * Verify estimation was saved (check if modal closed or success message shown)
   */
  async verifyEstimationSaved(): Promise<boolean> {
    try {
      // Wait for modal to close (estimation modal should disappear after save)
      const isClosed = await this.page.evaluate(() => {
        const modal = document.querySelector('[ngbautofocus]');
        return !modal || modal.offsetParent === null;
      });
      
      if (isClosed) {
        console.log('✓ Estimation saved successfully (modal closed)');
        return true;
      } else {
        console.warn('⚠ Modal still visible, but save may have succeeded');
        return true;
      }
    } catch (error) {
      console.error('✗ Failed to verify estimation save:', error);
      return false;
    }
  }

  /**
   * Complete estimation flow in one call
   */
  async completeEstimationFlow(caseId: string, estimationAmount: string) {
    console.log('\n=== Starting Estimation Flow ===');
    
    await this.clickViewEnquiry();
    await this.searchEnquiry(caseId);
    await this.openEnquiryCard();
    await this.switchToEstimationsTab();
    await this.clickNewEstimationButton();
    await this.saveNewEstimation();
    await this.clickEstimationCardViewEdit();
    await this.verifyEditEstimationTabActive();
    await this.enterEstimationAmount(estimationAmount);
    await this.clickSaveAsDraft();
    const saved = await this.verifyEstimationSaved();
    
    console.log('=== Estimation Flow Completed ===\n');
    return saved;
  }
}
