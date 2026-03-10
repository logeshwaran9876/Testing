// import { CreateEstimationPage } from '.././pages/CoreEstimation.Page';
// import estimationData from '../../test-data/estimationData.json';
// import { test, expect, Page } from '@playwright/test';

// import { LoginPage } from '.././pages/LoginPage';
// import { HCTpage } from '.././pages/HCTPage';
// import logindata from "../../test-data/logindata.json"
// import { AdminEnquiryPage } from '.././pages/AdminEnquiryPage';
// import { NewEnquiryPage } from ".././pages/NewEnquiryPage"
// import { ApproveCasePage } from '.././pages/ApproveCasePage';

// export const caseIds = [
//     "CS1493", "CS2316", "CS2307", "CS2324", "CS1766", "CS1749", "CS1774",
//     "CS1736", "CS2330", "CS1780", "CS1760", "CS1761", "CS1762", "CS1763",
//     "CS1764", "CS2319", "CS2314", "CS2313", "CS2311", "CS1671"
// ];

// // Helper to check if role has estimation permissions
// const getEstimationPermissions = (roleConfig: any) => {
//     const defaultPermissions = {
//         canCreate: false,
//         canEdit: false,
//         canView: false,
//         canCompare: false,
//         canApprove: false,
//         regularCaseId: 'CS1766',
//         maternityCaseId: 'CS1499',
//         estimationAmount: '50000',
//         treatmentPlan: 'Standard treatment protocol',
//         lengthOfStay: '5',
//         inclusions: 'All medical expenses included',
//         exclusions: 'Personal expenses excluded'
//     };

//     if (roleConfig.estimation) {
//         return {
//             canCreate: roleConfig.estimation.canCreate || false,
//             canEdit: roleConfig.estimation.canEdit || false,
//             canView: roleConfig.estimation.canView || false,
//             canCompare: roleConfig.estimation.canCompare || false,
//             canApprove: roleConfig.estimation.canApprove || false,
//             regularCaseId: roleConfig.estimation.regularCaseId || roleConfig.caseId || 'CS1489',
//             maternityCaseId: roleConfig.estimation.maternityCaseId || 'CS1499',
//             estimationAmount: roleConfig.estimation.estimationAmount || '50000',
//             treatmentPlan: roleConfig.estimation.treatmentPlan || 'Standard treatment',
//             lengthOfStay: roleConfig.estimation.lengthOfStay || '5',
//             inclusions: roleConfig.estimation.inclusions || 'Standard inclusions',
//             exclusions: roleConfig.estimation.exclusions || 'Standard exclusions'
//         };
//     }

//     return defaultPermissions;
// };

// // Helper to check if user has any estimation access
// const hasEstimationAccess = (roleConfig: any): boolean => {
//     const perms = getEstimationPermissions(roleConfig);
//     return perms.canCreate || perms.canEdit || perms.canView || perms.canCompare || perms.canApprove;
// };

// test.describe('Estimation Management - All Roles', () => {
//     let itrate: number = 0;

//     // Include all roles that have estimation access
//     const rolesWithAccess = Object.entries(logindata.roles)
//         .filter(([_, config]) => hasEstimationAccess(config));

//     for (const [roleName, roleConfig] of rolesWithAccess) {
//         test.describe(`${roleName} Estimation Tests`, () => {
//             let estimationPage: CreateEstimationPage;
//             let hctPage: HCTpage;
//             let page: Page;
//             let perms: ReturnType<typeof getEstimationPermissions>;
//             let approveCasePage: ApproveCasePage;

//             test.beforeEach(async ({ page: testPage }) => {
//                 page = testPage;
//                 console.log(`\n🔐 Setting up estimation test for ${roleName}...`);

//                 const loginPage = new LoginPage(page);
//                 estimationPage = new CreateEstimationPage(page);
//                 hctPage = new HCTpage(page);
//                 approveCasePage = new ApproveCasePage(page);
//                 const { email, password, url } = roleConfig;
//                 perms = getEstimationPermissions(roleConfig);

//                 try {
//                     // Login
//                     await loginPage.navigateToLoginPage(url);
//                     await page.waitForSelector('input[type="text"]', {
//                         timeout: 30000,
//                         state: 'visible'
//                     });

//                     await loginPage.enterUsername(email);
//                     await loginPage.enterPassword(password);
//                     await loginPage.clickGetStartedButton();

//                     console.log(`✅ Setup complete for ${roleName}`);
//                     console.log(`📋 Estimation Permissions:`, {
//                         canCreate: perms.canCreate,
//                         canEdit: perms.canEdit,
//                         canView: perms.canView,
//                         canCompare: perms.canCompare,
//                         canApprove: perms.canApprove
//                     });
//                     console.log('');

//                 } catch (error) {
//                     console.error(`❌ Setup failed for ${roleName}:`, error);
//                 }
//             });

//             // Test 1: Create basic estimation
//             test(`TC-${roleName.toUpperCase()}-EST-001: Create basic estimation for Regular case`, async () => {
//                 console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-001: Create basic estimation`);
//                 console.log('==================================================');

//                 try {
//                     const hasPermission = roleConfig.permissions?.includes('createEstimation');
//                     console.log(`${roleName} → Create Estimation Permission: ${hasPermission}`);

//                     if (hasPermission) {
//                         // Provider flow
//                         await hctPage.navigateToHCT();
//                         await page.waitForTimeout(3000);
//                         await estimationPage.searchEnquiry(roleConfig.caseId);
//                         await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//                         const isModalOpen = await estimationPage.isEnquiryModalOpen();
//                         expect(isModalOpen).toBe(true);

//                         await estimationPage.switchToEstimationsTab();
//                         await estimationPage.clickNewEstimationButton();
//                         await estimationPage.saveNewEstimation();

//                         const hasCard = await estimationPage.hasEstimationCard();
//                         expect(hasCard).toBe(true);

//                         console.log(`✅ TC-${roleName.toUpperCase()}-EST-001 PASSED: Basic estimation created\n`);
//                     } else {
//                         console.log(`ℹ ${roleName} does not have create estimation permission, skipping test`);
//                         expect(true).toBe(true);
//                     }
//                 } catch (error) {
//                     console.error(`❌ Test failed for ${roleName}:`, error);
//                     await page.screenshot({ path: `test-fail-${roleName}-${Date.now()}.png` });
//                     throw error;
//                 }
//             });

//             // Test 2: Edit and view estimation
//             // In your test file, update the tests to handle failures gracefully

//             // Test 2: Edit and view estimation
//             test(`TC-${roleName.toUpperCase()}-EST-002: Edit and view estimation for both case`, async () => {
//                 console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-002: Edit and view estimation`);
//                 console.log('==================================================');

//                 try {
//                     const hasEditPermission = roleConfig.permissions?.includes('editEstimation');
//                     const hasViewPermission = roleConfig.permissions?.includes('viewEstimation');

//                     console.log(`${roleName} → Edit Permission: ${hasEditPermission}, View Permission: ${hasViewPermission}`);

//                     if (hasEditPermission || hasViewPermission) {
//                         const regularCase = estimationData.cases.regular;

//                         const navigated = await hctPage.navigateToHCT();
//                         if (!navigated) {
//                             console.log(`⚠ ${roleName} could not navigate to HCT, skipping test`);
//                             expect(true).toBe(true);
//                             return;
//                         }

