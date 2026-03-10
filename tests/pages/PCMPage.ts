import { Page, Locator } from '@playwright/test';

export class PCMPage {
    readonly page: Page;

    // Navigation & Search
    readonly pcmTab: Locator;
    readonly searchInput: Locator;
    readonly tableRows: Locator;
    readonly gopIdCells: Locator;
    readonly PCMMenu: Locator;
    readonly PCMMenuItem: Locator;

    // PCM Modal Elements
    readonly pcmModal: Locator;
    readonly viewEstimationButton: Locator;
    readonly downloadZipButton: Locator;
    readonly moveToOPDButton: Locator;
    readonly moveToIPDButton: Locator;
    readonly moveToInitiateDischargeButton: Locator;
    readonly moveToDischarege: Locator;
    // Tab-specific Save buttons
    readonly instanceSaveButton: Locator;
    readonly termsSaveButton: Locator;
    readonly revisedGopSaveButton: Locator;

    // Instance Tab Fields
    readonly approvedEstimationLocal: Locator;
    readonly approvedAmountLocal: Locator;
    readonly approvedAmountAED: Locator;
    readonly countryDropdown: Locator;
    readonly currencyField: Locator;
    readonly validityField: Locator;
    readonly copayPercentage: Locator;
    readonly copayCeilingAED: Locator;
    readonly copayCeilingLocal: Locator;
    readonly contactNumber: Locator;
    readonly policyNumber: Locator;
    readonly policyValidity: Locator;
    readonly dateOfAdmission: Locator;
    readonly lengthOfStay: Locator;
    readonly dateOfDischarge: Locator;
    readonly handledBy: Locator;
    readonly opdCoverage: Locator;
    readonly roomCategory: Locator;
    readonly notes: Locator;

    // Terms Tab
    readonly termsTab: Locator;
    readonly hospitalMarginPercent: Locator;
    readonly serviceChargePercent: Locator;
    readonly hospitalAdvanceAmount: Locator;
    readonly hospitalPaymentCreditPeriod: Locator;
    readonly hospitalGopDate: Locator;
    readonly hospitalAdvanceAmountAED: Locator;

    // Revised GOP Tab
    readonly revisedGopTab: Locator;
    readonly revisedPlan: Locator;
    readonly revisedGopInr: Locator;
    readonly revisedGopAed: Locator;

    // Comments Tab
    readonly commentsTab: Locator;
    readonly commentTextarea: Locator;
    readonly postCommentButton: Locator;
    readonly instanceTab: Locator;

    // PCM Status Tabs (MAIN PAGE - FIXED)
    readonly newPCMTab: Locator;
    readonly opdTab: Locator;
    readonly ipdTab: Locator;
    readonly dischargeInitiatedTab: Locator;
    readonly dischargedTab: Locator;
    readonly billSubmissionTab: Locator;
    readonly finalGopPendingTab: Locator;
    readonly finalGopReceivedTab: Locator;
    readonly slaDelayedTab: Locator;
    readonly closedTab: Locator;
    readonly successMessage: Locator;
    // Success Message
    readonly toastContainer: Locator;
    readonly toastMessage: Locator;
    readonly alertMessage: Locator;

    // Date Picker
    readonly flatpickrCalendar: Locator;
    readonly flatpickrMonthSelect: Locator;
    readonly flatpickrYearInput: Locator;
    readonly flatpickrPrevMonth: Locator;
    readonly flatpickrNextMonth: Locator;

