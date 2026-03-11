
import { CreateEstimationPage } from './pages/CoreEstimation.Page';
import estimationData from '../test-data/estimationData.json';
import { test, expect, Page } from '@playwright/test';
import { ApproveCasePage } from "./../tests/pages/ApproveCasePage"
import testData from '../test-data/test.json';
import { loginAs } from './helpers/loginHelper';
import enquiryData from '../test-data/enquiryData.json';
import { LoginPage } from './pages/LoginPage';
import { HCTpage } from './pages/HCTPage';
import logindata from "../test-data/logindata.json"
import { log } from 'node:console';
import { AdminEnquiryPage } from './pages/AdminEnquiryPage';
import { NewEnquiryPage } from "./pages/NewEnquiryPage"

export const caseIds = [
  "CS1780", "CS1774", "CS2324", "CS1499", "CS1373", "CS1761", "CS1762", "CS1764",
  "CS2328", "CS2321", "CS2319", "CS1719", "CS1711", "CS1693", "CS1707", "CS1631",
  "CS1612", "CS1614", "CS1597", "CS1570", "CS1520", "CS1547", "CS1507", "CS1545",
  "CS1351", "CS1483", "CS1517", "CS1203", "CS1200", "CS1452", "CS1224", "CS1219",
  "CS1352", "CS1375", "CS1299", "CS1353", "CS1346", "CS1344", "CS1330", "CS1176",
  "CS1327", "CS1324", "CS1316", "CS1313", "CS1229", "CS1191", "CS1174", "CS1152",
  "CS1158", "CS1177"

];
// Helper to check if role has estimation permissions
const getEstimationPermissions = (roleConfig: any) => {
  const defaultPermissions = {
    canCreate: false,
    canEdit: false,
    canView: false,
    canCompare: false,
    canApprove: false,
    regularCaseId: 'CS1766',
    maternityCaseId: 'CS1499',
    estimationAmount: '50000',
    treatmentPlan: 'Standard treatment protocol',
    lengthOfStay: '5',
    inclusions: 'All medical expenses included',
    exclusions: 'Personal expenses excluded'
  };

  if (roleConfig.estimation) {
    return {
      canCreate: roleConfig.estimation.canCreate || false,
      canEdit: roleConfig.estimation.canEdit || false,
      canView: roleConfig.estimation.canView || false,
      canCompare: roleConfig.estimation.canCompare || false,
      canApprove: roleConfig.estimation.canApprove || false,
      regularCaseId: roleConfig.estimation.regularCaseId || roleConfig.caseId || 'CS1489',
      maternityCaseId: roleConfig.estimation.maternityCaseId || 'CS1499',
      estimationAmount: roleConfig.estimation.estimationAmount || '50000',
      treatmentPlan: roleConfig.estimation.treatmentPlan || 'Standard treatment',
      lengthOfStay: roleConfig.estimation.lengthOfStay || '5',
      inclusions: roleConfig.estimation.inclusions || 'Standard inclusions',
      exclusions: roleConfig.estimation.exclusions || 'Standard exclusions'
    };
  }

  return defaultPermissions;
};

// Helper to check if user has any estimation access
const hasEstimationAccess = (roleConfig: any): boolean => {
  const perms = getEstimationPermissions(roleConfig);
  return perms.canCreate || perms.canEdit || perms.canView || perms.canCompare || perms.canApprove;
};