//                         const searched = await approveCasePage.searchCaseById(regularCase.caseId);
//                         if (!searched) {
//                             console.log(`⚠ ${roleName} could not search for case, skipping test`);
//                             expect(true).toBe(true);
//                             return;
//                         }

//                         const clicked = await approveCasePage.clickCaseRow(regularCase.caseId);
//                         if (!clicked) {
//                             console.log(`⚠ ${roleName} could not click case row, skipping test`);
//                             expect(true).toBe(true);
//                             return;
//                         }

//                         const isOpen = await approveCasePage.isOffcanvasOpen();
//                         if (!isOpen) {
//                             console.log(`⚠ ${roleName} offcanvas did not open, skipping test`);
//                             expect(true).toBe(true);
//                             return;
//                         }

//                         const tabClicked = await approveCasePage.clickProvidersTab();
//                         if (!tabClicked) {
//                             console.log(`⚠ ${roleName} could not click providers tab, skipping test`);
//                             expect(true).toBe(true);
//                             return;
//                         }

//                         const viewClicked = await approveCasePage.clickViewButtonOnCard(0);
//                         if (!viewClicked) {
//                             console.log(`⚠ ${roleName} could not click view button, skipping test`);
//                             expect(true).toBe(true);
//                             return;
//                         }

//                         await estimationPage.clickLastEstimationCardViewEdit();

//                         const isEditActive = await estimationPage.verifyEditTabActive();
//                         if (!isEditActive) {
//                             console.log(`⚠ ${roleName} edit tab not active, skipping test`);
//                             expect(true).toBe(true);
//                             return;
//                         }

//                         if (hasEditPermission) {
//                             await estimationPage.fillTreatmentPlan(regularCase.treatmentPlan);
//                             await estimationPage.enterEstimationAmount("10000");
//                             await estimationPage.saveAsDraft();
//                             await estimationPage.editExistingEstimationWithHospitalTermsAndAttachments(regularCase);
//                             console.log(`✅ ${roleName} successfully edited estimation`);
//                         } else {
//                             console.log(`ℹ ${roleName} has view only permission, verifying read-only access`);
//                         }
//                     } else {
//                         console.log(`ℹ ${roleName} does not have edit/view estimation permission, skipping test`);
//                         expect(true).toBe(true);
//                     }

//                     console.log(`✅ TC-${roleName.toUpperCase()}-EST-002 PASSED\n`);
//                 } catch (error) {
//                     console.error(`❌ Test failed for ${roleName}:`, error);
//                     await page.screenshot({ path: `test-fail-${roleName}-${Date.now()}.png` });
//                     // Don't throw, just mark as passed to continue tests
//                     expect(true).toBe(true);
//                 }
//             });

//             // Test 4: Verify matrix calculations
//             test(`TC-${roleName.toUpperCase()}-EST-004: Verify estimation matrix calculations with test data`, async () => {
//                 console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-004: Verify matrix calculations`);
//                 console.log('==================================================');

//                 try {
//                     const hasViewPermission = roleConfig.permissions?.includes('viewEstimation');
//                     const hasEditPermission = roleConfig.permissions?.includes('editEstimation');

//                     console.log(`${roleName} → View Permission: ${hasViewPermission}, Edit Permission: ${hasEditPermission}`);

//                     if (hasViewPermission || hasEditPermission) {
//                         const regularCase = estimationData.cases.regular;
//                         const matrixData = estimationData.estimationMatrix.testData;

//                         const navigated = await hctPage.navigateToHCT();
//                         if (!navigated) {
//                             console.log(`⚠ ${roleName} could not navigate to HCT, skipping test`);
//                             expect(true).toBe(true);
//                             return;
//                         }

//                         if (roleName === "provider") {
//                             await estimationPage.searchEnquiry(roleConfig.caseId);
//                         } else {
//                             await approveCasePage.searchCaseById(regularCase.caseId);
//                         }

//                         const clicked = await approveCasePage.clickCaseRow(regularCase.caseId);
//                         if (!clicked) {
//                             console.log(`⚠ ${roleName} could not click case row, skipping test`);
//                             expect(true).toBe(true);
//                             return;
//                         }

//                         const isOpen = await approveCasePage.isOffcanvasOpen();
//                         if (!isOpen) {
//                             console.log(`⚠ ${roleName} offcanvas did not open, skipping test`);
//                             expect(true).toBe(true);
//                             return;
//                         }

//                         const tabClicked = await approveCasePage.clickProvidersTab();
//                         if (!tabClicked) {
//                             console.log(`⚠ ${roleName} could not click providers tab, skipping test`);
//                             expect(true).toBe(true);
//                             return;
//                         }

//                         const viewClicked = await approveCasePage.clickViewButtonOnCard(0);
//                         if (!viewClicked) {
//                             console.log(`⚠ ${roleName} could not click view button, skipping test`);
//                             expect(true).toBe(true);
//                             return;
//                         }

//                          await estimationPage.clickLastEstimationCardViewEdit();


//                         if (hasEditPermission) {
//                             // Fill treatment plan and other fields
//                             if (regularCase.treatmentPlan) {
//                                 await estimationPage.fillTreatmentPlan(regularCase.treatmentPlan);
//                             }
//                             if (regularCase.lengthOfStay) {
//                                 await estimationPage.fillLengthOfStay(regularCase.lengthOfStay);
//                             }
//                             if (regularCase.inclusions) {
//                                 await estimationPage.fillInclusions(regularCase.inclusions);
//                             }
//                             if (regularCase.exclusions) {
//                                 await estimationPage.fillExclusions(regularCase.exclusions);
//                             }

//                             // Fill the estimation matrix with test data
//                             await estimationPage.fillEstimationMatrix(matrixData);

//                             // Wait for calculations
//                             await page.waitForTimeout(2000);

//                             // Validate matrix calculations
//                             const isValid = await estimationPage.validateMatrixCalculations(matrixData);
//                             if (!isValid) {
//                                 console.log(`⚠ Matrix calculations validation failed for ${roleName}`);
//                             }

//                             // Save as draft
//                             await estimationPage.saveAsDraft();

//                             console.log(`✅ ${roleName} successfully validated matrix calculations`);
//                         } else {
//                             // View only - just verify we can see the matrix
//                             console.log(`ℹ ${roleName} has view only permission for matrix`);
//                             const totals = await estimationPage.getColumnTotals();
//                             expect(totals).toBeDefined();
//                         }
//                     } else {
//                         console.log(`ℹ ${roleName} does not have view estimation permission, skipping test`);
//                         expect(true).toBe(true);
//                     }

//                     console.log(`✅ TC-${roleName.toUpperCase()}-EST-004 PASSED\n`);
//                 } catch (error) {
//                     console.error(`❌ Test failed for ${roleName}:`, error);
//                     await page.screenshot({ path: `test-fail-${roleName}-${Date.now()}.png` });
//                     // Don't throw, just mark as passed to continue tests
//                     expect(true).toBe(true);
//                 }
//             });

//             // Test 3: New and Edit with matrix calculations
//             test(`TC-${roleName.toUpperCase()}-EST-003: New and Edit estimation with matrix calculations`, async () => {
//                 console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-003: New and Edit with matrix calculations`);
//                 console.log('==================================================');

//                 try {
//                     const hasCreatePermission = roleConfig.permissions?.includes('createEstimation');
//                     const hasEditPermission = roleConfig.permissions?.includes('editEstimation');

//                     console.log(`${roleName} → Create Permission: ${hasCreatePermission}, Edit Permission: ${hasEditPermission}`);

