import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { PCMPage } from '../tests/pages/PCMPage';
import pcmData from '../test-data/pcmData.json';
import testData from '../test-data/test.json';

test.describe('PCM Module - New PCM Flow', () => {
    let loginPage: LoginPage;
    let pcmPage: PCMPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        pcmPage = new PCMPage(page);

        // Login as facilitator (or whichever role has access)
        const url = testData.roles.admin.url
        const username = testData.roles.admin.credentials.valid.username;
        const password = testData.roles.admin.credentials.valid.password;

        console.log('\n=== Logging in ===');
        await loginPage.navigateToLoginPage(url);
        await page.waitForLoadState('networkidle');

        await loginPage.enterEmail(username);
        await loginPage.enterPassword(password);
        await loginPage.clickGetStartedButton();

        console.log('✅ Login successful - URL:', page.url());

        console.log('📍 Navigating to PCM module');
        await pcmPage.navigateToPCM();

        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        console.log('✓ Login successful\n');
    });

    //   test('TC-PCM-001: Process New PCM and Move to OPD', async ({ page }) => {
    //     console.log('\n📋 TC-PCM-001: Process New PCM and Move to OPD');
    //     console.log('================================================');

    //     try {
    //       const success = await pcmPage.completePCMFlow(
    //         pcmData.gopId,
    //         pcmData.pcmData
    //       );

    //       expect(success).toBe(true);

    //       console.log('✅ TC-PCM-001 PASSED: PCM successfully processed and moved to OPD\n');
    //     } catch (error) {
    //       console.error('❌ TC-PCM-001 FAILED:', error);
    //       await page.screenshot({ path: 'TC-PCM-001-failure.png', fullPage: true });
    //       throw error;
    //     }
    //   });


    // test('TC-PCM-002: Process new PCM to oPD Move', async ({ page }) => {
    //     console.log('\n📋 TC-PCM-002: Process new PCM to oPD Move');
    //     console.log('========================================');

    //     try {
    //         // Use the pcmPage instance (lowercase) not the class (uppercase)
    //         await pcmPage.clickPCMTab();  // First click 
    //         await pcmPage.searchGOP(pcmData.gopId);
    //         await pcmPage.clickFirstRow();
    //         await pcmPage.waitForModal();


    //         await pcmPage.fillInstanceTab(pcmData.pcmData.instance);
    //         await pcmPage.fillTermsTab(pcmData.pcmData.terms);
    //         await pcmPage.fillRevisedGOPTab(pcmData.pcmData.revisedGOP);
    //         await pcmPage.postComment(pcmData.pcmData.comment);

    //         await pcmPage.clickMoveToOPD();

    //         const success = await pcmPage.isSuccessMessageVisible();
    //         expect(success).toBe(true);

    //         // Verify case moved from OPD tab
    //         await pcmPage.clickOPDTab();
    //         const removed = await pcmPage.verifyCaseNotInTable(pcmData.gopId);
    //         expect(removed).toBe(true);

    //         console.log('✅ TC-PCM-002 PASSED: new PCM to oPD Movecompleted successfully\n');
    //     } catch (error) {
    //         console.error('❌ TC-PCM-002 FAILED:', error);
    //         await page.screenshot({ path: 'TC-PCM-002-failure.png', fullPage: true });
    //         throw error;
    //     }
    // });

    // test('TC-PCM-003: Process OPD to IPD Move', async ({ page }) => {
    //     console.log('\n📋 TC-PCM-002: Process OPD to IPD Move');
    //     console.log('========================================');

    //     try {
     
    //         await pcmPage.clickOPDTab(); 
    //         await pcmPage.searchGOP(pcmData.gopId);
    //         await pcmPage.clickFirstRow();
    //         await pcmPage.waitForModal();


    //         //await pcmPage.fillInstanceTab(pcmData.pcmData.instance);


    //         await pcmPage.clickMoveToIPD();

    //         const success = await pcmPage.isSuccessMessageVisible();
    //         expect(success).toBe(true);

          

    //         console.log('✅ TC-PCM-002 PASSED: OPD to IPD move completed successfully\n');
    //     } catch (error) {
    //         console.error('❌ TC-PCM-002 FAILED:', error);
    //         await page.screenshot({ path: 'TC-PCM-002-failure.png', fullPage: true });
    //         throw error;
    //     }
    // });


        test('TC-PCM-004: Process IPD to Discharge Initaited Move', async ({ page }) => {
        console.log('\n📋 TC-PCM-004: Process IPD to Discharge Initaited Move');
        console.log('========================================');

        try {
     
            await pcmPage.clickInitiateDischargeTab(); 
            await pcmPage.searchGOP(pcmData.gopId);
            await pcmPage.clickFirstRow();
            await pcmPage.waitForModal();


            //await pcmPage.fillInstanceTab(pcmData.pcmData.instance);


            await pcmPage.clickMoveToDischarge();

            const success = await pcmPage.isSuccessMessageVisible();
            expect(success).toBe(true);

          

            console.log('✅ TC-PCM-004 PASSED: IPD to Discharge Initiated move completed successfully\n');
        } catch (error) {
            console.error('❌ TC-PCM-004 FAILED:', error);
            await page.screenshot({ path: 'TC-PCM-004-failure.png', fullPage: true });
            throw error;
        }
    });



});