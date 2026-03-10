import { Page, Locator, expect } from '@playwright/test';

export class GopPage {
  readonly page: Page;
  
  // Menu and tabs
  readonly gopMenu: Locator;
  readonly gopMenuItem: Locator;
  readonly pendingTab: Locator;
  readonly approvedTab: Locator;
  readonly slaTab: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  
  // Table
  readonly tableRows: Locator;
  readonly firstGopId: Locator;
  readonly firstCaseId: Locator;
  readonly firstPatientName: Locator;
  readonly firstProviderName: Locator;
  
  // Buttons
  readonly cancelButton: (rowIndex: number) => Locator;
  readonly queryButton: (rowIndex: number) => Locator;
  readonly downloadButton: (rowIndex: number) => Locator;
  
  // Modal
  readonly modal: Locator;
  readonly modalConfirm: Locator;
  readonly modalClose: Locator;
  
  // Query modal
  readonly queryTitle: Locator;
  readonly queryDesc: Locator;
  readonly postQueryBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.gopMenu = page.locator('img.menu-icon[alt="gop"]').first();
    this.gopMenuItem = page.locator('li:has-text("Gop"), li:has-text("GOP")').first();
    this.pendingTab = page.locator('button:has-text("Pending")').first();
    this.approvedTab = page.locator('button:has-text("Approved")').first();
    this.slaTab = page.locator('button:has-text("SLA delayed")').first();
    
    // FIXED: More specific selector for the search input
    this.searchInput = page.locator('input[placeholder="Search"][type="text"]').first();
    
    // Look for search button or icon
    this.searchButton = page.locator('button i.fa-search, button svg, .input-group-append button, button:has(svg)').first();
    
    this.tableRows = page.locator('table tbody tr, .table tbody tr, [role="rowgroup"] tr');
    this.firstGopId = this.tableRows.first().locator('td').first();
    this.firstCaseId = this.tableRows.first().locator('td').nth(1);
    this.firstPatientName = this.tableRows.first().locator('td').nth(2);
    this.firstProviderName = this.tableRows.first().locator('td').nth(3);
    
    this.cancelButton = (rowIndex) => this.tableRows.nth(rowIndex).locator('td').nth(4).locator('button:has-text("Cancel GOP"), button:has-text("ReVoke GOP")');
    this.queryButton = (rowIndex) => this.tableRows.nth(rowIndex).locator('td').nth(5).locator('button:has-text("Raise the Query")');
    this.downloadButton = (rowIndex) => this.tableRows.nth(rowIndex).locator('td').nth(6).locator('button:has-text("Download")');
    
    this.modal = page.locator('.modal, [role="dialog"]');
    this.modalConfirm = this.modal.locator('button:has-text("confirm")');
    this.modalClose = this.modal.locator('button:has-text("Close")');
    