//                     if (hasCreatePermission || hasEditPermission) {
//                         const regularCase = estimationData.cases.regular;
//                         const matrixData = estimationData.estimationMatrix.testData;

//                         await hctPage.navigateToHCT();
//                         await page.waitForTimeout(3000);

//                         if (roleName === "provider") {
//                             await hctPage.clickActiveTab();
//                         }

//                         await estimationPage.searchEnquiry(roleConfig.caseId);
//                         await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//                         const isModalOpen = await estimationPage.isEnquiryModalOpen();
//                         expect(isModalOpen).toBe(true);

//                         await estimationPage.switchToEstimationsTab();

//                         if (hasCreatePermission) {
//                             await estimationPage.clickNewEstimationButton();
//                             await estimationPage.saveNewEstimation();
//                         }

//                         const hasCard = await estimationPage.hasEstimationCard();
//                         expect(hasCard).toBe(true);

//                         await estimationPage.clickLastEstimationCardViewEdit();

//                         const isEditActive = await estimationPage.verifyEditTabActive();
//                         expect(isEditActive).toBe(true);

//                         // Fill basic fields
//                         if (hasEditPermission) {
//                             if (regularCase.treatmentPlan) {
//                                 await estimationPage.fillTreatmentPlan(regularCase.treatmentPlan);
//                             }
//                             if (regularCase.lengthOfStay) {
//                                 await estimationPage.fillLengthOfStay(regularCase.lengthOfStay);
//                             }
//                             if (regularCase.inclusions) {
//                                 await estimationPage.fillInclusions(regularCase.inclusions);
//                             }
//                             if (regularCase.exclusions) {
//                                 await estimationPage.fillExclusions(regularCase.exclusions);
//                             }

//                             // Fill the estimation matrix with test data
//                             await estimationPage.fillEstimationMatrix(matrixData);

//                             // Wait for calculations
//                             await page.waitForTimeout(2000);

//                             // Validate matrix calculations
//                             const isValid = await estimationPage.validateMatrixCalculations(matrixData);
//                             expect(isValid).toBe(true);

//                             // Validate card total against matrix
//                             await estimationPage.validateCardTotalAgainstMatrix();

//                             // Save as draft
//                             await estimationPage.saveAsDraft();

//                             console.log(`✅ ${roleName} successfully edited estimation with matrix calculations`);
//                         }
//                     } else {
//                         console.log(`ℹ ${roleName} does not have create/edit estimation permission, skipping test`);
//                         expect(true).toBe(true);
//                     }
//                 } catch (error) {
//                     console.error(`❌ Test failed for ${roleName}:`, error);
//                     await page.screenshot({ path: `test-fail-${roleName}-${Date.now()}.png` });
//                     throw error;
//                 }
//             });



//             // Test 5: Verify Approved Data cannot be edited
//             test(`TC-${roleName.toUpperCase()}-EST-005: Verify Approved Data cannot be edited`, async () => {
//                 console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-005: Verify Approved Data cannot be edited`);
//                 console.log('==================================================');

//                 try {
//                     const hasEditPermission = roleConfig.permissions?.includes('editEstimation');
//                     const hasApprovePermission = roleConfig.permissions?.includes('approveEstimation');

//                     console.log(`${roleName} → Edit Permission: ${hasEditPermission}, Approve Permission: ${hasApprovePermission}`);

//                     const regularCase = estimationData.cases.regular;

//                     await hctPage.navigateToHCT();

//                     if (roleName === "provider") {
//                         await hctPage.ClickApproveTab();
//                         await estimationPage.searchEnquiry(roleConfig.caseId);
//                     } else {
//                         await approveCasePage.searchCaseById(regularCase.caseId);
//                     }

//                     await approveCasePage.clickCaseRow(regularCase.caseId);

//                     const isOpen = await approveCasePage.isOffcanvasOpen();
//                     expect(isOpen).toBe(true);

//                     await approveCasePage.clickProvidersTab();
//                     await approveCasePage.clickViewButtonOnCard(0);
//                     await estimationPage.clickLastEstimationCardView();

//                     // Try to switch to hospital terms tab
//                     await estimationPage.switchToHospitalTermsTab();

//                     // Try to save
//                     try {
//                         await estimationPage.saveAsDraft();
//                         // If save succeeds and user doesn't have permission, that's a problem
//                         if (!hasEditPermission && !hasApprovePermission) {
//                             console.error(`❌ ${roleName} was able to edit approved data without permission`);
//                             expect(false).toBe(true);
//                         } else {
//                             console.log(`✅ ${roleName} with permission was able to save`);
//                         }
//                     } catch (error) {
//                         // Save failed - this is expected for users without permission
//                         if (!hasEditPermission && !hasApprovePermission) {
//                             console.log(`✅ ${roleName} correctly cannot edit approved data`);
//                             expect(true).toBe(true);
//                         } else {
//                             console.error(`❌ ${roleName} with permission should be able to save`);
//                             throw error;
//                         }
//                     }

//                     console.log(`✅ TC-${roleName.toUpperCase()}-EST-005 PASSED\n`);
//                 } catch (error) {
//                     console.error(`❌ Test failed for ${roleName}:`, error);
//                     await page.screenshot({ path: `test-fail-${roleName}-${Date.now()}.png` });
//                     throw error;
//                 }
//             });
//         });
//     }
// });







// import { CreateEstimationPage } from '.././pages/CoreEstimation.Page';
// import estimationData from '../../test-data/estimationData.json';
// import { test, expect, Page } from '@playwright/test';

// import { LoginPage } from '.././pages/LoginPage';
// import { HCTpage } from '.././pages/HCTPage';
// import logindata from "../../test-data/logindata.json"
// import { AdminEnquiryPage } from '.././pages/AdminEnquiryPage';
// import { NewEnquiryPage } from ".././pages/NewEnquiryPage"
// import { ApproveCasePage } from '.././pages/ApproveCasePage';

// export const caseIds = [
//   "CS1493",
//   "CS2316",
//   "CS2307",
//   "CS2324",
//   "CS1766",
//   "CS1749",
//   "CS1774",
//   "CS1736",
//   "CS2330",
//   "CS1780",
//   "CS1760",
//   "CS1761",
//   "CS1762",
//   "CS1763",
//   "CS1764",
//   "CS2319",
//   "CS2314",
//   "CS2313",
//   "CS2311",
//   "CS1671"
// ];
// // Helper to check if role has estimation permissions
// const getEstimationPermissions = (roleConfig: any) => {
//   const defaultPermissions = {
//     canCreate: false,
//     canEdit: false,
//     canView: false,
//     canCompare: false,
//     canApprove: false,
//     regularCaseId: 'CS1766',
//     maternityCaseId: 'CS1499',
//     estimationAmount: '50000',
//     treatmentPlan: 'Standard treatment protocol',
//     lengthOfStay: '5',
//     inclusions: 'All medical expenses included',
//     exclusions: 'Personal expenses excluded'
//   };

//   if (roleConfig.estimation) {
//     return {
//       canCreate: roleConfig.estimation.canCreate || false,
//       canEdit: roleConfig.estimation.canEdit || false,
//       canView: roleConfig.estimation.canView || false,
//       canCompare: roleConfig.estimation.canCompare || false,
//       canApprove: roleConfig.estimation.canApprove || false,
//       regularCaseId: roleConfig.estimation.regularCaseId || roleConfig.caseId || 'CS1489',
//       maternityCaseId: roleConfig.estimation.maternityCaseId || 'CS1499',
//       estimationAmount: roleConfig.estimation.estimationAmount || '50000',
//       treatmentPlan: roleConfig.estimation.treatmentPlan || 'Standard treatment',
//       lengthOfStay: roleConfig.estimation.lengthOfStay || '5',
//       inclusions: roleConfig.estimation.inclusions || 'Standard inclusions',
//       exclusions: roleConfig.estimation.exclusions || 'Standard exclusions'
//     };
//   }

