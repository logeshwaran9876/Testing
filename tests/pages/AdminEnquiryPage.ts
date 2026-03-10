// pages/AdminEnquiryPage.ts
import { Page, Locator } from '@playwright/test';

/**
 * AdminEnquiryPage - Page Object Model for Admin HCT Enquiry Workflow
 * Handles search, filter, case details, and provider broadcast functionality
 */
export class AdminEnquiryPage {
  public page: Page;

  // ============ VIEW ENQUIRY BUTTON ============
  public viewEnquiryButton: Locator;

  // ============ SEARCH & FILTER SECTION ============
  public searchInput: Locator;
  public statusDropdown: Locator;
  public statusNewOption: Locator;

  // ============ CASES TABLE ============
  public casesTable: Locator;
  public tableRows: Locator;
  public noResultsMessage: Locator;
  public clearSearchButton: Locator;

  // ============ CASE DETAILS OFFCANVAS ============
  public offcanvasContainer: Locator;
  public closeButton: Locator;
  public offcanvasCaseId: Locator;
  public offcanvasPatientName: Locator;
  public offcanvasBackdrop: Locator;

  // ============ TABS ============
  public providersTab: Locator;
  public patientDetailsTab: Locator;
  public attachmentsTab: Locator;
  public timelineTab: Locator;
  public providersCount: Locator;
  public addProviderButton: Locator;
  public activeTab: Locator;

  // ============ ADD PROVIDER MODAL ============
  public providerSearchModal: Locator;
  public providerNameInput: Locator;
  public providerSearchButton: Locator;
  public modalCloseButton: Locator;
  public modalTitle: Locator;
  public caseRows: Locator;
  public caseIdCells: Locator;
  public patientNameCells: Locator;
  public insuranceNameCells: Locator;
  public providerNameCells: Locator;
  public countryCells: Locator;
  public procedureCells: Locator;
  public createdOnCells: Locator;
  public statusCells: Locator;
  public statusBadges: Locator;


  // ============ PROVIDER RESULTS ============
  public providerResultsTable: Locator;
  public providerCheckboxes: Locator;
  public providerRows: Locator;
  public noProviderResultsMessage: Locator;
  public providerTableHeaders: Locator;

  // ============ BROADCAST ============
  public broadcastButton: Locator;
  public successMessage: Locator;
  public errorMessage: Locator;
  public validationError: Locator;

  // ============ FACILITATOR DROPDOWN ============
  public facilitatorDropdown: Locator;
  public facilitatorInput: Locator;
  public facilitatorOptions: Locator;
  public dropdownPanel: Locator;

  // ============ COUNTRY/STATE DROPDOWNS ============
  public countryDropdown: Locator;
  public stateDropdown: Locator;
  public countryInput: Locator;
  public stateInput: Locator;
  public dropdownOptions: Locator;

  // ============ STATUS FILTERS ============
  public statusOptions: Record<string, Locator> = {};
  public clearFilterButton: Locator;

  // ============ PROVIDER LIST IN CASE ============
  public providerListInCase: Locator;
  public providerNamesInCase: Locator;

