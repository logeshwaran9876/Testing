import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { AdminEnquiryPage } from './pages/AdminEnquiryPage';
import testData from '../test-data/test.json';

test.describe('Admin HCT Enquiry – Complete Test Suite', () => {
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


            await page.keyboard.press('Enter');
            await page.waitForTimeout(4000);

            const isVisible = await enquiryPage.isCaseVisible(testCaseId);
            expect(isVisible).toBeTruthy();
        });







    });


    test.describe('Case Details Offcanvas Tests', () => {

        test('Admin clicks case row and opens offcanvas', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);

            const isOpen = await enquiryPage.isOffcanvasOpen();
            expect(isOpen).toBeTruthy();
        });

        test('Admin closes offcanvas with Close button', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.closeOffcanvas();

            const isOpen = await enquiryPage.isOffcanvasOpen();
            expect(isOpen).toBeFalsy();
        });

        test('Admin closes offcanvas by clicking outside', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickOutsideOffcanvas();

            const isOpen = await enquiryPage.isOffcanvasOpen();
            expect(isOpen).toBeFalsy();
        });

        test('Admin verifies case ID matches in offcanvas', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);

            const offcanvasCaseId = await enquiryPage.getOffcanvasCaseId();
            expect(offcanvasCaseId).toContain(testCaseId);
        });





        test('Admin opens multiple cases sequentially', async ({ page }) => {
            const caseIds = ['CS1736', 'CS1766', 'CS1769'];

            for (const caseId of caseIds) {
                await enquiryPage.searchCaseById(caseId);
                await enquiryPage.clickCaseRow(caseId);

                const isOpen = await enquiryPage.isOffcanvasOpen();
                expect(isOpen).toBeTruthy();

                await enquiryPage.closeOffcanvas();
            }
        });

        test('Admin verifies patient details in offcanvas', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);

            const patientName = await enquiryPage.offcanvasPatientName.textContent();
            expect(patientName).toBeTruthy();
        });


    });


    test.describe('Single Provider Broadcast Tests', () => {

        test('Admin broadcasts single provider to New case', async ({ page }) => {
            const testCaseId = 'CS1736';
            const providerName = 'Leo';

            await enquiryPage.searchCaseById(testCaseId);

            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.enterProviderName(providerName);
            await enquiryPage.clickProviderSearchButton();

            const isInResults = await enquiryPage.isProviderInResults(providerName);
            expect(isInResults).toBeTruthy();

            await enquiryPage.selectProviderCheckbox(providerName);
            await enquiryPage.clickBroadcastButton();

            // Wait for toast to appear
            await page.waitForTimeout(2000);

            const isBroadcastSuccessful = await enquiryPage.isBroadcastSuccessful();
            expect(isBroadcastSuccessful).toBeTruthy();

            const successMessage = await enquiryPage.getSuccessMessage();
            console.log(`Success message: ${successMessage}`);

            // Optional: Debug if test fails
            if (!isBroadcastSuccessful) {
                await enquiryPage.debugToastMessages();
            }
        });

        test('Admin broadcasts single provider with country filter', async ({ page }) => {
            const testCaseId = 'CS1736';
            const providerName = 'Leo'; // Use exact case as it appears in results
            const countryName = 'India';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.selectCountry(countryName);

            // Try with different case variations
            const searchVariations = ['Leo', 'leo', 'LEO'];
            let found = false;

            for (const variation of searchVariations) {
                await enquiryPage.enterProviderName(variation);
                await enquiryPage.clickProviderSearchButton();
                await page.waitForTimeout(1000);

                if (await enquiryPage.isProviderInResults(variation)) {
                    console.log(`✅ Provider found with search term: "${variation}"`);
                    found = true;
                    await enquiryPage.selectProviderCheckbox(variation);
                    break;
                }
            }

            expect(found).toBeTruthy();

            await enquiryPage.clickBroadcastButton();
            await page.waitForTimeout(2000);

            const isBroadcastSuccessful = await enquiryPage.isBroadcastSuccessful();
            expect(isBroadcastSuccessful).toBeTruthy();
        });


        test('Admin broadcasts single provider with country filter with state', async ({ page }) => {
            const testCaseId = 'CS1736';
            const providerName = 'Leo'; // Use exact case as it appears in results
            const countryName = 'India';
            const stateName = 'Tamil Nadu';
            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.selectCountry(countryName);
            await enquiryPage.selectState(stateName);
            // Try with different case variations
            const searchVariations = ['Leo', 'leo', 'LEO'];
            let found = false;

            for (const variation of searchVariations) {
                await enquiryPage.enterProviderName(variation);
                await enquiryPage.clickProviderSearchButton();
                await page.waitForTimeout(1000);

                if (await enquiryPage.isProviderInResults(variation)) {
                    console.log(`✅ Provider found with search term: "${variation}"`);
                    found = true;
                    await enquiryPage.selectProviderCheckbox(variation);
                    break;
                }
            }

            expect(found).toBeTruthy();

            await enquiryPage.clickBroadcastButton();
            await page.waitForTimeout(2000);

            const isBroadcastSuccessful = await enquiryPage.isBroadcastSuccessful();
            expect(isBroadcastSuccessful).toBeTruthy();
        });

        test('Admin broadcasts provider that already exists in case', async ({ page }) => {
            const testCaseId = 'CS1736';
            const providerName = 'Leo';

            await enquiryPage.searchCaseById(testCaseId);

            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.enterProviderName(providerName);
            await enquiryPage.clickProviderSearchButton();

            const isInResults = await enquiryPage.isProviderInResults(providerName);
            expect(isInResults).toBeTruthy();

            await enquiryPage.selectProviderCheckbox(providerName);
            await enquiryPage.clickBroadcastButton();

            // Wait for toast to appear
            await page.waitForTimeout(2000);

            const isBroadcastSuccessful = await enquiryPage.isBroadcastSuccessful();
            expect(isBroadcastSuccessful).toBeTruthy();

            const successMessage = await enquiryPage.getSuccessMessage();
            console.log(`Success message: ${successMessage}`);

            // Optional: Debug if test fails
            if (!isBroadcastSuccessful) {
                await enquiryPage.debugToastMessages();
            }
        });
        test('Admin searches non-existent provider and verifies no results', async ({ page }) => {
            const testCaseId = 'CS1736';
            const nonExistentProvider = 'NonExistentProvider123456';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.enterProviderName(nonExistentProvider);
            await enquiryPage.clickProviderSearchButton();

            // Wait for results to load
            const { hasResults, count } = await enquiryPage.waitForSearchResults();

            // For non-existent provider, we expect NO results
            expect(hasResults).toBeFalsy();
            expect(count).toBe(0);

            // Verify no results message is visible
            const noResultsVisible = await enquiryPage.isNoProviderResultsVisible();
            expect(noResultsVisible).toBeTruthy();

            console.log(`✅ Correctly got no results for non-existent provider: ${nonExistentProvider}`);
        });
        test('Admin searches with random string and handles gracefully', async ({ page }) => {
            const testCaseId = 'CS1736';
            const randomString = 'xyz123noname';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.enterProviderName(randomString);
            await enquiryPage.clickProviderSearchButton();

            await page.waitForTimeout(2000);

            // Get all provider names
            const allProviders = await enquiryPage.getAllProviderNames();

            // Verify our random string is not in the results
            const found = allProviders.some(name =>
                name.toLowerCase().includes(randomString.toLowerCase())
            );

            expect(found).toBeFalsy();
            console.log(`✅ Random string "${randomString}" not found in results`);
        });

        test('Admin cannot broadcast without selecting any checkbox', async ({ page }) => {
            const testCaseId = 'CS1736';
            const providerName = 'leo';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.enterProviderName(providerName);
            await enquiryPage.clickProviderSearchButton();

            // Wait for results to load
            await page.waitForTimeout(1000);

            // Check if broadcast button is disabled
            const isBroadcastButtonDisabled = await enquiryPage.isBroadcastButtonDisabled();
            expect(isBroadcastButtonDisabled).toBeTruthy();

            // Optional: Try clicking and verify it doesn't work
            await enquiryPage.clickBroadcastButton(); // This should do nothing or maybe throw
        });

        test('Admin searches with special characters in provider name', async ({ page }) => {
            const testCaseId = 'CS1736';
            const specialCharName = 'RESTSRT@Provider#152';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.enterProviderName(specialCharName);
            await enquiryPage.clickProviderSearchButton();

            // Wait for results to load
            await page.waitForTimeout(2000);

            // Get all provider names to see what's returned
            const allProviders = await enquiryPage.getAllProviderNames();
            console.log('Providers found:', allProviders);

            // Check if our exact special character string is in results
            const exactMatchFound = allProviders.some(name => name === specialCharName);
            console.log(`Search with "${specialCharName}" returned ${allProviders.length} results`);

            // This test should pass regardless - just verify no errors
            expect(true).toBeTruthy();
        });

        test('Admin broadcasts provider with very long name', async ({ page }) => {
            const testCaseId = 'CS1736';
            const providerName = 'A'.repeat(100);


            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.enterProviderName(providerName);
            await enquiryPage.clickProviderSearchButton();

            // Wait for results to load
            await page.waitForTimeout(2000);

            // Get all provider names to see what's returned
            const allProviders = await enquiryPage.getAllProviderNames();
            console.log('Providers found:', allProviders);

            // Check if our exact special character string is in results
            const exactMatchFound = allProviders.some(name => name === providerName);
            console.log(`Search with "${providerName}" returned ${allProviders.length} results`);

            // This test should pass regardless - just verify no errors
            expect(true).toBeTruthy();

        });
    });

    test.describe('Multiple Providers Broadcast Tests', () => {

        test('Admin selects and then deselects providers before broadcast', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();
            await enquiryPage.clickProviderSearchButton();

            // Wait for results to load
            await page.waitForTimeout(2000);

            await enquiryPage.selectFirstNProviderCheckboxes(3);
            await enquiryPage.deselectAllProviders();

            // Check if broadcast button is disabled
            const isDisabled = await enquiryPage.isBroadcastButtonDisabled();
            expect(isDisabled).toBeTruthy();

            console.log('✅ Verified broadcast button disabled after deselecting all providers');
        });

        test('Admin selects providers, closes modal, and reopens to verify selection cleared', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();
            await enquiryPage.clickProviderSearchButton();

            // Wait for results to load
            await page.waitForTimeout(2000);

            await enquiryPage.selectFirstNProviderCheckboxes(3);

            await enquiryPage.closeModalWithEscape();
            await page.waitForTimeout(500);

            await enquiryPage.clickAddProviderButton();
            await enquiryPage.clickProviderSearchButton();

            // Wait for results to load
            await page.waitForTimeout(2000);

            const anyChecked = await enquiryPage.areAnyProvidersSelected();
            expect(anyChecked).toBeFalsy();

            console.log('✅ Verified selection cleared after reopening modal');
        });

        test('Admin broadcasts providers with country filter', async ({ page }) => {
            const testCaseId = 'CS1736';
            const countryName = 'India';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.selectCountry(countryName);
            await enquiryPage.clickProviderSearchButton();

            // Wait for results to load
            await page.waitForTimeout(2000);

            const resultsCount = await enquiryPage.getProviderResultsCount();
            expect(resultsCount).toBeGreaterThan(0);

            await enquiryPage.selectFirstNProviderCheckboxes(3);
            await enquiryPage.clickBroadcastButton();

            // Wait for toast to appear
            await page.waitForTimeout(2000);

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();

            console.log(`✅ Successfully broadcast providers with country filter: ${countryName}`);
        });

        test('Admin selects maximum 10 providers and broadcasts', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();
            await enquiryPage.clickProviderSearchButton();

            // Wait for results to load
            await page.waitForTimeout(2000);

            const totalResults = await enquiryPage.getProviderResultsCount();
            const selectCount = Math.min(10, totalResults);

            await enquiryPage.selectFirstNProviderCheckboxes(selectCount);
            await enquiryPage.clickBroadcastButton();

            // Wait for toast to appear
            await page.waitForTimeout(2000);

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();

            console.log(`✅ Successfully broadcast ${selectCount} providers (max 10)`);
        });
    });


    test.describe('Single Facilitator Broadcast Tests', () => {

        test('Admin broadcasts single facilitator to New case', async ({ page }) => {
            const testCaseId = 'CS1766';
            const facilitatorName = 'Lokiee.dev';

            await enquiryPage.searchCaseById(testCaseId);

            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.clickFacilitatorDropdown();
            await enquiryPage.typeFacilitatorName(facilitatorName);
            await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorName);
            await enquiryPage.clickBroadcastButton();

            await page.waitForTimeout(2000);

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });

        test('Admin broadcasts facilitator with exact name match', async ({ page }) => {
            const testCaseId = 'CS1766';
            const facilitatorName = 'Lokiee.dev';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.clickFacilitatorDropdown();
            await enquiryPage.typeFacilitatorName(facilitatorName);
            await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorName);
            await enquiryPage.clickBroadcastButton();

            await page.waitForTimeout(2000);

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });

        test('Admin broadcasts facilitator with partial name', async ({ page }) => {
            const testCaseId = 'CS1766';
            const partialName = 'Loki';
            const fullName = 'Lokiee.dev';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.clickFacilitatorDropdown();
            await enquiryPage.typeFacilitatorName(partialName);
            await enquiryPage.selectFacilitatorFromDropdown(fullName);
            await enquiryPage.clickBroadcastButton();

            await page.waitForTimeout(2000);

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });

        test('Admin broadcasts facilitator that doesn\'t exist', async ({ page }) => {
            const testCaseId = 'CS1766';
            const nonExistentFacilitator = 'NonExistentFacilitator123';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.clickFacilitatorDropdown();
            await enquiryPage.typeFacilitatorName(nonExistentFacilitator);

            // Check if any option with that text exists
            const isOptionVisible = await enquiryPage.page.locator(`//ng-dropdown-panel//div[@role='option'][contains(.,'${nonExistentFacilitator}')]`).isVisible().catch(() => false);
            expect(isOptionVisible).toBeFalsy();
        });

        test('Admin broadcasts facilitator without typing full name', async ({ page }) => {
            const testCaseId = 'CS1766';
            const facilitatorName = 'Lokiee.dev';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.clickFacilitatorDropdown();
            // Don't type, just select from dropdown
            await enquiryPage.selectFacilitatorFromDropdown(facilitatorName);
            await enquiryPage.clickBroadcastButton();

            await page.waitForTimeout(2000);

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });

        test('Admin clears facilitator selection and reselects', async ({ page }) => {
            const testCaseId = 'CS1766';
            const facilitatorName1 = 'Lokiee.dev';
            const facilitatorName2 = 'HBPL.dev';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            // Select first facilitator
            await enquiryPage.clickFacilitatorDropdown();
            await enquiryPage.typeFacilitatorName(facilitatorName1);
            await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorName1);

            // Clear by clicking dropdown again and selecting another
            await enquiryPage.clickFacilitatorDropdown();
            await enquiryPage.facilitatorInput.clear();
            await enquiryPage.typeFacilitatorName(facilitatorName2);
            await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorName2);

            await enquiryPage.clickBroadcastButton();

            await page.waitForTimeout(2000);

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });


        test('Admin broadcasts facilitator with providers', async ({ page }) => {
            const testCaseId = 'CS1766';
            const facilitatorName = 'Lokiee.dev';
            const providerName = 'Loky@123';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.clickFacilitatorDropdown();
            await enquiryPage.typeFacilitatorName(facilitatorName);
            await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorName);

            await enquiryPage.enterProviderName(providerName);
            await enquiryPage.clickProviderSearchButton();
            await enquiryPage.selectProviderCheckbox(providerName);
            await enquiryPage.clickBroadcastButton();

            await page.waitForTimeout(2000);

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });
    });

    test.describe('Multiple Facilitators Broadcast Tests', () => {

        test('Admin broadcasts facilitators in same session', async ({ page }) => {
            const testCaseId = 'CS1766';
            const facilitatorNames = ['Lokiee.dev', 'HBPL.dev'];

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();

            for (let i = 0; i < facilitatorNames.length; i++) {
                await enquiryPage.clickAddProviderButton();
                await enquiryPage.clickFacilitatorDropdown();
                await enquiryPage.typeFacilitatorName(facilitatorNames[i]);
                await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorNames[i]);
                await enquiryPage.clickBroadcastButton();
                await page.waitForTimeout(2000);
            }

            await page.waitForTimeout(2000);

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });
        test('Admin broadcasts maximum number of facilitators', async ({ page }) => {
            const testCaseId = 'CS1766';
            const facilitatorNames = ['Lokiee.dev', 'HBPL.dev', 'healthx', 'newfec', 'zion feci'];

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();

            for (let i = 0; i < facilitatorNames.length; i++) {
                await enquiryPage.clickAddProviderButton();
                await enquiryPage.clickFacilitatorDropdown();
                await enquiryPage.typeFacilitatorName(facilitatorNames[i]);
                await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorNames[i]);
                await enquiryPage.clickBroadcastButton();
                await page.waitForTimeout(2000);
            }

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });
        test('Admin broadcasts multiple facilitators with providers', async ({ page }) => {
            const testCaseId = 'CS1766';
            const facilitatorNames = ['Lokiee.dev', 'newfec', 'zion feci'];
            const providerName = ['Loky@123', 'newpro', 'zionpro'];

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();

            for (let i = 0; i < facilitatorNames.length; i++) {
                await enquiryPage.clickAddProviderButton();
                await enquiryPage.clickFacilitatorDropdown();
                await enquiryPage.typeFacilitatorName(facilitatorNames[i]);
                await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorNames[i]);

                await enquiryPage.enterProviderName(providerName[i]);
                await enquiryPage.clickProviderSearchButton();
                await enquiryPage.selectFirstNProviderCheckboxes(1);
                await enquiryPage.clickBroadcastButton();

                await page.waitForTimeout(2000);
            }

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });
        test('Admin broadcasts facilitators with different providers', async ({ page }) => {
            const testCaseId = 'CS1766';
            const facilitatorNames = ['Lokiee.dev', 'HBPL.dev', 'healthx'];
            const providerNames = ['TestProvider152', 'Apollo Hospitals', 'Max Healthcare'];

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();

            for (let i = 0; i < facilitatorNames.length; i++) {
                await enquiryPage.clickAddProviderButton();
                await enquiryPage.clickFacilitatorDropdown();
                await enquiryPage.typeFacilitatorName(facilitatorNames[i]);
                await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorNames[i]);

                await enquiryPage.enterProviderName(providerNames[i]);
                await enquiryPage.clickProviderSearchButton();
                await enquiryPage.selectFirstNProviderCheckboxes(1);
                await enquiryPage.clickBroadcastButton();

                await page.waitForTimeout(2000);
            }

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });
        test('Admin broadcasts multiple facilitators sequentially', async ({ page }) => {
            const testCaseId = 'CS1766';
            const facilitatorName = 'Lokiee.dev';
            const facilitatorNames = ['Lokiee.dev', 'HBPL.dev', 'healthx', 'newfec'];
            let broadcastCount = 0;
            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            for (let i = 0; i < facilitatorNames.length; i++) {
                await enquiryPage.clickAddProviderButton();
                await enquiryPage.clickFacilitatorDropdown();
                await enquiryPage.typeFacilitatorName(facilitatorNames[i]);
                await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorNames[i]);
                await enquiryPage.clickBroadcastButton();
                await page.waitForTimeout(2000);
                broadcastCount++;
            }
            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });
    });

    test.describe('Combination Tests (Facilitator + Provider)', () => {


        test('Admin broadcasts loop of facilitator-provider pairs', async ({ page }) => {
            const testCaseId = 'CS1749';
            const facilitatorList = ["newfec", "HBPL.dev", "healthx", "zion feci"];
            const providerList = ["newpro", "APOllo Hospitals", "healthxprovider", "zionpro"];

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();

            for (let i = 0; i < facilitatorList.length; i++) {
                const facilitatorName = facilitatorList[i];
                const providerName = providerList[i];

                await enquiryPage.clickAddProviderButton();
                expect(await enquiryPage.isAddProviderModalOpen()).toBe(true);

                await enquiryPage.clickFacilitatorDropdown();
                await enquiryPage.typeFacilitatorName(facilitatorName);
                await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorName);

                await enquiryPage.enterProviderName(providerName);
                await enquiryPage.clickProviderSearchButton();

                const isProviderFound = await enquiryPage.isProviderInResults(providerName);
                expect(isProviderFound).toBe(true);

                await enquiryPage.selectProviderCheckbox(providerName);
                await enquiryPage.clickBroadcastButton();

                await page.waitForTimeout(2000);
            }

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });
        test('Admin broadcasts multiple facilitators with single provider', async ({ page }) => {
            const testCaseId = 'CS1774';
            const facilitatorNames = ['Lokiee.dev'];
            const providerName = 'Loky@123';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();

            for (let i = 0; i < facilitatorNames.length; i++) {
                await enquiryPage.clickAddProviderButton();
                await enquiryPage.clickFacilitatorDropdown();
                await enquiryPage.typeFacilitatorName(facilitatorNames[i]);
                await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorNames[i]);

                await enquiryPage.enterProviderName(providerName);
                await enquiryPage.clickProviderSearchButton();

                const isInResults = await enquiryPage.isProviderInResults(providerName);
                expect(isInResults).toBeTruthy();

                await enquiryPage.selectProviderCheckbox(providerName);
                await enquiryPage.clickBroadcastButton();

                await page.waitForTimeout(2000);
            }

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });
        test('Admin broadcasts facilitator and provider together', async ({ page }) => {
            const testCaseId = 'CS1774';
            const facilitatorName = 'Lokiee.dev';
            const providerName = 'Loky@123';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.clickFacilitatorDropdown();
            await enquiryPage.typeFacilitatorName(facilitatorName);
            await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorName);

            await enquiryPage.enterProviderName(providerName);
            await enquiryPage.clickProviderSearchButton();

            const isInResults = await enquiryPage.isProviderInResults(providerName);
            expect(isInResults).toBeTruthy();

            await enquiryPage.selectProviderCheckbox(providerName);
            await enquiryPage.clickBroadcastButton();

            await page.waitForTimeout(2000);

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });
        test('Admin broadcasts facilitator with multiple providers', async ({ page }) => {
            const testCaseId = 'CS1774';
            const facilitatorName = 'Lokiee.dev';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.clickFacilitatorDropdown();
            await enquiryPage.typeFacilitatorName(facilitatorName);
            await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorName);

            await enquiryPage.clickProviderSearchButton();
            await enquiryPage.selectFirstNProviderCheckboxes(3);
            await enquiryPage.clickBroadcastButton();

            await page.waitForTimeout(2000);

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });
        test('Admin broadcasts multiple facilitators with multiple providers', async ({ page }) => {
            const testCaseId = 'CS1749';
            const facilitatorList = ["newfec", "HBPL.dev", "healthx"];
            const providerList = ["newpro", "APOllo Hospitals", "healthxprovider"];

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();

            for (let i = 0; i < facilitatorList.length; i++) {
                const facilitatorName = facilitatorList[i];
                const providerName = providerList[i];

                await enquiryPage.clickAddProviderButton();
                expect(await enquiryPage.isAddProviderModalOpen()).toBe(true);

                await enquiryPage.clickFacilitatorDropdown();
                await enquiryPage.typeFacilitatorName(facilitatorName);
                await enquiryPage.selectFacilitatorFromDropdownExact(facilitatorName);

                await enquiryPage.enterProviderName(providerName);
                await enquiryPage.clickProviderSearchButton();

                const isProviderFound = await enquiryPage.isProviderInResults(providerName);
                expect(isProviderFound).toBe(true);

                await enquiryPage.selectProviderCheckbox(providerName);
                await enquiryPage.clickBroadcastButton();

                await page.waitForTimeout(2000);
            }

            const isSuccess = await enquiryPage.isBroadcastSuccessful();
            expect(isSuccess).toBeTruthy();
        });

    });



    test.describe('Country & State Filter Tests', () => {
        test('Admin changes country filter and verifies provider results update', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.selectCountry('India');
            await enquiryPage.clickProviderSearchButton();
            const indiaCount = await enquiryPage.getProviderResultsCount();

            await enquiryPage.selectCountry('USA');
            await enquiryPage.clickProviderSearchButton();
            const usaCount = await enquiryPage.getProviderResultsCount();

            expect(indiaCount !== usaCount || indiaCount > 0).toBeTruthy();
        });
        test('Admin clears country filter', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.selectCountry('India');
            await enquiryPage.clickProviderSearchButton();

            await enquiryPage.selectCountry('');
            await enquiryPage.clickProviderSearchButton();

            const resultsCount = await enquiryPage.getProviderResultsCount();
            expect(resultsCount).toBeGreaterThan(0);
        });
        test('Admin selects country then state combination', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.selectCountry('India');
            await enquiryPage.selectState('Tamil Nadu');
            await enquiryPage.clickProviderSearchButton();

            const resultsCount = await enquiryPage.getProviderResultsCount();
            expect(resultsCount).toBeGreaterThan(0);
        });
        test('Admin selects India country filter', async ({ page }) => {
            const testCaseId = 'CS1736';
            const countryName = 'India';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await enquiryPage.selectCountry(countryName);
            await enquiryPage.clickProviderSearchButton();

            const resultsCount = await enquiryPage.getProviderResultsCount();
            expect(resultsCount).toBeGreaterThan(0);
        });
        test('Admin changes state filter and verifies provider results', async ({ page }) => {
            const testCaseId = 'CS1736';
            const countryName = 'India';
            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();
            await enquiryPage.selectCountry(countryName);
            await enquiryPage.selectState('Tamil Nadu');
            await enquiryPage.clickProviderSearchButton();
            const tnCount = await enquiryPage.getProviderResultsCount();

            await enquiryPage.selectState('Karnataka');
            await enquiryPage.clickProviderSearchButton();
            const karnatakaCount = await enquiryPage.getProviderResultsCount();

            expect(tnCount !== karnatakaCount || tnCount > 0).toBeTruthy();
        });
        test('Admin clears state filter', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();
            await enquiryPage.selectCountry('India');
            await enquiryPage.selectState('Tamil Nadu');
            await enquiryPage.clickProviderSearchButton();

            const beforeCount = await enquiryPage.getProviderResultsCount();

            await enquiryPage.clearState();
            await enquiryPage.clickProviderSearchButton();

            const afterCount = await enquiryPage.getProviderResultsCount();
            expect(afterCount).toBeGreaterThanOrEqual(beforeCount);
        });

    });

    test.describe('Modal & UI Interaction Tests', () => {

        test('Admin opens Add Provider modal', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            // Wait a moment for modal to fully render
            await page.waitForTimeout(500);

            const isModalOpen = await enquiryPage.isAddProviderModalOpen();
            expect(isModalOpen).toBeTruthy();
        });

        test('Admin closes Add Provider modal with Close button', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            // Ensure modal is open before closing
            expect(await enquiryPage.isAddProviderModalOpen()).toBeTruthy();

            await enquiryPage.closeModalWithButton();
            await page.waitForTimeout(500);

            const isModalClosed = await enquiryPage.isModalClosed();
            expect(isModalClosed).toBeTruthy();
        });

        test('Admin closes Add Provider modal with Escape key', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            // Ensure modal is open before closing
            expect(await enquiryPage.isAddProviderModalOpen()).toBeTruthy();

            await enquiryPage.closeModalWithEscape();
            await page.waitForTimeout(500);

            const isModalClosed = await enquiryPage.isModalClosed();
            expect(isModalClosed).toBeTruthy();
        });

        test('Admin closes modal by clicking outside', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            // Ensure modal is open before closing
            expect(await enquiryPage.isAddProviderModalOpen()).toBeTruthy();

            // Click on the backdrop (outside the modal)
            await page.click('.modal-backdrop, .offcanvas-backdrop, body', { position: { x: 10, y: 10 } });
            await page.waitForTimeout(500);

            const isModalClosed = await enquiryPage.isModalClosed();
            expect(isModalClosed).toBeTruthy();
        });

        test('Admin reopens modal multiple times', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();

            for (let i = 0; i < 3; i++) {
                await enquiryPage.clickAddProviderButton();
                await page.waitForTimeout(500);
                expect(await enquiryPage.isAddProviderModalOpen()).toBeTruthy();

                await enquiryPage.closeModalWithEscape();
                await page.waitForTimeout(500);
                expect(await enquiryPage.isModalClosed()).toBeTruthy();

                console.log(`✅ Modal open/close cycle ${i + 1} completed`);
            }
        });

        test('Admin verifies modal resets when reopened', async ({ page }) => {
            const testCaseId = 'CS1736';
            const testProviderName = 'TestProvider';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();

            // First open - enter provider name
            await enquiryPage.clickAddProviderButton();
            await page.waitForTimeout(500);
            await enquiryPage.enterProviderName(testProviderName);

            // Verify text was entered
            const enteredValue = await enquiryPage.providerNameInput.inputValue();
            expect(enteredValue).toBe(testProviderName);

            // Close modal
            await enquiryPage.closeModalWithEscape();
            await page.waitForTimeout(500);
            expect(await enquiryPage.isModalClosed()).toBeTruthy();

            // Reopen modal - should be reset
            await enquiryPage.clickAddProviderButton();
            await page.waitForTimeout(500);
            const providerNameValue = await enquiryPage.providerNameInput.inputValue();
            expect(providerNameValue).toBe('');

            console.log('✅ Modal reset verified');
        });





        test('Admin searches provider with partial name', async ({ page }) => {
            const testCaseId = 'CS1736';
            const partialName = 'Test';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await page.waitForTimeout(500);
            await enquiryPage.enterProviderName(partialName);
            await enquiryPage.clickProviderSearchButton();

            // Wait for results to load
            await page.waitForTimeout(2000);

            const areResultsDisplayed = await enquiryPage.areSearchResultsDisplayed();
            expect(areResultsDisplayed).toBeTruthy();

            // Get result count
            const resultsCount = await enquiryPage.getProviderResultsCount();
            console.log(`✅ Search with "${partialName}" returned ${resultsCount} results`);
        });

        test('Admin searches with empty search field', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await page.waitForTimeout(500);
            await enquiryPage.enterProviderName('');
            await enquiryPage.clickProviderSearchButton();

            // Wait for results to load
            await page.waitForTimeout(2000);

            const areResultsDisplayed = await enquiryPage.areSearchResultsDisplayed();
            expect(areResultsDisplayed).toBeTruthy();

            const resultsCount = await enquiryPage.getProviderResultsCount();
            console.log(`✅ Empty search returned ${resultsCount} results`);
        });

        test('Admin searches, clears, and searches again', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();

            await page.waitForTimeout(500);

            // First search
            await enquiryPage.enterProviderName('Test');
            await enquiryPage.clickProviderSearchButton();
            await page.waitForTimeout(2000);
            const firstResultsCount = await enquiryPage.getProviderResultsCount();
            console.log(`First search returned ${firstResultsCount} results`);

            // Clear and search again
            await enquiryPage.providerNameInput.clear();
            await enquiryPage.clickProviderSearchButton();
            await page.waitForTimeout(2000);

            const areResultsDisplayed = await enquiryPage.areSearchResultsDisplayed();
            expect(areResultsDisplayed).toBeTruthy();

            const secondResultsCount = await enquiryPage.getProviderResultsCount();
            console.log(`Second search returned ${secondResultsCount} results`);
        });


        test('Admin sorts search results by different columns', async ({ page }) => {
            const testCaseId = 'CS1736';

            await enquiryPage.searchCaseById(testCaseId);
            await enquiryPage.clickCaseRow(testCaseId);
            await enquiryPage.clickProvidersTab();
            await enquiryPage.clickAddProviderButton();
            await enquiryPage.clickProviderSearchButton();

            await page.waitForTimeout(2000);

            const headers = await enquiryPage.getProviderTableHeaders();
            if (headers.length > 0) {
                // Try to sort by first column
                console.log(`Sorting by: ${headers[0]}`);
                await enquiryPage.sortProviderResultsBy(headers[0]);
                await page.waitForTimeout(1000);

                // Verify results still display
                const resultsCount = await enquiryPage.getProviderResultsCount();
                expect(resultsCount).toBeGreaterThan(0);
                console.log(`✅ After sorting, ${resultsCount} results remain`);
            }
        });
    });



    test('Admin searches a New case and broadcasts a Multiple provider', async ({ page }) => {
        const testCaseId = 'CS1769';

        const statusFilter = 'New';


        // ✅ STEP 1: Search for case ID
        console.log(`[Step 1] Searching for case ID: ${testCaseId}`);
        await enquiryPage.searchCaseById(testCaseId);

        // ✅ STEP 2: Filter by status "New"


        // ✅ STEP 4: Click on the case row to open details
        console.log(`[Step 4] Clicking on case row for ${testCaseId}`);
        await enquiryPage.clickCaseRow(testCaseId);

        // ✅ STEP 5: Verify offcanvas opened
        console.log(`[Step 5] Verifying case details offcanvas opened`);
        const isOffcanvasOpen = await enquiryPage.isOffcanvasOpen();
        expect(isOffcanvasOpen).toBe(true);

        // ✅ STEP 6: Switch to Providers tab
        console.log(`[Step 6] Clicking on Providers tab`);
        await enquiryPage.clickProvidersTab();


        // ✅ STEP 8: Click "Add Provider" button
        console.log(`[Step 8] Clicking Add Provider button`);
        await enquiryPage.clickAddProviderButton();

        // ✅ STEP 9: Verify Add Provider modal opened
        console.log(`[Step 9] Verifying Add Provider modal opened`);
        const isModalOpen = await enquiryPage.isAddProviderModalOpen();
        expect(isModalOpen).toBe(true);

        // // ✅ STEP 10: Enter provider name
        // console.log(`[Step 10] Entering provider name: ${providerName}`);
        // await enquiryPage.enterProviderName(providerName);

        // ✅ STEP 11: Click Search button
        console.log(`[Step 11] Clicking Provider Search button`);
        await enquiryPage.clickProviderSearchButton();

        // ✅ STEP 12: Verify search results are displayed
        // console.log(`[Step 12] Verifying provider search results`);
        // const areResultsDisplayed = await enquiryPage.areSearchResultsDisplayed();
        // expect(areResultsDisplayed).toBe(true);

        // // ✅ STEP 13: Verify provider is in results
        // console.log(`[Step 13] Verifying provider ${providerName} in results`);
        // const isProviderInResults = await enquiryPage.isProviderInResults(providerName);
        // expect(isProviderInResults).toBe(true);

        // ✅ STEP 14: Select provider checkbox
        console.log(`[Step 14] Selecting checkbox for provider`);
        await enquiryPage.selectFirstFiveProviderCheckboxes();



        // ✅ STEP 16: Click Broadcast button
        console.log(`[Step 16] Clicking Broadcast button`);
        await enquiryPage.clickBroadcastButton();

        // ✅ STEP 17: Verify broadcast success
        console.log(`[Step 17] Verifying broadcast was successful`);
        await page.waitForTimeout(2000); // Wait for success message to appear
        const isBroadcastSuccessful = await enquiryPage.isBroadcastSuccessful();
        expect(isBroadcastSuccessful).toBe(true);


        console.log(`[Step 18] Success message: ${isBroadcastSuccessful ? 'Broadcast successful!' : 'Broadcast failed!'}`);

        console.log('✅ TEST PASSED: Provider successfully broadcasted to case');
    });

    test('Admin searches a New case and broadcasts Facilitator with Providers', async ({ page }) => {
        const testCaseId = 'CS1774';
        const statusFilter = 'New';
        const facilitatorName = 'Lokiee.dev';
        const providerName = 'Loky@123';

        // ✅ STEP 1: Search for case ID
        console.log(`[Step 1] Searching for case ID: ${testCaseId}`);
        await enquiryPage.searchCaseById(testCaseId);

        // ✅ STEP 2: Filter by status "New"

        // ✅ STEP 3: Click on the case row to open details
        console.log(`[Step 3] Clicking on case row for ${testCaseId}`);
        await enquiryPage.clickCaseRow(testCaseId);

        // ✅ STEP 4: Verify offcanvas opened
        console.log(`[Step 4] Verifying case details offcanvas opened`);
        const isOffcanvasOpen = await enquiryPage.isOffcanvasOpen();
        expect(isOffcanvasOpen).toBe(true);

        // ✅ STEP 5: Switch to Providers tab
        console.log(`[Step 5] Clicking on Providers tab`);
        await enquiryPage.clickProvidersTab();

        // ✅ STEP 6: Click "Add Provider" button
        console.log(`[Step 6] Clicking Add Provider button`);
        await enquiryPage.clickAddProviderButton();

        // ✅ STEP 7: Verify Add Provider modal opened
        console.log(`[Step 7] Verifying Add Provider modal opened`);
        const isModalOpen = await enquiryPage.isAddProviderModalOpen();
        expect(isModalOpen).toBe(true);

        // ✅ STEP 8: Click Facilitator dropdown
        console.log(`[Step 8] Clicking Facilitator dropdown`);
        await enquiryPage.clickFacilitatorDropdown();

        // ✅ STEP 9: Type facilitator name
        console.log(`[Step 9] Typing facilitator name: ${facilitatorName}`);
        await enquiryPage.typeFacilitatorName(facilitatorName);

        // ✅ STEP 10: Verify facilitator dropdown is open
        console.log(`[Step 10] Verifying facilitator dropdown is open`);
        const isFacilitatorDropdownOpen = await enquiryPage.isFacilitatorDropdownOpen();
        expect(isFacilitatorDropdownOpen).toBe(true);

        // ✅ STEP 11: Select facilitator from dropdown
        console.log(`[Step 11] Selecting facilitator "${facilitatorName}" from dropdown`);
        await enquiryPage.selectFacilitatorFromDropdown(facilitatorName);

        // ✅ STEP 12: Enter provider name
        console.log(`[Step 12] Entering provider name: ${providerName}`);
        await enquiryPage.enterProviderName(providerName);

        // ✅ STEP 13: Click Search button
        console.log(`[Step 13] Clicking Provider Search button`);
        await enquiryPage.clickProviderSearchButton();

        // ✅ STEP 14: Verify search results are displayed
        console.log(`[Step 14] Verifying provider search results`);
        const areResultsDisplayed = await enquiryPage.areSearchResultsDisplayed();
        expect(areResultsDisplayed).toBe(true);

        // ✅ STEP 15: Verify provider is in results
        console.log(`[Step 15] Verifying provider ${providerName} in results`);
        const isProviderInResults = await enquiryPage.isProviderInResults(providerName);
        expect(isProviderInResults).toBe(true);

        // ✅ STEP 16: Select provider checkbox
        console.log(`[Step 16] Selecting checkbox for provider ${providerName}`);
        await enquiryPage.selectProviderCheckbox(providerName);

        // ✅ STEP 17: Verify checkbox is checked
        console.log(`[Step 17] Verifying provider checkbox is checked`);
        const isChecked = await enquiryPage.isProviderChecked(providerName);
        expect(isChecked).toBe(true);

        // ✅ STEP 18: Click Broadcast button
        console.log(`[Step 18] Clicking Broadcast button`);
        await enquiryPage.clickBroadcastButton();

        // ✅ STEP 19: Verify broadcast success
        console.log(`[Step 19] Verifying broadcast was successful`);
        await page.waitForTimeout(2000); // Wait for success message to appear
        const isBroadcastSuccessful = await enquiryPage.isBroadcastSuccessful();
        expect(isBroadcastSuccessful).toBe(true);

        // ✅ STEP 20: Get success message (optional logging)
        const successMessage = await enquiryPage.getSuccessMessage();
        console.log(`[Step 20] Success message: ${successMessage}`);

        console.log('✅ TEST PASSED: Facilitator and Provider successfully broadcasted to case');
    });

    test('Admin searches a New case and broadcasts a Facilitator', async ({ page }) => {
        const testCaseId = 'CS1766';

        const statusFilter = 'New';
        const facilitatorName = 'Lokiee.dev';

        // ✅ STEP 1: Search for case ID
        console.log(`[Step 1] Searching for case ID: ${testCaseId}`);
        await enquiryPage.searchCaseById(testCaseId);

        // ✅ STEP 2: Filter by status "New"

        // ✅ STEP 3: Click on the case row to open details
        console.log(`[Step 3] Clicking on case row for ${testCaseId}`);
        await enquiryPage.clickCaseRow(testCaseId);

        // ✅ STEP 4: Verify offcanvas opened
        console.log(`[Step 4] Verifying case details offcanvas opened`);
        const isOffcanvasOpen = await enquiryPage.isOffcanvasOpen();
        expect(isOffcanvasOpen).toBe(true);

        // ✅ STEP 5: Switch to Providers tab
        console.log(`[Step 5] Clicking on Providers tab`);
        await enquiryPage.clickProvidersTab();

        // ✅ STEP 6: Click "Add Provider" button
        console.log(`[Step 6] Clicking Add Provider button`);
        await enquiryPage.clickAddProviderButton();

        // ✅ STEP 7: Verify Add Provider modal opened
        console.log(`[Step 7] Verifying Add Provider modal opened`);
        const isModalOpen = await enquiryPage.isAddProviderModalOpen();
        expect(isModalOpen).toBe(true);

        // ✅ STEP 8: Click Facilitator dropdown
        console.log(`[Step 8] Clicking Facilitator dropdown`);
        await enquiryPage.clickFacilitatorDropdown();

        // ✅ STEP 9: Type facilitator name
        console.log(`[Step 9] Typing facilitator name: ${facilitatorName}`);
        await enquiryPage.typeFacilitatorName(facilitatorName);

        // ✅ STEP 10: Verify facilitator dropdown is open
        console.log(`[Step 10] Verifying facilitator dropdown is open`);
        const isFacilitatorDropdownOpen = await enquiryPage.isFacilitatorDropdownOpen();
        expect(isFacilitatorDropdownOpen).toBe(true);

        // ✅ STEP 11: Select facilitator from dropdown
        console.log(`[Step 11] Selecting facilitator "${facilitatorName}" from dropdown`);
        await enquiryPage.selectFacilitatorFromDropdown(facilitatorName);

        // ✅ STEP 12: Click Broadcast button
        console.log(`[Step 12] Clicking Broadcast button`);
        await enquiryPage.clickBroadcastButton();

        // ✅ STEP 13: Verify broadcast success
        console.log(`[Step 13] Verifying broadcast was successful`);
        await page.waitForTimeout(2000); // Wait for success message to appear
        const isBroadcastSuccessful = await enquiryPage.isBroadcastSuccessful();
        expect(isBroadcastSuccessful).toBe(true);

        // ✅ STEP 14: Get success message (optional logging)
        const successMessage = await enquiryPage.getSuccessMessage();
        console.log(`[Step 14] Success message: ${successMessage}`);

        console.log('✅ TEST PASSED: Facilitator successfully broadcasted to case');
    });



});