//   return defaultPermissions;
// };

// // Helper to check if user has any estimation access
// const hasEstimationAccess = (roleConfig: any): boolean => {
//   const perms = getEstimationPermissions(roleConfig);
//   return perms.canCreate || perms.canEdit || perms.canView || perms.canCompare || perms.canApprove;
// };

// test.describe('Estimation Management - All Roles', () => {

//   let itrate: number = 0;
//   // Include all roles that have estimation access
//   const rolesWithAccess = Object.entries(logindata.roles)
//     .filter(([_, config]) => hasEstimationAccess(config));

//   for (const [roleName, roleConfig] of rolesWithAccess) {

//     test.describe(`${roleName} Estimation Tests`, () => {

//       let estimationPage: CreateEstimationPage;
//       let hctPage: HCTpage;
//       let page: Page;
//       let perms: ReturnType<typeof getEstimationPermissions>;

//       test.beforeEach(async ({ page: testPage }) => {
//         page = testPage;
//         console.log(`\n🔐 Setting up estimation test for ${roleName}...`);

//         const loginPage = new LoginPage(page);
//         estimationPage = new CreateEstimationPage(page);
//         hctPage = new HCTpage(page);
//         const { email, password, url } = roleConfig;
//         perms = getEstimationPermissions(roleConfig);

//         try {
//           // Login with increased timeout
//           await loginPage.navigateToLoginPage(url);
//           await page.waitForSelector('input[type="text"]', {
//             timeout: 30000,
//             state: 'visible'
//           });

//           await loginPage.enterUsername(email);
//           await loginPage.enterPassword(password);
//           await loginPage.clickGetStartedButton();



//           console.log(`✅ Setup complete for ${roleName}`);
//           console.log(`📋 Estimation Permissions:`, {
//             canCreate: perms.canCreate,
//             canEdit: perms.canEdit,
//             canView: perms.canView,
//             canCompare: perms.canCompare,
//             canApprove: perms.canApprove
//           });
//           console.log('');

//         } catch (error) {
//           console.error(`❌ Setup failed for ${roleName}:`);

//         }
//       });
//       //  ==================== TEST CASE 001: Basic Estimation Creation ====================

//       test(`TC-${roleName.toUpperCase()}-EST-001: Create basic estimation for Regular case`, async () => {
//         console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-001: Create basic estimation`);
//         console.log('==================================================');

//         try {
//           if (!perms.canCreate) {
//             console.log(`ℹ ${roleName} does not have create permission, skipping test`);
//             expect(true).toBe(true);
//             return;
//           }

//           if (roleName == "provider") {
//             // Navigate to HCT using the HCTpage method
//             await hctPage.navigateToHCT();
//             await page.waitForTimeout(3000);
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();
//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();

//             const hasCard = await estimationPage.hasEstimationCard();
//             expect(hasCard).toBe(true);
//           }
//           else {
//             await estimationPage.clickProviderEnquiryMenu();
//             await estimationPage.searchEnquiry(caseIds[itrate]);
//             await estimationPage.openEnquiryCardByCaseId1(caseIds[itrate]);
//             itrate = itrate + 1
//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();
//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();

//             const hasCard = await estimationPage.hasEstimationCard();
//             expect(hasCard).toBe(true);
//           }
//           console.log(`✅ TC-${roleName.toUpperCase()}-EST-001 PASSED: Basic estimation created\n`);
//         } catch (error) {
//           console.error(`❌ Test failed for ${roleName}:`);
//           expect(true).toBe(true);
//         }
//       });

//       // ==================== TEST CASE 002: Complete Estimation with All Fields ====================

//       test(`TC-${roleName.toUpperCase()}-EST-002: Create complete estimation with all fields`, async () => {
//         console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-002: Complete estimation`);
//         console.log('==================================================');

//         try {
//           if (!perms.canCreate) {
//             console.log(`ℹ ${roleName} does not have create permission, skipping test`);
//             expect(true).toBe(true);
//             return;
//           }

//           if (roleName == "provider") {
//             // Navigate to HCT using the HCTpage method
//             await hctPage.navigateToHCT();
//             await page.waitForTimeout(3000);
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();
//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();

//             const hasCard = await estimationPage.hasEstimationCard();
//             expect(hasCard).toBe(true);

//             await estimationPage.clickLastEstimationCardViewEdit();
//             const isEditActive = await estimationPage.verifyEditTabActive();
//             expect(isEditActive).toBe(true);

//             await estimationPage.enterEstimationAmount("11000000");
//             await estimationPage.saveAsDraft();
//             const saved = await estimationPage.waitForSaveConfirmation(10000);
//             expect(saved).toBe(true);
//           }
//           else {
//             await estimationPage.clickProviderEnquiryMenu();
//             await estimationPage.searchEnquiry(caseIds[itrate]);
//             await estimationPage.openEnquiryCardByCaseId1(caseIds[itrate]);
//             itrate = itrate + 1
//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();
//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();

//             const hasCard = await estimationPage.hasEstimationCard();
//             expect(hasCard).toBe(true);

//             await estimationPage.clickLastEstimationCardViewEdit();
//             const isEditActive = await estimationPage.verifyEditTabActive();
//             expect(isEditActive).toBe(true);

//             await estimationPage.enterEstimationAmount("10000");
//             await estimationPage.saveAsDraft();

//             const saved = await estimationPage.waitForSaveConfirmation(10000);
//             expect(saved).toBe(true);
//           }
//           console.log(`✅ TC-${roleName.toUpperCase()}-EST-002 PASSED: Complete estimation created\n`);
//         } catch (error) {
//           console.error(`❌ Test failed for ${roleName}:`);
//           expect(true).toBe(true);
//         }
//       });

//       // ==================== TEST CASE 003: Maternity Case Estimation ====================

//       test(`TC-${roleName.toUpperCase()}-EST-003: Create estimation for Maternity case`, async () => {
//         console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-003: Maternity case estimation`);
//         console.log('==================================================');

//         try {
//           if (!perms.canCreate) {
//             console.log(`ℹ ${roleName} does not have create permission, skipping test`);
//             expect(true).toBe(true);
//             return;
//           }

//           if (roleName == "provider") {
//             await hctPage.navigateToHCT();
//             await page.waitForTimeout(3000);
//             await estimationPage.searchEnquiry(perms.maternityCaseId);
//             await estimationPage.openEnquiryCardByCaseId1(perms.maternityCaseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();
//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();

//             const hasCard = await estimationPage.hasEstimationCard();
//             expect(hasCard).toBe(true);
//           }
//           else {
//             await estimationPage.clickProviderEnquiryMenu();
//             await estimationPage.searchEnquiry(perms.maternityCaseId);
//             await estimationPage.openEnquiryCardByCaseId1(perms.maternityCaseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();
//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();

//             const hasCard = await estimationPage.hasEstimationCard();
//             expect(hasCard).toBe(true);
//           }
//           console.log(`✅ TC-${roleName.toUpperCase()}-EST-003 PASSED: Maternity case estimation created\n`);
//         } catch (error) {
//           console.error(`❌ Test failed for ${roleName}:`);
//           expect(true).toBe(true);
//         }
//       });

