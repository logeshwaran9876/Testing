import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { GopPage } from './pages/GOPPage';
import { GopEditModal } from './pages/GOPEditModal';
import testData from '../test-data/gopData.json';

test.describe('GOP Approve Tests', () => {

  const loginAs = async (
    page: any,
    username: string,
    password: string,
    url: string
  ) => {

    console.log('\n🟡 ========== SETUP START ==========');

    const loginPage = new LoginPage(page);
    const gopPage = new GopPage(page);

    console.log('🔐 Logging in...');

    await loginPage.navigateToLoginPage(url);
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickGetStartedButton();
    await page.waitForLoadState('networkidle');

    console.log('✅ Login successful - URL:', page.url());

    console.log('📍 Navigating to GOP module');
    await gopPage.navigateToGop();

    console.log('🟢 ========== SETUP COMPLETE ==========\n');

    return { loginPage, gopPage };
  };

  test('Approve GOP from Pending tab as Admin', async ({ page }) => {

    const { gopPage } = await loginAs(
      page,
      testData.users.admin.username,
      testData.users.admin.password,
      testData.users.admin.url
    );

    const gopModal = new GopEditModal(page);

    await gopPage.search(testData.users.admin.caseId);

    await expect(gopPage.tableRows.first()).toBeVisible();

    await gopPage.clickFirstRow();
    await gopModal.modal.waitFor({ state: 'visible' });

    await gopModal.fillForm({
      approvedAmountINR: testData.users.admin.pendingGOP.approvedAmountINR,
      approvedAmountAED: testData.users.admin.pendingGOP.approvedAmountAED,
      copayPercentage: testData.users.admin.pendingGOP.copayPercentage,
      contactNumber: testData.users.admin.pendingGOP.contactNumber
    });

    await gopModal.clickApprove();

  });

  test('Approve GOP from Pending tab as Facilitator', async ({ page }) => {

    const { gopPage } = await loginAs(
      page,
      testData.users.facilitator.username,
      testData.users.facilitator.password,
      testData.users.facilitator.url
    );

    const gopModal = new GopEditModal(page);

    await gopPage.search(testData.users.facilitator.caseId);

    await expect(gopPage.tableRows.first()).toBeVisible();

    await gopPage.clickFirstRow();
    await gopModal.modal.waitFor({ state: 'visible' });

    await gopModal.fillForm({
      approvedAmountINR: testData.users.facilitator.pendingGOP.approvedAmountINR,
      approvedAmountAED: testData.users.facilitator.pendingGOP.approvedAmountAED,
      copayPercentage: testData.users.facilitator.pendingGOP.copayPercentage,
      contactNumber: testData.users.facilitator.pendingGOP.contactNumber
    });

    await gopModal.clickApprove();

  });

  test('Approve GOP from Pending tab as Insurence', async ({ page }) => {

    const { gopPage } = await loginAs(
      page,
      testData.users.insurance.username,
      testData.users.insurance.password,
      testData.users.insurance.url
    );

    const gopModal = new GopEditModal(page);

    await gopPage.search(testData.users.insurance.caseId);

    await expect(gopPage.tableRows.first()).toBeVisible();

    await gopPage.clickFirstRow();
    await gopModal.modal.waitFor({ state: 'visible' });

    await gopModal.fillForm({
      approvedAmountINR: testData.users.insurance.pendingGOP.approvedAmountINR,
      approvedAmountAED: testData.users.insurance.pendingGOP.approvedAmountAED,
      copayPercentage: testData.users.insurance.pendingGOP.copayPercentage,
      contactNumber: testData.users.insurance.pendingGOP.contactNumber
    });

    await gopModal.clickApprove();

  });

 test('Approve GOP from Pending tab as Admin Complte Form Data', async ({ page }) => {
    console.log('\n=== Starting GOP Approval Test (Admin) ===');
    
    const { gopPage } = await loginAs(
      page,
      testData.users.admin.username,
      testData.users.admin.password,
      testData.users.admin.url
    );

    const gopModal = new GopEditModal(page);

    await gopPage.search(testData.users.admin.caseId);
    await expect(gopPage.tableRows.first()).toBeVisible();

    await gopPage.clickFirstRow();
    await gopModal.modal.waitFor({ state: 'visible', timeout: 15000 });

    await gopModal.fillForm({
      approvedAmountINR: testData.users.admin.pendingGOP.approvedAmountINR,
      approvedAmountAED: testData.users.admin.pendingGOP.approvedAmountAED,
      country: testData.users.admin.pendingGOP.country,
      preferredCurrencyINR: testData.users.admin.pendingGOP.preferredCurrencyINR,
      copayPercentage: testData.users.admin.pendingGOP.copayPercentage,
      copayCeilingAED: testData.users.admin.pendingGOP.copayCeilingAED,
      copayCeilingLocal: testData.users.admin.pendingGOP.copayCeilingLocal,
      gopValidity: testData.users.admin.pendingGOP.gopValidity,
      contactNumber: testData.users.admin.pendingGOP.contactNumber,
      policyNumber: testData.users.admin.pendingGOP.policyNumber,
      policyValidity: testData.users.admin.pendingGOP.policyValidity,
      dateOfAdmission: testData.users.admin.pendingGOP.dateOfAdmission,
      opdCoverage: testData.users.admin.pendingGOP.opdCoverage,
      roomCategory: testData.users.admin.pendingGOP.roomCategory
    });

    await gopModal.clickApprove();
    
    console.log('✅ GOP Approval Test (Admin) completed successfully\n');
  });

   test('Approve GOP from Pending tab as Facilitator Complte Form Data', async ({ page }) => {
    console.log('\n=== Starting GOP Approval Test (Admin) ===');
    
    const { gopPage } = await loginAs(
      page,
      testData.users.admin.username,
      testData.users.admin.password,
      testData.users.admin.url
    );

    const gopModal = new GopEditModal(page);

    await gopPage.search(testData.users.admin.caseId);
    await expect(gopPage.tableRows.first()).toBeVisible();

    await gopPage.clickFirstRow();
    await gopModal.modal.waitFor({ state: 'visible', timeout: 15000 });

    await gopModal.fillForm({
      approvedAmountINR: testData.users.admin.pendingGOP.approvedAmountINR,
      approvedAmountAED: testData.users.admin.pendingGOP.approvedAmountAED,
      country: testData.users.admin.pendingGOP.country,
      preferredCurrencyINR: testData.users.admin.pendingGOP.preferredCurrencyINR,
      copayPercentage: testData.users.admin.pendingGOP.copayPercentage,
      copayCeilingAED: testData.users.admin.pendingGOP.copayCeilingAED,
      copayCeilingLocal: testData.users.admin.pendingGOP.copayCeilingLocal,
      gopValidity: testData.users.admin.pendingGOP.gopValidity,
      contactNumber: testData.users.admin.pendingGOP.contactNumber,
      policyNumber: testData.users.admin.pendingGOP.policyNumber,
      policyValidity: testData.users.admin.pendingGOP.policyValidity,
      dateOfAdmission: testData.users.admin.pendingGOP.dateOfAdmission,
      opdCoverage: testData.users.admin.pendingGOP.opdCoverage,
      roomCategory: testData.users.admin.pendingGOP.roomCategory
    });

    await gopModal.clickApprove();
    
    console.log('✅ GOP Approval Test (Admin) completed successfully\n');
  });
   test('Approve GOP from Pending tab as  Insurence Complte Form Data', async ({ page }) => {
    console.log('\n=== Starting GOP Approval Test (Admin) ===');
    
    const { gopPage } = await loginAs(
      page,
      testData.users.admin.username,
      testData.users.admin.password,
      testData.users.admin.url
    );

    const gopModal = new GopEditModal(page);

    await gopPage.search(testData.users.admin.caseId);
    await expect(gopPage.tableRows.first()).toBeVisible();

    await gopPage.clickFirstRow();
    await gopModal.modal.waitFor({ state: 'visible', timeout: 15000 });

    await gopModal.fillForm({
      approvedAmountINR: testData.users.admin.pendingGOP.approvedAmountINR,
      approvedAmountAED: testData.users.admin.pendingGOP.approvedAmountAED,
      country: testData.users.admin.pendingGOP.country,
      preferredCurrencyINR: testData.users.admin.pendingGOP.preferredCurrencyINR,
      copayPercentage: testData.users.admin.pendingGOP.copayPercentage,
      copayCeilingAED: testData.users.admin.pendingGOP.copayCeilingAED,
      copayCeilingLocal: testData.users.admin.pendingGOP.copayCeilingLocal,
      gopValidity: testData.users.admin.pendingGOP.gopValidity,
      contactNumber: testData.users.admin.pendingGOP.contactNumber,
      policyNumber: testData.users.admin.pendingGOP.policyNumber,
      policyValidity: testData.users.admin.pendingGOP.policyValidity,
      dateOfAdmission: testData.users.admin.pendingGOP.dateOfAdmission,
      opdCoverage: testData.users.admin.pendingGOP.opdCoverage,
      roomCategory: testData.users.admin.pendingGOP.roomCategory
    });

    await gopModal.clickApprove();
    
    console.log('✅ GOP Approval Test (Admin) completed successfully\n');
  });
});