    constructor(page: Page) {
        this.page = page;

        // Menu navigation
        this.PCMMenu = page.locator('img.menu-icon[alt="patientcare"]').first();
        this.PCMMenuItem = page.locator('li:has-text("Pcm"), li:has-text("Patient care")').first();

        // Navigation & Search
        this.pcmTab = page.locator("//a[contains(@class,'nav-link') and normalize-space()='New PCM']");
        this.searchInput = page.locator("//input[@placeholder='Search patient care instances']");
        this.tableRows = page.locator("//tbody/tr[contains(@class,'cursor-pointer')]");
        this.gopIdCells = page.locator("//td[contains(@class,'btn-link')]");

        // PCM Modal
        this.pcmModal = page.locator("app-provider-patient-care-edit").first();
        this.viewEstimationButton = this.pcmModal.locator("button:has-text('View estimation')");
        this.downloadZipButton = this.pcmModal.locator("app-download-attachment button");
        this.moveToOPDButton = this.pcmModal.locator("button:has-text('Move to OPD')");
        this.moveToIPDButton = this.pcmModal.locator("button:has-text('Move to IPD')");
        this.moveToInitiateDischargeButton=this.pcmModal.locator("button:has-text('initiate discharge')");
        this,this.moveToDischarege=this.pcmModal.locator("button:has-text('Move to Discharge')");
        // Tab-specific Save buttons
        this.instanceSaveButton = page.locator(
            "//div[contains(@class,'tab-pane') and contains(@class,'active')]//button[contains(@class,'btn-primary') and normalize-space()='Save changes']"
        ).first();

        this.termsSaveButton = page.locator(
            "//div[@role='tabpanel' and .//h6[contains(text(),'Facilitator Transaction')]]//button[contains(@class,'btn-primary') and normalize-space()='Save changes']"
        ).first();

        this.revisedGopSaveButton = page.locator(
            "//div[@role='tabpanel' and .//label[contains(text(),'Revised GOP')]]//button[contains(@class,'btn-primary') and normalize-space()='Save changes']"
        ).first();

        // PCM Status Tabs (MAIN PAGE - FIXED)
        this.newPCMTab = page.locator("//ul[@role='tablist']/li/a[contains(normalize-space(),'New PCM')]");
        this.opdTab = page.locator("//ul[@role='tablist']/li/a[contains(normalize-space(),'OPD')]");
        this.ipdTab = page.locator("//ul[@role='tablist']/li/a[contains(normalize-space(),'IPD')]");
        this.dischargeInitiatedTab = page.locator("//ul[@role='tablist']/li/a[contains(normalize-space(),'Discharge initiated')]");
        this.dischargedTab = page.locator("//ul[@role='tablist']/li/a[contains(normalize-space(),'Discharged')]");
        this.billSubmissionTab = page.locator("//ul[@role='tablist']/li/a[contains(normalize-space(),'Bill submission')]");
        this.finalGopPendingTab = page.locator("//ul[@role='tablist']/li/a[contains(normalize-space(),'Final GOP pending')]");
        this.finalGopReceivedTab = page.locator("//ul[@role='tablist']/li/a[contains(normalize-space(),'Final GOP received')]");
        this.slaDelayedTab = page.locator("//ul[@role='tablist']/li/a[contains(normalize-space(),'SLA delayed')]");
        this.closedTab = page.locator("//ul[@role='tablist']/li/a[contains(normalize-space(),'Closed')]");

        // Instance Tab Fields
        this.approvedEstimationLocal = this.pcmModal.locator('[fcontrolname="totalCostAfterDiscount"] input');
        this.approvedAmountLocal = this.pcmModal.locator('[fcontrolname="approvedAmountLocalCurrency"] input');
        this.approvedAmountAED = this.pcmModal.locator('[fcontrolname="approvedAmountAED"] input');
        this.countryDropdown = this.pcmModal.locator('[fcontrolname="choiceCountry"] ng-select');
        this.currencyField = this.pcmModal.locator('[fcontrolname="choiceCurrency"] input');
        this.validityField = this.pcmModal.locator('[fcontrolname="gopValidity"] input');
        this.copayPercentage = this.pcmModal.locator('[fcontrolname="coPay"] input');
        this.copayCeilingAED = this.pcmModal.locator('[fcontrolname="coPayCeiling"] input');
        this.copayCeilingLocal = this.pcmModal.locator('[fcontrolname="coPayCeilingLocalCurrency"] input');
        this.contactNumber = this.pcmModal.locator('[fcontrolname="memberContactNumber"] input');
        this.policyNumber = this.pcmModal.locator('[fcontrolname="policyNumber"] input');
        this.policyValidity = this.pcmModal.locator('[fcontrolname="policyValidity"] input');
        this.dateOfAdmission = this.pcmModal.locator('[formcontrolname="dateOfAdmission"] input[type="text"]').first();
        this.lengthOfStay = this.pcmModal.locator('[fcontrolname="lengthOfStay"] input');
        this.dateOfDischarge = this.pcmModal.locator('[formcontrolname="dateOfDischarge"] input[type="text"]').first();
        this.handledBy = this.pcmModal.locator('[fcontrolname="handledBy"] input');
        this.opdCoverage = this.pcmModal.locator('[fcontrolname="opdCoverage"] input');
        this.roomCategory = this.pcmModal.locator('[fcontrolname="roomCategory"] input');
        this.notes = this.pcmModal.locator('textarea[formcontrolname="notes"]');

        // Modal Tabs (inside the modal)
        this.instanceTab = this.pcmModal.locator("//a[contains(@class,'nav-link') and normalize-space()='Instance']");
        this.termsTab = this.pcmModal.locator("//a[contains(@class,'nav-link') and normalize-space()='Terms']");
        this.revisedGopTab = this.pcmModal.locator("//a[contains(@class,'nav-link') and normalize-space()='Revised GOP']");
        this.commentsTab = this.pcmModal.locator("//a[contains(@class,'nav-link') and normalize-space()='Comments']");

        // Terms Tab Fields
        this.hospitalMarginPercent = this.pcmModal.locator('[fcontrolname="hospitalMarginPercentage"] input');
        this.serviceChargePercent = this.pcmModal.locator('[fcontrolname="partnerServiceChargePercentage"] input');
        this.hospitalAdvanceAmount = this.pcmModal.locator('[fcontrolname="hospitalAdvanceAmount"] input');
        this.hospitalPaymentCreditPeriod = this.pcmModal.locator('[fcontrolname="hospitalPaymentCreditPeriod"] input');
        this.hospitalGopDate = this.pcmModal.locator('[formcontrolname="hospitalGopDate"] input[type="text"]').first();
        this.hospitalAdvanceAmountAED = this.pcmModal.locator('[fcontrolname="hospitalAdvanceAmountinAED"] input');

        // Revised GOP Tab Fields
        this.revisedPlan = this.pcmModal.locator('[fcontrolname="revisedPlan"] input');
        this.revisedGopInr = this.pcmModal.locator('[fcontrolname="revisedGopInr"] input');
        this.revisedGopAed = this.pcmModal.locator('[fcontrolname="revisedGopAed"] input');

        // Comments Tab Fields
        this.commentTextarea = this.pcmModal.locator('textarea[formcontrolname="commentText"]');
        this.postCommentButton = this.pcmModal.locator('button:has-text("Post comment")');

        // Date Picker
        this.flatpickrCalendar = page.locator('.flatpickr-calendar.open').first();
        this.flatpickrMonthSelect = page.locator('.flatpickr-monthDropdown-months').first();
        this.flatpickrYearInput = page.locator('.numInput.cur-year').first();
        this.flatpickrPrevMonth = page.locator('.flatpickr-prev-month').first();
        this.flatpickrNextMonth = page.locator('.flatpickr-next-month').first();

        // Success Message
        this.toastContainer = page.locator("//div[@id='toast-container']").first();
        this.toastMessage = page.locator("//div[@id='toast-container']//div[contains(@class,'toast')]").first();
        this.alertMessage = page.locator(
            "//div[contains(@class,'alert-success')] | " +
            "//div[contains(@class,'success-message')]"
        ).first();



        this.successMessage = page.locator(
            "//div[contains(@class,'alert-success') or contains(@class,'success-message')] | " +
            "//div[@id='toast-container']//div[contains(@class,'success') or contains(@class,'alert-success')] | " +
            "//div[@id='toast-container']//div[contains(text(),'success') or contains(text(),'Success')] | " +
            "//div[@id='toast-container']//div[contains(@class,'toast-success')] | " +
            "//div[@id='toast-container']//div[contains(@class,'toast')] | " +
            "//div[@id='toast-container']//div[contains(@class,'alert')]"
        ).first();

    }

