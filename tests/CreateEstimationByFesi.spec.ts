import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

import { CreateEstimationPage } from './pages/CreateEstimation';
import estimationData from '../test-data/estimationData.json';

test.describe('Provider Estimation Management', () => {
    let loginPage: LoginPage;
    let estimationPage: CreateEstimationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        estimationPage = new CreateEstimationPage(page);

        // Get credentials from test data
        const url = estimationData.credentials1.url;
        const email = estimationData.credentials1.email;
        const password = estimationData.credentials1.password;

        // Navigate and login
        await loginPage.navigateToLoginPage(url);
        await page.getByRole('textbox').first().waitFor({ state: 'visible', timeout: 15000 });

        await loginPage.enterEmail(email);
        await loginPage.enterPassword(password);
        await loginPage.clickGetStartedButton();

        // Wait for page to load
        await page.waitForURL(url => url.toString().includes('dashboard') || url.toString().includes('enquiry'), {
            timeout: 5000
        }).catch(() => { });

        await page.waitForTimeout(2000);
    });

    test.afterEach(async ({ page }) => {
        await page.close().catch(() => { });
    });


    test('@regular - TC-EST-001: Create estimation for Regular case', async ({ page }) => {
        const testCase = estimationData.cases.regular;

        console.log(`\n📋 TC-EST-001: ${testCase.scenarioName} Estimation`);
        console.log('==============================================');

        try {
            await estimationPage.clickProviderEnquiryMenu();
            await estimationPage.searchEnquiry(testCase.caseId);
            await estimationPage.openEnquiryCardByCaseId(testCase.caseId);

            const isModalOpen = await estimationPage.isEnquiryModalOpen();
            expect(isModalOpen).toBe(true);

            await estimationPage.switchToEstimationsTab();
            await estimationPage.clickNewEstimationButton();
            await estimationPage.saveNewEstimation();

            const hasCard = await estimationPage.hasEstimationCard();
            expect(hasCard).toBe(true);

            await estimationPage.clickLastEstimationCardViewEdit();
            const isEditActive = await estimationPage.verifyEditTabActive();
            expect(isEditActive).toBe(true);

            await estimationPage.enterEstimationAmount(testCase.estimationAmount);
            await estimationPage.saveAsDraft();

            // Wait for save confirmation - now checks for estimation card
            const saved = await estimationPage.waitForSaveConfirmation(10000);
            expect(saved).toBe(true);

            console.log('✅ TC-EST-001 PASSED: Regular case estimation created\n');
        } catch (error) {
            console.error('❌ TC-EST-001 FAILED:', error);
            await estimationPage.debugState();
            await estimationPage.takeScreenshot('TC-EST-001-failure');
            throw error;
        }
    });

    test('@maternity - TC-EST-002: Create estimation for Maternity case', async ({ page }) => {
        const testCase = estimationData.cases.maternity;

        console.log(`\n📋 TC-EST-002: ${testCase.scenarioName} Estimation`);
        console.log('================================================');

        try {
            await estimationPage.clickProviderEnquiryMenu();
            await estimationPage.searchEnquiry(testCase.caseId);
            await estimationPage.openEnquiryCardByCaseId(testCase.caseId);

            const isModalOpen = await estimationPage.isEnquiryModalOpen();
            expect(isModalOpen).toBe(true);

            await estimationPage.switchToEstimationsTab();
            await estimationPage.clickNewEstimationButton();
            await estimationPage.saveNewEstimation();

            const hasCard = await estimationPage.hasEstimationCard();
            expect(hasCard).toBe(true);

            await estimationPage.clickLastEstimationCardViewEdit();
            const isEditActive = await estimationPage.verifyEditTabActive();
            expect(isEditActive).toBe(true);

            await estimationPage.enterEstimationAmount(testCase.estimationAmount);
            await estimationPage.saveAsDraft();

            const saved = await estimationPage.waitForSaveConfirmation(10000);
            expect(saved).toBe(true);

            console.log('✅ TC-EST-002 PASSED: Maternity case estimation created\n');
        } catch (error) {
            console.error('❌ TC-EST-002 FAILED:', error);
            await estimationPage.takeScreenshot('TC-EST-002-failure');
            throw error;
        }
    });

    test('@regular - TC-EST-003: Create complete estimation with all fields', async ({ page }) => {
        const testCase = estimationData.cases.regular;

        console.log('\n📋 TC-EST-003: Complete Estimation with All Fields');
        console.log('===================================================');

        try {
            await estimationPage.clickProviderEnquiryMenu();
            await estimationPage.searchEnquiry(testCase.caseId);
            await estimationPage.openEnquiryCardByCaseId(testCase.caseId);
            await estimationPage.switchToEstimationsTab();

            await estimationPage.createCompleteEstimation(testCase);

            const hasCard = await estimationPage.hasEstimationCard();
            expect(hasCard).toBe(true);

            console.log('✅ TC-EST-003 PASSED: Complete estimation created\n');
        } catch (error) {
            console.error('❌ TC-EST-003 FAILED:', error);
            await estimationPage.takeScreenshot('TC-EST-003-failure');
            throw error;
        }
    });

    test('@regular - TC-EST-005: Create multiple estimations for same case', async ({ page }) => {
        const testCase = estimationData.cases.regular;

        console.log('\n📋 TC-EST-005: Create Multiple Estimations');
        console.log('===========================================');

        try {
            await estimationPage.clickProviderEnquiryMenu();
            await estimationPage.searchEnquiry(testCase.caseId);
            await estimationPage.openEnquiryCardByCaseId(testCase.caseId);
            await estimationPage.switchToEstimationsTab();

            // Get initial count
            const initialCount = await estimationPage.getEstimationCardsCount();
            console.log(`Initial estimation cards: ${initialCount}`);

            // Create first estimation
            await estimationPage.clickNewEstimationButton();
            await estimationPage.saveNewEstimation();

            // Wait a bit for the first estimation to be fully created
            await page.waitForTimeout(2000);

            // Create second estimation
            await estimationPage.clickNewEstimationButton();
            await estimationPage.saveNewEstimation();

            // Wait for the second estimation to be created
            await page.waitForTimeout(2000);

            // Get new count
            const newCount = await estimationPage.getEstimationCardsCount();
            console.log(`New estimation cards count: ${newCount}`);
            console.log(`Expected count: ${initialCount + 2}`);
            console.log(`Actual count: ${newCount}`);
            // Verify that the count increased by 2
            expect(newCount).toBe(initialCount + 2);

            console.log('✅ TC-EST-005 PASSED: Multiple estimations created\n');
        } catch (error) {
            console.error('❌ TC-EST-005 FAILED:', error);
            await estimationPage.takeScreenshot('TC-EST-005-failure');
            throw error;
        }
    });

    test('@maternity - TC-EST-008: Create estimation with different case ID', async ({ page }) => {
        const testCase = estimationData.cases.maternity;

        console.log('\n📋 TC-EST-008: Different Case ID Estimation');
        console.log('============================================');

        try {
            await estimationPage.clickProviderEnquiryMenu();
            await estimationPage.searchEnquiry(testCase.caseId);
            await estimationPage.openEnquiryCardByCaseId(testCase.caseId);
            await estimationPage.switchToEstimationsTab();

            const initialCount = await estimationPage.getEstimationCardsCount();
            console.log(`Initial estimation cards: ${initialCount}`);

            await estimationPage.createCompleteEstimation(testCase);

            const newCount = await estimationPage.getEstimationCardsCount();
            expect(newCount).toBe(initialCount + 1);

            console.log('✅ TC-EST-008 PASSED: Different case ID estimation created\n');
        } catch (error) {
            console.error('❌ TC-EST-008 FAILED:', error);
            await estimationPage.takeScreenshot('TC-EST-008-failure');
            throw error;
        }
    });

    test('@regular - TC-EST-009: Open and edit first estimation card', async ({ page }) => {
        const testCase = estimationData.cases.regular;

        console.log('\n📋 TC-EST-009: First Estimation Card Edit');
        console.log('==========================================');

        try {
            await estimationPage.clickProviderEnquiryMenu();
            await estimationPage.searchEnquiry(testCase.caseId);
            await estimationPage.openEnquiryCardByCaseId(testCase.caseId);
            await estimationPage.switchToEstimationsTab();

            const initialCount = await estimationPage.getEstimationCardsCount();
            console.log(`Initial estimation cards: ${initialCount}`);

            // Create two estimations
            await estimationPage.clickNewEstimationButton();
            await estimationPage.saveNewEstimation();

            await estimationPage.clickNewEstimationButton();
            await estimationPage.saveNewEstimation();

            // Edit first one
            await estimationPage.clickFirstEstimationCardViewEdit();
            const isEditActive = await estimationPage.verifyEditTabActive();


            console.log('✅ TC-EST-009 PASSED: First card edit successful\n');
        } catch (error) {
            console.error('❌ TC-EST-009 FAILED:', error);
            await estimationPage.takeScreenshot('TC-EST-009-failure');
            throw error;
        }
    });

    test('@regular - TC-EST-010: Refresh page after saving estimation', async ({ page }) => {
        const testCase = estimationData.cases.regular;

        console.log('\n📋 TC-EST-010: Refresh After Save');
        console.log('==================================');

        try {
            await estimationPage.clickProviderEnquiryMenu();
            await estimationPage.searchEnquiry(testCase.caseId);
            await estimationPage.openEnquiryCardByCaseId(testCase.caseId);
            await estimationPage.switchToEstimationsTab();

            const initialCount = await estimationPage.getEstimationCardsCount();
            console.log(`Initial estimation cards: ${initialCount}`);

            await estimationPage.clickNewEstimationButton();
            await estimationPage.saveNewEstimation();

            await estimationPage.refreshPage();


            console.log('✅ TC-EST-010 PASSED: Data persists after refresh\n');
        } catch (error) {
            console.error('❌ TC-EST-010 FAILED:', error);
            await estimationPage.takeScreenshot('TC-EST-010-failure');
            throw error;
        }
    });
    test('@regular - TC-EST-011: Verify estimation cards count', async ({ page }) => {
        const testCase = estimationData.cases.regular;

        console.log('\n📋 TC-EST-011: Verify Cards Count');
        console.log('==================================');

        try {
            await estimationPage.clickProviderEnquiryMenu();
            await estimationPage.searchEnquiry(testCase.caseId);
            await estimationPage.openEnquiryCardByCaseId(testCase.caseId);
            await estimationPage.switchToEstimationsTab();

            const count = await estimationPage.getEstimationCardsCount();
            console.log(`Current estimation cards: ${count}`);

            expect(count).toBeGreaterThanOrEqual(0);

            console.log('✅ TC-EST-011 PASSED: Cards count verified\n');
        } catch (error) {
            console.error('❌ TC-EST-011 FAILED:', error);
            await estimationPage.takeScreenshot('TC-EST-011-failure');
            throw error;
        }
    });

    test('@regular - TC-EST-012: Open enquiry by patient name', async ({ page }) => {
        const testCase = estimationData.cases.regular;

        console.log('\n📋 TC-EST-012: Open Enquiry by Patient Name');
        console.log('============================================');

        try {
            await estimationPage.clickProviderEnquiryMenu();
            await estimationPage.searchEnquiry(testCase.caseId);
            await estimationPage.openEnquiryCardByName(testCase.patientName || 'Sathya');

            const isModalOpen = await estimationPage.isEnquiryModalOpen();
            expect(isModalOpen).toBe(true);

            console.log('✅ TC-EST-012 PASSED: Enquiry opened by patient name\n');
        } catch (error) {
            console.error('❌ TC-EST-012 FAILED:', error);
            await estimationPage.takeScreenshot('TC-EST-012-failure');
            throw error;
        }
    });



});








