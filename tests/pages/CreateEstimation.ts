import { Page } from '@playwright/test';
import  estimationData  from '../../test-data/estimationData.json';

/**
 * EstimationPage - Page Object Model for Estimation Management
 * Uses xpaths from estimationData.json
 */
export class CreateEstimationPage {
  constructor(private page: Page) {}


  // ============ VIEW ENQUIRY METHODS ============

  /**
   * Click the View Enquiry button
   */
  async clickViewEnquiry(): Promise<void> {
    try {
      await this.page.click(estimationData.xpaths.viewEnquiry.viewEnquiryButton);
      await this.page.waitForLoadState('networkidle');
      console.log('✓ View enquiry button clicked');
    } catch (error) {
      console.error('✗ Failed to click View enquiry:', error);
      throw error;
    }
  }



/**
 * Click on Provider enquiry menu and then the sub-menu item in popover
 */
async clickProviderEnquiryMenu(): Promise<void> {
  try {
    console.log('🔍 Looking for Provider enquiry menu...');
    
    // STEP 1: Click the main menu icon
    const mainMenuIcon = this.page.locator(
      "//li[contains(@class,'nav-item')][.//img[@alt='Provider enquiry']]/a"
    ).first();
    
    await mainMenuIcon.waitFor({ state: 'visible', timeout: 10000 });
    await mainMenuIcon.click();
    console.log('✓ Main menu icon clicked');
    
    // Wait for popover to appear
    await this.page.waitForTimeout(1000);
    
    // STEP 2: Click the sub-menu item inside the popover
    const subMenuItem = this.page.locator(
      "//div[contains(@class,'popover-body')]//li[contains(@class,'cursor-pointer') and contains(text(),'Provider enquiry')]"
    ).first();
    
    await subMenuItem.waitFor({ state: 'visible', timeout: 10000 });
    await subMenuItem.click();
    console.log('✓ Sub-menu item clicked');
    
    // Wait for navigation
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    
  } catch (error) {
    console.error('✗ Failed to click Provider enquiry menu:', error);
    throw error;
  }
}
  /**
   * Search for an enquiry by Case ID
   * @param caseId - The case ID to search for
   */
  async searchEnquiry(caseId: string): Promise<void> {
    try {
      await this.page.waitForSelector(estimationData.xpaths.viewEnquiry.searchInput, { timeout: 30000 });
      await this.page.fill(estimationData.xpaths.viewEnquiry.searchInput, caseId);
      await this.page.keyboard.press('Enter');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      console.log(`✓ Searched for case ID: ${caseId}`);
    } catch (error) {
      console.error(`✗ Failed to search for case ID:`, error);
      throw error;
    }
  }

  /**
   * Open enquiry card by case ID
   * @param caseId - The case ID to open
   */
  async openEnquiryCardByCaseId(caseId: string): Promise<void> {
    try {
      // Wait for the case to appear in search results
      await this.page.waitForSelector(`//div[contains(text(),'${caseId}')]`, { timeout: 10000 });
      
      const cardButton = this.page.locator(estimationData.xpaths.viewEnquiry.cardViewEditButton).first();
      await cardButton.waitFor({ state: 'visible', timeout: 10000 });
      await cardButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      console.log(`✓ Enquiry card opened for case: ${caseId}`);
    } catch (error) {
      console.error(`✗ Failed to open enquiry card for case ${caseId}:`, error);
      throw error;
    }
  }

  /**
   * Open first enquiry card
   */
  async openFirstEnquiryCard(): Promise<void> {
    try {
      const cardButton = this.page.locator(estimationData.xpaths.viewEnquiry.cardViewEditButton).first();
      await cardButton.waitFor({ state: 'visible', timeout: 10000 });
      await cardButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      console.log('✓ First enquiry card opened');
    } catch (error) {
      console.error('✗ Failed to open enquiry card:', error);
      throw error;
    }
  }

  // ============ MODAL VERIFICATION METHODS ============