    /**
     * Navigate to PCM module via menu
     */
    async navigateToPCM() {
        console.log('   📍 Clicking Patient Care menu icon...');
        await this.PCMMenu.click();
        await this.page.waitForTimeout(1000);

        console.log('   📍 Clicking PCM menu item...');
        await this.PCMMenuItem.click();
        await this.page.waitForTimeout(3000);
        console.log('   ✅ Navigated to PCM page');
    }

    /**
     * Click on PCM tab
     */
    async clickPCMTab(): Promise<void> {
        try {
            await this.newPCMTab.waitFor({ state: 'visible', timeout: 15000 });
            await this.newPCMTab.click();
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(1000);
            console.log('✓ Clicked New PCM tab');
        } catch (error) {
            console.error('✗ Failed to click New PCM tab:', error);
            throw error;
        }
    }

    async isSuccess(): Promise<boolean> {
        try {
            // Strategy 1: Check toast container
            const toastContainer = this.page.locator("//div[@id='toast-container']");
            if (await toastContainer.isVisible().catch(() => false)) {

                // Check for success message in toast
                const successInToast = this.page.locator(
                    "//div[@id='toast-container']//div[contains(@class,'success') or contains(text(),'Success')]"
                ).first();

                if (await successInToast.isVisible().catch(() => false)) {
                    return true;
                }

                // Check for any toast (might be success)
                const anyToast = this.page.locator("//div[@id='toast-container']//div[contains(@class,'toast')]").first();
                if (await anyToast.isVisible().catch(() => false)) {
                    const toastText = await anyToast.textContent() || '';
                    // If toast contains success-related text, consider it successful
                    if (toastText.toLowerCase().includes('success') ||
                        toastText.toLowerCase().includes('baby') ||
                        toastText.toLowerCase().includes('sent')) {
                        return true;
                    }
                }
            }

            // Strategy 2: Use original success message locator
            return await this.successMessage.isVisible().catch(() => false);

        } catch (error) {
            return false;
        }
    }