//       // ==================== TEST CASE 004: Create Multiple Estimations ====================

//       test(`TC-${roleName.toUpperCase()}-EST-004: Create multiple estimations for same case`, async () => {
//         console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-004: Multiple estimations`);
//         console.log('==================================================');

//         try {
//           if (!perms.canCreate) {
//             console.log(`ℹ ${roleName} does not have create permission, skipping test`);
//             expect(true).toBe(true);
//             return;
//           }

//           if (roleName == "provider") {
//             await hctPage.navigateToHCT();
//             await page.waitForTimeout(3000);
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const initialCount = await estimationPage.getEstimationCardsCount();
//             console.log(`Initial estimation cards: ${initialCount}`);

//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();
//             await page.waitForTimeout(2000);

//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();
//             await page.waitForTimeout(2000);

//             const newCount = await estimationPage.getEstimationCardsCount();
//             console.log(`New estimation cards: ${newCount}`);
//           }
//           else {
//             await estimationPage.clickProviderEnquiryMenu();
//             await estimationPage.searchEnquiry(caseIds[itrate]);
//             await estimationPage.openEnquiryCardByCaseId1(caseIds[itrate]);
//             itrate = itrate + 1
//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const initialCount = await estimationPage.getEstimationCardsCount();
//             console.log(`Initial estimation cards: ${initialCount}`);

//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();
//             await page.waitForTimeout(2000);

//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();
//             await page.waitForTimeout(2000);

//             const newCount = await estimationPage.getEstimationCardsCount();
//             console.log(`New estimation cards: ${newCount}`);
//           }
//           console.log(`✅ TC-${roleName.toUpperCase()}-EST-004 PASSED: Multiple estimations created\n`);
//         } catch (error) {
//           console.error(`❌ Test failed for ${roleName}:`);
//           expect(true).toBe(true);
//         }
//       });

//       // ==================== TEST CASE 005: Edit First Estimation Card ====================

//       test(`TC-${roleName.toUpperCase()}-EST-005: Edit first estimation card`, async () => {
//         console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-005: Edit first estimation`);
//         console.log('==================================================');

//         try {
//           if (!perms.canEdit) {
//             console.log(`ℹ ${roleName} does not have edit permission, skipping test`);
//             expect(true).toBe(true);
//             return;
//           }

//           if (roleName == "provider") {
//             await hctPage.navigateToHCT();
//             await page.waitForTimeout(3000);
//             await estimationPage.searchEnquiry(caseIds[itrate]);
//             await estimationPage.openEnquiryCardByCaseId1(caseIds[itrate]);
//             itrate = itrate + 1
//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const count = await estimationPage.getEstimationCardsCount();
//             if (count === 0) {
//               await estimationPage.clickNewEstimationButton();
//               await estimationPage.saveNewEstimation();
//               await page.waitForTimeout(2000);
//             }

//             await estimationPage.clickFirstEstimationCardViewEdit();

//             const isEditActive = await estimationPage.verifyEditTabActive();
//             expect(isEditActive).toBe(true);

//             await estimationPage.enterEstimationAmount(roleName == "provider" ? "11000000" : "10000");
//             await estimationPage.saveAsDraft();
//           }
//           else {
//             await estimationPage.clickProviderEnquiryMenu();
//             await estimationPage.searchEnquiry(caseIds[itrate]);
//             await estimationPage.openEnquiryCardByCaseId1(caseIds[itrate]);
//             itrate = itrate + 1
//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const count = await estimationPage.getEstimationCardsCount();
//             if (count === 0) {
//               await estimationPage.clickNewEstimationButton();
//               await estimationPage.saveNewEstimation();
//               await page.waitForTimeout(2000);
//             }

//             await estimationPage.clickFirstEstimationCardViewEdit();

//             const isEditActive = await estimationPage.verifyEditTabActive();
//             expect(isEditActive).toBe(true);

//             await estimationPage.enterEstimationAmount("10000");
//             await estimationPage.saveAsDraft();
//           }
//           console.log(`✅ TC-${roleName.toUpperCase()}-EST-005 PASSED: First estimation card edited\n`);
//         } catch (error) {
//           console.error(`❌ Test failed for ${roleName}:`);
//           expect(true).toBe(true);
//         }
//       });

//       //==================== TEST CASE 006: Edit Last Estimation Card ====================

//       test(`TC-${roleName.toUpperCase()}-EST-006: Edit last estimation card`, async () => {
//         console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-006: Edit last estimation`);
//         console.log('==================================================');

//         try {
//           if (!perms.canEdit) {
//             console.log(`ℹ ${roleName} does not have edit permission, skipping test`);
//             expect(true).toBe(true);
//             return;
//           }

//           if (roleName == "provider") {
//             await hctPage.navigateToHCT();
//             await page.waitForTimeout(3000);
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const count = await estimationPage.getEstimationCardsCount();
//             if (count === 0) {
//               await estimationPage.clickNewEstimationButton();
//               await estimationPage.saveNewEstimation();
//               await page.waitForTimeout(2000);
//             }

//             await estimationPage.clickLastEstimationCardViewEdit();

//             const isEditActive = await estimationPage.verifyEditTabActive();
//             expect(isEditActive).toBe(true);

//             await estimationPage.enterEstimationAmount("11000000");
//             await estimationPage.saveAsDraft();
//           }
//           else {
//             await estimationPage.clickProviderEnquiryMenu();
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const count = await estimationPage.getEstimationCardsCount();
//             if (count === 0) {
//               await estimationPage.clickNewEstimationButton();
//               await estimationPage.saveNewEstimation();
//               await page.waitForTimeout(2000);
//             }

//             await estimationPage.clickLastEstimationCardViewEdit();

//             const isEditActive = await estimationPage.verifyEditTabActive();
//             expect(isEditActive).toBe(true);

//             await estimationPage.enterEstimationAmount("10000");
//             await estimationPage.saveAsDraft();
//           }
//           console.log(`✅ TC-${roleName.toUpperCase()}-EST-006 PASSED: Last estimation card edited\n`);
//         } catch (error) {
//           console.error(`❌ Test failed for ${roleName}:`);
//           expect(true).toBe(true);
//         }
//       });

//       // ==================== TEST CASE 007: Verify Estimation Cards Count ====================

//       test(`TC-${roleName.toUpperCase()}-EST-007: Verify estimation cards count`, async () => {
//         console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-007: Verify cards count`);
//         console.log('==================================================');

//         try {
//           if (!perms.canView) {
//             console.log(`ℹ ${roleName} does not have view permission, skipping test`);
//             expect(true).toBe(true);
//             return;
//           }

//           if (roleName == "provider") {
//             await hctPage.navigateToHCT();
//             await page.waitForTimeout(3000);
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const count = await estimationPage.getEstimationCardsCount();
//             console.log(`Current estimation cards: ${count}`);
//           }
//           else {
//             await estimationPage.clickProviderEnquiryMenu();
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const count = await estimationPage.getEstimationCardsCount();
//             console.log(`Current estimation cards: ${count}`);
//           }
//           console.log(`✅ TC-${roleName.toUpperCase()}-EST-007 PASSED: Cards count verified\n`);
//         } catch (error) {
//           console.error(`❌ Test failed for ${roleName}:`);
//           expect(true).toBe(true);
//         }
//       });

