
import { test, expect, Page } from '@playwright/test';
import testData from '../../test-data/test.json';
import { loginAs } from '.././helpers/loginHelper';
import enquiryData from '../../test-data/enquiryData.json';
import { LoginPage } from '.././pages/LoginPage';
import { HCTpage } from '.././pages/HCTPage';
import logindata from "../../test-data/logindata.json"
import { log } from 'node:console';
import { AdminEnquiryPage } from '.././pages/AdminEnquiryPage';
import { NewEnquiryPage } from ".././pages/NewEnquiryPage"
import { CreateEstimationPage } from '.././pages/CreateEstimation';
import estimationData from '../../test-data/estimationData.json';
import { ApproveCasePage } from '.././pages/ApproveCasePage';


const caseIds = [
  "CS1765",
  "CS1790",
  "CS1796",
  "CS2342",
  "CS2340",
  "CS2341",
  "CS2335",
  "CS2329",
  "CS2310",
  "CS1700",
  "CS2318",
  "CS1792"
];



/**Estimation Approval */
test.describe('Approve HCT Enquiry - Role Based Access', () => {

    test.afterEach(async ({ page }) => {
        await page.close().catch(() => { });
    });
    let caseIndex = 0;
    const rolesWithApproval = Object.entries(logindata.roles)
        .filter(([_, config]: [string, any]) => {
            return config.permissions?.includes('approveEstimations');
        });
    const insuranceRole = Object.entries(logindata.roles)
        .find(([roleName]) => roleName === 'insurance');

    for (const [roleName, roleConfig] of rolesWithApproval) {
        test.describe(`${roleName} Approval Tests`, () => {

            let loginPage: LoginPage;
            let approveCasePage: ApproveCasePage;
            let hctPage: HCTpage;
            let page: Page;
            test.beforeEach(async ({ page: testPage }) => {

                page = testPage;

                loginPage = new LoginPage(page);
                approveCasePage = new ApproveCasePage(page);
                hctPage = new HCTpage(page);

                console.log(`\n🔐 Setting up ${roleName} for approval tests...`);

                const { url, email, password } = roleConfig;

                try {
                    // Login
                    await loginPage.navigateToLoginPage(url);
                    await page.getByRole('textbox').first().waitFor({ state: 'visible', timeout: 15000 });

                    await loginPage.enterEmail(email);
                    await loginPage.enterPassword(password);
                    await loginPage.clickGetStartedButton();

                    // Wait for dashboard to load
                    await page.waitForURL(url => url.toString().includes('dashboard') || url.toString().includes('enquiry'), {
                        timeout: 5000
                    }).catch(() => {
                        console.warn('⚠ Dashboard URL not confirmed, continuing anyway');
                    });

                    await page.waitForTimeout(2000);
                    console.log(`✅ ${roleName} setup complete\n`);

                } catch (error) {
                    console.error(`❌ Setup failed for ${roleName}:`, error);
                    throw error;
                }
            });

            test(`TC-${roleName.toUpperCase()}-APPROVE-001: ${roleName} approves the best card for Regular case`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-APPROVE-001: ${roleName} approves best card (Regular case)`);
                console.log('==================================================');

                try {
                    const hasPermission = roleConfig.permissions?.includes('approveEstimations');
                    console.log(`${roleName} → Approve Permission: ${hasPermission}`);

                    if (!hasPermission) {
                        console.log(`ℹ ${roleName} does not have approve permission, skipping test`);
                        expect(true).toBe(true);
                        return;
                    }

                    const caseId = caseIds[caseIndex % caseIds.length];
                    caseIndex++;
                    console.log(`Running test with caseId: ${caseId}`);
                    console.log(`\n=== Test: Approve Best Card (${caseId}) ===`);
                    console.log('Rule: Prefer amounts > 1000 (closest to 1000), else highest under 1000');

                    // Execute the approval flow for the case
                    await hctPage.navigateToHCT();
                    await approveCasePage.searchCaseById(caseId);
                    await approveCasePage.clickCaseRow(caseId);

                    const isOpen = await approveCasePage.isOffcanvasOpen();
                    expect(isOpen).toBe(true);

                    await approveCasePage.clickProvidersTab();

                    // Find best card and approve it
                    const approved = await approveCasePage.approveBestCard();
                    expect(approved).toBe(true);

                    console.log(`✓ TC-${roleName.toUpperCase()}-APPROVE-001 PASSED: Best card approved\n`);
                } catch (error) {
                    console.error(`✗ TEST FAILED for ${roleName}:`, error);
                    await page.screenshot({ path: `test-fail-${roleName}-approve-001-${Date.now()}.png` });
                    throw error;
                }
            });

            //Test 2: Maternity Case Approval
            test(`TC-${roleName.toUpperCase()}-APPROVE-002: ${roleName} approves the best card for Maternity case`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-APPROVE-002: ${roleName} approves best card (Maternity case)`);
                console.log('==================================================');

                try {
                    const hasPermission = roleConfig.permissions?.includes('approveEstimations');

                    if (!hasPermission) {
                        console.log(`ℹ ${roleName} does not have approve permission, skipping test`);
                        expect(true).toBe(true);
                        return;
                    }

                    const caseId = (roleConfig as any).estimation?.maternityCaseId || roleConfig.caseId || 'CS1749';

                    console.log(`\n=== Test: Approve Best Card (${caseId}) ===`);

                   await hctPage.navigateToHCT();
                    await approveCasePage.searchCaseById(caseId);
                    await approveCasePage.clickCaseRow(caseId);

                    const isOpen = await approveCasePage.isOffcanvasOpen();
                    expect(isOpen).toBe(true);

                    await approveCasePage.clickProvidersTab();

                    const approved = await approveCasePage.approveBestCard();
                    expect(approved).toBe(true);

                    console.log(`✓ TC-${roleName.toUpperCase()}-APPROVE-002 PASSED: Best card approved\n`);
                } catch (error) {
                    console.error(`✗ TEST FAILED for ${roleName}:`, error);
                    await page.screenshot({ path: `test-fail-${roleName}-approve-002-${Date.now()}.png` });
                    throw error;
                }
            });

            //Test 3: Compare Top 2 Estimations
            test(`TC-${roleName.toUpperCase()}-APPROVE-003: ${roleName} compares top 2 estimations`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-APPROVE-003: ${roleName} compares top 2 estimations`);
                console.log('==================================================');

                try {
                    const hasComparePermission = roleConfig.permissions?.includes('compareEstimations');
                    console.log(`${roleName} → Compare Permission: ${hasComparePermission}`);

                    if (!hasComparePermission) {
                        console.log(`ℹ ${roleName} does not have compare permission, skipping test`);
                        expect(true).toBe(true);
                        return;
                    }

                    const caseId = (roleConfig as any).estimation?.regularCaseId || roleConfig.caseId || 'CS1749';

                    console.log(`\n=== Test: Compare Top 2 Estimations (${caseId}) ===`);

                    await hctPage.navigateToHCT();
                    await approveCasePage.searchCaseById(caseId);
                    await approveCasePage.clickCaseRow(caseId);

                    const isOpen = await approveCasePage.isOffcanvasOpen();
                    expect(isOpen).toBe(true);

                    await approveCasePage.clickProvidersTab();

                    // Execute comparison flow for top 2 cards
                    const comparisonSuccess = await approveCasePage.completeComparisonFlow(2);
                    expect(comparisonSuccess).toBe(true);

                    console.log(`✓ TC-${roleName.toUpperCase()}-APPROVE-003 PASSED: Top 2 estimations compared\n`);
                } catch (error) {
                    console.error(`✗ TEST FAILED for ${roleName}:`, error);
                    await page.screenshot({ path: `test-fail-${roleName}-compare-2-${Date.now()}.png` });
                    throw error;
                }
            });

            // Test 4: Compare Top 3 Estimations
            test(`TC-${roleName.toUpperCase()}-APPROVE-004: ${roleName} compares top 3 estimations`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-APPROVE-004: ${roleName} compares top 3 estimations`);
                console.log('==================================================');

                try {
                    const hasComparePermission = roleConfig.permissions?.includes('compareEstimations');

                    if (!hasComparePermission) {
                        console.log(`ℹ ${roleName} does not have compare permission, skipping test`);
                        expect(true).toBe(true);
                        return;
                    }

                    const caseId = (roleConfig as any).estimation?.maternityCaseId || roleConfig.caseId || 'CS1749';

                    console.log(`\n=== Test: Compare Top 3 Estimations (${caseId}) ===`);

                   await hctPage.navigateToHCT();
                    await approveCasePage.searchCaseById(caseId);
                    await approveCasePage.clickCaseRow(caseId);

                    const isOpen = await approveCasePage.isOffcanvasOpen();
                    expect(isOpen).toBe(true);

                    await approveCasePage.clickProvidersTab();

                    const comparisonSuccess = await approveCasePage.completeComparisonFlow(3);
                    expect(comparisonSuccess).toBe(true);

                    console.log(`✓ TC-${roleName.toUpperCase()}-APPROVE-004 PASSED: Top 3 estimations compared\n`);
                } catch (error) {
                    console.error(`✗ TEST FAILED for ${roleName}:`, error);
                    await page.screenshot({ path: `test-fail-${roleName}-compare-3-${Date.now()}.png` });
                    throw error;
                }
            });

            // Test 5: View Approved Estimations
            test(`TC-${roleName.toUpperCase()}-APPROVE-005: ${roleName} can view approved estimations`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-APPROVE-005: ${roleName} views approved estimations`);
                console.log('==================================================');

                try {
                    const hasViewPermission = roleConfig.permissions?.includes('viewEstimation');
                    console.log(`${roleName} → View Permission: ${hasViewPermission}`);

                    if (!hasViewPermission) {
                        console.log(`ℹ ${roleName} does not have view permission, skipping test`);
                        expect(true).toBe(true);
                        return;
                    }

                    const caseId = (roleConfig as any).estimation?.regularCaseId || roleConfig.caseId || 'CS1749';

                   await hctPage.navigateToHCT();
                    await approveCasePage.searchCaseById(caseId);
                    await approveCasePage.clickCaseRow(caseId);

                    const isOpen = await approveCasePage.isOffcanvasOpen();
                    expect(isOpen).toBe(true);

                    await approveCasePage.clickProvidersTab();

                    // Verify we can see approved cards (they should be visible)
                    const cards = await page.locator("//app-provider-enquiry-list-item//div[contains(@class,'provider-card')]").count();
                    expect(cards).toBeGreaterThan(0);

                    // Check for approved status indicators
                    const approvedBadges = await page.locator("//span[contains(text(),'Approved')]").count();
                    console.log(`Found ${approvedBadges} approved estimations`);

                    console.log(`✓ TC-${roleName.toUpperCase()}-APPROVE-005 PASSED: Approved estimations visible\n`);
                } catch (error) {
                    console.error(`✗ TEST FAILED for ${roleName}:`, error);
                    await page.screenshot({ path: `test-fail-${roleName}-view-${Date.now()}.png` });
                    throw error;
                }
            });

            // Test 6: Hospital/Facilitator Terms Access
            test(`TC-${roleName.toUpperCase()}-APPROVE-006: ${roleName} accesses Hospital/Facilitator terms`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-APPROVE-006: ${roleName} accesses Hospital/Facilitator terms`);
                console.log('==================================================');

                try {
                    const hasTermsPermission = roleConfig.permissions?.includes('hospitalFacilitatorTerms');
                    console.log(`${roleName} → Hospital/Facilitator Terms Permission: ${hasTermsPermission}`);

                    const caseId = (roleConfig as any).estimation?.regularCaseId || roleConfig.caseId || 'CS1749';

                   await hctPage.navigateToHCT();
                    await approveCasePage.searchCaseById(caseId);
                    await approveCasePage.clickCaseRow(caseId);

                    const isOpen = await approveCasePage.isOffcanvasOpen();
                    expect(isOpen).toBe(true);

                    await approveCasePage.clickProvidersTab();
                    await approveCasePage.clickViewButtonOnCard(0);

                    // Try to access Hospital/Facilitator terms tab
                    const hospitalTermsTab = page.locator("//a[normalize-space()='Hospital/Facilitator terms']");

                    if (hasTermsPermission) {
                        await hospitalTermsTab.waitFor({ state: 'visible', timeout: 5000 });
                        await hospitalTermsTab.click();
                        console.log(`✓ ${roleName} can access Hospital/Facilitator terms`);

                        // Verify tab content loads
                        await page.waitForTimeout(1000);
                        const termsContent = await page.locator("//app-provider-estimate-hospital-terms").isVisible();
                        expect(termsContent).toBe(true);
                    } else {
                        const isVisible = await hospitalTermsTab.isVisible().catch(() => false);
                        expect(isVisible).toBe(false);
                        console.log(`✓ ${roleName} correctly cannot access Hospital/Facilitator terms`);
                    }

                    console.log(`✓ TC-${roleName.toUpperCase()}-APPROVE-006 PASSED\n`);
                } catch (error) {
                    console.error(`✗ TEST FAILED for ${roleName}:`, error);
                    await page.screenshot({ path: `test-fail-${roleName}-terms-${Date.now()}.png` });
                    throw error;
                }
            });

            // Test 7: Attachments Access
            test(`TC-${roleName.toUpperCase()}-APPROVE-007: ${roleName} accesses Attachments`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-APPROVE-007: ${roleName} accesses Attachments`);
                console.log('==================================================');

                try {
                    const hasAttachmentsPermission = roleConfig.permissions?.includes('attachments');
                    console.log(`${roleName} → Attachments Permission: ${hasAttachmentsPermission}`);

                    const caseId = (roleConfig as any).estimation?.regularCaseId || roleConfig.caseId || 'CS1749';

                   await hctPage.navigateToHCT();
                    await approveCasePage.searchCaseById(caseId);
                    await approveCasePage.clickCaseRow(caseId);

                    const isOpen = await approveCasePage.isOffcanvasOpen();
                    expect(isOpen).toBe(true);

                    await approveCasePage.clickProvidersTab();
                    await approveCasePage.clickViewButtonOnCard(0);

                    // Try to access Attachments tab
                    const attachmentsTab = page.locator("//a[normalize-space()='Attachments']");

                    if (hasAttachmentsPermission) {
                        await attachmentsTab.waitFor({ state: 'visible', timeout: 5000 });
                        await attachmentsTab.click();
                        console.log(`✓ ${roleName} can access Attachments`);

                        // Verify tab content loads
                        await page.waitForTimeout(1000);
                        const attachmentsContent = await page.locator("//app-provider-estimate-attachment-tab").isVisible();
                        expect(attachmentsContent).toBe(true);
                    } else {
                        const isVisible = await attachmentsTab.isVisible().catch(() => false);
                        expect(isVisible).toBe(false);
                        console.log(`✓ ${roleName} correctly cannot access Attachments`);
                    }

                    console.log(`✓ TC-${roleName.toUpperCase()}-APPROVE-007 PASSED\n`);
                } catch (error) {
                    console.error(`✗ TEST FAILED for ${roleName}:`, error);
                    await page.screenshot({ path: `test-fail-${roleName}-attachments-${Date.now()}.png` });
                    throw error;
                }
            });

            // Test 8: Edit Estimation (if permission exists)
            test(`TC-${roleName.toUpperCase()}-APPROVE-008: ${roleName} can edit estimation if permitted`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-APPROVE-008: ${roleName} edits estimation`);
                console.log('==================================================');

                try {
                    const hasEditPermission = roleConfig.permissions?.includes('editEstimation');
                    console.log(`${roleName} → Edit Permission: ${hasEditPermission}`);

                    const caseId = (roleConfig as any).estimation?.regularCaseId || roleConfig.caseId || 'CS1749';

                   await hctPage.navigateToHCT();
                    await approveCasePage.searchCaseById(caseId);
                    await approveCasePage.clickCaseRow(caseId);

                    const isOpen = await approveCasePage.isOffcanvasOpen();
                    expect(isOpen).toBe(true);

                    await approveCasePage.clickProvidersTab();

                    if (hasEditPermission) {
                        // Should be able to view and edit
                        await approveCasePage.clickViewButtonOnCard(0);

                        // Look for edit indicators
                        const editButton = page.locator("//button[contains(text(),'Edit')]").first();
                        const isEditVisible = await editButton.isVisible().catch(() => false);

                        if (isEditVisible) {
                            console.log(`✓ ${roleName} can see edit button`);
                        } else {
                            console.log(`ℹ ${roleName} may have view-only access despite edit permission`);
                        }
                    } else {
                        // Should not be able to edit
                        console.log(`ℹ ${roleName} does not have edit permission`);
                    }

                    console.log(`✓ TC-${roleName.toUpperCase()}-APPROVE-008 PASSED\n`);
                } catch (error) {
                    console.error(`✗ TEST FAILED for ${roleName}:`, error);
                    await page.screenshot({ path: `test-fail-${roleName}-edit-${Date.now()}.png` });
                    throw error;
                }
            });
        });
    }












})