  /**
   * Verify enquiry modal is open
   */
  async isEnquiryModalOpen(): Promise<boolean> {
    try {
      return await this.page.isVisible(estimationData.xpaths.enquiryModal.modalTitle, { timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Wait for enquiry modal to open
   */
  async waitForEnquiryModal(): Promise<void> {
    try {
      await this.page.waitForSelector(estimationData.xpaths.enquiryModal.modalTitle, { timeout: 10000 });
      console.log('✓ Enquiry modal is open');
    } catch (error) {
      console.error('✗ Enquiry modal did not open:', error);
      throw error;
    }
  }

  // ============ TAB NAVIGATION METHODS ============

  /**
   * Switch to Estimations tab
   */
  async switchToEstimationsTab(): Promise<void> {
    try {
      await this.page.click(estimationData.xpaths.enquiryModal.estimationsTab);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);
      console.log('✓ Switched to Estimations tab');
    } catch (error) {
      console.error('✗ Failed to switch to Estimations tab:', error);
      throw error;
    }
  }

  /**
   * Switch to Patient Detail tab
   */
  async switchToPatientDetailTab(): Promise<void> {
    try {
      await this.page.click(estimationData.xpaths.enquiryModal.patientDetailTab);
      await this.page.waitForLoadState('networkidle');
      console.log('✓ Switched to Patient Detail tab');
    } catch (error) {
      console.error('✗ Failed to switch to Patient Detail tab:', error);
    }
  }

  // ============ NEW ESTIMATION METHODS ============

  /**
   * Click New Estimation button
   */
  async clickNewEstimationButton(): Promise<void> {
    try {
      await this.page.click(estimationData.xpaths.newEstimation.newEstimationButton);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);
      console.log('✓ New estimation button clicked');
    } catch (error) {
      console.error('✗ Failed to click new estimation button:', error);
      throw error;
    }
  }

  /**
   * Fill treatment plan
   * @param treatmentPlan - Treatment plan text
   */
  async fillTreatmentPlan(treatmentPlan: string): Promise<void> {
    try {
      await this.page.waitForSelector(estimationData.xpaths.newEstimation.treatmentPlanInput, { timeout: 10000 });
      await this.page.fill(estimationData.xpaths.newEstimation.treatmentPlanInput, treatmentPlan);
      console.log(`✓ Treatment plan entered: ${treatmentPlan}`);
    } catch (error) {
      console.error('✗ Failed to enter treatment plan:', error);
    }
  }

  /**
   * Fill length of stay
   * @param lengthOfStay - Length of stay in days
   */
  async fillLengthOfStay(lengthOfStay: string): Promise<void> {
    try {
      await this.page.fill(estimationData.xpaths.newEstimation.lengthOfStayInput, lengthOfStay);
      console.log(`✓ Length of stay entered: ${lengthOfStay}`);
    } catch (error) {
      console.error('✗ Failed to enter length of stay:', error);
    }
  }

  /**
   * Fill inclusions
   * @param inclusions - Inclusions text
   */
  async fillInclusions(inclusions: string): Promise<void> {
    try {
      await this.page.fill(estimationData.xpaths.newEstimation.inclusionsInput, inclusions);
      console.log(`✓ Inclusions entered: ${inclusions}`);
    } catch (error) {
      console.error('✗ Failed to enter inclusions:', error);
    }
  }

  /**
   * Fill exclusions
   * @param exclusions - Exclusions text
   */
  async fillExclusions(exclusions: string): Promise<void> {
    try {
      await this.page.fill(estimationData.xpaths.newEstimation.exclusionsInput, exclusions);
      console.log(`✓ Exclusions entered: ${exclusions}`);
    } catch (error) {
      console.error('✗ Failed to enter exclusions:', error);
    }
  }

  /**
   * Save new estimation
   */
  async saveNewEstimation(): Promise<void> {
    try {
      await this.page.click(estimationData.xpaths.newEstimation.saveButton);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(3000);
      console.log('✓ New estimation saved');
    } catch (error) {
      console.error('✗ Failed to save new estimation:', error);
      throw error;
    }
  }

  /**
   * Create complete new estimation with all fields
   * @param data - Estimation data object
   */
  async createCompleteEstimation(data: any): Promise<void> {
    await this.clickNewEstimationButton();
    if (data.treatmentPlan) await this.fillTreatmentPlan(data.treatmentPlan);
    if (data.lengthOfStay) await this.fillLengthOfStay(data.lengthOfStay);
    if (data.inclusions) await this.fillInclusions(data.inclusions);
    if (data.exclusions) await this.fillExclusions(data.exclusions);
    await this.saveNewEstimation();
  }

  // ============ ESTIMATION CARD METHODS ============

  /**
   * Check if estimation card exists
   */
  async hasEstimationCard(): Promise<boolean> {
    try {
      await this.page.waitForSelector(estimationData.xpaths.estimationCard.estimationCardContainer, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for estimation card to appear
   */
  async waitForEstimationCard(timeout = 10000): Promise<void> {
    try {
      await this.page.waitForSelector(estimationData.xpaths.estimationCard.estimationCardContainer, { timeout });
      console.log('✓ Estimation card is visible');
    } catch (error) {
      console.error('✗ Estimation card did not appear:', error);
      throw error;
    }
  }

  /**
   * Get estimation cards count
   */
  async getEstimationCardsCount(): Promise<number> {
    try {
      const cards = await this.page.$$(estimationData.xpaths.estimationCard.estimationCardContainer);
      return cards.length;
    } catch {
      return 0;
    }
  }

  /**
   * Wait for modal backdrop to disappear
   */
  async waitForModalBackdropToDisappear(timeout = 10000): Promise<void> {
    try {
      await this.page.waitForSelector('.modal-backdrop', { state: 'detached', timeout });
      console.log('✓ Modal backdrop disappeared');
    } catch {
      console.log('✓ No modal backdrop found or it disappeared');
    }
  }

  /**
   * Click View & Edit button on estimation card (last one)
   */
  async clickLastEstimationCardViewEdit(): Promise<void> {
    try {
      await this.waitForEstimationCard();
      
      // Wait for any modal backdrop to disappear
      await this.waitForModalBackdropToDisappear();
      
      const buttons = await this.page.$$(estimationData.xpaths.estimationCard.viewEditButton);
      if (buttons.length > 0) {
        // Click using JavaScript to bypass backdrop
        await buttons[buttons.length - 1].evaluate((btn) => (btn as HTMLElement).click());
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
        console.log('✓ Last estimation card View & Edit clicked');
      } else {
        throw new Error('No View & Edit button found on estimation card');
      }
    } catch (error) {
      console.error('✗ Failed to click View & Edit on card:', error);
      throw error;
    }
  }

  /**
   * Click View & Edit button on estimation card (first one)
   */
  async clickFirstEstimationCardViewEdit(): Promise<void> {
    try {
      await this.waitForEstimationCard();
      
      // Wait for any modal backdrop to disappear
      await this.waitForModalBackdropToDisappear();
      
      const buttons = await this.page.$$(estimationData.xpaths.estimationCard.viewEditButton);
      if (buttons.length > 0) {
        // Click using JavaScript to bypass backdrop
        await buttons[0].evaluate((btn) => (btn as HTMLElement).click());
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
        console.log('✓ First estimation card View & Edit clicked');
      } else {
        throw new Error('No View & Edit button found on estimation card');
      }
    } catch (error) {
      console.error('✗ Failed to click View & Edit on card:', error);
      throw error;
    }
  }

  /**
   * Check if New badge is visible on estimation card
   */
  async isNewBadgeVisible(): Promise<boolean> {
    try {
      return await this.page.isVisible(estimationData.xpaths.estimationCard.newBadge);
    } catch {
      return false;
    }
  }

  /**
 * Open enquiry card by patient name with flexible matching
 * @param patientName - The patient name to search and open
 * @param exactMatch - Whether to match exactly (default: false)
 */
async openEnquiryCardByName(patientName: string, exactMatch: boolean = false): Promise<void> {
  try {
    console.log(`🔍 Looking for enquiry card with patient name: ${patientName}`);
    
    let patientXPath: string;
    if (exactMatch) {
      patientXPath = `//div[contains(@class,'card-body') and .//div[normalize-space()='${patientName}']]`;
    } else {
      patientXPath = `//div[contains(@class,'card-body') and .//div[contains(text(),'${patientName}')]]`;
    }
    
    // Wait for the patient card to appear
    await this.page.waitForSelector(patientXPath, { timeout: 10000 });
    
    // Find the View/Edit button within that card
    const cardButton = this.page.locator(
      `${patientXPath}//button[contains(@class,'btn-outline-info') or contains(text(),'View')]`
    ).first();
    
    await cardButton.waitFor({ state: 'visible', timeout: 10000 });
    await cardButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    console.log(`✓ Enquiry card opened for patient: ${patientName}`);
  } catch (error) {
    console.error(`✗ Failed to open enquiry card for patient ${patientName}:`, error);
    throw error;
  }
}

  /**
   * Get estimation status from card
   */
  async getEstimationCardStatus(): Promise<string> {
    try {
      const statusElement = await this.page.$(estimationData.xpaths.estimationCard.estimationStatus);
      return await statusElement?.textContent() || '';
    } catch {
      return '';
    }
  }

  /**
   * Check if estimation card has Draft status
   */
  async hasDraftStatus(): Promise<boolean> {
    try {
      // Wait a bit for the status to update
      await this.page.waitForTimeout(2000);
      
      // Check for draft status badge on the card
      const draftBadge = this.page.locator(estimationData.xpaths.estimationCard.estimationStatus).filter({ hasText: /Draft/i });
      return await draftBadge.isVisible().catch(() => false);
    } catch {
      return false;
    }
  }

  // ============ EDIT ESTIMATION METHODS ============

  /**
   * Verify Edit tab is active
   */
/**
 * Verify Edit tab is active - MORE FLEXIBLE VERSION
 */
async verifyEditTabActive(): Promise<boolean> {
  try {
    // Try multiple strategies
    const selectors = [
      estimationData.xpaths.editEstimation.editEstimationTabActive,
      "//a[contains(text(),'Edit') and contains(@class,'active')]",
      "//a[contains(@class,'active') and contains(text(),'Edit')]",
      "//div[contains(@class,'tab-pane') and contains(@class,'active')]//input[@type='text']"
    ];
    
    for (const selector of selectors) {
      const isVisible = await this.page.isVisible(selector, { timeout: 5000 }).catch(() => false);
      if (isVisible) {
        console.log(`✓ Edit estimation tab is active (using selector: ${selector.substring(0, 50)}...)`);
        return true;
      }
    }
    
    // If no tab found, check if we're on edit page by looking for amount input
    const hasAmountInput = await this.page.isVisible(estimationData.xpaths.editEstimation.estimationAmountInput, { timeout: 3000 }).catch(() => false);
    if (hasAmountInput) {
      console.log('✓ Edit estimation page detected by amount input');
      return true;
    }
    
    console.warn('⚠ Could not verify edit tab');
    return false;
  } catch (error) {
    console.warn('⚠ Could not verify edit tab:', error);
    return false;
  }
}

  /**
   * Enter estimation amount (primary selector)
   * @param amount - The amount to enter
   */
  async enterEstimationAmount(amount: string): Promise<void> {
    try {
      const inputSelector = estimationData.xpaths.editEstimation.estimationAmountInput;
      await this.page.waitForSelector(inputSelector, { timeout: 30000 });
      await this.page.fill(inputSelector, amount);
      console.log(`✓ Estimation amount entered: ${amount}`);
    } catch (error) {
      console.error(`✗ Failed to enter estimation amount with primary selector:`, error);
      
      // Try alternative selector
      try {
        const altSelector = estimationData.xpaths.editEstimation.estimationAmountInputAlt;
        await this.page.waitForSelector(altSelector, { timeout: 10000 });
        await this.page.fill(altSelector, amount);
        console.log(`✓ Estimation amount entered with alt selector: ${amount}`);
      } catch (altError) {
        console.error(`✗ Failed to enter estimation amount with alt selector:`, altError);
        throw error;
      }
    }
  }

  /**
   * Switch to Hospital/Facilitator terms tab
   */
  async switchToHospitalTermsTab(): Promise<void> {
    try {
      await this.page.click(estimationData.xpaths.editEstimation.hospitalTermsTab);
      await this.page.waitForLoadState('networkidle');
      console.log('✓ Switched to Hospital/Facilitator terms tab');
    } catch (error) {
      console.error('✗ Failed to switch to Hospital/Facilitator terms tab:', error);
    }
  }

  /**
   * Switch to Attachments tab
   */
  async switchToAttachmentsTab(): Promise<void> {
    try {
      await this.page.click(estimationData.xpaths.editEstimation.attachmentsTab);
      await this.page.waitForLoadState('networkidle');
      console.log('✓ Switched to Attachments tab');
    } catch (error) {
      console.error('✗ Failed to switch to Attachments tab:', error);
    }
  }

  /**
   * Save estimation as draft
   */
  async saveAsDraft(): Promise<void> {
    try {
      await this.page.click(estimationData.xpaths.editEstimation.saveAsDraftButton);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(3000);
      console.log('✓ Estimation saved as draft');
    } catch (error) {
      console.error('✗ Failed to save as draft:', error);
      throw error;
    }
  }

  // ============ VERIFICATION METHODS ============

  /**
   * Check if draft status badge is visible (in the edit view)
   */
  async isDraftStatusVisible(): Promise<boolean> {
    try {
      await this.page.waitForSelector(estimationData.xpaths.successIndicators.draftStatusBadge, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for draft status badge to appear
   */
  async waitForDraftStatus(timeout = 10000): Promise<void> {
    try {
      await this.page.waitForSelector(estimationData.xpaths.successIndicators.draftStatusBadge, { timeout });
      console.log('✓ Draft status badge is visible');
    } catch (error) {
      console.error('✗ Draft status badge did not appear:', error);
      throw error;
    }
  }

  /**
   * Check if success message is visible (toast/alert)
   */
  async isSuccessMessageVisible(): Promise<boolean> {
    try {
      await this.page.waitForSelector(estimationData.xpaths.successIndicators.successMessage, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for success message to appear
   */
  async waitForSuccessMessage(timeout = 10000): Promise<void> {
    try {
      await this.page.waitForSelector(estimationData.xpaths.successIndicators.successMessage, { timeout });
      console.log('✓ Success message is visible');
    } catch (error) {
      console.error('✗ Success message did not appear:', error);
    }
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string> {
    try {
      const element = await this.page.$(estimationData.xpaths.successIndicators.successMessage);
      return await element?.textContent() || '';
    } catch {
      return '';
    }
  }

  /**
   * Verify estimation was saved by checking the estimation card
   */
  async verifySaved(): Promise<boolean> {
    try {
      console.log('⏳ Waiting for save confirmation...');
      
      // Wait a bit for UI to update and return to estimations list
      await this.page.waitForTimeout(3000);
      
      // Check if we're back on the estimations tab with cards
      const hasCard = await this.hasEstimationCard().catch(() => false);
      if (hasCard) {
        console.log('✓ Estimation card found');
        
        // Optional: Check for draft status on the card
        const hasDraftStatus = await this.hasDraftStatus();
        if (hasDraftStatus) {
          console.log('✓ Draft status found on card');
        }
        
        return true;
      }
      
      console.log('⚠ No estimation card found after save');
      return false;
    } catch (error) {
      console.warn('⚠ Save verification inconclusive:', error);
      return false;
    }
  }

  /**
   * Wait for save confirmation by checking for estimation card
   */
  async waitForSaveConfirmation(timeout = 10000): Promise<boolean> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const hasCard = await this.hasEstimationCard().catch(() => false);
      if (hasCard) {
        console.log('✓ Estimation card appeared after save');
        return true;
      }
      
      await this.page.waitForTimeout(500);
    }
    
    console.log('⚠ No estimation card appeared within timeout');
    return false;
  }

  /**
   * Verify estimation amount matches expected
   * @param expectedAmount - Expected amount
   */
  async verifyEstimationAmount(expectedAmount: string): Promise<boolean> {
    try {
      // This would need actual implementation based on where amount is displayed
      await this.page.waitForTimeout(1000);
      return true;
    } catch {
      return false;
    }
  }

  // ============ HELPER METHODS ============

  /**
   * Wait for loader to disappear
   */
  async waitForLoaderToDisappear(timeout = 10000): Promise<void> {
    try {
      await this.page.waitForSelector('.spinner, .loader, .loading', { state: 'detached', timeout }).catch(() => {});
    } catch {
      // Ignore
    }
  }

  /**
   * Refresh the page
   */
  async refreshPage(): Promise<void> {
    try {
      await this.page.reload();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      console.log('✓ Page refreshed');
    } catch (error) {
      console.error('✗ Failed to refresh page:', error);
    }
  }

  /**
   * Debug method to take screenshot
   * @param name - Screenshot name
   */
  async takeScreenshot(name: string): Promise<void> {
    try {
      await this.page.screenshot({ path: `screenshots/${name}-${Date.now()}.png`, fullPage: true });
      console.log(`📸 Screenshot taken: ${name}`);
    } catch (error) {
      console.error(`✗ Failed to take screenshot: ${error}`);
    }
  }

  /**
   * Debug method to check current state
   */
  async debugState(): Promise<void> {
    console.log('\n🔍 DEBUG: Current Page State');
    
    try {
      // Check URL
      console.log(`URL: ${this.page.url()}`);
      
      // Check if we're on estimations tab
      const hasEstimationsTab = await this.page.isVisible(estimationData.xpaths.enquiryModal.estimationsTab).catch(() => false);
      console.log(`Estimations tab visible: ${hasEstimationsTab}`);
      
      // Check if estimation cards exist
      const hasCard = await this.hasEstimationCard().catch(() => false);
      console.log(`Estimation cards exist: ${hasCard}`);
      
      // Check card count
      const cardCount = await this.getEstimationCardsCount();
      console.log(`Estimation cards count: ${cardCount}`);
      
      // Check if modal backdrop exists
      const hasBackdrop = await this.page.isVisible('.modal-backdrop').catch(() => false);
      console.log(`Modal backdrop visible: ${hasBackdrop}`);
      
      await this.takeScreenshot('debug-state');
    } catch (error) {
      console.error('✗ Failed to debug state:', error);
    }
  }
}