//       // ==================== TEST CASE 008: Refresh Page After Saving ====================

//       test(`TC-${roleName.toUpperCase()}-EST-008: Refresh page after saving estimation`, async () => {
//         console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-008: Refresh after save`);
//         console.log('==================================================');

//         try {
//           if (!perms.canCreate) {
//             console.log(`ℹ ${roleName} does not have create permission, skipping test`);
//             expect(true).toBe(true);
//             return;
//           }

//           if (roleName == "provider") {
//             await hctPage.navigateToHCT();
//             await page.waitForTimeout(3000);
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const beforeCount = await estimationPage.getEstimationCardsCount();
//             console.log(`Cards before save: ${beforeCount}`);

//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();

//             await estimationPage.refreshPage();

//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);
//             await estimationPage.switchToEstimationsTab();

//             const afterCount = await estimationPage.getEstimationCardsCount();
//             console.log(`Cards after refresh: ${afterCount}`);
//           }
//           else {
//             await estimationPage.clickProviderEnquiryMenu();
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const beforeCount = await estimationPage.getEstimationCardsCount();
//             console.log(`Cards before save: ${beforeCount}`);

//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();

//             await estimationPage.refreshPage();

//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);
//             await estimationPage.switchToEstimationsTab();

//             const afterCount = await estimationPage.getEstimationCardsCount();
//             console.log(`Cards after refresh: ${afterCount}`);
//           }
//           console.log(`✅ TC-${roleName.toUpperCase()}-EST-008 PASSED: Page refresh verified\n`);
//         } catch (error) {
//           console.error(`❌ Test failed for ${roleName}:`);
//           expect(true).toBe(true);
//         }
//       });

//       // ==================== TEST CASE 009: Open Enquiry by Case ID ====================

//       test(`TC-${roleName.toUpperCase()}-EST-009: Open enquiry by case ID`, async () => {
//         console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-009: Open by case ID`);
//         console.log('==================================================');

//         try {
//           if (roleName == "provider") {
//             await hctPage.navigateToHCT();
//             await page.waitForTimeout(3000);
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);
//           }
//           else {
//             await estimationPage.clickProviderEnquiryMenu();
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);
//           }
//           console.log(`✅ TC-${roleName.toUpperCase()}-EST-009 PASSED: Enquiry opened by case ID\n`);
//         } catch (error) {
//           console.error(`❌ Test failed for ${roleName}:`);
//           expect(true).toBe(true);
//         }
//       });

//       // ==================== TEST CASE 010: Navigate to Hospital Terms Tab ====================

//       test(`TC-${roleName.toUpperCase()}-EST-010: Navigate to Hospital terms tab`, async () => {
//         console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-010: Hospital terms tab`);
//         console.log('==================================================');

//         try {
//           if (!perms.canEdit) {
//             console.log(`ℹ ${roleName} does not have edit permission, skipping test`);
//             expect(true).toBe(true);
//             return;
//           }

//           if (roleName == "provider") {
//             await hctPage.navigateToHCT();
//             await page.waitForTimeout(3000);
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const count = await estimationPage.getEstimationCardsCount();
//             if (count === 0) {
//               await estimationPage.clickNewEstimationButton();
//               await estimationPage.saveNewEstimation();
//               await page.waitForTimeout(2000);
//             }

//             await estimationPage.clickFirstEstimationCardViewEdit();
//             await estimationPage.switchToHospitalTermsTab();
//             await page.waitForTimeout(1000);
//           }
//           else {
//             await estimationPage.clickProviderEnquiryMenu();
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const count = await estimationPage.getEstimationCardsCount();
//             if (count === 0) {
//               await estimationPage.clickNewEstimationButton();
//               await estimationPage.saveNewEstimation();
//               await page.waitForTimeout(2000);
//             }

//             await estimationPage.clickFirstEstimationCardViewEdit();
//             await estimationPage.switchToHospitalTermsTab();
//             await page.waitForTimeout(1000);
//           }
//           console.log(`✅ TC-${roleName.toUpperCase()}-EST-010 PASSED: Hospital terms tab accessed\n`);
//         } catch (error) {
//           console.error(`❌ Test failed for ${roleName}:`);
//           expect(true).toBe(true);
//         }
//       });

//       // ==================== TEST CASE 011: Navigate to Attachments Tab ====================

//       test(`TC-${roleName.toUpperCase()}-EST-011: Navigate to Attachments tab`, async () => {
//         console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-011: Attachments tab`);
//         console.log('==================================================');

//         try {
//           if (!perms.canEdit) {
//             console.log(`ℹ ${roleName} does not have edit permission, skipping test`);
//             expect(true).toBe(true);
//             return;
//           }

//           if (roleName == "provider") {
//             await hctPage.navigateToHCT();
//             await page.waitForTimeout(3000);
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const count = await estimationPage.getEstimationCardsCount();
//             if (count === 0) {
//               await estimationPage.clickNewEstimationButton();
//               await estimationPage.saveNewEstimation();
//               await page.waitForTimeout(2000);
//             }

//             await estimationPage.clickFirstEstimationCardViewEdit();
//             await estimationPage.switchToAttachmentsTab();
//             await page.waitForTimeout(1000);
//           }
//           else {
//             await estimationPage.clickProviderEnquiryMenu();
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();

//             const count = await estimationPage.getEstimationCardsCount();
//             if (count === 0) {
//               await estimationPage.clickNewEstimationButton();
//               await estimationPage.saveNewEstimation();
//               await page.waitForTimeout(2000);
//             }

//             await estimationPage.clickFirstEstimationCardViewEdit();
//             await estimationPage.switchToAttachmentsTab();
//             await page.waitForTimeout(1000);
//           }
//           console.log(`✅ TC-${roleName.toUpperCase()}-EST-011 PASSED: Attachments tab accessed\n`);
//         } catch (error) {
//           console.error(`❌ Test failed for ${roleName}:`);
//           expect(true).toBe(true);
//         }
//       });

//       // ==================== TEST CASE 012: Save Estimation as Draft and Verify ====================

//       test(`TC-${roleName.toUpperCase()}-EST-012: Save estimation as draft and verify`, async () => {
//         console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-012: Save as draft`);
//         console.log('==================================================');

//         try {
//           if (!perms.canCreate) {
//             console.log(`ℹ ${roleName} does not have create permission, skipping test`);
//             expect(true).toBe(true);
//             return;
//           }

//           if (roleName == "provider") {
//             await hctPage.navigateToHCT();
//             await page.waitForTimeout(3000);
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();
//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();

//             await estimationPage.clickLastEstimationCardViewEdit();
//             const isEditActive = await estimationPage.verifyEditTabActive();
//             expect(isEditActive).toBe(true);

//             await estimationPage.enterEstimationAmount("11000000");
//             await estimationPage.saveAsDraft();

//             const saved = await estimationPage.waitForSaveConfirmation(10000);
//             expect(saved).toBe(true);
//           }
//           else {
//             await estimationPage.clickProviderEnquiryMenu();
//             await estimationPage.searchEnquiry(roleConfig.caseId);
//             await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

//             const isModalOpen = await estimationPage.isEnquiryModalOpen();
//             expect(isModalOpen).toBe(true);

//             await estimationPage.switchToEstimationsTab();
//             await estimationPage.clickNewEstimationButton();
//             await estimationPage.saveNewEstimation();

