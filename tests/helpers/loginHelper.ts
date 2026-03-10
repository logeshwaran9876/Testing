import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EstimationPage } from '../pages/EstimationPage';
import { AdminEnquiryPage} from '../pages/AdminEnquiryPage';


export async function loginAs(
  page: Page,
  username: string,
  password: string,
  url: string
): Promise<{
  loginPage: LoginPage;
  adminPage: AdminEnquiryPage;

}> {
  console.log(`\n=== Logging in as ${username} ===`);
  
  // Initialize all page objects
  const loginPage = new LoginPage(page);


  // Navigate to login page
  await loginPage.navigateToLoginPage(url);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Perform login
  await loginPage.enterEmail(username);
  await loginPage.enterPassword(password);
  await loginPage.clickGetStartedButton();

  // Wait for login to complete
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  console.log(`✅ Login successful - URL: ${page.url()}\n`);
  
  return {
    loginPage
 
  };
}

/**
 * Login as Admin
 */
export async function loginAsAdmin(page: Page) {
  return loginAs(
    page,
    process.env.ADMIN_USERNAME || 'admin@mycareever.com',
    process.env.ADMIN_PASSWORD || 'Password@123',
    process.env.ADMIN_URL || 'http://app.dev.mycareever.com/auth/signin?q=admin'
  );
}

/**
 * Login as CRM Team Lead
 */
export async function loginAsCRMLead(page: Page) {
  return loginAs(
    page,
    process.env.CRM_USERNAME || 'crm.lead@mycareever.com',
    process.env.CRM_PASSWORD || 'Password@123',
    process.env.CRM_URL || 'http://app.dev.mycareever.com/auth/signin?q'
  );
}

/**
 * Login as HNM Lead
 */
export async function loginAsHNMLead(page: Page) {
  return loginAs(
    page,
    process.env.HNM_USERNAME || 'hnm.lead@mycareever.com',
    process.env.HNM_PASSWORD || 'Password@123',
    process.env.HNM_URL || 'http://app.dev.mycareever.com/auth/signin?q'
  );
}

/**
 * Login as Case Manager
 */
export async function loginAsCaseManager(page: Page) {
  return loginAs(
    page,
    process.env.CASE_MANAGER_USERNAME || 'case.manager@mycareever.com',
    process.env.CASE_MANAGER_PASSWORD || 'Password@123',
    process.env.CASE_MANAGER_URL || 'http://app.dev.mycareever.com/auth/signin?q'
  );
}

/**
 * Login as Insurance
 */
export async function loginAsInsurance(page: Page) {
  return loginAs(
    page,
    process.env.INSURANCE_USERNAME || 'kesav@gmai.com',
    process.env.INSURANCE_PASSWORD || 'Test@123',
    process.env.INSURANCE_URL || 'http://honda.dev.mycareever.com/auth/signin'
  );
}

/**
 * Login as Provider
 */
export async function loginAsProvider(page: Page) {
  return loginAs(
    page,
    process.env.PROVIDER_USERNAME || 'provider@example.com',
    process.env.PROVIDER_PASSWORD || 'Test@123',
    process.env.PROVIDER_URL || 'http://newpro.dev.mycareever.com/auth/signin'
  );
}

/**
 * Login as Facilitator
 */
export async function loginAsFacilitator(page: Page) {
  return loginAs(
    page,
    process.env.FACILITATOR_USERNAME || 'Logeshvaran.9876@gmail.com',
    process.env.FACILITATOR_PASSWORD || 'Test@123',
    process.env.FACILITATOR_URL || 'http://newfec.dev.mycareever.com/auth/signin'
  );
}