    this.queryTitle = page.locator('input[placeholder*="title"]');
    this.queryDesc = page.locator('textarea[placeholder*="Description"]');
    this.postQueryBtn = page.locator('button:has-text("Post Query")');
  }

  async navigateToGop() {
    console.log('   📍 Clicking GOP menu icon...');
    await this.gopMenu.click();
    await this.page.waitForTimeout(1000);
    
    console.log('   📍 Clicking GOP menu item...');
    await this.gopMenuItem.click();
    await this.page.waitForTimeout(3000);
    console.log('   ✅ Navigated to GOP page');
  }

  async search(caseId: string) {
    console.log(`   📍 Searching for: ${caseId}`);
    
    // Wait for search input to be ready
    await this.page.waitForTimeout(2000);
    
    // Method 1: Try to find and interact with search input
    const searchElement = this.searchInput;
    const exists = await searchElement.count();
    
    if (exists === 0) {
      console.log('   ❌ Search input not found with primary selector');
      await this.debugSearchInputs();
      return;
    }
    
    try {
      // Clear any existing text
      await searchElement.click({ timeout: 5000 });
      await this.page.waitForTimeout(500);
      
      // Triple click to select all text
      await searchElement.click({ clickCount: 3 });
      await this.page.waitForTimeout(500);
      
      // Clear with keyboard
      await this.page.keyboard.press('Backspace');
      await this.page.waitForTimeout(500);
      
      // Type the search term slowly
      console.log('   📍 Typing search term...');
      await searchElement.type(caseId, { delay: 100 });
      await this.page.waitForTimeout(1000);
      
      // Press Enter
      console.log('   📍 Pressing Enter...');
      await searchElement.press('Enter');
      await this.page.waitForTimeout(3000);
      
      // Try to find any search button and click it
      const btnCount = await this.searchButton.count();
      if (btnCount > 0) {
        console.log('   📍 Clicking search button...');
        await this.searchButton.first().click();
        await this.page.waitForTimeout(3000);
      }
      
      // Alternative: Press Tab then Enter
      console.log('   📍 Pressing Tab + Enter...');
      await this.page.keyboard.press('Tab');
      await this.page.waitForTimeout(500);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(3000);
      
      console.log('   ✅ Search completed');
      
    } catch (error) {
      console.log('   ❌ Error during search:', error);
      
      // Fallback: Use page.fill with force
      try {
        console.log('   📍 Trying force fill...');
        await searchElement.fill(caseId, { force: true });
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(3000);
      } catch (e) {
        console.log('   ❌ Force fill also failed');
      }
    }
  }

  async debugSearchInputs() {
    console.log('\n🔍 ===== SEARCH INPUT DEBUG =====');
    
    // Find all inputs
    const allInputs = await this.page.locator('input').all();
    console.log(`Total inputs found: ${allInputs.length}`);
    
    for (let i = 0; i < allInputs.length; i++) {
      const input = allInputs[i];
      const type = await input.getAttribute('type');
      const placeholder = await input.getAttribute('placeholder');
      const id = await input.getAttribute('id');
      const name = await input.getAttribute('name');
      const classes = await input.getAttribute('class');
      const disabled = await input.isDisabled();
      const visible = await input.isVisible();
      
      console.log(`\nInput #${i}:`);
      console.log(`  Type: ${type}`);
      console.log(`  Placeholder: ${placeholder}`);
      console.log(`  ID: ${id}`);
      console.log(`  Name: ${name}`);
      console.log(`  Classes: ${classes}`);
      console.log(`  Disabled: ${disabled}`);
      console.log(`  Visible: ${visible}`);
    }
    
    // Find all buttons - FIXED with try/catch
    try {
      const buttons = await this.page.locator('button').all();
      console.log(`\nTotal buttons: ${buttons.length}`);
      
      for (let i = 0; i < Math.min(buttons.length, 10); i++) {
        try {
          const btn = buttons[i];
          const text = await btn.textContent();
          const classes = await btn.getAttribute('class');
          console.log(`Button #${i}: "${text?.trim() || ''}" (${classes || ''})`);
        } catch (e) {
          console.log(`Button #${i}: [Error getting details]`);
        }
      }
    } catch (e) {
      console.log('Error getting buttons:', e);
    }
    
    console.log('================================\n');
  }

  async clickFirstRow() {
    console.log('   📍 Clicking first GOP row');
    const count = await this.tableRows.count();
    console.log(`   🔍 Total rows: ${count}`);
    
    if (count > 0) {
      // Try multiple selectors for the clickable element
      const firstCell = this.firstCaseId;
      await firstCell.waitFor({ state: 'visible', timeout: 5000 });
      await firstCell.click();
      await this.page.waitForTimeout(1000);
      console.log('   ✅ Row clicked');
    } else {
      console.log('   ❌ No rows to click');
    }
  }

  async cancelGop(rowIndex = 0) {
    console.log('   📍 Clicking Cancel GOP button');
    await this.cancelButton(rowIndex).click();
    await this.page.waitForTimeout(500);
    
    console.log('   📍 Waiting for confirmation modal');
    await this.modal.waitFor({ state: 'visible', timeout: 5000 });
    
    console.log('   📍 Clicking Confirm button');
    await this.modalConfirm.click();
    await this.page.waitForTimeout(1000);
    console.log('   ✅ GOP cancelled');
  }

  async raiseQuery(title: string, desc: string, rowIndex = 0) {
    console.log('   📍 Clicking Raise Query button');
    await this.queryButton(rowIndex).click();
    await this.page.waitForTimeout(500);
    
    console.log('   📍 Filling query details');
    await this.queryTitle.fill(title);
    await this.queryDesc.fill(desc);
    
    console.log('   📍 Posting query');
    await this.postQueryBtn.click();
    await this.page.waitForTimeout(1000);
    console.log('   ✅ Query raised');
  }
}