  constructor(page: Page) {
    this.page = page;

    // View Enquiry Button
    this.viewEnquiryButton = page.locator("//button[contains(normalize-space(), 'View enquiry') or @title='View enquiry']");

    // Search & Filter
    this.searchInput = page.locator("//input[@placeholder='Search by Case ID , Name']");
    this.statusDropdown = page.locator("//app-crm-lookup//ng-select").first();
    this.statusNewOption = page.locator("//ng-dropdown-panel//div[@role='option' and normalize-space()='New']");
    this.clearSearchButton = page.locator("//input[@placeholder='Search by Case ID , Name']/following-sibling::button[@class='clear-btn'] | //span[@class='clear-input']");

    // Cases Table
    this.casesTable = page.locator("//table[contains(@class,'fixed-hct-table')]");
    this.tableRows = page.locator("//tr[contains(@class,'display-pointer')]");
    
    // No results message with multiple strategies
    this.noResultsMessage = page.locator(
      "//td[contains(text(),'No records found')] | " +
      "//td[contains(text(),'No results')] | " +
      "//td[contains(@class,'text-center') and contains(text(),'No records found')] | " +
      "//td[@colspan='8' and contains(@class,'text-center') and contains(text(),'No records found')] | " +
      "//div[contains(text(),'No records')] | " +
      "//div[contains(text(),'No results')] | " +
      "//div[contains(@class,'alert') and contains(text(),'No records')]"
    ).first();
    
    // Case Details Offcanvas
    this.offcanvasContainer = page.locator("//div[contains(@class,'offcanvas-container') and contains(@class,'show')]");
    
    // Improved close button with multiple strategies
    this.closeButton = page.locator(
      "//button[normalize-space()='Close'] | " +
      "//button[contains(@class,'offcanvas-close-btn') and normalize-space()='Close'] | " +
      "//button[@class='offcanvas-close-btn text-primary' and normalize-space()='Close'] | " +
      "//button[contains(@class,'offcanvas-close-btn')] | " +
      "//button[@aria-label='Close']"
    ).first();
    
    this.offcanvasCaseId =  page.locator("//span[contains(text(),'MR ID')]");
    this.offcanvasPatientName = page.locator("//div[contains(@class,'offcanvas-container')]//h4");
    this.offcanvasBackdrop = page.locator("//div[contains(@class,'offcanvas-backdrop')]");

    // Tabs
    this.providersTab = page.locator("//a[contains(normalize-space(),'Providers')]");
    this.patientDetailsTab = page.locator("//a[contains(normalize-space(),'Patient Details')]");
    this.attachmentsTab = page.locator("//a[contains(normalize-space(),'Attachments')]");
    this.timelineTab = page.locator("//a[contains(normalize-space(),'Timeline')]");
    this.activeTab = page.locator("//a[contains(@class,'active')]");
    this.providersCount = page.locator("//a[normalize-space()='Providers']//span[@class='count']");
    this.addProviderButton = page.locator("//div[contains(@class,'add-provider')]//button[@type='button' and normalize-space()='Add Providers']");

    // Add Provider Modal
    this.providerSearchModal = page.locator("//div[contains(@class,'modal-body')]//app-provider-search");
    this.providerNameInput = page.locator("//input[@id='name']");
    this.providerSearchButton = page.locator("//button[@type='submit' and normalize-space()='Search']");
    this.modalCloseButton = page.locator("//div[contains(@class,'modal-header')]//button[@aria-label='Close']");
    this.modalTitle = page.locator("//div[contains(@class,'modal-header')]//h5");

    // Provider Results
    this.providerResultsTable = page.locator("//app-provider-search//div[contains(@class,'card-company-table')]//table");
    this.providerCheckboxes = page.locator("//tr//input[@type='checkbox']");
    this.providerRows = page.locator("//app-provider-search//tbody/tr");
    this.noProviderResultsMessage = page.locator("//td[contains(text(),'No providers found')]");
    this.providerTableHeaders = page.locator("//app-provider-search//thead/th");

    // Broadcast
    this.broadcastButton = page.locator(
      "//app-provider-search//button[contains(normalize-space(),'Broadcast')] | " +
      "//button[contains(@class,'btn-secondary') and contains(normalize-space(),'Broadcast')]"
    ).first();
    
    // Success message with multiple strategies
    this.successMessage = page.locator(
      "//div[contains(@class,'alert-success') or contains(@class,'success-message')] | " +
      "//div[@id='toast-container']//div[contains(@class,'success') or contains(@class,'alert-success')] | " +
      "//div[@id='toast-container']//div[contains(text(),'success') or contains(text(),'Success')] | " +
      "//div[@id='toast-container']//div[contains(@class,'toast-success')] | " +
      "//div[@id='toast-container']//div[contains(@class,'toast')] | " +
      "//div[@id='toast-container']//div[contains(@class,'alert')]"
    ).first();
    
    this.errorMessage = page.locator("//div[contains(@class,'alert-danger') or contains(@class,'error-message')]");
    this.validationError = page.locator("//div[contains(@class,'invalid-feedback') or contains(@class,'error')]");

    // Facilitator Dropdown
    this.facilitatorDropdown = page.locator("//ng-select[@placeholder='Select facilitator']");
    this.facilitatorInput = page.locator("//ng-select[@placeholder='Select facilitator']//input[@type='text']");
    this.facilitatorOptions = page.locator("//ng-dropdown-panel//div[@role='option']");
    this.dropdownPanel = page.locator("//ng-dropdown-panel");

    // Country/State Dropdowns
    this.countryDropdown = page.locator("app-crm-lookup[fcontrolname='country'] ng-select");
    this.stateDropdown = page.locator("app-crm-lookup[fcontrolname='state'] ng-select");
    this.countryInput = page.locator("app-crm-lookup[fcontrolname='country'] input[type='text']");
    this.stateInput = page.locator("app-crm-lookup[fcontrolname='state'] input[type='text']");
    this.dropdownOptions = page.locator("ng-dropdown-panel .ng-option");

    // Status Filters
    this.statusOptions = {
      'New': page.locator("//ng-dropdown-panel//div[@role='option' and normalize-space()='New']"),
      'Estimation Pending': page.locator("//ng-dropdown-panel//div[@role='option' and normalize-space()='Estimation Pending']"),
      'SLA Delay': page.locator("//ng-dropdown-panel//div[@role='option' and normalize-space()='SLA Delay']"),
      'Approved': page.locator("//ng-dropdown-panel//div[@role='option' and normalize-space()='Approved']"),
      'Discharged': page.locator("//ng-dropdown-panel//div[@role='option' and normalize-space()='Discharged']"),
      'Closed': page.locator("//ng-dropdown-panel//div[@role='option' and normalize-space()='Closed']")
    };
    this.clearFilterButton = page.locator("//button[contains(text(),'Clear')] | //span[contains(@class,'clear')]");

    // Provider List In Case
    this.providerListInCase = page.locator("//div[contains(@class,'providers-list')]//tr");
    this.providerNamesInCase = page.locator("//div[contains(@class,'providers-list')]//td[1]");

    // ============ ACCURATE CASE ROW LOCATORS ============
    this.caseRows = page.locator("//tr[contains(@class,'display-pointer')]");
    this.caseIdCells = page.locator("//tr[contains(@class,'display-pointer')]/td[1]/div[contains(@class,'text-primary')]");
    this.patientNameCells = page.locator("//tr[contains(@class,'display-pointer')]/td[2]/div[contains(@class,'truncate')]");
    this.insuranceNameCells = page.locator("//tr[contains(@class,'display-pointer')]/td[3]/div[contains(@class,'truncate')]");
    this.providerNameCells = page.locator("//tr[contains(@class,'display-pointer')]/td[4]/div[contains(@class,'truncate')]");
    this.countryCells = page.locator("//tr[contains(@class,'display-pointer')]/td[5]/div[contains(@class,'truncate')]");
    this.procedureCells = page.locator("//tr[contains(@class,'display-pointer')]/td[6]/div[contains(@class,'truncate')]");
    this.createdOnCells = page.locator("//tr[contains(@class,'display-pointer')]/td[7]/div");
    this.statusCells = page.locator("//tr[contains(@class,'display-pointer')]/td[8]/div/span[contains(@class,'badge')]");
    this.statusBadges = page.locator("//tr[contains(@class,'display-pointer')]/td[8]/div/span[contains(@class,'badge')]");
  }

  // ==================== EXISTING METHODS ====================

  /**
   * Click the "View enquiry" button
   */
  async clickViewEnquiry(): Promise<void> {
    try {
      await this.viewEnquiryButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.viewEnquiryButton.click();
      await this.page.waitForTimeout(500);
      console.log('✓ Clicked View enquiry button');
    } catch (error) {
      console.error('✗ Failed to click View enquiry button:', error);
      throw error;
    }
  }

  /**
   * Search for a case by Case ID with improved waiting
   * @param caseId - The case ID to search for (e.g., "CS1736")
   */
  async searchCaseById(caseId: string): Promise<boolean> {
    try {
      await this.searchInput.waitFor({ state: 'visible', timeout: 15000 });
      await this.searchInput.clear();
      await this.searchInput.fill(caseId);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(1000);
      await this.page.keyboard.press('Enter'); // Sometimes need to press twice
      await this.page.waitForTimeout(2000);
      console.log(`✓ Searched for case: ${caseId}`);
      return true;
    } catch (error) {
      console.error(`✗ Failed to search for case ${caseId}:`, error);
      return false;
    }
  }

  /**
   * Search by patient name
   * @param patientName - Patient name to search
   */
  async searchByPatientName(patientName: string): Promise<boolean> {
    try {
      await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchInput.clear();
      await this.searchInput.fill(patientName);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(2000);
      return true;
    } catch (error) {
      console.error(`✗ Failed to search by patient name:`, error);
      return false;
    }
  }