    /**
     * Click on OPD tab
     */
    async clickOPDTab(): Promise<void> {
        try {
            await this.opdTab.waitFor({ state: 'visible', timeout: 15000 });
            await this.opdTab.click();
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(1000);
            console.log('✓ Clicked OPD tab');
        } catch (error) {
            console.error('✗ Failed to click OPD tab:', error);
            throw error;
        }
    }



    async clickInitiateDischargeTab(): Promise<void> {
        try {
            await this.dischargeInitiatedTab.waitFor({ state: 'visible', timeout: 15000 });
            await this.dischargeInitiatedTab.click();
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(1000);
            console.log('✓ Clicked Discharge Initiated tab');
        } catch (error) {
            console.error('✗ Failed to click Discharge Initiated tab:', error);
            throw error;
        }
    }




    /**
     * Click on IPD tab
     */
    async clickIPDTab(): Promise<void> {
        try {
            await this.ipdTab.waitFor({ state: 'visible', timeout: 15000 });
            await this.ipdTab.click();
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(1000);
            console.log('✓ Clicked IPD tab');
        } catch (error) {
            console.error('✗ Failed to click IPD tab:', error);
            throw error;
        }
    }

    /**
     * Search for GOP ID
     */
    async searchGOP(gopId: string): Promise<void> {
        try {
            await this.searchInput.waitFor({ state: 'visible', timeout: 15000 });
            await this.searchInput.clear();
            await this.searchInput.fill(gopId);
            await this.searchInput.press('Enter');
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);
            console.log(`✓ Searched for GOP: ${gopId}`);
        } catch (error) {
            console.error('✗ Failed to search:', error);
            throw error;
        }
    }

    /**
     * Click on first row in table
     */
    async clickFirstRow(): Promise<void> {
        try {
            const rowCount = await this.tableRows.count();
            console.log(`Found ${rowCount} rows`);

            if (rowCount === 0) {
                throw new Error('No rows found in table');
            }

            await this.tableRows.first().click();
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);
            console.log('✓ Clicked first row');
        } catch (error) {
            console.error('✗ Failed to click row:', error);
            throw error;
        }
    }

    /**
     * Wait for PCM modal to be visible
     */
    async waitForModal(): Promise<void> {
        try {
            await this.pcmModal.waitFor({ state: 'visible', timeout: 15000 });
            console.log('✓ PCM modal is visible');
        } catch (error) {
            console.error('✗ PCM modal not visible:', error);
            throw error;
        }
    }

    /**
     * Check if field is editable
     */
    private async isFieldEditable(field: Locator): Promise<boolean> {
        try {
            const isDisabled = await field.getAttribute('disabled');
            const isReadOnly = await field.getAttribute('readonly');
            return !isDisabled && !isReadOnly;
        } catch {
            return true;
        }
    }

    /**
     * Fill text input if editable
     */
    async fillIfEditable(field: Locator, value: string, fieldName: string): Promise<void> {
        try {
            const isEditable = await this.isFieldEditable(field);

            if (isEditable) {
                await field.waitFor({ state: 'visible', timeout: 5000 });
                await field.click({ clickCount: 3 });
                await field.press('Backspace');
                await field.fill(value);
                console.log(`  ✓ Filled ${fieldName}: ${value}`);
            } else {
                console.log(`  ⚠ ${fieldName} is read-only/disabled, skipping`);
            }
        } catch (error) {
            console.log(`  ⚠ Could not fill ${fieldName}:`, error);
        }
    }

    /**
     * Set date field using flatpickr
     */
    async setDateField(field: Locator, targetDate: string, fieldName: string): Promise<void> {
        try {
            console.log(`📅 Setting ${fieldName}: ${targetDate}`);

            await field.waitFor({ state: 'visible', timeout: 10000 });

            // Parse date
            const [year, month, day] = targetDate.split('-').map(Number);
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const monthName = monthNames[month - 1];

            // Open calendar
            await field.click();

            // Wait for calendar
            const calendar = this.page.locator('.flatpickr-calendar.open').first();
            await calendar.waitFor({ state: 'visible', timeout: 5000 });

            // Set year
            const yearInput = calendar.locator('.numInput.cur-year');
            await yearInput.fill(year.toString());

            // Select month
            const monthSelect = calendar.locator('.flatpickr-monthDropdown-months');
            await monthSelect.selectOption({ value: String(month - 1) });

            await this.page.waitForTimeout(500);

            // Select exact day using aria-label
            const dayLocator = calendar.locator(
                `.flatpickr-day[aria-label="${monthName} ${day}, ${year}"]:not(.prevMonthDay):not(.nextMonthDay)`
            );
            await dayLocator.waitFor({ state: 'visible', timeout: 5000 });
            await dayLocator.click();

            await this.page.waitForTimeout(500);
            console.log(`✅ ${fieldName} set to ${monthName} ${day}, ${year}`);

        } catch (error) {
            console.log(`❌ Failed setting ${fieldName}:`, error);
            throw error;
        }
    }

    /**
     * Fill all instance tab fields
     */
    async fillInstanceTab(data: any): Promise<void> {
        console.log('\n📝 Filling Instance Tab fields...');

        await this.instanceTab.click();
        await this.page.waitForTimeout(1000);

        await this.setDateField(this.dateOfAdmission, data.dateOfAdmission, 'Date of admission');
        await this.fillIfEditable(this.lengthOfStay, data.lengthOfStay, 'Length of stay');
        await this.setDateField(this.dateOfDischarge, data.dateOfDischarge, 'Date of discharge');
        await this.fillIfEditable(this.handledBy, data.handledBy, 'Handled by');
        await this.fillIfEditable(this.notes, data.notes, 'Notes');

        await this.instanceSaveButton.click();
        await this.page.waitForTimeout(2000);
    }

    /**
     * Fill Terms tab fields
     */
    async fillTermsTab(data: any): Promise<void> {
        if (!data) return;

        console.log('\n📝 Filling Terms Tab fields...');

        await this.termsTab.click();
        await this.page.waitForTimeout(2000);

        await this.fillIfEditable(this.hospitalMarginPercent, data.hospitalMarginPercent, 'Hospital margin %');
        await this.fillIfEditable(this.serviceChargePercent, data.serviceChargePercent, 'Service charge %');
        await this.fillIfEditable(this.hospitalAdvanceAmount, data.hospitalAdvanceAmount, 'Hospital advance amount');
        await this.fillIfEditable(this.hospitalPaymentCreditPeriod, data.hospitalPaymentCreditPeriod, 'Payment credit period');
        await this.setDateField(this.hospitalGopDate, data.hospitalGopDate, 'Hospital GOP date');
        await this.fillIfEditable(this.hospitalAdvanceAmountAED, data.hospitalAdvanceAmountAED, 'Hospital advance AED');

        await this.termsSaveButton.click();
        await this.page.waitForTimeout(2000);
    }

    /**
     * Fill Revised GOP tab fields
     */
    async fillRevisedGOPTab(data: any): Promise<void> {
        if (!data) return;

        console.log('\n📝 Filling Revised GOP Tab fields...');

        await this.revisedGopTab.click();
        await this.page.waitForTimeout(2000);

        await this.fillIfEditable(this.revisedPlan, data.revisedPlan, 'Revised plan');
        await this.fillIfEditable(this.revisedGopInr, data.revisedGopInr, 'Revised GOP INR');
        await this.fillIfEditable(this.revisedGopAed, data.revisedGopAed, 'Revised GOP AED');

        await this.revisedGopSaveButton.click();
        await this.page.waitForTimeout(2000);
    }

    /**
     * Post a comment
     */
    async postComment(comment: string): Promise<void> {
        if (!comment) return;

        try {
            await this.commentsTab.click();
            await this.page.waitForTimeout(2000);

            await this.commentTextarea.waitFor({ state: 'visible', timeout: 5000 });
            await this.commentTextarea.fill(comment);
            await this.postCommentButton.click();

            console.log(`✓ Posted comment: ${comment}`);
            await this.page.waitForTimeout(2000);
        } catch (error) {
            console.error('✗ Failed to post comment:', error);
        }
    }

    /**
     * Click Move to OPD button
     */
    async clickMoveToOPD(): Promise<void> {
        try {
            await this.instanceTab.click();
            await this.page.waitForTimeout(2000);

            await this.moveToOPDButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.moveToOPDButton.scrollIntoViewIfNeeded();
            await this.moveToOPDButton.click();
            console.log('✓ Clicked Move to OPD button');
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(5000);
        } catch (error) {
            console.error('✗ Failed to click Move to OPD:', error);
            throw error;
        }
    }

    /**
     * Click Move to IPD button
     */
    async clickMoveToIPD(): Promise<void> {
        try {
            await this.instanceTab.click();
            await this.page.waitForTimeout(2000);

            await this.moveToIPDButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.moveToIPDButton.scrollIntoViewIfNeeded();
            await this.moveToIPDButton.click();
            console.log('✓ Clicked Move to IPD button');
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(5000);
        } catch (error) {
            console.error('✗ Failed to click Move to IPD:', error);
            throw error;
        }
    }

        
    async clickMoveToDischarge(): Promise<void> {
        try {
            await this.instanceTab.click();
            await this.page.waitForTimeout(2000);

            await this.moveToIPDButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.moveToIPDButton.scrollIntoViewIfNeeded();
            await this.moveToIPDButton.click();
            console.log('✓ Clicked Move to IPD button');
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(5000);
        } catch (error) {
            console.error('✗ Failed to click Move to IPD:', error);
            throw error;
        }
    }

    /**
     * Verify success message
     */
    async isSuccessMessageVisible(): Promise<boolean> {
        try {
            console.log('⏳ Waiting for success message...');

            // Check if modal closed (primary success indicator)
            const modalVisible = await this.pcmModal.isVisible().catch(() => false);
            if (!modalVisible) {
                console.log('✓ Modal closed - operation successful');
                return true;
            }

            // Check for toast
            const toastContainerVisible = await this.toastContainer.isVisible({ timeout: 10000 }).catch(() => false);
            if (toastContainerVisible) {
                const toastVisible = await this.toastMessage.isVisible().catch(() => false);
                if (toastVisible) {
                    const toastText = await this.toastMessage.textContent();
                    console.log(`✓ Toast message: "${toastText}"`);
                    return true;
                }
            }

            console.log('⚠ No success indicator found');
            return false;

        } catch (error) {
            console.log('⚠ Error checking success message:', error);
            return false;
        }
    }

    /**
     * Verify case is no longer in table
     */
    async verifyCaseNotInTable(gopId: string): Promise<boolean> {
        try {
            console.log(`🔍 Verifying GOP ${gopId} is removed from table...`);

            await this.page.waitForTimeout(2000);
            await this.searchInput.clear();
            await this.searchInput.fill(gopId);
            await this.searchInput.press('Enter');
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(3000);

            const rowCount = await this.tableRows.count();
            return rowCount === 0;
        } catch (error) {
            console.error('✗ Failed to verify case removal:', error);
            return false;
        }
    }

    /**
     * Complete New PCM flow (New PCM -> OPD)
     */
    async completeNewPCMFlow(gopId: string, data: any): Promise<boolean> {
        console.log('\n=== Starting New PCM Flow ===');

        try {
            await this.clickPCMTab();
            await this.searchGOP(gopId);
            await this.clickFirstRow();
            await this.waitForModal();

            await this.fillInstanceTab(data.instance);
            await this.fillTermsTab(data.terms);
            await this.fillRevisedGOPTab(data.revisedGOP);
            await this.postComment(data.comment);

            await this.clickMoveToOPD();

            const success = await this.isSuccessMessageVisible();
            if (success) {
                const removed = await this.verifyCaseNotInTable(gopId);
                console.log('✅ New PCM Flow completed successfully\n');
                return removed;
            }
            return false;
        } catch (error) {
            console.error('❌ New PCM Flow failed:', error);
            return false;
        }
    }

    /**
     * Complete OPD to IPD flow
     */
    async completeOPDtoIPDFlow(gopId: string, data: any): Promise<boolean> {
        console.log('\n=== Starting OPD to IPD Flow ===');

        try {
            // First click OPD tab to see cases in OPD
            await this.clickOPDTab();
            await this.searchGOP(gopId);
            await this.clickFirstRow();
            await this.waitForModal();

            // Fill any required fields if needed
            await this.fillInstanceTab(data.instance);

            // Click Move to IPD
            await this.clickMoveToIPD();

            const success = await this.isSuccessMessageVisible();
            if (success) {
                // Verify case moved from OPD tab
                await this.clickOPDTab();
                const removed = await this.verifyCaseNotInTable(gopId);
                console.log('✅ OPD to IPD Flow completed successfully\n');
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ OPD to IPD Flow failed:', error);
            return false;
        }
    }
}