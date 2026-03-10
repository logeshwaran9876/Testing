import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { AdminEnquiryPage } from './pages/AdminEnquiryPage';
import testData from '../test-data/test.json';

test.describe('Admin HCT – Complete Test Suite', () => {
    let loginPage: LoginPage;
    let enquiryPage: AdminEnquiryPage;

    test.beforeEach(async ({ page }) => {
        // Initialize page objects
        loginPage = new LoginPage(page);
        enquiryPage = new AdminEnquiryPage(page);

        // Get admin credentials from test data
        const adminCredentials = testData.roles.admin.credentials.valid;
        const adminUrl = testData.roles.admin.url;

        // Navigate to admin login page
        await loginPage.navigateToLoginPage(adminUrl);

        // Wait for login form to appear
        await page.getByRole('textbox').first().waitFor({ state: 'visible', timeout: 15000 });

        // Login as admin
        await loginPage.enterEmail(adminCredentials.username);
        await loginPage.enterPassword(adminCredentials.password);
        await loginPage.clickGetStartedButton();

        // Wait for dashboard/enquiry page to load
        await page.waitForURL(url => url.toString().includes('dashboard') || url.toString().includes('enquiry'), {
            timeout: 5000
        }).catch(() => { });

        // Extra wait for page stabilization
        await page.waitForTimeout(2000);

        // Navigate to enquiry list if not already there
        const currentUrl = page.url();
        if (!currentUrl.includes('enquiry') && !currentUrl.includes('case')) {
            const enquiryLink = page.locator('a, button').filter({ hasText: /enquir|case|hct/i }).first();
            if (await enquiryLink.isVisible().catch(() => false)) {
                await enquiryLink.click();
                await page.waitForTimeout(2000);
            }
        }
        await page.waitForTimeout(4000);
    });

    // ==================== SECTION 1: SEARCH & FILTER TESTS ====================

    test.describe('Search & Filter Tests', () => {

         test('Admin searches case by Patient Name', async ({ page }) => {
            const patientName = 'John';

            await enquiryPage.searchByPatientName(patientName);
            await page.waitForTimeout(4000);
              await page.keyboard.press('Enter');
            const resultsCount = await enquiryPage.getVisibleCasesCount();

            expect(resultsCount).toBeGreaterThan(0);
        });

        test('Admin searches with invalid Case ID shows no results', async ({ page }) => {
            const invalidCaseId = 'INVALID999';

            await enquiryPage.searchCaseById(invalidCaseId);
              await page.keyboard.press('Enter');
            await page.waitForTimeout(4000);

            const noResultsMessage = await enquiryPage.isNoResultsMessageVisible();
            expect(noResultsMessage).toBeTruthy();
        });
        test('Admin filters by multiple statuses sequentially', async ({ page }) => {
            await enquiryPage.filterByStatus('New');
              await page.keyboard.press('Enter');
            await page.waitForTimeout(4000);
            const newCount = await enquiryPage.getVisibleCasesCount();

            await enquiryPage.filterByStatus('Estimation Pending');
            await page.waitForTimeout(4000);
            const estimationCount = await enquiryPage.getVisibleCasesCount();

            expect(newCount !== estimationCount || newCount > 0).toBeTruthy();
        });
        test('Admin clears search and verifies all cases shown', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await page.waitForTimeout(4000);

            await enquiryPage.clearSearch();
            await page.waitForTimeout(4000);

            const caseCount = await enquiryPage.getVisibleCasesCount();
            expect(caseCount).toBeGreaterThan(5);
        });
        test('Admin filters cases by "Estimation Pending" status', async ({ page }) => {
            await enquiryPage.filterByStatus('Estimation Pending');
              await page.keyboard.press('Enter');
            await page.waitForTimeout(2000);

            const allHaveStatus = await enquiryPage.verifyAllCasesHaveStatus('Estimation Pending');
            expect(allHaveStatus).toBeTruthy();
        });
     test('Admin searches with empty search field', async ({ page }) => {
            await enquiryPage.searchCaseById('');
            await page.keyboard.press('Enter');
            await page.waitForTimeout(4000);

            const caseCount = await enquiryPage.getVisibleCasesCount();
            expect(caseCount).toBeGreaterThan(5);
        });


        test('Admin searches case by valid Case ID', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await page.waitForTimeout(4000);
            await page.keyboard.press('Enter');
            const isVisible = await enquiryPage.isCaseVisible(testCaseId);

            expect(isVisible).toBeTruthy();
        });
       
   

        test('Admin filters cases by "New" status', async ({ page }) => {
            await enquiryPage.filterByStatus('New');
            await page.keyboard.press('Enter');
            await page.waitForTimeout(4000);

            const allHaveNewStatus = await enquiryPage.verifyAllCasesHaveStatus('New');
            expect(allHaveNewStatus).toBeTruthy();
        });
    test('Admin combines search and filter together', async ({ page }) => {
            const testCaseId = 'CS2350';

            await enquiryPage.searchCaseById(testCaseId);
            await page.keyboard.press('Enter');
            await page.waitForTimeout(4000);

            await enquiryPage.filterByStatus('New');
            await page.keyboard.press('Enter');
            await page.waitForTimeout(4000);

            const isVisible = await enquiryPage.isCaseVisible(testCaseId);
            expect(isVisible).toBeTruthy();
        });



    

  
 
    });


});