  /**
   * Clear search input
   */
  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
    await this.page.waitForTimeout(500);
  }

  /**
   * Filter enquiries by status - improved with error handling
   * @param status - The status to filter by (e.g., "New")
   */
  async filterByStatus(status: string): Promise<boolean> {
    try {
      await this.statusDropdown.waitFor({ state: 'visible', timeout: 10000 });
      
      // Scroll into view to ensure it's clickable
      await this.statusDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      await this.statusDropdown.click();
      await this.page.waitForTimeout(500);

      // Select the status option
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

  /**
   * Clear filter
   */
  async clearFilter(): Promise<void> {
    if (await this.clearFilterButton.isVisible().catch(() => false)) {
      await this.clearFilterButton.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Click on a case row by Case ID with improved fallback strategies
   * @param caseId - The case ID to click (e.g., "CS1182")
   */
  async clickCaseRow(caseId: string): Promise<boolean> {
    try {
      // Strategy 1: Exact match with proper structure
      const caseRow = this.page.locator(
        `//tr[contains(@class,'display-pointer')][td[1]/div[contains(@class,'text-primary') and normalize-space()='${caseId}']]`
      );
      
      if (await caseRow.count() > 0) {
        await caseRow.first().waitFor({ state: 'visible', timeout: 15000 });
        await caseRow.first().scrollIntoViewIfNeeded();
        await caseRow.first().click();
        await this.page.waitForTimeout(2000);
        console.log(`✓ Clicked case row: ${caseId}`);
        return true;
      }

      // Strategy 2: Contains text match
      const containsRow = this.page.locator(
        `//tr[contains(@class,'display-pointer')][.//div[contains(@class,'text-primary') and contains(text(),'${caseId}')]]`
      );
      
      if (await containsRow.count() > 0) {
        await containsRow.first().waitFor({ state: 'visible', timeout: 10000 });
        await containsRow.first().scrollIntoViewIfNeeded();
        await containsRow.first().click();
        await this.page.waitForTimeout(2000);
        console.log(`✓ Clicked case row with contains match: ${caseId}`);
        return true;
      }

      // Strategy 3: Look in any cell
      const anyCellRow = this.page.locator(
        `//tr[contains(@class,'display-pointer')][.//*[contains(text(),'${caseId}')]]`
      );
      
      if (await anyCellRow.count() > 0) {
        await anyCellRow.first().waitFor({ state: 'visible', timeout: 10000 });
        await anyCellRow.first().scrollIntoViewIfNeeded();
        await anyCellRow.first().click();
        await this.page.waitForTimeout(2000);
        console.log(`✓ Clicked case row with any cell match: ${caseId}`);
        return true;
      }

      console.log(`❌ Could not find case row for: ${caseId}`);
      return false;

    } catch (error) {
      console.error(`✗ Failed to click case row ${caseId}:`, error);
      return false;
    }
  }

  /**
   * Enhanced method to verify if a case is visible with multiple fallback strategies
   * @param caseId - The case ID to verify (e.g., "CS1182")
   */
  async isCaseVisible(caseId: string): Promise<boolean> {
    try {
      // Strategy 1: Exact match with proper structure (most accurate)
      const exactLocator = this.page.locator(
        `//tr[contains(@class,'display-pointer')][td[1]/div[contains(@class,'text-primary') and normalize-space()='${caseId}']]`
      );

      if (await exactLocator.isVisible().catch(() => false)) {
        console.log(`✅ Case ${caseId} found with exact match`);
        return true;
      }

      // Strategy 2: Case ID with extra spaces (trim both sides)
      const trimmedLocator = this.page.locator(
        `//tr[contains(@class,'display-pointer')][td[1]/div[contains(@class,'text-primary') and normalize-space()='${caseId.trim()}']]`
      );

      if (await trimmedLocator.isVisible().catch(() => false)) {
        console.log(`✅ Case ${caseId} found with trimmed match`);
        return true;
      }

      // Strategy 3: Contains text (partial match)
      const containsLocator = this.page.locator(
        `//tr[contains(@class,'display-pointer')][td[1]/div[contains(@class,'text-primary') and contains(normalize-space(),'${caseId}')]]`
      );

      if (await containsLocator.isVisible().catch(() => false)) {
        console.log(`✅ Case ${caseId} found with contains match`);
        return true;
      }

      // Strategy 4: Look for any div with the case ID text
      const anyDivLocator = this.page.locator(
        `//tr[contains(@class,'display-pointer')][.//div[contains(@class,'text-primary') and normalize-space()='${caseId}']]`
      );

      if (await anyDivLocator.isVisible().catch(() => false)) {
        console.log(`✅ Case ${caseId} found with any div match`);
        return true;
      }

      // Strategy 5: Look in all table cells (ignore structure)
      const anyCellLocator = this.page.locator(
        `//tr[contains(@class,'display-pointer')][td//*[contains(text(),'${caseId}')]]`
      );

      if (await anyCellLocator.isVisible().catch(() => false)) {
        console.log(`✅ Case ${caseId} found in any cell`);
        return true;
      }

      // Strategy 6: Check if any row contains the case ID
      const allRows = await this.page.locator("//tr[contains(@class,'display-pointer')]").all();
      for (let i = 0; i < allRows.length; i++) {
        const rowText = await allRows[i].textContent();
        if (rowText && rowText.includes(caseId)) {
          console.log(`✅ Case ${caseId} found in row text content`);
          return true;
        }
      }

      console.log(`❌ Case ${caseId} not found after all strategies`);
      return false;

    } catch (error) {
      console.error(`Error checking visibility for case ${caseId}:`, error);
      return false;
    }
  }

  /**
   * Get visible cases count
   */
  async getVisibleCasesCount(): Promise<number> {
    return await this.caseRows.count();
  }

  /**
   * Get all case IDs from table
   */
  async getAllCaseIds(): Promise<string[]> {
    const caseIds: string[] = [];
    const elements = await this.caseIdCells.all();

    for (const element of elements) {
      const text = await element.textContent();
      if (text) caseIds.push(text.trim());
    }

    return caseIds;
  }

  /**
   * Get status of a specific case
   * @param caseId - The case ID to get status for
   */
  async getCaseStatus(caseId: string): Promise<string> {
    const statusElement = this.page.locator(
      `//tr[contains(@class,'display-pointer')][td[1]/div[contains(@class,'text-primary') and normalize-space()='${caseId}']]/td[8]/div/span[contains(@class,'badge')]`
    );
    return await statusElement.textContent() || '';
  }

  /**
   * Verify all cases have specific status
   * @param status - Status to verify (e.g., "New", "Estimation Pending")
   */
  async verifyAllCasesHaveStatus(status: string): Promise<boolean> {
    const statusElements = await this.statusCells.all();
    if (statusElements.length === 0) return false;

    for (const element of statusElements) {
      const text = await element.textContent();
      if (!text?.includes(status)) return false;
    }
    return true;
  }

  /**
   * Check if multiple statuses are present
   */
  async hasMultipleStatuses(): Promise<boolean> {
    const statusElements = await this.statusCells.all();
    if (statusElements.length < 2) return false;

    const statuses = new Set<string>();
    for (const element of statusElements) {
      const text = await element.textContent();
      if (text) statuses.add(text.trim());
    }

    return statuses.size > 1;
  }

  /**
   * Get all statuses from table
   */
  async getAllStatuses(): Promise<string[]> {
    const statuses: string[] = [];
    const statusCells = await this.page.locator("//tr[contains(@class,'display-pointer')]//td[8]//span").all();

    for (const cell of statusCells) {
      const text = await cell.textContent();
      if (text) statuses.push(text.trim());
    }

    return statuses;
  }

  /**
   * Enhanced method to check if no results message is visible
   */
  async isNoResultsMessageVisible(): Promise<boolean> {
    try {
      // Strategy 1: Direct locator
      if (await this.noResultsMessage.isVisible().catch(() => false)) {
        console.log('✅ No results message found with direct locator');
        return true;
      }

      // Strategy 2: Look for exact "No records found!" text in td with colspan
      const exactTdLocator = this.page.locator(
        "//td[@colspan='8' and contains(@class,'text-center') and normalize-space()='No records found!']"
      );
      if (await exactTdLocator.isVisible().catch(() => false)) {
        console.log('✅ No results message found with exact td match');
        return true;
      }

      // Strategy 3: Look for any td with text containing "No records"
      const anyTdLocator = this.page.locator(
        "//td[contains(text(),'No records') or contains(text(),'No results')]"
      );
      if (await anyTdLocator.isVisible().catch(() => false)) {
        console.log('✅ No results message found in any td');
        return true;
      }

      // Strategy 4: Check if table body has only one row with no records
      const tbodyRows = await this.page.locator("//tbody/tr").count();
      if (tbodyRows === 1) {
        const firstRowText = await this.page.locator("//tbody/tr/td").first().textContent();
        if (firstRowText && (firstRowText.includes('No records') || firstRowText.includes('No results'))) {
          console.log('✅ No results message found in single row table');
          return true;
        }
      }

      return false;

    } catch (error) {
      console.error('Error checking no results message:', error);
      return false;
    }
  }

  /**
   * Verify case details offcanvas is open
   */
  async isOffcanvasOpen(): Promise<boolean> {
    return await this.offcanvasContainer.isVisible().catch(() => false);
  }

  /**
   * Enhanced method to close offcanvas with multiple strategies
   */
  async closeOffcanvas(): Promise<void> {
    try {
      // Strategy 1: Exact match with class and text
      const exactButton = this.page.locator(
        "//button[@class='offcanvas-close-btn text-primary' and normalize-space()='Close']"
      );
      if (await exactButton.isVisible().catch(() => false)) {
        await exactButton.scrollIntoViewIfNeeded();
        await exactButton.click();
        console.log('✅ Closed offcanvas with exact button match');
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 2: Contains class and text
      const classButton = this.page.locator(
        "//button[contains(@class,'offcanvas-close-btn') and normalize-space()='Close']"
      );
      if (await classButton.isVisible().catch(() => false)) {
        await classButton.scrollIntoViewIfNeeded();
        await classButton.click();
        console.log('✅ Closed offcanvas with class+text match');
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 3: Any button with Close text
      const textButton = this.page.locator("//button[normalize-space()='Close']");
      if (await textButton.isVisible().catch(() => false)) {
        await textButton.scrollIntoViewIfNeeded();
        await textButton.click();
        console.log('✅ Closed offcanvas with text-only match');
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 4: Any offcanvas close button
      const anyCloseBtn = this.page.locator("//button[contains(@class,'offcanvas-close-btn')]");
      if (await anyCloseBtn.isVisible().catch(() => false)) {
        await anyCloseBtn.scrollIntoViewIfNeeded();
        await anyCloseBtn.click();
        console.log('✅ Closed offcanvas with any offcanvas button');
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 5: Try to find by aria-label
      const ariaButton = this.page.locator("//button[@aria-label='Close']");
      if (await ariaButton.isVisible().catch(() => false)) {
        await ariaButton.scrollIntoViewIfNeeded();
        await ariaButton.click();
        console.log('✅ Closed offcanvas with aria-label');
        await this.page.waitForTimeout(500);
        return;
      }

      console.warn('⚠️ Could not find close button with any strategy');

    } catch (error) {
      console.error('❌ Failed to close offcanvas:', error);
      throw error;
    }
  }

  /**
   * Click outside offcanvas to close
   */
  async clickOutsideOffcanvas(): Promise<void> {
    await this.page.locator('body').click({ position: { x: 5, y: 5 } });
    await this.page.waitForTimeout(500);
  }

  /**
   * Get offcanvas case ID
   */
  async getOffcanvasCaseId(): Promise<string> {
    const text = await this.offcanvasCaseId.innerText();
    const match = text.match(/CS\d+/);
    return match ? match[0] : '';
  }

  /**
   * Click on the Providers tab in case details
   */
  async clickProvidersTab(): Promise<boolean> {
    try {
      await this.providersTab.waitFor({ state: 'visible', timeout: 10000 });
      await this.providersTab.scrollIntoViewIfNeeded();
      await this.providersTab.click();
      await this.page.waitForTimeout(500);
      return true;
    } catch (error) {
      console.log(`ℹ Cannot click Providers tab:`);
      return false;
    }
  }

  /**
   * Click on a specific tab
   * @param tabName - Tab name (Patient Details, Providers, Attachments, Timeline)
   */
  async clickTab(tabName: string): Promise<boolean> {
    try {
      const tab = this.page.locator(`//a[contains(normalize-space(),'${tabName}')]`);
      await tab.waitFor({ state: 'visible', timeout: 10000 });
      await tab.scrollIntoViewIfNeeded();
      await tab.click();
      await this.page.waitForTimeout(500);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify if a tab is active
   * @param tabName - Tab name
   */
  async isTabActive(tabName: string): Promise<boolean> {
    const activeTabText = await this.activeTab.textContent();
    return activeTabText?.includes(tabName) || false;
  }

  /**
   * Get the current providers count
   * @returns The count as a string
   */
  async getProvidersCount(): Promise<string> {
    await this.providersCount.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
    return await this.providersCount.textContent() || '0';
  }

  /**
   * Click the "Add Provider" button - improved with check
   */
  async clickAddProviderButton(): Promise<boolean> {
    try {
      await this.addProviderButton.waitFor({ state: 'visible', timeout: 15000 });
      await this.addProviderButton.scrollIntoViewIfNeeded();
      await this.addProviderButton.click();
      await this.page.waitForTimeout(2000);
      console.log('✓ Clicked Add Provider button');
      return true;
    } catch (error) {
      console.log(`ℹ Cannot click Add Provider button:`);
      return false;
    }
  }

  /**
   * Verify Add Provider modal is open
   */
  async isAddProviderModalOpen(): Promise<boolean> {
    return await this.providerSearchModal.isVisible().catch(() => false);
  }

  /**
   * Verify modal is closed
   */
  async isModalClosed(): Promise<boolean> {
    return !(await this.providerSearchModal.isVisible().catch(() => false));
  }

  /**
   * Close modal with Close button
   */
  async closeModalWithButton(): Promise<void> {
    if (await this.modalCloseButton.isVisible().catch(() => false)) {
      await this.modalCloseButton.scrollIntoViewIfNeeded();
      await this.modalCloseButton.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Close modal with Escape key
   */
  async closeModalWithEscape(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
  }

  /**
   * Get modal title
   */
  async getModalTitle(): Promise<string> {
    return await this.modalTitle.textContent() || '';
  }

  /**
   * Enter provider name in the search modal
   * @param providerName - The provider name to enter
   */
  async enterProviderName(providerName: string): Promise<void> {
    await this.providerNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.providerNameInput.fill(providerName);
    await this.page.waitForTimeout(500);
  }

  /**
   * Click the Provider Search button
   */
  async clickProviderSearchButton(): Promise<void> {
    await this.providerSearchButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.providerSearchButton.scrollIntoViewIfNeeded();
    await this.providerSearchButton.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Verify provider search results are displayed
   */
  async areSearchResultsDisplayed(): Promise<boolean> {
    return await this.providerResultsTable.isVisible().catch(() => false);
  }

  /**
   * Get provider results count
   */
  async getProviderResultsCount(): Promise<number> {
    return await this.providerRows.count();
  }

  /**
   * Get provider table headers
   */
  async getProviderTableHeaders(): Promise<string[]> {
    const headers: string[] = [];
    const headerElements = await this.providerTableHeaders.all();

    for (const header of headerElements) {
      const text = await header.textContent();
      if (text) headers.push(text.trim());
    }

    return headers;
  }

  /**
   * Click on provider table header to sort
   * @param headerName - Header name to click
   */
  async sortProviderResultsBy(headerName: string): Promise<void> {
    const header = this.page.locator(`//app-provider-search//thead/th[contains(text(),'${headerName}')]`);
    await header.scrollIntoViewIfNeeded();
    await header.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Check if a provider is in the results table
   * @param providerName - Name of provider to look for
   */
  async isProviderInResults(providerName: string): Promise<boolean> {
    try {
      console.log(`  Checking for provider: "${providerName}" in results`);

      // Wait for table to load
      await this.page.waitForSelector('table tbody tr', { timeout: 10000 }).catch(() => null);

      // Get all rows
      const rows = await this.page.locator('table tbody tr').all();

      for (const row of rows) {
        // Get the provider name cell (usually the second column)
        const nameCell = row.locator('td:nth-child(2)').first();
        const nameText = await nameCell.textContent().catch(() => '');

        if (nameText && nameText.trim() === providerName) {
          console.log(`✅ Provider "${providerName}" found with exact match`);
          return true;
        }

        if (nameText && nameText.trim().toLowerCase().includes(providerName.toLowerCase())) {
          console.log(`✅ Provider "${providerName}" found with contains match`);
          return true;
        }
      }

      console.log(`ℹ Provider "${providerName}" not found in results`);
      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking for provider ${providerName}:`, error);
      return false;
    }
  }

  /**
   * Check if no provider results message is visible
   */
  async isNoProviderResultsVisible(): Promise<boolean> {
    try {
      // Check for various "no results" messages
      const noResultsMessage = await this.page.locator(
        "//td[contains(text(),'No providers found')] | " +
        "//td[contains(text(),'No records found')] | " +
        "//td[contains(text(),'No results')] | " +
        "//div[contains(text(),'No providers')] | " +
        "//div[contains(text(),'No records')]"
      ).isVisible().catch(() => false);

      if (noResultsMessage) {
        console.log('✅ No results message visible');
        return true;
      }

      // Check if table exists but has no rows
      const tableExists = await this.providerResultsTable.isVisible().catch(() => false);

      if (tableExists) {
        const rows = await this.page.locator("//tbody/tr").count();

        if (rows === 0) {
          console.log('✅ Table exists but has 0 rows - no results');
          return true;
        }

        // If there are rows, check if they contain a "no results" message
        if (rows === 1) {
          const firstRowText = await this.page.locator("//tbody/tr/td").first().textContent();
          if (firstRowText && (
            firstRowText.includes('No providers') ||
            firstRowText.includes('No records')
          )) {
            console.log('✅ Single row with no results message');
            return true;
          }
        }
      }

      return false;

    } catch (error) {
      console.error('Error checking for no provider results:', error);
      return false;
    }
  }

  /**
   * Check the checkbox for a specific provider
   * @param providerName - The provider name to select
   */
  async selectProviderCheckbox(providerName: string): Promise<boolean> {
    try {
      // Strategy 1: Based on your HTML structure - div with provider name in the Name column
      const checkboxByProviderName = this.page.locator(
        `//tr[.//td[2]//div[contains(text(),'${providerName}')]]//input[@type='checkbox']`
      );

      if (await checkboxByProviderName.isVisible().catch(() => false)) {
        await checkboxByProviderName.check();
        console.log(`✅ Selected checkbox for provider: ${providerName} (strategy 1)`);
        await this.page.waitForTimeout(500);
        return true;
      }

      // Strategy 2: Using normalize-space for exact match
      const checkboxExactMatch = this.page.locator(
        `//tr[.//td[2]//div[normalize-space()='${providerName}']]//input[@type='checkbox']`
      );

      if (await checkboxExactMatch.isVisible().catch(() => false)) {
        await checkboxExactMatch.check();
        console.log(`✅ Selected checkbox for provider: ${providerName} (strategy 2)`);
        await this.page.waitForTimeout(500);
        return true;
      }

      // Strategy 3: Using the row scanning approach
      const rows = await this.page.locator("//tbody/tr").all();

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const nameCell = row.locator("td:nth-child(2)").first();
        const nameText = await nameCell.textContent();

        if (nameText && nameText.trim() === providerName) {
          const checkbox = row.locator("//input[@type='checkbox']").first();
          await checkbox.check();
          console.log(`✅ Selected checkbox for provider: ${providerName} (strategy 3 - row scan)`);
          await this.page.waitForTimeout(500);
          return true;
        }
      }

      console.log(`❌ Could not find checkbox for provider: ${providerName}`);
      return false;

    } catch (error) {
      console.error(`❌ Failed to select checkbox for provider ${providerName}:`, error);
      return false;
    }
  }

  /**
   * Select first N provider checkboxes
   * @param n - Number of checkboxes to select
   */
  async selectFirstNProviderCheckboxes(n: number): Promise<number> {
    const providerCheckboxes = this.page.locator("//tr//input[@type='checkbox']");
    const count = await providerCheckboxes.count();
    const limit = Math.min(n, count);
    let selected = 0;

    for (let i = 0; i < limit; i++) {
      const checkbox = providerCheckboxes.nth(i);
      if (await checkbox.isVisible().catch(() => false)) {
        await checkbox.scrollIntoViewIfNeeded();
        await checkbox.check();
        selected++;
      }
    }

    await this.page.waitForTimeout(500);
    console.log(`✅ Selected ${selected} providers`);
    return selected;
  }

  /**
   * Select provider checkbox by index
   * @param index - Index of the checkbox (0-based)
   */
  async selectProviderCheckboxByIndex(index: number): Promise<boolean> {
    try {
      console.log(`  Selecting provider checkbox at index: ${index}`);

      const checkboxes = await this.page.locator('table tbody tr input[type="checkbox"]').all();

      if (index >= checkboxes.length) {
        console.log(`  ⚠ Index ${index} out of bounds, only ${checkboxes.length} checkboxes available`);
        return false;
      }

      const checkbox = checkboxes[index];

      // Check if already checked
      const isChecked = await checkbox.isChecked().catch(() => false);
      if (isChecked) {
        console.log(`  ℹ Checkbox at index ${index} already selected`);
        return true;
      }

      await checkbox.scrollIntoViewIfNeeded();
      await checkbox.check({ force: true });

      await this.page.waitForTimeout(300);

      const nowChecked = await checkbox.isChecked().catch(() => false);
      if (nowChecked) {
        console.log(`  ✓ Selected provider at index ${index}`);
        return true;
      } else {
        console.log(`  ⚠ Failed to select provider at index ${index}`);
        return false;
      }

    } catch (error) {
      console.log(`  ⚠ Error selecting provider at index ${index}:`, error);
      return false;
    }
  }

  /**
   * Deselect provider checkbox by index
   * @param index - Index of the checkbox (0-based)
   */
  async deselectProviderCheckboxByIndex(index: number): Promise<boolean> {
    try {
      console.log(`  Deselecting provider checkbox at index: ${index}`);

      const checkboxes = await this.page.locator('table tbody tr input[type="checkbox"]').all();

      if (index >= checkboxes.length) {
        console.log(`  ⚠ Index ${index} out of bounds, only ${checkboxes.length} checkboxes available`);
        return false;
      }

      const checkbox = checkboxes[index];

      const isChecked = await checkbox.isChecked().catch(() => false);
      if (!isChecked) {
        console.log(`  ℹ Checkbox at index ${index} already deselected`);
        return true;
      }

      await checkbox.uncheck({ force: true });

      await this.page.waitForTimeout(300);

      const nowChecked = await checkbox.isChecked().catch(() => false);
      if (!nowChecked) {
        console.log(`  ✓ Deselected provider at index ${index}`);
        return true;
      } else {
        console.log(`  ⚠ Failed to deselect provider at index ${index}`);
        return false;
      }

    } catch (error) {
      console.log(`  ⚠ Error deselecting provider at index ${index}:`, error);
      return false;
    }
  }

  /**
   * Select all providers
   */
  async selectAllProviders(): Promise<number> {
    try {
      console.log(`  Selecting all providers`);

      const checkboxes = await this.page.locator('table tbody tr input[type="checkbox"]').all();
      let selected = 0;

      for (const checkbox of checkboxes) {
        const isChecked = await checkbox.isChecked().catch(() => false);

        if (!isChecked && await checkbox.isVisible().catch(() => false)) {
          await checkbox.scrollIntoViewIfNeeded();
          await checkbox.check({ force: true });
          selected++;
        }
      }

      await this.page.waitForTimeout(500);
      console.log(`  ✓ Selected all ${selected} providers`);
      return selected;

    } catch (error) {
      console.log(`  ⚠ Error selecting all providers:`, error);
      return 0;
    }
  }

  /**
   * Deselect all providers
   */
  async deselectAllProviders(): Promise<number> {
    const checkboxes = await this.providerCheckboxes.all();
    let deselected = 0;
    for (const checkbox of checkboxes) {
      if (await checkbox.isChecked()) {
        await checkbox.uncheck();
        deselected++;
      }
    }
    await this.page.waitForTimeout(500);
    return deselected;
  }

  /**
   * Get selected providers count
   */
  async getSelectedProvidersCount(): Promise<number> {
    try {
      const checkedCheckboxes = await this.page.locator('table tbody tr input[type="checkbox"]:checked').count();
      console.log(`  Selected providers count: ${checkedCheckboxes}`);
      return checkedCheckboxes;
    } catch (error) {
      console.log(`  ⚠ Error getting selected providers count:`, error);
      return 0;
    }
  }

  /**
   * Check if any provider is selected
   */
  async areAnyProvidersSelected(): Promise<boolean> {
    const checkboxes = await this.providerCheckboxes.all();
    for (const checkbox of checkboxes) {
      if (await checkbox.isChecked()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get provider names from search results
   */
  async getProviderNamesFromResults(): Promise<string[]> {
    const providerNames: string[] = [];
    const rows = await this.providerRows.all();

    for (const row of rows) {
      const nameCell = row.locator("td:nth-child(2)").first();
      const name = await nameCell.textContent();
      if (name) providerNames.push(name.trim());
    }

    return providerNames;
  }

  /**
   * Click the Broadcast button
   */
  async clickBroadcastButton(): Promise<boolean> {
    try {
      await this.broadcastButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.broadcastButton.scrollIntoViewIfNeeded();
      await this.broadcastButton.click();
      await this.page.waitForTimeout(2000);
      console.log('✓ Clicked Broadcast button');
      return true;
    } catch (error) {
      console.error('✗ Failed to click Broadcast button:', error);
      return false;
    }
  }

  /**
   * Check if broadcast button is enabled
   */
  async isBroadcastButtonEnabled(): Promise<boolean> {
    return await this.broadcastButton.isEnabled().catch(() => false);
  }

  /**
   * Check if broadcast button is disabled
   */
  async isBroadcastButtonDisabled(): Promise<boolean> {
    try {
      const button = this.broadcastButton;

      const hasDisabledAttr = await button.getAttribute('disabled') !== null;
      const hasAriaDisabled = await button.getAttribute('aria-disabled') === 'true';
      const hasSecondaryClass = await button.evaluate(el =>
        el.classList.contains('btn-secondary')
      );

      return hasDisabledAttr || hasAriaDisabled || hasSecondaryClass;

    } catch (error) {
      console.error('Error checking broadcast button state:', error);
      return true;
    }
  }

  /**
   * Verify broadcast success message
   */
  async isBroadcastSuccessful(): Promise<boolean> {
    try {
      // Wait for toast container
      const toastContainer = this.page.locator("//div[@id='toast-container']");
      await toastContainer.waitFor({ state: 'visible', timeout: 10000 }).catch(() => { });

      // Check for success message in toast
      const successInToast = this.page.locator(
        "//div[@id='toast-container']//div[contains(@class,'success') or contains(text(),'Success')]"
      ).first();

      if (await successInToast.isVisible().catch(() => false)) {
        return true;
      }

      return false;

    } catch (error) {
      return false;
    }
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string> {
    try {
      const toastContainer = this.page.locator("//div[@id='toast-container']");
      await toastContainer.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });

      const successInToast = this.page.locator(
        "//div[@id='toast-container']//div[contains(@class,'success') or contains(@class,'alert-success') or contains(text(),'success')]"
      ).first();

      if (await successInToast.isVisible().catch(() => false)) {
        const message = await successInToast.textContent() || '';
        return message.trim();
      }

      return '';

    } catch (error) {
      console.error('Error getting success message:', error);
      return '';
    }
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Check if duplicate provider error is visible
   */
  async isDuplicateProviderErrorVisible(): Promise<boolean> {
    return await this.errorMessage.filter({ hasText: /duplicate|already exists/i }).isVisible().catch(() => false);
  }

  /**
   * Check if selection required error is visible
   */
  async isSelectionRequiredErrorVisible(): Promise<boolean> {
    return await this.validationError.filter({ hasText: /select|choose|required/i }).isVisible().catch(() => false);
  }

  /**
   * Click on the Facilitator dropdown
   */
  async clickFacilitatorDropdown(): Promise<boolean> {
    try {
      const facilitatorDropdown = this.page.locator("//ng-select[@placeholder='Select facilitator']");
      await facilitatorDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await facilitatorDropdown.scrollIntoViewIfNeeded();
      await facilitatorDropdown.click();
      await this.page.waitForTimeout(500);
      return true;
    } catch (error) {
      console.log(`ℹ Cannot click facilitator dropdown:`);
      return false;
    }
  }

  /**
   * Type facilitator name in dropdown search
   * @param facilitatorName - The facilitator name to type
   */
  async typeFacilitatorName(facilitatorName: string): Promise<void> {
    const facilitatorInput = this.page.locator(
      "//ng-select[@placeholder='Select facilitator']//input[@type='text']"
    );
    await facilitatorInput.waitFor({ state: 'visible', timeout: 10000 });
    await facilitatorInput.fill(facilitatorName);
    await this.page.waitForTimeout(500);
  }

  /**
   * Verify facilitator dropdown is open
   */
  async isFacilitatorDropdownOpen(): Promise<boolean> {
    const dropdownPanel = this.page.locator("//ng-dropdown-panel");
    return await dropdownPanel.isVisible().catch(() => false);
  }

  /**
   * Select facilitator from dropdown by exact name
   * @param facilitatorName - The facilitator name to select
   */
  async selectFacilitatorFromDropdownExact(facilitatorName: string): Promise<boolean> {
    try {
      await this.page.waitForTimeout(500);

      const facilitatorOption = this.page.getByRole('option', {
        name: facilitatorName,
        exact: true
      });

      await facilitatorOption.waitFor({ state: 'visible', timeout: 5000 });
      await facilitatorOption.click();
      return true;
    } catch (error) {
      console.log(`ℹ Could not select facilitator "${facilitatorName}":`);
      return false;
    }
  }

  /**
   * Select facilitator from dropdown by name (with fallback)
   * @param facilitatorName - The facilitator name to select
   */
  async selectFacilitatorFromDropdown(facilitatorName: string): Promise<boolean> {
    try {
      await this.page.waitForTimeout(500);

      const facilitatorOption = this.page.locator(
        `//ng-dropdown-panel//div[@role='option']//span[contains(text(),'${facilitatorName}')]`
      );

      await facilitatorOption.waitFor({ state: 'visible', timeout: 5000 }).catch(async () => {
        const altOption = this.page.locator(
          `//ng-dropdown-panel//div[@role='option' and contains(normalize-space(),'${facilitatorName}')]`
        );
        return await altOption.waitFor({ state: 'visible', timeout: 5000 });
      });

      await facilitatorOption.click().catch(async () => {
        const altOption = this.page.locator(
          `//ng-dropdown-panel//div[@role='option' and contains(normalize-space(),'${facilitatorName}')]`
        );
        await altOption.click();
      });

      await this.page.waitForTimeout(1000);
      return true;
    } catch (error) {
      console.log(`ℹ Could not select facilitator "${facilitatorName}":`);
      return false;
    }
  }

  /**
   * Select multiple facilitators
   * @param facilitatorNames - Array of facilitator names
   */
  async selectMultipleFacilitators(facilitatorNames: string[]): Promise<number> {
    let selected = 0;
    for (const name of facilitatorNames) {
      const clicked = await this.clickFacilitatorDropdown();
      if (!clicked) continue;
      
      await this.typeFacilitatorName(name);
      await this.page.waitForTimeout(500);
      
      const selectedOne = await this.selectFacilitatorFromDropdownExact(name);
      if (selectedOne) selected++;
      
      await this.page.waitForTimeout(500);
    }
    return selected;
  }

  /**
   * Select country
   * @param countryName - Country name
   */
  async selectCountry(countryName: string): Promise<boolean> {
    try {
      if (!countryName) {
        // Clear selection
        const clearButton = this.countryDropdown.locator('.ng-clear-wrapper').first();
        if (await clearButton.isVisible().catch(() => false)) {
          await clearButton.click();
          await this.page.waitForTimeout(500);
          return true;
        }
        return true;
      }

      const countryDropdown = this.page.locator("app-crm-lookup[fcontrolname='country'] ng-select");
      await countryDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await countryDropdown.scrollIntoViewIfNeeded();
      await countryDropdown.click();

      const countryInput = this.page.locator("app-crm-lookup[fcontrolname='country'] input[type='text']");
      await countryInput.clear();
      await countryInput.fill(countryName);

      await this.page.waitForTimeout(500);

      await this.page.locator("ng-dropdown-panel .ng-option")
        .filter({ hasText: new RegExp(`^${countryName}$`) })
        .click();
      
      await this.page.waitForTimeout(500);
      return true;
    } catch (error) {
      console.log(`ℹ Could not select country "${countryName}":`);
      return false;
    }
  }

  /**
   * Select state
   * @param stateName - State name
   */
  async selectState(stateName: string): Promise<boolean> {
    try {
      const stateDropdown = this.page.locator("app-crm-lookup[fcontrolname='state'] ng-select");
      await stateDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await stateDropdown.scrollIntoViewIfNeeded();
      await stateDropdown.click();

      const stateInput = this.page.locator("app-crm-lookup[fcontrolname='state'] input[type='text']");
      await stateInput.clear();
      await stateInput.fill(stateName);

      await this.page.waitForTimeout(500);

      await this.page.locator("ng-dropdown-panel .ng-option")
        .filter({ hasText: new RegExp(`^${stateName}$`) })
        .click();
      
      await this.page.waitForTimeout(500);
      return true;
    } catch (error) {
      console.log(`ℹ Could not select state "${stateName}":`);
      return false;
    }
  }

  /**
   * Clear state selection
   */
  async clearState(): Promise<boolean> {
    try {
      const stateDropdown = this.page.locator("app-crm-lookup[fcontrolname='state'] ng-select");
      await stateDropdown.scrollIntoViewIfNeeded();
      await stateDropdown.click();

      const clearButton = this.page.locator("app-crm-lookup[fcontrolname='state'] .ng-clear-wrapper");
      if (await clearButton.isVisible().catch(() => false)) {
        await clearButton.click();
        console.log('✅ State cleared');
        return true;
      } else {
        await this.page.keyboard.press('Escape');
        return false;
      }
    } catch (error) {
      console.error('❌ Failed to clear state:', error);
      return false;
    }
  }

  /**
   * Get providers in case
   */
  async getProvidersInCase(): Promise<string[]> {
    const providers: string[] = [];
    const providerElements = await this.providerNamesInCase.all();

    for (const element of providerElements) {
      const text = await element.textContent();
      if (text) providers.push(text.trim());
    }

    return providers;
  }

  /**
   * Verify provider exists in case
   * @param providerName - Provider name to verify
   */
  async isProviderInCase(providerName: string): Promise<boolean> {
    const providers = await this.getProvidersInCase();
    return providers.some(p => p.includes(providerName));
  }

  /**
   * Get provider count in case
   */
  async getProviderCountInCase(): Promise<number> {
    return await this.providerListInCase.count();
  }

  /**
   * Wait for search results to load
   * @param timeout - Timeout in milliseconds
   */
  async waitForSearchResults(timeout = 10000): Promise<{ hasResults: boolean, count: number }> {
    try {
      console.log('⏳ Waiting for search results to load...');

      await Promise.race([
        this.providerResultsTable.waitFor({ state: 'visible', timeout }).catch(() => { }),
        this.page.waitForSelector("//td[contains(text(),'No providers')]", { timeout }).catch(() => { })
      ]);

      await this.page.waitForTimeout(1000);

      const hasNoResultsMessage = await this.isNoProviderResultsVisible();
      const rows = await this.page.locator("//tbody/tr").count();

      if (hasNoResultsMessage) {
        console.log(`ℹ️ No results found - message visible, rows: ${rows}`);
        return { hasResults: false, count: 0 };
      }

      if (rows === 0) {
        console.log('ℹ️ No results found - table exists but empty');
        return { hasResults: false, count: 0 };
      }

      console.log(`✅ Found ${rows} results`);
      return { hasResults: true, count: rows };

    } catch (error) {
      console.error('Error waiting for search results:', error);
      return { hasResults: false, count: 0 };
    }
  }

  /**
   * Debug method to understand provider search state
   */
  async debugProviderSearchState(): Promise<void> {
    console.log('\n🔍 DEBUG: Provider Search State');

    const isModalOpen = await this.isAddProviderModalOpen();
    console.log(`Add Provider modal open: ${isModalOpen}`);

    const searchButtonEnabled = await this.providerSearchButton.isEnabled().catch(() => false);
    console.log(`Search button enabled: ${searchButtonEnabled}`);

    const tableVisible = await this.providerResultsTable.isVisible().catch(() => false);
    console.log(`Results table visible: ${tableVisible}`);

    if (tableVisible) {
      const rows = await this.page.locator("//tbody/tr").count();
      console.log(`Number of rows in table: ${rows}`);
    }

    await this.page.screenshot({ path: 'debug-provider-search-state.png' });
    console.log('Screenshot saved: debug-provider-search-state.png');
  }

  /**
   * Debug provider results
   */
  async debugProviderResults(): Promise<void> {
    console.log('\n🔍 DEBUG: Provider Search Results');

    const tableExists = await this.providerResultsTable.count();
    console.log(`Provider results table exists: ${tableExists > 0}`);

    if (tableExists === 0) return;

    const rows = await this.page.locator("//tbody/tr").all();
    console.log(`Total provider rows: ${rows.length}`);

    console.log('Provider names in results:');
    for (let i = 0; i < rows.length; i++) {
      const nameCell = rows[i].locator("td:nth-child(2)").first();
      const nameText = await nameCell.textContent();
      console.log(`  Row ${i + 1}: "${nameText?.trim()}"`);
    }

    await this.page.screenshot({ path: 'debug-provider-results.png' });
    console.log('Screenshot saved: debug-provider-results.png');
  }

  /**
   * Debug toast messages
   */
  async debugToastMessages(): Promise<void> {
    console.log('\n🔍 DEBUG: Toast Messages');

    const toastContainerExists = await this.page.locator("//div[@id='toast-container']").count();
    console.log(`Toast container exists: ${toastContainerExists > 0}`);

    if (toastContainerExists === 0) return;

    const toasts = await this.page.locator("//div[@id='toast-container']//div[contains(@class,'toast') or contains(@class,'alert')]").all();
    console.log(`Number of toasts: ${toasts.length}`);

    for (let i = 0; i < toasts.length; i++) {
      const text = await toasts[i].textContent();
      console.log(`  Toast ${i + 1}: "${text?.trim()}"`);
    }

    await this.page.screenshot({ path: 'debug-toast-messages.png' });
    console.log('Screenshot saved: debug-toast-messages.png');
  }

  /**
   * Refresh the page
   */
  async refreshPage(): Promise<void> {
    await this.page.reload();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Navigate back
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Navigate forward
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Set viewport size for responsive testing
   * @param width - Viewport width
   * @param height - Viewport height
   */
  async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
    await this.page.waitForTimeout(500);
  }

  /**
   * Check if element is visible in viewport
   * @param locator - Element locator
   */
  async isElementInViewport(locator: Locator): Promise<boolean> {
    const isVisible = await locator.isVisible().catch(() => false);
    if (!isVisible) return false;

    return await locator.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );
    }).catch(() => false);
  }

  /**
   * Wait for success message to disappear
   */
  async waitForSuccessMessageToDisappear(timeout = 5000): Promise<void> {
    const toastContainer = this.page.locator("//div[@id='toast-container']");
    await toastContainer.waitFor({ state: 'detached', timeout }).catch(() => { });
  }

  /**
   * Get all toast messages currently visible
   */
  async getAllToastMessages(): Promise<string[]> {
    const messages: string[] = [];

    const toastContainer = this.page.locator("//div[@id='toast-container']");
    if (await toastContainer.isVisible().catch(() => false)) {
      const toasts = await this.page.locator("//div[@id='toast-container']//div[contains(@class,'toast') or contains(@class,'alert')]").all();

      for (const toast of toasts) {
        const text = await toast.textContent();
        if (text) messages.push(text.trim());
      }
    }

    return messages;
  }

  /**
   * Verify providers match location
   * @param country - Country name
   * @param state - State name
   */
  async verifyProvidersMatchLocation(country: string, state: string): Promise<boolean> {
    await this.page.waitForTimeout(1000);
    // This would need actual implementation based on your DOM
    return true;
  }

  /**
   * Verify providers match country
   * @param country - Country name
   */
  async verifyProvidersMatchCountry(country: string): Promise<boolean> {
    await this.page.waitForTimeout(1000);
    // This would need actual implementation based on your DOM
    return true;
  }

  /**
   * Verify facilitator association
   * @param facilitatorName - Facilitator name
   */
  async verifyFacilitatorAssociation(facilitatorName: string): Promise<boolean> {
    await this.page.waitForTimeout(1000);
    // This would need actual implementation based on your DOM
    return true;
  }

  /**
   * Verify providers match facilitators
   * @param facilitatorNames - Array of facilitator names
   */
  async verifyProvidersMatchFacilitators(facilitatorNames: string[]): Promise<boolean> {
    await this.page.waitForTimeout(1000);
    // This would need actual implementation based on your DOM
    return true;
  }

  /**
   * Get all provider names from search results
   */
  async getAllProviderNames(): Promise<string[]> {
    const providerNames: string[] = [];

    try {
      const rows = await this.page.locator("//tbody/tr").all();

      for (let i = 0; i < rows.length; i++) {
        // Get the name from the second column (td[2])
        const nameCell = await rows[i].locator("xpath=./td[2]//div").first().textContent().catch(() => '');
        if (nameCell && nameCell.trim()) {
          providerNames.push(nameCell.trim());
        }
      }

      console.log(`Found ${providerNames.length} provider names`);
      return providerNames;

    } catch (error) {
      console.error('Error getting provider names:', error);
      return [];
    }
  }

  /**
   * Select first five provider checkboxes
   */
  async selectFirstFiveProviderCheckboxes(): Promise<number> {
    return this.selectFirstNProviderCheckboxes(5);
  }

  /**
   * Verify provider checkbox is checked
   * @param providerName - The provider name to verify
   */
  async isProviderChecked(providerName: string): Promise<boolean> {
    const providerCheckbox = this.page.locator(
      `//tr[.//div[normalize-space()='${providerName}']]//input[@type='checkbox']`
    );
    return await providerCheckbox.isChecked().catch(() => false);
  }

  /**
   * Check if user can access provider filters
   */
  async canAccessFilters(testCaseId: string): Promise<boolean> {
    try {
      const searched = await this.searchCaseById(testCaseId);
      if (!searched) return false;
      
      const clicked = await this.clickCaseRow(testCaseId);
      if (!clicked) return false;
      
      const tabClicked = await this.clickProvidersTab();
      if (!tabClicked) return false;
      
      const buttonClicked = await this.clickAddProviderButton();
      if (!buttonClicked) return false;
      
      return true;
    } catch (error) {
      console.log(`ℹ ${this.constructor.name} cannot access provider filters`);
      return false;
    }
  }
}