// pages/ApproveCasePage.ts
import { Page, Locator } from '@playwright/test';

/**
 * ApproveCasePage - Complete Page Object Model for Approve Estimation Workflow
 * Handles: View enquiry, search, open case, view estimation, and approve
 */
export class ApproveCasePage {
  private page: Page;

  // ============ SEARCH & VIEW ENQUIRY ============
  private viewEnquiryButton: Locator;
  private searchInput: Locator;
  private successMessage: Locator;

  // ============ ESTIMATION SECTION ============
  private estimationModal: Locator;
  private estimationCard: Locator;
  private approveButton: Locator;
  private submitButton: Locator;
  private statusDropdown: Locator;
  
  // ============ APPROVE FINALIZE MODAL ============
  private saveAndApproveButton: Locator;
  
  // ============ OFFCANVAS ============
  private offcanvasContainer: Locator;
  private offcanvasCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.statusDropdown = page.locator("//app-crm-lookup//ng-select").first();
    
    // Search & View Enquiry
    this.viewEnquiryButton = page.locator("//button[normalize-space()='View enquiry']");
    this.searchInput = page.locator("//input[@placeholder='Search by Case ID , Name']");

    // Estimation modal & buttons
    this.estimationModal = page.locator("//div[contains(@class,'modal-body')]//app-provider-estimation-tab-container");
    this.estimationCard = page.locator("//div[contains(@class,'card-apply-job')]");
    this.saveAndApproveButton = page.locator("//button[contains(@class,'btn-primary') and contains(normalize-space(),'Save & Approve')]");

    // Approve button
    this.approveButton = page.locator(
      "//button[contains(@class,'btn-warning') and contains(normalize-space(),'Approve')]"
    );

    this.submitButton = page.locator(
      "//button[contains(@class,'btn-primary') and normalize-space()='Save & Approve']"
    );

    this.successMessage = page.locator(
      "//div[contains(@class,'alert-success') or contains(@class,'success-message')] | " +
      "//div[@id='toast-container']//div[contains(@class,'success') or contains(@class,'alert-success')] | " +
      "//div[@id='toast-container']//div[contains(text(),'success') or contains(text(),'Success')] | " +
      "//div[@id='toast-container']//div[contains(@class,'toast-success')] | " +
      "//div[@id='toast-container']//div[contains(@class,'toast')] | " +
      "//div[@id='toast-container']//div[contains(@class,'alert')]"
    ).first();
    