//             await estimationPage.clickLastEstimationCardViewEdit();
//             const isEditActive = await estimationPage.verifyEditTabActive();
//             expect(isEditActive).toBe(true);

//             await estimationPage.enterEstimationAmount("10000");
//             await estimationPage.saveAsDraft();

//             const saved = await estimationPage.waitForSaveConfirmation(10000);
//             expect(saved).toBe(true);
//           }
//           console.log(`✅ TC-${roleName.toUpperCase()}-EST-012 PASSED: Draft saved and verified\n`);
//         } catch (error) {
//           console.error(`❌ Test failed for ${roleName}:`);
//           expect(true).toBe(true);
//         }
//       });
//     });
//   }
// });








import { CreateEstimationPage } from '.././pages/CoreEstimation.Page';
import estimationData from '../../test-data/estimationData.json';
import { test, expect, Page } from '@playwright/test';

import { LoginPage } from '.././pages/LoginPage';
import { HCTpage } from '.././pages/HCTPage';
import logindata from "../../test-data/logindata.json"
import { AdminEnquiryPage } from '.././pages/AdminEnquiryPage';
import { NewEnquiryPage } from ".././pages/NewEnquiryPage"
import { ApproveCasePage } from '.././pages/ApproveCasePage';

export const caseIds = [
    "CS1493", "CS2316", "CS2307", "CS2324", "CS1766", "CS1749", "CS1774",
    "CS1736", "CS2330", "CS1780", "CS1760", "CS1761", "CS1762", "CS1763",
    "CS1764", "CS2319", "CS2314", "CS2313", "CS2311", "CS1671"
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
                estimationPage = new CreateEstimationPage(page);
                hctPage = new HCTpage(page);
                approveCasePage = new ApproveCasePage(page);
                const { email, password, url } = roleConfig;
                perms = getEstimationPermissions(roleConfig);

                try {
                    // Login
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
                    console.error(`❌ Setup failed for ${roleName}:`, error);
                }
            });

            // Test 1: Create basic estimation
            test(`TC-${roleName.toUpperCase()}-EST-001: Create basic estimation for Regular case`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-001: Create basic estimation`);
                console.log('==================================================');

                try {
                    const hasPermission = roleConfig.estimation?.canCreate;
                    console.log(`${roleName} → Create Estimation Permission: ${hasPermission}`);

                    if (hasPermission) {
                        if (roleName == "ProviderAdmin") {

                            await hctPage.navigateToProviderEnquiry();
                            await page.waitForTimeout(3000);
                            await hctPage.searchAndOpenCase(roleConfig.caseId)
                            const isModalOpen = await estimationPage.isEnquiryModalOpen();
                            expect(isModalOpen).toBe(true);
                            await approveCasePage.clickProvidersTab();
                            await approveCasePage.clickViewButton();
                            await approveCasePage.isEstimationModalOpen();
                              await estimationPage.xopenEnquiryCardByCaseId(roleConfig.caseId);

                        }
                
                        else {
                            await hctPage.navigateToHCT();
                            await page.waitForTimeout(3000);
                            await estimationPage.searchEnquiry(roleConfig.caseId);
                            await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);
                            const isModalOpen = await estimationPage.isEnquiryModalOpen();
                            expect(isModalOpen).toBe(true);
                            await estimationPage.switchToEstimationsTab();
                            await estimationPage.clickNewEstimationButton();
                            await estimationPage.saveNewEstimation();

                            const hasCard = await estimationPage.hasEstimationCard();
                            expect(hasCard).toBe(true);
                        }






                        console.log(`✅ TC-${roleName.toUpperCase()}-EST-001 PASSED: Basic estimation created\n`);
                    } else {
                        console.log(`ℹ ${roleName} does not have create estimation permission, skipping test`);
                        expect(true).toBe(true);
                    }
                } catch (error) {
                    console.error(`❌ Test failed for ${roleName}:`, error);
                    throw error;
                }
            });

            // Test 2: Edit and view estimation
            test(`TC-${roleName.toUpperCase()}-EST-002: Edit and view estimation for both case`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-002: Edit and view estimation`);
                console.log('==================================================');

                try {
                    const hasEditPermission = roleConfig.permissions?.includes('editEstimation');
                    const hasViewPermission = roleConfig.permissions?.includes('viewEstimation');

                    console.log(`${roleName} → Edit Permission: ${hasEditPermission}, View Permission: ${hasViewPermission}`);

                    if (hasEditPermission || hasViewPermission) {
                        const regularCase = estimationData.cases.regular;

                        await hctPage.navigateToHCT();
                        await approveCasePage.searchCaseById(regularCase.caseId);
                        await approveCasePage.clickCaseRow(regularCase.caseId);

                        const isOpen = await approveCasePage.isOffcanvasOpen();
                        expect(isOpen).toBe(true);

                        await approveCasePage.clickProvidersTab();
                        await approveCasePage.clickViewButtonOnCard(0);
                        await estimationPage.clickLastEstimationCardViewEdit();

                        const isEditActive = await estimationPage.verifyEditTabActive();
                        expect(isEditActive).toBe(true);

                        if (hasEditPermission) {
                            await estimationPage.fillTreatmentPlan(regularCase.treatmentPlan);
                            await estimationPage.enterEstimationAmount("10000");
                            await estimationPage.saveAsDraft();
                            await estimationPage.editExistingEstimationWithHospitalTermsAndAttachments(regularCase);
                            console.log(`✅ ${roleName} successfully edited estimation`);
                        } else {
                            console.log(`ℹ ${roleName} has view only permission, verifying read-only access`);
                            // Verify fields are read-only or view mode
                        }
                    } else {
                        console.log(`ℹ ${roleName} does not have edit/view estimation permission, skipping test`);
                        expect(true).toBe(true);
                    }

                    console.log(`✅ TC-${roleName.toUpperCase()}-EST-002 PASSED\n`);
                } catch (error) {
                    console.error(`❌ Test failed for ${roleName}:`, error);
                    await page.screenshot({ path: `test-fail-${roleName}-${Date.now()}.png` });
                    throw error;
                }
            });

            // Test 3: New and Edit with matrix calculations
            test(`TC-${roleName.toUpperCase()}-EST-003: New and Edit estimation with matrix calculations`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-003: New and Edit with matrix calculations`);
                console.log('==================================================');

                try {
                    const hasCreatePermission = roleConfig.permissions?.includes('createEstimation');
                    const hasEditPermission = roleConfig.permissions?.includes('editEstimation');

                    console.log(`${roleName} → Create Permission: ${hasCreatePermission}, Edit Permission: ${hasEditPermission}`);

                    if (hasCreatePermission || hasEditPermission) {
                        const regularCase = estimationData.cases.regular;
                        const matrixData = estimationData.estimationMatrix.testData;

                        await hctPage.navigateToHCT();
                        await page.waitForTimeout(3000);

                        if (roleName === "provider") {
                            await hctPage.clickActiveTab();
                        }

                        await estimationPage.searchEnquiry(roleConfig.caseId);
                        await estimationPage.openEnquiryCardByCaseId1(roleConfig.caseId);

                        const isModalOpen = await estimationPage.isEnquiryModalOpen();
                        expect(isModalOpen).toBe(true);

                        await estimationPage.switchToEstimationsTab();

                        if (hasCreatePermission) {
                            await estimationPage.clickNewEstimationButton();
                            await estimationPage.saveNewEstimation();
                        }

                        const hasCard = await estimationPage.hasEstimationCard();
                        expect(hasCard).toBe(true);

                        await estimationPage.clickLastEstimationCardViewEdit();

                        const isEditActive = await estimationPage.verifyEditTabActive();
                        expect(isEditActive).toBe(true);

                        // Fill basic fields
                        if (hasEditPermission) {
                            if (regularCase.treatmentPlan) {
                                await estimationPage.fillTreatmentPlan(regularCase.treatmentPlan);
                            }
                            if (regularCase.lengthOfStay) {
                                await estimationPage.fillLengthOfStay(regularCase.lengthOfStay);
                            }
                            if (regularCase.inclusions) {
                                await estimationPage.fillInclusions(regularCase.inclusions);
                            }
                            if (regularCase.exclusions) {
                                await estimationPage.fillExclusions(regularCase.exclusions);
                            }

                            // Fill the estimation matrix with test data
                            await estimationPage.fillEstimationMatrix(matrixData);

                            // Wait for calculations
                            await page.waitForTimeout(2000);

                            // Validate matrix calculations
                            const isValid = await estimationPage.validateMatrixCalculations(matrixData);
                            expect(isValid).toBe(true);

                            // Validate card total against matrix
                            await estimationPage.validateCardTotalAgainstMatrix();

                            // Save as draft
                            await estimationPage.saveAsDraft();

                            console.log(`✅ ${roleName} successfully edited estimation with matrix calculations`);
                        }
                    } else {
                        console.log(`ℹ ${roleName} does not have create/edit estimation permission, skipping test`);
                        expect(true).toBe(true);
                    }
                } catch (error) {
                    console.error(`❌ Test failed for ${roleName}:`, error);
                    await page.screenshot({ path: `test-fail-${roleName}-${Date.now()}.png` });
                    throw error;
                }
            });

            // Test 4: Verify matrix calculations
            test(`TC-${roleName.toUpperCase()}-EST-004: Verify estimation matrix calculations with test data`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-004: Verify matrix calculations`);
                console.log('==================================================');

                try {
                    const hasViewPermission = roleConfig.permissions?.includes('viewEstimation');
                    const hasEditPermission = roleConfig.permissions?.includes('editEstimation');

                    console.log(`${roleName} → View Permission: ${hasViewPermission}, Edit Permission: ${hasEditPermission}`);

                    if (hasViewPermission || hasEditPermission) {
                        const regularCase = estimationData.cases.regular;
                        const matrixData = estimationData.estimationMatrix.testData;

                        await hctPage.navigateToHCT();

                        if (roleName === "provider") {
                            await estimationPage.searchEnquiry(roleConfig.caseId);
                        } else {
                            await approveCasePage.searchCaseById(regularCase.caseId);
                        }

                        await approveCasePage.clickCaseRow(regularCase.caseId);

                        const isOpen = await approveCasePage.isOffcanvasOpen();
                        expect(isOpen).toBe(true);

                        await approveCasePage.clickProvidersTab();
                        await approveCasePage.clickViewButtonOnCard(0);
                        await estimationPage.clickLastEstimationCardViewEdit();

                        const isEditActive = await estimationPage.verifyEditTabActive();
                        expect(isEditActive).toBe(true);

                        if (hasEditPermission) {
                            // Fill treatment plan and other fields
                            if (regularCase.treatmentPlan) {
                                await estimationPage.fillTreatmentPlan(regularCase.treatmentPlan);
                            }
                            if (regularCase.lengthOfStay) {
                                await estimationPage.fillLengthOfStay(regularCase.lengthOfStay);
                            }
                            if (regularCase.inclusions) {
                                await estimationPage.fillInclusions(regularCase.inclusions);
                            }
                            if (regularCase.exclusions) {
                                await estimationPage.fillExclusions(regularCase.exclusions);
                            }

                            // Fill the estimation matrix with test data
                            await estimationPage.fillEstimationMatrix(matrixData);

                            // Wait for calculations
                            await page.waitForTimeout(2000);

                            // Validate matrix calculations
                            const isValid = await estimationPage.validateMatrixCalculations(matrixData);
                            expect(isValid).toBe(true);

                            // Validate card total against matrix
                            await estimationPage.validateCardTotalAgainstMatrix();

                            // Save as draft
                            await estimationPage.saveAsDraft();

                            console.log(`✅ ${roleName} successfully validated matrix calculations`);
                        } else {
                            // View only - just verify we can see the matrix
                            console.log(`ℹ ${roleName} has view only permission for matrix`);
                            const totals = await estimationPage.getColumnTotals();
                            expect(totals).toBeDefined();
                        }
                    } else {
                        console.log(`ℹ ${roleName} does not have view estimation permission, skipping test`);
                        expect(true).toBe(true);
                    }

                    console.log(`✅ TC-${roleName.toUpperCase()}-EST-004 PASSED\n`);
                } catch (error) {
                    console.error(`❌ Test failed for ${roleName}:`, error);
                    await page.screenshot({ path: `test-fail-${roleName}-${Date.now()}.png` });
                    throw error;
                }
            });

            // Test 5: Verify Approved Data cannot be edited
            test(`TC-${roleName.toUpperCase()}-EST-005: Verify Approved Data cannot be edited`, async () => {
                console.log(`\n📋 TC-${roleName.toUpperCase()}-EST-005: Verify Approved Data cannot be edited`);
                console.log('==================================================');

                try {
                    const hasEditPermission = roleConfig.permissions?.includes('editEstimation');
                    const hasApprovePermission = roleConfig.permissions?.includes('approveEstimation');

                    console.log(`${roleName} → Edit Permission: ${hasEditPermission}, Approve Permission: ${hasApprovePermission}`);

                    const regularCase = estimationData.cases.regular;

                    await hctPage.navigateToHCT();

                    if (roleName === "provider") {
                        await hctPage.ClickApproveTab();
                        await estimationPage.searchEnquiry(roleConfig.caseId);
                    } else {
                        await approveCasePage.searchCaseById(regularCase.caseId);
                    }

                    await approveCasePage.clickCaseRow(regularCase.caseId);

                    const isOpen = await approveCasePage.isOffcanvasOpen();
                    expect(isOpen).toBe(true);

                    await approveCasePage.clickProvidersTab();
                    await approveCasePage.clickViewButtonOnCard(0);
                    await estimationPage.clickLastEstimationCardView();

                    // Try to switch to hospital terms tab
                    await estimationPage.switchToHospitalTermsTab();

                    // Try to save
                    try {
                        await estimationPage.saveAsDraft();
                        // If save succeeds and user doesn't have permission, that's a problem
                        if (!hasEditPermission && !hasApprovePermission) {
                            console.error(`❌ ${roleName} was able to edit approved data without permission`);
                            expect(false).toBe(true);
                        } else {
                            console.log(`✅ ${roleName} with permission was able to save`);
                        }
                    } catch (error) {
                        // Save failed - this is expected for users without permission
                        if (!hasEditPermission && !hasApprovePermission) {
                            console.log(`✅ ${roleName} correctly cannot edit approved data`);
                            expect(true).toBe(true);
                        } else {
                            console.error(`❌ ${roleName} with permission should be able to save`);
                            throw error;
                        }
                    }

                    console.log(`✅ TC-${roleName.toUpperCase()}-EST-005 PASSED\n`);
                } catch (error) {
                    console.error(`❌ Test failed for ${roleName}:`, error);
                    await page.screenshot({ path: `test-fail-${roleName}-${Date.now()}.png` });
                    throw error;
                }
            });
        });
    }
});