test.describe('Estimation Management - All Roles', () => {

  let itrate: number = 0;
  // Include all roles that have estimation access
  const rolesWithAccess = Object.entries(logindata.roles)
    .filter(([_, config]) => hasEstimationAccess(config));

  for (const [roleName, roleConfig] of rolesWithAccess) {

    test.describe(`${roleName} Estimation Tests`, () => {

      let estimationPage: CreateEstimationPage;
      let hctPage: HCTpage;
      let page: Page;
      let perms: ReturnType<typeof getEstimationPermissions>;
      let approveCasePage: ApproveCasePage;
      test.beforeEach(async ({ page: testPage }) => {
        page = testPage;
        console.log(`\n🔐 Setting up estimation test for ${roleName}...`);

        const loginPage = new LoginPage(page);
        approveCasePage = new ApproveCasePage(page);
        estimationPage = new CreateEstimationPage(page);
        hctPage = new HCTpage(page);
        const { email, password, url } = roleConfig;
        perms = getEstimationPermissions(roleConfig);

        try {
          // Login with increased timeout
          await loginPage.navigateToLoginPage(url);
          await page.waitForSelector('input[type="text"]', {
            timeout: 30000,
            state: 'visible'
          });

          await loginPage.enterUsername(email);
          await loginPage.enterPassword(password);
          await loginPage.clickGetStartedButton();



          console.log(`✅ Setup complete for ${roleName}`);
          console.log(`📋 Estimation Permissions:`, {
            canCreate: perms.canCreate,
            canEdit: perms.canEdit,
            canView: perms.canView,
            canCompare: perms.canCompare,
            canApprove: perms.canApprove
          });
          console.log('');

        } catch (error) {
          console.error(`❌ Setup failed for ${roleName}:`);

        }
      });




      test(`TC-${roleName.toUpperCase()}-EST-002: Verify Provider Enquiry access & estimation creation`, async () => {

        console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-002`);
        console.log('==================================================');

        if (roleName === "provider") {

          await hctPage.navigateToHCT1();
          await page.waitForTimeout(3000);

          await estimationPage.searchEnquiry("CS1774");
          await estimationPage.openEnquiryCardByCaseId1("CS1774");

          const isModalOpen = await estimationPage.isEnquiryModalOpen();
          expect(isModalOpen).toBe(true);

          await estimationPage.switchToEstimationsTab();
          if (!perms.canCreate) {

            console.log(`⚠ ${roleName} has menu but cannot create estimation`);

            const hasButton = await page
              .locator(estimationData.xpaths.newEstimation.newEstimationButton)
              .isVisible()
              .catch(() => false);

            expect(hasButton).toBe(false);

            return;
          }

          const hasCard = await estimationPage.hasEstimationCard();
          expect(hasCard).toBe(true);

        } else {

          const hasMenu = await estimationPage.hasProviderEnquiryMenu();

          console.log(`${roleName} → Provider Enquiry Access: ${hasMenu}`);
          console.log(`${roleName} → Can Create Estimation: ${perms.canCreate}`);

          if (!hasMenu) {
            console.log(`ℹ ${roleName} does not have Provider Enquiry menu`);
            console.log(`Skipping Provider Enquiry flow for ${roleName}`);
            return;
          }

          await estimationPage.openProviderEnquiryIfAvailable();

          await estimationPage.searchEnquiry(roleConfig.caseId);
          await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

          const isModalOpen = await estimationPage.isEnquiryModalOpen();
          expect(isModalOpen).toBe(true);

          await estimationPage.switchToEstimationsTab();

          if (!perms.canCreate) {

            console.log(`⚠ ${roleName} has menu but cannot create estimation`);

            const hasButton = await page
              .locator(estimationData.xpaths.newEstimation.newEstimationButton)
              .isVisible()
              .catch(() => false);

            expect(hasButton).toBe(false);

            return;
          }

        }

      });
































      // test(`TC-${roleName.toUpperCase()}-EST-rrr001: Create basic estimation for Regular case`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-001: Create basic estimation`);
      //   console.log('==================================================');

      //   try {
      //     if (!perms.canCreate) {
      //       console.log(`ℹ ${roleName} does not have create permission, skipping test`);

      //       return;
      //     }

      //     if (roleName == "provider") {
      //       // Navigate to HCT using the HCTpage method

      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);



      //       await estimationPage.searchEnquiry("CS1774");
      //       await estimationPage.openEnquiryCardByCaseId1("CS1774");

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();
      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       const hasCard = await estimationPage.hasEstimationCard();
      //       expect(hasCard).toBe(true);

      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry("CS1736");
      //       await estimationPage.openEnquiryCardByCaseId1("CS1736");
      //       itrate = itrate + 1
      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();
      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       const hasCard = await estimationPage.hasEstimationCard();
      //       expect(hasCard).toBe(true);

      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-001 PASSED: Basic estimation created\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);

      //   }
      // });









      // //  ==================== TEST CASE 001: Basic Estimation Creation ====================

      // test(`TC-${roleName.toUpperCase()}-EST-001: Create basic estimation for Regular case`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-001: Create basic estimation`);
      //   console.log('==================================================');

      //   try {
      //     if (!perms.canCreate) {
      //       console.log(`ℹ ${roleName} does not have create permission, skipping test`);

      //       return;
      //     }

      //     if (roleName == "provider") {
      //       // Navigate to HCT using the HCTpage method

      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);



      //       await estimationPage.searchEnquiry("CS1774");
      //       await estimationPage.openEnquiryCardByCaseId1("CS1774");

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();
      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       const hasCard = await estimationPage.hasEstimationCard();
      //       expect(hasCard).toBe(true);

      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry("CS1736");
      //       await estimationPage.openEnquiryCardByCaseId1("CS1736");
      //       itrate = itrate + 1
      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();
      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       const hasCard = await estimationPage.hasEstimationCard();
      //       expect(hasCard).toBe(true);
      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-001 PASSED: Basic estimation created\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);

      //   }
      // });

      // // // ==================== TEST CASE 002: Complete Estimation with All Fields ====================

      // test(`TC-${roleName.toUpperCase()}-EST-002: Create complete estimation with all fields`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-002: Complete estimation`);
      //   console.log('==================================================');

      //   try {
      //     if (!perms.canCreate) {
      //       console.log(`ℹ ${roleName} does not have create permission, skipping test`);
      //       
      //       return;
      //     }

      //     if (roleName == "provider") {
      //       // Navigate to HCT using the HCTpage method
      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);
      //       await estimationPage.searchEnquiry("CS1780");
      //       await estimationPage.openEnquiryCardByCaseId1("CS1780");

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();
      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       const hasCard = await estimationPage.hasEstimationCard();
      //       expect(hasCard).toBe(true);

      //       await estimationPage.clickLastEstimationCardViewEdit();
      //       const isEditActive = await estimationPage.verifyEditTabActive();
      //       expect(isEditActive).toBe(true);

      //       await estimationPage.enterEstimationAmount("11000000");
      //       await estimationPage.saveAsDraft();
      //       const saved = await estimationPage.waitForSaveConfirmation(10000);
      //       expect(saved).toBe(true);
      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry(caseIds[itrate]);
      //       await estimationPage.openEnquiryCardByCaseId1(caseIds[itrate]);
      //       itrate = itrate + 1
      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();
      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       const hasCard = await estimationPage.hasEstimationCard();
      //       expect(hasCard).toBe(true);

      //       await estimationPage.clickLastEstimationCardViewEdit();
      //       const isEditActive = await estimationPage.verifyEditTabActive();
      //       expect(isEditActive).toBe(true);

      //       await estimationPage.enterEstimationAmount("10000");
      //       await estimationPage.saveAsDraft();

      //       const saved = await estimationPage.waitForSaveConfirmation(10000);
      //       expect(saved).toBe(true);
      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-002 PASSED: Complete estimation created\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);
      //     
      //   }
      // });

      // // ==================== TEST CASE 003: Maternity Case Estimation ====================

      // test(`TC-${roleName.toUpperCase()}-EST-003: Create estimation for Maternity case`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-003: Maternity case estimation`);
      //   console.log('==================================================');

      //   try {
      //     if (!perms.canCreate) {
      //       console.log(`ℹ ${roleName} does not have create permission, skipping test`);
      //       
      //       return;
      //     }

      //     if (roleName == "provider") {
      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);
      //       await estimationPage.searchEnquiry(perms.maternityCaseId);
      //       await estimationPage.openEnquiryCardByCaseId1(perms.maternityCaseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();
      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       const hasCard = await estimationPage.hasEstimationCard();
      //       expect(hasCard).toBe(true);
      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry(perms.maternityCaseId);
      //       await estimationPage.openEnquiryCardByCaseId1(perms.maternityCaseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();
      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       const hasCard = await estimationPage.hasEstimationCard();
      //       expect(hasCard).toBe(true);
      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-003 PASSED: Maternity case estimation created\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);
      //     
      //   }
      // });

      // ==================== TEST CASE 004: Create Multiple Estimations ====================

      // test(`TC-${roleName.toUpperCase()}-EST-004: Create multiple estimations for same case`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-004: Multiple estimations`);
      //   console.log('==================================================');

      //   try {
      //     if (!perms.canCreate) {
      //       console.log(`ℹ ${roleName} does not have create permission, skipping test`);
      //       
      //       return;
      //     }

      //     if (roleName == "provider") {
      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const initialCount = await estimationPage.getEstimationCardsCount();
      //       console.log(`Initial estimation cards: ${initialCount}`);

      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();
      //       await page.waitForTimeout(2000);

      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();
      //       await page.waitForTimeout(2000);

      //       const newCount = await estimationPage.getEstimationCardsCount();
      //       console.log(`New estimation cards: ${newCount}`);
      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry(caseIds[itrate]);
      //       await estimationPage.openEnquiryCardByCaseId1(caseIds[itrate]);
      //       itrate = itrate + 1
      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const initialCount = await estimationPage.getEstimationCardsCount();
      //       console.log(`Initial estimation cards: ${initialCount}`);

      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();
      //       await page.waitForTimeout(2000);

      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();
      //       await page.waitForTimeout(2000);

      //       const newCount = await estimationPage.getEstimationCardsCount();
      //       console.log(`New estimation cards: ${newCount}`);
      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-004 PASSED: Multiple estimations created\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);
      //     
      //   }
      // });

      // // ==================== TEST CASE 005: Edit First Estimation Card ====================

      // test(`TC-${roleName.toUpperCase()}-EST-005: Edit first estimation card`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-005: Edit first estimation`);
      //   console.log('==================================================');

      //   try {
      //     if (!perms.canEdit) {
      //       console.log(`ℹ ${roleName} does not have edit permission, skipping test`);

      //       return;
      //     }


      //     if (roleName == "provider") {
      //       await hctPage.navigateToHCT1();
      //       await page.waitForTimeout(3000);
      //       await hctPage.clickActiveTab();
      //       await estimationPage.searchEnquiry("CS1780");
      //       await estimationPage.openEnquiryCardByCaseId1("CS1780");
      //       itrate = itrate + 1
      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const count = await estimationPage.getEstimationCardsCount();
      //       if (count === 0) {
      //         await estimationPage.clickNewEstimationButton();
      //         await estimationPage.saveNewEstimation();
      //         await page.waitForTimeout(2000);
      //       }

      //       await estimationPage.clickFirstEstimationCardViewEdit();

      //       const isEditActive = await estimationPage.verifyEditTabActive();
      //       expect(isEditActive).toBe(true);

      //       await estimationPage.enterEstimationAmount(roleName == "provider" ? "11000000" : "10000");
      //       await estimationPage.saveAsDraft();
      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry(caseIds[itrate]);
      //       await estimationPage.openEnquiryCardByCaseId1(caseIds[itrate]);
      //       itrate = itrate + 1
      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const count = await estimationPage.getEstimationCardsCount();
      //       if (count === 0) {
      //         await estimationPage.clickNewEstimationButton();
      //         await estimationPage.saveNewEstimation();
      //         await page.waitForTimeout(2000);
      //       }

      //       await estimationPage.clickFirstEstimationCardViewEdit();

      //       const isEditActive = await estimationPage.verifyEditTabActive();
      //       expect(isEditActive).toBe(true);

      //       await estimationPage.enterEstimationAmount("10000");
      //       await estimationPage.saveAsDraft();
      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-005 PASSED: First estimation card edited\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);

      //   }
      // });
      // test(`TC-${roleName.toUpperCase()}-EST-005: Edit first estimation card1`, async () => {

      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-005: Edit first estimation`);
      //   console.log('==================================================');

      //   try {

      //     // Permission check
      //     if (!perms.canEdit) {
      //       console.log(`ℹ ${roleName} does not have edit permission, skipping test`);
      //       return;
      //     }

      //     // ===============================
      //     // Provider Flow
      //     // ===============================
      //     if (roleName === "provider") {

      //       await hctPage.navigateToHCT1();
      //       await page.waitForTimeout(3000);

      //       await hctPage.clickActiveTab();

      //       await estimationPage.searchEnquiry("CS1780");
      //       await estimationPage.openEnquiryCardByCaseId1("CS1780");

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();


      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       await estimationPage.enterEstimationAmount("11000000");
      //       await estimationPage.saveAsDraft();
      //     }

      //     // ===============================
      //     // Facilitator Flow
      //     // ===============================
      //     else if (roleName === "facilitator") {

      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);

      //       await approveCasePage.searchCaseById("CS2324");
      //       await approveCasePage.clickCaseRow("CS2324");

      //       const isOpen = await approveCasePage.isOffcanvasOpen();
      //       expect(isOpen).toBe(true);

      //       await approveCasePage.clickProvidersTab();
      //       const count = await estimationPage.getEstimationCardsCount();

      //       if (count === 0) {
      //         await estimationPage.clickNewEstimationButton();
      //         await estimationPage.saveNewEstimation();
      //         await page.waitForTimeout(2000);
      //       }
      //       const comparisonSuccess = await approveCasePage.completeComparisonFlow(3);
      //       expect(comparisonSuccess).toBe(true);

      //       console.log(`ℹ Facilitator performs comparison instead of editing estimation`);
      //       return;

      //     }

      //     // ===============================
      //     // Internal Roles Flow
      //     // ===============================
      //     else {

      //       await estimationPage.clickProviderEnquiryMenu();

      //       await estimationPage.searchEnquiry(caseIds[itrate]);
      //       await estimationPage.openEnquiryCardByCaseId1(caseIds[itrate]);

      //       itrate++;

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const count = await estimationPage.getEstimationCardsCount();

      //       if (count === 0) {
      //         await estimationPage.clickNewEstimationButton();
      //         await estimationPage.saveNewEstimation();
      //         await page.waitForTimeout(2000);
      //       }

      //       await estimationPage.clickFirstEstimationCardViewEdit();

      //       const isEditActive = await estimationPage.verifyEditTabActive();
      //       expect(isEditActive).toBe(true);

      //       await estimationPage.enterEstimationAmount("10000");
      //       await estimationPage.saveAsDraft();

      //     }

      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-005 PASSED: First estimation card edited\n`);

      //   } catch (error) {

      //     console.error(`❌ TC-${roleName.toUpperCase()}-EST-005 FAILED`);

      //   }

      // });
      // //==================== TEST CASE 006: Edit Last Estimation Card ====================

      // test(`TC-${roleName.toUpperCase()}-EST-006: Edit last estimation card`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-006: Edit last estimation`);
      //   console.log('==================================================');

      //   try {
      //     if (!perms.canEdit) {
      //       console.log(`ℹ ${roleName} does not have edit permission, skipping test`);
      //       
      //       return;
      //     }

      //     if (roleName == "provider") {
      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const count = await estimationPage.getEstimationCardsCount();
      //       if (count === 0) {
      //         await estimationPage.clickNewEstimationButton();
      //         await estimationPage.saveNewEstimation();
      //         await page.waitForTimeout(2000);
      //       }

      //       await estimationPage.clickLastEstimationCardViewEdit();

      //       const isEditActive = await estimationPage.verifyEditTabActive();
      //       expect(isEditActive).toBe(true);

      //       await estimationPage.enterEstimationAmount("11000000");
      //       await estimationPage.saveAsDraft();
      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const count = await estimationPage.getEstimationCardsCount();
      //       if (count === 0) {
      //         await estimationPage.clickNewEstimationButton();
      //         await estimationPage.saveNewEstimation();
      //         await page.waitForTimeout(2000);
      //       }

      //       await estimationPage.clickLastEstimationCardViewEdit();

      //       const isEditActive = await estimationPage.verifyEditTabActive();
      //       expect(isEditActive).toBe(true);

      //       await estimationPage.enterEstimationAmount("10000");
      //       await estimationPage.saveAsDraft();
      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-006 PASSED: Last estimation card edited\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);
      //     
      //   }
      // });

      // // ==================== TEST CASE 007: Verify Estimation Cards Count ====================

      // test(`TC-${roleName.toUpperCase()}-EST-007: Verify estimation cards count`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-007: Verify cards count`);
      //   console.log('==================================================');

      //   try {
      //     if (!perms.canView) {
      //       console.log(`ℹ ${roleName} does not have view permission, skipping test`);
      //       
      //       return;
      //     }

      //     if (roleName == "provider") {
      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const count = await estimationPage.getEstimationCardsCount();
      //       console.log(`Current estimation cards: ${count}`);
      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const count = await estimationPage.getEstimationCardsCount();
      //       console.log(`Current estimation cards: ${count}`);
      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-007 PASSED: Cards count verified\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);
      //     
      //   }
      // });

      // // ==================== TEST CASE 008: Refresh Page After Saving ====================

      // test(`TC-${roleName.toUpperCase()}-EST-008: Refresh page after saving estimation`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-008: Refresh after save`);
      //   console.log('==================================================');

      //   try {
      //     if (!perms.canCreate) {
      //       console.log(`ℹ ${roleName} does not have create permission, skipping test`);
      //       
      //       return;
      //     }

      //     if (roleName == "provider") {
      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const beforeCount = await estimationPage.getEstimationCardsCount();
      //       console.log(`Cards before save: ${beforeCount}`);

      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       await estimationPage.refreshPage();

      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);
      //       await estimationPage.switchToEstimationsTab();

      //       const afterCount = await estimationPage.getEstimationCardsCount();
      //       console.log(`Cards after refresh: ${afterCount}`);
      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const beforeCount = await estimationPage.getEstimationCardsCount();
      //       console.log(`Cards before save: ${beforeCount}`);

      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       await estimationPage.refreshPage();

      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);
      //       await estimationPage.switchToEstimationsTab();

      //       const afterCount = await estimationPage.getEstimationCardsCount();
      //       console.log(`Cards after refresh: ${afterCount}`);
      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-008 PASSED: Page refresh verified\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);
      //     
      //   }
      // });

      // // ==================== TEST CASE 009: Open Enquiry by Case ID ====================

      // test(`TC-${roleName.toUpperCase()}-EST-009: Open enquiry by case ID`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-009: Open by case ID`);
      //   console.log('==================================================');

      //   try {
      //     if (roleName == "provider") {
      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);
      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);
      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-009 PASSED: Enquiry opened by case ID\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);
      //     
      //   }
      // });

      // // ==================== TEST CASE 010: Navigate to Hospital Terms Tab ====================

      // test(`TC-${roleName.toUpperCase()}-EST-010: Navigate to Hospital terms tab`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-010: Hospital terms tab`);
      //   console.log('==================================================');

      //   try {
      //     if (!perms.canEdit) {
      //       console.log(`ℹ ${roleName} does not have edit permission, skipping test`);
      //       
      //       return;
      //     }

      //     if (roleName == "provider") {
      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const count = await estimationPage.getEstimationCardsCount();
      //       if (count === 0) {
      //         await estimationPage.clickNewEstimationButton();
      //         await estimationPage.saveNewEstimation();
      //         await page.waitForTimeout(2000);
      //       }

      //       await estimationPage.clickFirstEstimationCardViewEdit();
      //       await estimationPage.switchToHospitalTermsTab();
      //       await page.waitForTimeout(1000);
      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const count = await estimationPage.getEstimationCardsCount();
      //       if (count === 0) {
      //         await estimationPage.clickNewEstimationButton();
      //         await estimationPage.saveNewEstimation();
      //         await page.waitForTimeout(2000);
      //       }

      //       await estimationPage.clickFirstEstimationCardViewEdit();
      //       await estimationPage.switchToHospitalTermsTab();
      //       await page.waitForTimeout(1000);
      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-010 PASSED: Hospital terms tab accessed\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);
      //     
      //   }
      // });

      // // ==================== TEST CASE 011: Navigate to Attachments Tab ====================

      // test(`TC-${roleName.toUpperCase()}-EST-011: Navigate to Attachments tab`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-011: Attachments tab`);
      //   console.log('==================================================');

      //   try {
      //     if (!perms.canEdit) {
      //       console.log(`ℹ ${roleName} does not have edit permission, skipping test`);
      //       
      //       return;
      //     }

      //     if (roleName == "provider") {
      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const count = await estimationPage.getEstimationCardsCount();
      //       if (count === 0) {
      //         await estimationPage.clickNewEstimationButton();
      //         await estimationPage.saveNewEstimation();
      //         await page.waitForTimeout(2000);
      //       }

      //       await estimationPage.clickFirstEstimationCardViewEdit();
      //       await estimationPage.switchToAttachmentsTab();
      //       await page.waitForTimeout(1000);
      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();

      //       const count = await estimationPage.getEstimationCardsCount();
      //       if (count === 0) {
      //         await estimationPage.clickNewEstimationButton();
      //         await estimationPage.saveNewEstimation();
      //         await page.waitForTimeout(2000);
      //       }

      //       await estimationPage.clickFirstEstimationCardViewEdit();
      //       await estimationPage.switchToAttachmentsTab();
      //       await page.waitForTimeout(1000);
      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-011 PASSED: Attachments tab accessed\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);
      //     
      //   }
      // });

      // // ==================== TEST CASE 012: Save Estimation as Draft and Verify ====================

      // test(`TC-${roleName.toUpperCase()}-EST-012: Save estimation as draft and verify`, async () => {
      //   console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-012: Save as draft`);
      //   console.log('==================================================');

      //   try {
      //     if (!perms.canCreate) {
      //       console.log(`ℹ ${roleName} does not have create permission, skipping test`);
      //       
      //       return;
      //     }

      //     if (roleName == "provider") {
      //       await hctPage.navigateToHCT();
      //       await page.waitForTimeout(3000);
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();
      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       await estimationPage.clickLastEstimationCardViewEdit();
      //       const isEditActive = await estimationPage.verifyEditTabActive();
      //       expect(isEditActive).toBe(true);

      //       await estimationPage.enterEstimationAmount("11000000");
      //       await estimationPage.saveAsDraft();

      //       const saved = await estimationPage.waitForSaveConfirmation(10000);
      //       expect(saved).toBe(true);
      //     }
      //     else {
      //       await estimationPage.clickProviderEnquiryMenu();
      //       await estimationPage.searchEnquiry(roleConfig.caseId);
      //       await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

      //       const isModalOpen = await estimationPage.isEnquiryModalOpen();
      //       expect(isModalOpen).toBe(true);

      //       await estimationPage.switchToEstimationsTab();
      //       await estimationPage.clickNewEstimationButton();
      //       await estimationPage.saveNewEstimation();

      //       await estimationPage.clickLastEstimationCardViewEdit();
      //       const isEditActive = await estimationPage.verifyEditTabActive();
      //       expect(isEditActive).toBe(true);

      //       await estimationPage.enterEstimationAmount("10000");
      //       await estimationPage.saveAsDraft();

      //       const saved = await estimationPage.waitForSaveConfirmation(10000);
      //       expect(saved).toBe(true);
      //     }
      //     console.log(`✅ TC-${roleName.toUpperCase()}-EST-012 PASSED: Draft saved and verified\n`);
      //   } catch (error) {
      //     console.error(`❌ Test failed for ${roleName}:`);
      //     
      //   }
      // });




    });
  }
});