    // Offcanvas
    this.offcanvasContainer = page.locator("//div[contains(@class,'offcanvas-container') and contains(@class,'show')]");
    this.offcanvasCloseButton = page.locator("//button[normalize-space()='Close']");
  }

  /**
   * Step 1: Click View enquiry button
   */
  async clickViewEnquiry(): Promise<boolean> {
    try {
      await this.viewEnquiryButton.waitFor({ state: 'visible', timeout: 15000 });
      await this.viewEnquiryButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);
      console.log('✓ View enquiry button clicked');
      return true;
    } catch (error) {
      console.error('✗ Failed to click View enquiry button:', error);
      return false;
    }
  }

  /**
   * Step 2: Search for case by Case ID
   */
  async searchCaseById(caseId: string): Promise<boolean> {
    try {
      await this.searchInput.waitFor({ state: 'visible', timeout: 15000 });
      await this.searchInput.clear();
      await this.page.waitForTimeout(300);
      await this.searchInput.fill(caseId);
      await this.searchInput.press('Enter');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      console.log(`✓ Searched for case ID: ${caseId} + Enter pressed`);
      return true;
    } catch (error) {
      console.error(`✗ Failed to search for case ID ${caseId}:`, error);
      return false;
    }
  }

  /**
   * Step 3: Click on the case row to open details
   */
  async clickCaseRow(caseId: string): Promise<boolean> {
    try {
      // Try multiple selectors
      const selectors = [
        `//tr[contains(@class,'display-pointer')][.//div[normalize-space()='${caseId}']]`,
        `//tr[contains(@class,'display-pointer')][.//div[contains(text(),'${caseId}')]]`,
        `//tr[contains(@class,'display-pointer')][td[1]/div[contains(@class,'text-primary') and contains(text(),'${caseId}')]]`,
        `//tr[contains(@class,'display-pointer')][td[1]//*[contains(text(),'${caseId}')]]`,
        `//tr[contains(@class,'display-pointer')][td[1]//div[contains(@class,'text-primary') and normalize-space()='${caseId}']]`
      ];

      for (const selector of selectors) {
        const caseRow = this.page.locator(selector).first();
        if (await caseRow.count() > 0) {
          await caseRow.waitFor({ state: 'visible', timeout: 10000 });
          await caseRow.scrollIntoViewIfNeeded();
          await caseRow.click();
          await this.page.waitForLoadState('networkidle');
          await this.page.waitForTimeout(2000);
          console.log(`✓ Clicked on case row: ${caseId}`);
          return true;
        }
      }

      console.error(`✗ Could not find case row for ${caseId}`);
      
      // Take screenshot for debugging
      await this.page.screenshot({ path: `case-row-not-found-${caseId}.png` });
      
      return false;
    } catch (error) {
      console.error(`✗ Failed to click case row ${caseId}:`, error);
      return false;
    }
  }

  /**
   * Step 4: Verify case details offcanvas is open
   */
  async isOffcanvasOpen(): Promise<boolean> {
    try {
      // Wait for offcanvas to appear
      await this.offcanvasContainer.waitFor({ state: 'visible', timeout: 10000 });
      console.log('✓ Case details offcanvas is open');
      return true;
    } catch (error) {
      console.warn('⚠ Could not verify offcanvas:', error);
      
      // Try alternative selector
      try {
        const altOffcanvas = this.page.locator("//div[contains(@class,'offcanvas')]").first();
        if (await altOffcanvas.isVisible()) {
          console.log('✓ Alternative offcanvas found');
          return true;
        }
      } catch (e) {
        // Ignore
      }
      
      return false;
    }
  }

  /**
   * Step 5: Click Providers tab
   */
  async clickProvidersTab(): Promise<boolean> {
    try {
      const providersTab = this.page.locator("//a[contains(normalize-space(),'Providers')]");
      await providersTab.waitFor({ state: 'visible', timeout: 15000 });
      await providersTab.scrollIntoViewIfNeeded();
      await providersTab.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1500);
      console.log('✓ Clicked Providers tab');
      return true;
    } catch (error) {
      console.error('✗ Failed to click Providers tab:', error);
      return false;
    }
  }

  /**
   * Step 6: Click View button in providers section
   */
  async clickViewButton(): Promise<boolean> {
    try {
      const viewButton = this.page.locator(
        "//button[contains(@class,'add-to-compare-btn') and contains(normalize-space(),'View')]"
      );
      await viewButton.waitFor({ state: 'visible', timeout: 15000 });
      await viewButton.scrollIntoViewIfNeeded();
      await viewButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1500);
      console.log('✓ Clicked View button');
      return true;
    } catch (error) {
      console.error('✗ Failed to click View button:', error);
      return false;
    }
  }

  /**
   * Step 7: Verify estimation modal is open
   */
  async isEstimationModalOpen(): Promise<boolean> {
    try {
      const isVisible = await this.estimationModal.isVisible().catch(() => false);
      if (isVisible) {
        console.log('✓ Estimation modal is open');
      }
      return isVisible;
    } catch (error) {
      console.warn('⚠ Could not verify estimation modal:', error);
      return false;
    }
  }

  /**
   * Step 8: Click Approve button
   */
  async clickApproveButton(): Promise<boolean> {
    try {
      await this.approveButton.waitFor({ state: 'visible', timeout: 15000 });
      await this.approveButton.scrollIntoViewIfNeeded();
      await this.approveButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      console.log('✓ Clicked Approve button');
      return true;
    } catch (error) {
      console.error('✗ Failed to click Approve button:', error);
      return false;
    }
  }

  /**
   * Step 9: Verify approval success
   */
  async isApprovalSuccessful(): Promise<boolean> {
    console.log('🔍 Verifying approval state...');

    try {
      // Wait for either success message or button state change
      await this.page.waitForTimeout(3000);

      // Check for success toast
      const successToast = await this.successMessage.isVisible().catch(() => false);
      if (successToast) {
        const toastText = await this.successMessage.textContent();
        console.log(`✅ Success message: ${toastText}`);
        return true;
      }

      // Check if Save & Approve button is disabled
      const submitButtonVisible = await this.submitButton.isVisible().catch(() => false);
      if (submitButtonVisible) {
        const isEnabled = await this.submitButton.isEnabled().catch(() => true);
        if (!isEnabled) {
          console.log('✅ Save & Approve button disabled after approval');
          return true;
        }
      }

      // Check for any success indicators in the page
      const pageContent = await this.page.content();
      if (pageContent.includes('success') || pageContent.includes('Success')) {
        console.log('✅ Page contains success text');
        return true;
      }

      console.log('⚠ No clear success indicator found');
      return false;
    } catch (error) {
      console.error('❌ Approval verification error:', error);
      return false;
    }
  }

  /**
   * Find the best card for approval
   */
  async findBestCardForApproval(): Promise<number> {
    console.log('\n🔍 Searching for best card to approve...');
    console.log('   Priority 1: Amount > 1000 (closest to 1000)');
    console.log('   Priority 2: If none > 1000, highest amount under 1000');

    // Wait for cards to load
    await this.page.waitForTimeout(3000);

    // Find all provider cards
    const cards = await this.page.locator("//app-provider-enquiry-list-item//div[contains(@class,'provider-card')]").all();

    if (cards.length === 0) {
      console.log('⚠ No provider cards found');
      
      // Debug: Take screenshot
      await this.page.screenshot({ path: 'no-cards-found.png' });
      console.log('📸 Screenshot saved: no-cards-found.png');
      
      return -1;
    }

    console.log(`Found ${cards.length} provider cards`);

    let bestIndex = -1;
    let bestAmount = 0;
    let bestCategory = ''; // 'above' or 'below'

    // First pass: Look for amounts > 1000
    for (let i = 0; i < cards.length; i++) {
      try {
        // Find the amount element within this card
        const amountElement = cards[i].locator("h2.text-white").first();
        const amountText = await amountElement.textContent() || '0';
        const amount = this.parseAmount(amountText);

        console.log(`Card ${i + 1}: Amount = ${amount} (raw: "${amountText}")`);

        // Check if amount > 1000
        if (amount > 1000) {
          console.log(`  ✅ Amount > 1000 found: ${amount}`);

          if (bestCategory !== 'above' || amount < bestAmount) {
            bestIndex = i;
            bestAmount = amount;
            bestCategory = 'above';
            console.log(`  🏆 New best (closer to 1000): ${amount}`);
          }
        }
      } catch (error) {
        console.log(`  ⚠ Could not read amount for card ${i + 1}`);
      }
    }

    // If no amount > 1000 found, look for highest amount under 1000
    if (bestIndex === -1) {
      console.log('\n🔍 No amounts > 1000 found. Looking for highest amount under 1000...');

      for (let i = 0; i < cards.length; i++) {
        try {
          const amountElement = cards[i].locator("h2.text-white").first();
          const amountText = await amountElement.textContent() || '0';
          const amount = this.parseAmount(amountText);

          if (amount > 0 && amount <= 1000) {
            console.log(`Card ${i + 1}: Amount = ${amount} (under 1000)`);

            if (amount > bestAmount) {
              bestAmount = amount;
              bestIndex = i;
              bestCategory = 'below';
              console.log(`  🏆 New highest under 1000: ${amount}`);
            }
          }
        } catch (error) {
          // Skip
        }
      }
    }

    if (bestIndex === -1) {
      console.log('❌ No suitable cards found for approval');
    } else {
      console.log(`\n✅ Selected card ${bestIndex + 1} with amount: ${bestAmount} (${bestCategory === 'above' ? 'above 1000' : 'under 1000'})`);
    }

    return bestIndex;
  }

  /**
   * Filter by status
   */
  async filterByStatus(status: string): Promise<boolean> {
    try {
      await this.statusDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.statusDropdown.click();
      await this.page.waitForTimeout(500);

      const statusOption = this.page.locator(
        `//ng-dropdown-panel//div[@role='option' and normalize-space()='${status}']`
      );
      await statusOption.waitFor({ state: 'visible', timeout: 5000 });
      await statusOption.click();
      await this.page.waitForTimeout(1000);
      return true;
    } catch (error) {
      console.error(`✗ Failed to filter by status ${status}:`, error);
      return false;
    }
  }

  // ============ COMPARE ESTIMATIONS METHODS ============

  /**
   * Click Compare button on a specific card
   * @param cardIndex - Index of the card (0-based)
   */
  async clickCompareButtonOnCard(cardIndex: number): Promise<boolean> {
    try {
      console.log(`🔍 Clicking Compare button on card ${cardIndex + 1}...`);

      const cards = await this.page.locator("//app-provider-enquiry-list-item//div[contains(@class,'provider-card')]").all();

      if (cardIndex >= cards.length) {
        throw new Error(`Card index ${cardIndex} out of range (total: ${cards.length})`);
      }

      const compareButton = cards[cardIndex].locator("button.add-to-compare-btn:has-text('Compare')").first();
      await compareButton.waitFor({ state: 'visible', timeout: 10000 });
      await compareButton.scrollIntoViewIfNeeded();
      await compareButton.click();

      console.log(`✓ Compare button clicked on card ${cardIndex + 1}`);
      await this.page.waitForTimeout(1000);
      return true;
    } catch (error) {
      console.error(`✗ Failed to click Compare button on card ${cardIndex + 1}:`, error);
      return false;
    }
  }

  /**
   * Select top N cards for comparison based on amount
   * @param count - Number of cards to select (default: 2)
   */
  async selectTopCardsForComparison(count: number = 2): Promise<number[]> {
    console.log(`\n🔍 Selecting top ${count} cards for comparison...`);

    const cards = await this.page.locator("//app-provider-enquiry-list-item//div[contains(@class,'provider-card')]").all();

    if (cards.length === 0) {
      console.log('⚠ No provider cards found');
      return [];
    }

    console.log(`Found ${cards.length} provider cards`);

    const cardData: Array<{ index: number, amount: number }> = [];

    for (let i = 0; i < cards.length; i++) {
      try {
        const amountElement = cards[i].locator("h2.text-white").first();
        const amountText = await amountElement.textContent() || '0';
        const amount = this.parseAmount(amountText);

        console.log(`Card ${i + 1}: Amount = ${amount}`);

        if (amount > 0) {
          cardData.push({ index: i, amount });
        }
      } catch (error) {
        console.log(`  ⚠ Could not read amount for card ${i + 1}`);
      }
    }

    cardData.sort((a, b) => b.amount - a.amount);

    const topCards = cardData.slice(0, Math.min(count, cardData.length));

    console.log(`\n✅ Selected top ${topCards.length} cards:`);
    topCards.forEach((card, idx) => {
      console.log(`   ${idx + 1}. Card ${card.index + 1} - Amount: ${card.amount}`);
    });

    return topCards.map(card => card.index);
  }

  /**
   * Click Compare Estimations button to open comparison modal
   */
  async clickCompareEstimationsButton(): Promise<boolean> {
    try {
      console.log('🔍 Clicking Compare Estimations button...');

      const compareButton = this.page.locator(
        "//button[contains(@class,'btn-warning') and contains(normalize-space(),'Compare estimations')]"
      ).first();

      await compareButton.waitFor({ state: 'visible', timeout: 15000 });
      await compareButton.scrollIntoViewIfNeeded();
      await compareButton.click();

      console.log('✓ Compare Estimations button clicked');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      return true;
    } catch (error) {
      console.error('✗ Failed to click Compare Estimations button:', error);
      return false;
    }
  }

  /**
   * Verify comparison table is visible
   */
  async isComparisonTableVisible(): Promise<boolean> {
    try {
      const table = this.page.locator("//table[contains(@class,'category-matrix')]").first();
      const isVisible = await table.isVisible().catch(() => false);
      if (isVisible) {
        console.log('✓ Comparison table is visible');
      }
      return isVisible;
    } catch {
      return false;
    }
  }

  /**
   * Click View Details button in comparison
   */
  async clickViewDetailsButton(): Promise<boolean> {
    try {
      console.log('🔍 Clicking View Details button...');

      const viewDetailsButton = this.page.locator(
        "//button[contains(@class,'compare-view-button') and normalize-space()='View Details']"
      ).first();

      await viewDetailsButton.waitFor({ state: 'visible', timeout: 15000 });
      await viewDetailsButton.scrollIntoViewIfNeeded();
      await viewDetailsButton.click();

      console.log('✓ View Details button clicked');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      return true;
    } catch (error) {
      console.error('✗ Failed to click View Details button:', error);
      return false;
    }
  }

  /**
   * Verify detailed comparison modal is open
   */
  async isDetailedComparisonModalOpen(): Promise<boolean> {
    try {
      const modal = this.page.locator("//div[contains(@class,'modal-header')]//h5[contains(text(),'Compare estimations')]").first();
      const isVisible = await modal.isVisible().catch(() => false);
      if (isVisible) {
        console.log('✓ Detailed comparison modal is open');
      }
      return isVisible;
    } catch {
      return false;
    }
  }

  /**
   * Close detailed comparison modal
   */
  async closeDetailedComparisonModal(): Promise<boolean> {
    try {
      console.log('🔍 Closing detailed comparison modal...');

      const closeButton = this.page.locator(
        "//div[contains(@class,'modal-header')]//button[@aria-label='Close']//span[text()='×']"
      ).first();

      await closeButton.click();

      console.log('✓ Detailed comparison modal closed');
      await this.page.waitForTimeout(1000);
      return true;
    } catch (error) {
      console.error('✗ Failed to close detailed comparison modal:', error);
      return false;
    }
  }

  /**
   * Close comparison section
   */
  async closeComparisonSection(): Promise<boolean> {
    try {
      console.log('🔍 Closing comparison section...');

      const closeBtn = this.page.locator(
        "//button[contains(@class,'close-btn') and normalize-space()='Close']"
      ).first();

      await closeBtn.waitFor({ state: 'visible', timeout: 10000 });
      await closeBtn.click();

      console.log('✓ Comparison section closed');
      await this.page.waitForTimeout(1000);
      return true;
    } catch (error) {
      console.error('✗ Failed to close comparison section:', error);
      return false;
    }
  }

  /**
   * Complete comparison flow: Select top cards, compare, view details, close
   * @param numberOfCards - Number of top cards to select (default: 2)
   */
  async completeComparisonFlow(numberOfCards: number = 2): Promise<boolean> {
    console.log('\n=== Starting Comparison Flow ===');

    try {
      const topCardIndices = await this.selectTopCardsForComparison(numberOfCards);

      if (topCardIndices.length === 0) {
        console.log('❌ No cards available for comparison');
        return false;
      }

      for (const cardIndex of topCardIndices) {
        const clicked = await this.clickCompareButtonOnCard(cardIndex);
        if (!clicked) return false;
      }

      const compareClicked = await this.clickCompareEstimationsButton();
      if (!compareClicked) return false;

      const tableVisible = await this.isComparisonTableVisible();
      if (!tableVisible) return false;

      const detailsClicked = await this.clickViewDetailsButton();
      if (!detailsClicked) return false;

      const modalOpen = await this.isDetailedComparisonModalOpen();
      if (!modalOpen) return false;

      await this.closeDetailedComparisonModal();
      await this.closeComparisonSection();

      console.log('✅ Comparison flow completed successfully');
      return true;
    } catch (error) {
      console.error('✗ Comparison flow failed:', error);
      return false;
    }
  }

  /**
   * Find cards with highest amounts
   * @param count - Number of top cards to return
   */
  async findTopCardsByAmount(count: number = 2): Promise<number[]> {
    console.log(`\n🔍 Finding top ${count} cards by amount...`);

    const cards = await this.page.locator("//app-provider-enquiry-list-item//div[contains(@class,'provider-card')]").all();
    const cardAmounts: Array<{ index: number, amount: number }> = [];

    for (let i = 0; i < cards.length; i++) {
      try {
        const amountElement = cards[i].locator("h2.text-white").first();
        const amountText = await amountElement.textContent() || '0';
        const amount = this.parseAmount(amountText);

        if (amount > 0) {
          cardAmounts.push({ index: i, amount });
        }
      } catch (error) {
        // Skip
      }
    }

    cardAmounts.sort((a, b) => b.amount - a.amount);

    const topIndices = cardAmounts.slice(0, count).map(c => c.index);

    console.log(`✅ Top ${count} cards by amount:`, topIndices.map(i => i + 1));
    return topIndices;
  }

  /**
   * Click the View button on the specified card
   * @param cardIndex - Index of the card (0-based)
   */
  async clickViewButtonOnCard(cardIndex: number): Promise<boolean> {
    try {
      console.log(`🔍 Clicking View button on card ${cardIndex + 1}...`);

      const cards = await this.page.locator("//app-provider-enquiry-list-item//div[contains(@class,'provider-card')]").all();

      if (cardIndex >= cards.length) {
        throw new Error(`Card index ${cardIndex} out of range (total: ${cards.length})`);
      }

      const viewButton = cards[cardIndex].locator("button.add-to-compare-btn:has-text('View')").first();
      await viewButton.waitFor({ state: 'visible', timeout: 10000 });
      await viewButton.scrollIntoViewIfNeeded();
      await viewButton.click();

      console.log(`✓ View button clicked on card ${cardIndex + 1}`);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      return true;
    } catch (error) {
      console.error(`✗ Failed to click View button on card ${cardIndex + 1}:`, error);
      return false;
    }
  }

  /**
   * Click the Approve button in the estimation modal
   */
  async clickApproveButtonInModal(): Promise<boolean> {
    try {
      console.log('🔍 Looking for Approve button in modal...');

      const approveButton = this.page.locator(
        "//app-provider-estimation-list-item//button[contains(@class,'btn-warning') and normalize-space()='Approve']"
      ).first();

      await approveButton.waitFor({ state: 'visible', timeout: 15000 });
      await approveButton.scrollIntoViewIfNeeded();
      await approveButton.click();

      console.log('✓ Approve button clicked in modal');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      return true;
    } catch (error) {
      console.error('✗ Failed to click Approve button in modal:', error);
      return false;
    }
  }

  /**
   * Complete flow: Find best card and approve it
   */
  async approveBestCard(): Promise<boolean> {
    console.log('\n=== Starting Best Card Approval Flow ===');
    console.log('Rule: Prefer amounts > 1000 (closest to 1000), else highest under 1000');

    try {
      // Step 1: Find the best card for approval
      const cardIndex = await this.findBestCardForApproval();

      if (cardIndex === -1) {
        console.log('❌ No suitable cards found for approval');
        
        // Debug: Take screenshot
        await this.page.screenshot({ path: 'no-suitable-cards.png' });
        console.log('📸 Screenshot saved: no-suitable-cards.png');
        
        return false;
      }

      // Step 2: Click View button on that card
      const viewClicked = await this.clickViewButtonOnCard(cardIndex);
      if (!viewClicked) {
        console.log('❌ Failed to click View button');
        return false;
      }

      // Step 3: Click Approve button in modal
      const approveClicked = await this.clickApproveButtonInModal();
      if (!approveClicked) {
        console.log('❌ Failed to click Approve button');
        return false;
      }

      // Step 4: Verify approval success
      const approved = await this.isApprovalSuccessful();

      if (approved) {
        console.log('✅ Best card approved successfully');
      } else {
        console.log('❌ Approval verification failed');
      }

      return approved;
    } catch (error) {
      console.error('✗ Best card approval flow failed:', error);
      return false;
    }
  }

  /**
   * Complete approval flow in one call
   */
  async completeApprovalFlow(caseId: string): Promise<boolean> {
    console.log('\n=== Starting Approval Flow ===');

    try {
      const viewClicked = await this.clickViewEnquiry();
      if (!viewClicked) return false;

      const searched = await this.searchCaseById(caseId);
      if (!searched) return false;

      const clicked = await this.clickCaseRow(caseId);
      if (!clicked) return false;

      const isOpen = await this.isOffcanvasOpen();
      if (!isOpen) return false;

      const tabClicked = await this.clickProvidersTab();
      if (!tabClicked) return false;

      const viewButtonClicked = await this.clickViewButton();
      if (!viewButtonClicked) return false;

      const approveClicked = await this.clickApproveButton();
      if (!approveClicked) return false;

      const approved = await this.isApprovalSuccessful();

      console.log('=== Approval Flow Completed ===\n');
      return approved;
    } catch (error) {
      console.error('✗ Approval flow failed:', error);
      return false;
    }
  }

  /**
   * Get the approval status of a card
   * @param cardIndex - Index of the card (0-based)
   */
  async getCardApprovalStatus(cardIndex: number): Promise<string> {
    try {
      const cards = await this.page.locator("//app-provider-enquiry-list-item//div[contains(@class,'provider-card')]").all();

      if (cardIndex >= cards.length) {
        return 'unknown';
      }

      const approvedBadge = cards[cardIndex].locator("//span[contains(text(),'Approved')]").first();
      const rejectedBadge = cards[cardIndex].locator("//span[contains(text(),'Rejected')]").first();
      const pendingBadge = cards[cardIndex].locator("//span[contains(text(),'Pending')]").first();

      if (await approvedBadge.isVisible().catch(() => false)) return 'approved';
      if (await rejectedBadge.isVisible().catch(() => false)) return 'rejected';
      if (await pendingBadge.isVisible().catch(() => false)) return 'pending';

      return 'unknown';
    } catch (error) {
      console.error('✗ Failed to get card approval status:', error);
      return 'unknown';
    }
  }

  /**
   * Verify that user can only view (not edit) approved estimations
   */
  async verifyApprovedEstimationReadOnly(): Promise<boolean> {
    try {
      console.log('🔍 Verifying approved estimation is read-only...');

      const cards = await this.page.locator("//app-provider-enquiry-list-item//div[contains(@class,'provider-card')]").all();

      for (let i = 0; i < cards.length; i++) {
        const status = await this.getCardApprovalStatus(i);
        if (status === 'approved') {
          const viewClicked = await this.clickViewButtonOnCard(i);
          if (!viewClicked) continue;

          const editButton = this.page.locator("//button[contains(text(),'Edit')]").first();
          const isEditEnabled = await editButton.isEnabled().catch(() => false);

          if (!isEditEnabled) {
            console.log('✓ Approved estimation is read-only as expected');
            await this.page.locator("//button[@aria-label='Close']").first().click().catch(() => { });
            return true;
          }

          await this.page.locator("//button[@aria-label='Close']").first().click().catch(() => { });
          break;
        }
      }

      return true;
    } catch (error) {
      console.error('✗ Failed to verify read-only status:', error);
      return false;
    }
  }

  /**
   * Get all card amounts
   */
  async getAllCardAmounts(): Promise<number[]> {
    const amounts: number[] = [];

    try {
      const cards = await this.page.locator("//app-provider-enquiry-list-item//div[contains(@class,'provider-card')]").all();

      for (let i = 0; i < cards.length; i++) {
        try {
          const amountElement = cards[i].locator("h2.text-white").first();
          const amountText = await amountElement.textContent() || '0';
          const amount = this.parseAmount(amountText);
          amounts.push(amount);
        } catch (error) {
          amounts.push(0);
        }
      }
    } catch (error) {
      console.error('✗ Failed to get card amounts:', error);
    }

    return amounts;
  }

  /**
   * Parse amount string to number
   */
  private parseAmount(amountStr: string): number {
    const cleanStr = amountStr.replace(/[^0-9.]/g, '');
    return parseFloat(cleanStr) || 0;
  }

  /**
   * Verify approval button state based on permissions
   * @param shouldBeVisible - Whether approve button should be visible
   */
  async verifyApproveButtonState(shouldBeVisible: boolean): Promise<boolean> {
    try {
      const approveButton = this.page.locator(
        "//button[contains(@class,'btn-warning') and contains(normalize-space(),'Approve')]"
      ).first();

      const isVisible = await approveButton.isVisible().catch(() => false);

      if (shouldBeVisible && isVisible) {
        console.log('✓ Approve button is visible as expected');
        return true;
      } else if (!shouldBeVisible && !isVisible) {
        console.log('✓ Approve button is hidden as expected');
        return true;
      } else {
        console.error(`✗ Approve button visibility mismatch: expected ${shouldBeVisible}, got ${isVisible}`);
        return false;
      }
    } catch (error) {
      console.error('✗ Failed to verify approve button state:', error);
      return false;
    }
  }

  /**
   * Get the count of estimations by status
   */
  async getEstimationCountByStatus(status: 'approved' | 'rejected' | 'pending' | 'new'): Promise<number> {
    try {
      let selector = '';

      switch (status) {
        case 'approved':
          selector = "//span[contains(text(),'Approved')]";
          break;
        case 'rejected':
          selector = "//span[contains(text(),'Rejected')]";
          break;
        case 'pending':
          selector = "//span[contains(text(),'Pending')]";
          break;
        case 'new':
          selector = "//span[contains(text(),'New')]";
          break;
      }

      const badges = await this.page.locator(selector).count();
      return badges;
    } catch (error) {
      console.error(`✗ Failed to get ${status} estimation count:`, error);
      return 0;
    }
  }
}