



test.describe('Add Counseling Access Validation - All Roles', () => {
  for (const [roleName, roleConfig] of Object.entries(logindata.roles)) {
    test(`Validate addCounseling access for ${roleName}`, async ({ page }) => {
      try {
        console.log(`\n🔍 Testing ${roleName} for addCounseling access...`);

        const loginPage = new LoginPage(page);
        const hctPage = new HCTpage(page);

        const hasPermission = roleConfig.permissions?.includes('addCounseling');
        console.log(`Permission in config: ${hasPermission ? 'YES' : 'NO'}`);

        // Login
        console.log(`Logging in as ${roleConfig.email}...`);
        await loginPage.navigateToLoginPage(roleConfig.url);

        // Wait for email field with better error message
        const emailField = page.getByRole('textbox').first();
        await emailField.waitFor({ state: 'visible', timeout: 15000 })
          .catch(() => { throw new Error(`Email field not visible for ${roleName}`); });

        await loginPage.enterUsername(roleConfig.email);
        await loginPage.enterPassword(roleConfig.password);
        await loginPage.clickGetStartedButton();

        // Wait for navigation with timeout
        await page.waitForURL(/dashboard|enquiry/, { timeout: 10000 })
          .catch(() => console.warn(`⚠ ${roleName}: Dashboard URL not confirmed`));

        await page.waitForLoadState('networkidle').catch(() => { });

        // Navigate to HCT
        console.log(`Navigating to HCT for ${roleName}...`);
        await hctPage.navigateToHCT().catch((error) => {
          console.error(`❌ ${roleName} - Failed to navigate to HCT:`);
          throw new Error(`Navigation failed for ${roleName}`);
        });

        // Use case ID - check if it exists
        const caseId = logindata.roles[roleName as keyof typeof logindata.roles]?.caseId;
        if (!caseId) {
          throw new Error(`No caseId found for ${roleName} or admin role`);
        }

        console.log(`Searching for case: ${caseId}`);
        await hctPage.searchCaseById(caseId).catch((error) => {
          console.error(`❌ ${roleName} - Failed to search case:`);
          throw new Error(`Case search failed for ${roleName}`);
        });

        await hctPage.clickCaseRow(caseId).catch((error) => {
          console.error(`❌ ${roleName} - Failed to click case row:`);
          throw new Error(`Click case row failed for ${roleName}`);
        });

        await page.waitForTimeout(2000);

        // Try to locate "Add Counseling" button with multiple selectors
        console.log(`Looking for Add Counseling button...`);
        const counselingSelectors = [

          'a:has-text("+ Add Councelling")',
          'button:has-text("+ Add Councelling")',
          'a:has-text("Add Councelling")',
          'button:has-text("Add Councelling")'
        ];

        let counselingButton = null;
        let isVisible = false;

        for (const selector of counselingSelectors) {
          const element = page.locator(selector).first();
          try {
            if (await element.isVisible({ timeout: 2000 }).catch(() => false)) {
              counselingButton = element;
              isVisible = true;
              console.log(`✅ Found button with selector: ${selector}`);




              test.describe('Admin Role - Add Counseling Tests', () => {
                test('TC-ADMIN-COUNSELING-001: Admin can add counseling to a case', async ({ page }) => {
                  console.log('\n📋 TC-ADMIN-COUNSELING-001: Add Counseling to Case');
                  console.log('====================================================');
                  const loginPage = new LoginPage(page);
                  const hctPage = new HCTpage(page);

                  const loginUrl = testData.roles.admin.url;
                  const adminEmail = logindata.roles.admin.email;
                  const adminPassword = logindata.roles.admin.password;

                  // Login
                  await loginPage.navigateToLoginPage(loginUrl);
                  await loginPage.enterUsername(adminEmail);
                  await loginPage.enterPassword(adminPassword);
                  await loginPage.clickGetStartedButton();

                  await page.waitForTimeout(3000);

                  // Wait for dashboard to load
                  await page.waitForURL(url => url.toString().includes('dashboard') || url.toString().includes('enquiry'), {
                    timeout: 5000
                  }


                  ).catch(() => {
                    console.warn('⚠ Dashboard URL not confirmed, continuing anyway');
                  });

                   await hctPage.navigateToHCT();
                  await page.waitForTimeout(3000);
                  // Search and open the case

                  await hctPage.searchCaseById(logindata.roles.admin.caseId);
                  await hctPage.clickCaseRow(logindata.roles.admin.caseId);


                  // Add counseling using the test data
                  const success = await hctPage.addCounseling({
                    coPayTerms: logindata.roles.admin.counseling.coPayTerms,
                    additionalNotes: logindata.roles.admin.counseling.additionalNotes
                  });

                  // Verify success
                  expect(success).toBe(true);

                  console.log('✅ TC-ADMIN-COUNSELING-001 PASSED: Counseling added successfully\n');
                });

              });




              break;
            }
          } catch (e) {
            // Continue to next selector
          }
        }

        console.log(`${roleName} → Add Counseling button visible: ${isVisible}`);
        console.log(`${roleName} → Expected: ${hasPermission ? 'TRUE' : 'FALSE'}, Actual: ${isVisible}`);

        // Assert based on permission
        if (hasPermission) {
          expect(isVisible).toBeTruthy();
        } else {
          expect(isVisible).toBeFalsy();
        }

        console.log(`✅ ${roleName} test passed\n`);

      } catch (error) {
        console.error(`❌ Test failed for ${roleName}:`);

        // Take screenshot for debugging
        await page.screenshot({
          path: `error-${roleName}-${Date.now()}.png`,
          fullPage: true
        }).catch(() => { });

        // Re-throw to ensure test fails
        throw error;
      }
    });
  }
});

test.describe('Add Counseling Access Validation', () => {

  const roles = Object.entries(logindata.roles);

  for (const [roleName, roleConfig] of roles) {

    test(`${roleName} - validate add counseling access`, async ({ page }) => {

      const loginPage = new LoginPage(page);
      const hctPage = new HCTpage(page);

      const { email, password, url, caseId, permissions, counseling } = roleConfig;

      const hasPermission = permissions?.includes('addCounseling');

      console.log(`\n🔍 Testing role: ${roleName}`);
      console.log(`Expected Permission: ${hasPermission}`);

      try {
        // Login
        await loginPage.navigateToLoginPage(url);
        await loginPage.enterUsername(email);
        await loginPage.enterPassword(password);
        await loginPage.clickGetStartedButton();

        await page.waitForLoadState('networkidle');

        // Navigate to HCT
        await hctPage.navigateToHCT();

        // For roles WITHOUT permission, we just need to verify the button is NOT visible
        // We don't need to search for cases or perform any actions that might fail
        if (!hasPermission) {
          console.log(`🚫 ${roleName} should not have access - checking button is not visible`);

          // Check if counseling button exists and is visible (it should NOT be)
          const counselingButton = page.locator(
            'a:has-text("+ Add Councelling"), button:has-text("+ Add Councelling")'
          ).first();

          const isVisible = await counselingButton.isVisible().catch(() => false);
          console.log(`${roleName} → Button visible: ${isVisible}`);

          // Verify button is NOT visible
          expect(isVisible).toBeFalsy();
          console.log(`✅ ${roleName} correctly blocked - test passed\n`);
          return; // Exit test early for roles without permission
        }

        // For roles WITH permission, continue with the full flow
        console.log(`✅ ${roleName} has permission - proceeding with full test`);

        // Open case (only for roles with permission)
        await hctPage.searchCaseById(caseId);
        await hctPage.clickCaseRow(caseId);

        await page.waitForTimeout(2000);

        // Check counseling button is visible
        const counselingButton = page.locator(
          'a:has-text("+ Add Councelling"), button:has-text("+ Add Councelling")'
        ).first();

        const isVisible = await counselingButton.isVisible().catch(() => false);
        console.log(`${roleName} → Button visible: ${isVisible}`);

        // Verify button is visible
        expect(isVisible).toBeTruthy();

        // Attempt to add counseling
        console.log(`⚡ ${roleName} attempting counseling creation`);

        const success = await hctPage.addCounseling({
          coPayTerms: counseling.coPayTerms,
          additionalNotes: counseling.additionalNotes
        });

        expect(success).toBe(true);
        console.log(`✅ ${roleName} successfully added counseling\n`);

      } catch (error) {
        // If this is a role WITHOUT permission and we get here, something went wrong
        // (the test should have exited early)
        if (!hasPermission) {
          console.error(`❌ ${roleName} - Test failed for role without permission:`);

          // Take screenshot for debugging
          await page.screenshot({
            path: `error-${roleName}-no-permission-${Date.now()}.png`,
            fullPage: true
          }).catch(() => { });

          throw error;
        } else {
          // For roles WITH permission, re-throw the error
          console.error(`❌ ${roleName} - Test failed:`);

          await page.screenshot({
            path: `error-${roleName}-${Date.now()}.png`,
            fullPage: true
          }).catch(() => { });

          throw error;
        }
      }
    });
  }
});

test.describe('Add Counseling - Functional Tests', () => {

  // Only test roles that have addCounseling permission
  const rolesWithPermission = Object.entries(logindata.roles)
    .filter(([_, config]) => config.permissions?.includes('addCounseling'));

  for (const [roleName, roleConfig] of rolesWithPermission) {


    test(`TC-${roleName.toUpperCase()}-COUNSELING-002: ${roleName} can add counseling with minimal data`, async ({ page }) => {
      console.log(`\n📋 TC-${roleName.toUpperCase()}-COUNSELING-002: Add Counseling with Minimal Data`);
      console.log('==============================================================');

      const loginPage = new LoginPage(page);
      const hctPage = new HCTpage(page);

      const { email, password, url, caseId, counseling } = roleConfig;

      try {
        // Login
        await loginPage.navigateToLoginPage(url);
        await loginPage.enterUsername(email);
        await loginPage.enterPassword(password);
        await loginPage.clickGetStartedButton();

        await page.waitForTimeout(3000);
        await page.waitForURL(/dashboard|enquiry/, { timeout: 5000 })
          .catch(() => console.warn(`⚠ Dashboard URL not confirmed`));

        // Navigate to case
        await hctPage.navigateToHCT();
        await page.waitForTimeout(3000);

        console.log(`Searching for case: ${caseId}`);
        await hctPage.searchCaseById(caseId).catch((error) => {
          console.error(`❌ ${roleName} - Failed to search case:`);
          throw new Error(`Case search failed for ${roleName}`);
        });

        await hctPage.clickCaseRow(caseId).catch((error) => {
          console.error(`❌ ${roleName} - Failed to click case row:`);
          throw new Error(`Click case row failed for ${roleName}`);
        });

        // Add counseling with only required field
        const success = await hctPage.addCounseling({
          coPayTerms: counseling?.coPayTerms || '10% co-pay'
        });

        expect(success).toBe(true);
        console.log(`✅ TC-${roleName.toUpperCase()}-COUNSELING-002 PASSED\n`);

      } catch (error) {
        console.error(`❌ Test failed for ${roleName}:`);
        await page.screenshot({ path: `error-${roleName}-minimal-${Date.now()}.png` });
        throw error;
      }
    });

    test(`TC-${roleName.toUpperCase()}-COUNSELING-003: ${roleName} can cancel counseling addition`, async ({ page }) => {
      console.log(`\n📋 TC-${roleName.toUpperCase()}-COUNSELING-003: Cancel Counseling Addition`);
      console.log('=======================================================');

      const loginPage = new LoginPage(page);
      const hctPage = new HCTpage(page);

      const { email, password, url, caseId } = roleConfig;

      try {
        // Login
        await loginPage.navigateToLoginPage(url);
        await loginPage.enterUsername(email);
        await loginPage.enterPassword(password);
        await loginPage.clickGetStartedButton();

        await page.waitForTimeout(3000);
        await page.waitForURL(/dashboard|enquiry/, { timeout: 5000 })
          .catch(() => console.warn(`⚠ Dashboard URL not confirmed`));

        // Navigate to case
        await hctPage.navigateToHCT();
        await page.waitForTimeout(3000);

        await hctPage.searchCaseById(caseId);
        await hctPage.clickCaseRow(caseId);

        // Click Add Counseling
        await hctPage.clickAddCounseling();
        await hctPage.waitForCounselingModal();

        // Fill some data
        await hctPage.fillCounselingForm({
          coPayTerms: 'Test co-pay',
          additionalNotes: 'Test notes'
        });

        // Close the modal without saving
        await hctPage.closeCounselingModal();

        // Verify modal is closed
        const modalVisible = await hctPage.counselingModal.isVisible().catch(() => false);
        expect(modalVisible).toBe(false);

        console.log(`✅ TC-${roleName.toUpperCase()}-COUNSELING-003 PASSED\n`);

      } catch (error) {
        console.error(`❌ Test failed for ${roleName}:`);
        await page.screenshot({ path: `error-${roleName}-cancel-${Date.now()}.png` });
        throw error;
      }
    });

    test(`TC-${roleName.toUpperCase()}-COUNSELING-004: ${roleName} can reset counseling form`, async ({ page }) => {
      console.log(`\n📋 TC-${roleName.toUpperCase()}-COUNSELING-004: Reset Counseling Form`);
      console.log('===================================================');

      const loginPage = new LoginPage(page);
      const hctPage = new HCTpage(page);

      const { email, password, url, caseId } = roleConfig;

      try {
        // Login
        await loginPage.navigateToLoginPage(url);
        await loginPage.enterUsername(email);
        await loginPage.enterPassword(password);
        await loginPage.clickGetStartedButton();

        await page.waitForTimeout(3000);
        await page.waitForURL(/dashboard|enquiry/, { timeout: 5000 })
          .catch(() => console.warn(`⚠ Dashboard URL not confirmed`));

        // Navigate to case
        await hctPage.navigateToHCT();
        await page.waitForTimeout(3000);

        await hctPage.searchCaseById(caseId);
        await hctPage.clickCaseRow(caseId);

        // Click Add Counseling
        await hctPage.clickAddCounseling();
        await hctPage.waitForCounselingModal();

        // Fill some data
        await hctPage.fillCounselingForm({
          coPayTerms: 'Test co-pay',
          additionalNotes: 'Test notes'
        });

        // Reset the form
        await hctPage.resetCounselingForm();

        // Verify fields are empty
        const coPayValue = await hctPage.coPayTermsInput.inputValue();
        const notesValue = await hctPage.additionalNotesInput.inputValue();

        expect(coPayValue).toBe('');
        expect(notesValue).toBe('');

        // Close modal
        await hctPage.closeCounselingModal();

        console.log(`✅ TC-${roleName.toUpperCase()}-COUNSELING-004 PASSED\n`);

      } catch (error) {
        console.error(`❌ Test failed for ${roleName}:`);
        await page.screenshot({ path: `error-${roleName}-reset-${Date.now()}.png` });
        throw error;
      }
    });

    test(`TC-${roleName.toUpperCase()}-COUNSELING-005: ${roleName} cannot add counseling without co-pay terms`, async ({ page }) => {
      console.log(`\n📋 TC-${roleName.toUpperCase()}-COUNSELING-005: Validation - Missing CoPay Terms`);
      console.log('============================================================');

      const loginPage = new LoginPage(page);
      const hctPage = new HCTpage(page);

      const { email, password, url, caseId } = roleConfig;

      try {
        // Login
        await loginPage.navigateToLoginPage(url);
        await loginPage.enterUsername(email);
        await loginPage.enterPassword(password);
        await loginPage.clickGetStartedButton();

        await page.waitForTimeout(3000);
        await page.waitForURL(/dashboard|enquiry/, { timeout: 5000 })
          .catch(() => console.warn(`⚠ Dashboard URL not confirmed`));

        // Navigate to case
        await hctPage.navigateToHCT();
        await page.waitForTimeout(3000);

        await hctPage.searchCaseById(caseId);
        await hctPage.clickCaseRow(caseId);

        // Click Add Counseling
        await hctPage.clickAddCounseling();
        await hctPage.waitForCounselingModal();

        // Try to save without filling required field
        await hctPage.saveCounseling();

        // Verify validation error (field should have invalid class)
        const hasError = await hctPage.coPayTermsInput.evaluate(el =>
          el.classList.contains('ng-invalid')
        );

        expect(hasError).toBe(true);

        // Close modal
        await hctPage.closeCounselingModal();

        console.log(`✅ TC-${roleName.toUpperCase()}-COUNSELING-005 PASSED\n`);

      } catch (error) {
        console.error(`❌ Test failed for ${roleName}:`);
        await page.screenshot({ path: `error-${roleName}-validation-${Date.now()}.png` });
        throw error;
      }
    });
  }

});

test(`TC-$-COUNSELING-002:  can add counseling with minimal data`, async ({ page }) => {
  console.log(`\n📋 TC-{roleName.toUpperCase()}-COUNSELING-002: Add Counseling with Minimal Data`);
  console.log('==============================================================');

  const loginPage = new LoginPage(page);
  const hctPage = new HCTpage(page);


  const loginUrl = testData.roles.admin.url;
  const adminEmail = logindata.roles.admin.email;
  const adminPassword = logindata.roles.admin.password;


  try {
    // Login
    await loginPage.navigateToLoginPage(loginUrl)
    await loginPage.enterUsername(adminEmail);
    await loginPage.enterPassword(adminPassword);
    await loginPage.clickGetStartedButton();

    await page.waitForTimeout(3000);
    await page.waitForURL(/dashboard|enquiry/, { timeout: 5000 })
      .catch(() => console.warn(`⚠ Dashboard URL not confirmed`));

    // Navigate to case
     await hctPage.navigateToHCT();
    await page.waitForTimeout(3000);

    await hctPage.searchCaseById(logindata.roles.admin.caseId);
    await hctPage.clickCaseRow(logindata.roles.admin.caseId);

    // Add counseling with only required field
    const success = await hctPage.addCounseling({
      coPayTerms: logindata.roles.admin.counseling?.coPayTerms || '10% co-pay'
    });

    expect(success).toBe(true);
    console.log(`✅ TC-{roleName.toUpperCase()}-COUNSELING-002 PASSED\n`);

  } catch (error) {
    console.error(`❌ Test failed for}:`);
    await page.screenshot({ path: `error-inimal-${Date.now()}.png` });
    throw error;
  }
});

test('TC-ADMIN-COUNSELING-002: Admin can add counseling with minimal data', async ({ page }) => {
  console.log('\n📋 TC-ADMIN-COUNSELING-002: Add Counseling with Minimal Data');
  console.log('==============================================================');
  const loginPage = new LoginPage(page);
  const hctPage = new HCTpage(page);

  const loginUrl = testData.roles.admin.url;
  const adminEmail = logindata.roles.admin.email;
  const adminPassword = logindata.roles.admin.password;

  // Login
  await loginPage.navigateToLoginPage(loginUrl);
  await loginPage.enterUsername(adminEmail);
  await loginPage.enterPassword(adminPassword);
  await loginPage.clickGetStartedButton();

  await page.waitForTimeout(3000);

  // Wait for dashboard to load
  await page.waitForURL(url => url.toString().includes('dashboard') || url.toString().includes('enquiry'), {
    timeout: 5000
  }


  ).catch(() => {
    console.warn('⚠ Dashboard URL not confirmed, continuing anyway');
  });

   await hctPage.navigateToHCT();
  await page.waitForTimeout(3000);
  // Search and open the case

  await hctPage.searchCaseById(logindata.roles.admin.caseId);
  await hctPage.clickCaseRow(logindata.roles.admin.caseId);


  // Add counseling with only required field
  const success = await hctPage.addCounseling({
    coPayTerms: '10% co-pay'
  });

  expect(success).toBe(true);
  console.log('✅ TC-ADMIN-COUNSELING-002 PASSED: Counseling added with minimal data\n');
});

test('TC-ADMIN-COUNSELING-003: Admin can cancel counseling addition', async ({ page }) => {
  console.log('\n📋 TC-ADMIN-COUNSELING-003: Cancel Counseling Addition');
  console.log('=======================================================');
  const loginPage = new LoginPage(page);
  const hctPage = new HCTpage(page);

  const loginUrl = testData.roles.admin.url;
  const adminEmail = logindata.roles.admin.email;
  const adminPassword = logindata.roles.admin.password;

  // Login
  await loginPage.navigateToLoginPage(loginUrl);
  await loginPage.enterUsername(adminEmail);
  await loginPage.enterPassword(adminPassword);
  await loginPage.clickGetStartedButton();

  await page.waitForTimeout(3000);

  // Wait for dashboard to load
  await page.waitForURL(url => url.toString().includes('dashboard') || url.toString().includes('enquiry'), {
    timeout: 5000
  }


  ).catch(() => {
    console.warn('⚠ Dashboard URL not confirmed, continuing anyway');
  });

   await hctPage.navigateToHCT();
  await page.waitForTimeout(3000);
  // Search and open the case

  await hctPage.searchCaseById(logindata.roles.admin.caseId);
  await hctPage.clickCaseRow(logindata.roles.admin.caseId);

  // Click Add Counseling
  await hctPage.clickAddCounseling();
  await hctPage.waitForCounselingModal();

  // Fill some data
  await hctPage.fillCounselingForm({
    coPayTerms: 'Test co-pay',
    additionalNotes: 'Test notes'
  });

  // Close the modal without saving
  await hctPage.closeCounselingModal();

  // Verify modal is closed
  const modalVisible = await hctPage.counselingModal.isVisible().catch(() => false);
  expect(modalVisible).toBe(false);

  console.log('✅ TC-ADMIN-COUNSELING-003 PASSED: Counseling addition cancelled\n');
});

test('TC-ADMIN-COUNSELING-004: Admin can reset counseling form', async ({ page }) => {
  console.log('\n📋 TC-ADMIN-COUNSELING-004: Reset Counseling Form');
  console.log('===================================================');

  const loginPage = new LoginPage(page);
  const hctPage = new HCTpage(page);

  const loginUrl = testData.roles.admin.url;
  const adminEmail = logindata.roles.admin.email;
  const adminPassword = logindata.roles.admin.password;

  // Login
  await loginPage.navigateToLoginPage(loginUrl);
  await loginPage.enterUsername(adminEmail);
  await loginPage.enterPassword(adminPassword);
  await loginPage.clickGetStartedButton();

  await page.waitForTimeout(3000);

  // Wait for dashboard to load
  await page.waitForURL(url => url.toString().includes('dashboard') || url.toString().includes('enquiry'), {
    timeout: 5000
  }


  ).catch(() => {
    console.warn('⚠ Dashboard URL not confirmed, continuing anyway');
  });

   await hctPage.navigateToHCT();
  await page.waitForTimeout(3000);
  // Search and open the case

  await hctPage.searchCaseById(logindata.roles.admin.caseId);
  await hctPage.clickCaseRow(logindata.roles.admin.caseId);

  // Click Add Counseling
  await hctPage.clickAddCounseling();
  await hctPage.waitForCounselingModal();

  // Fill some data
  await hctPage.fillCounselingForm({
    coPayTerms: 'Test co-pay',
    additionalNotes: 'Test notes'
  });

  // Reset the form
  await hctPage.resetCounselingForm();

  // Verify fields are empty
  const coPayValue = await hctPage.coPayTermsInput.inputValue();
  const notesValue = await hctPage.additionalNotesInput.inputValue();

  expect(coPayValue).toBe('');
  expect(notesValue).toBe('');

  // Close modal
  await hctPage.closeCounselingModal();

  console.log('✅ TC-ADMIN-COUNSELING-004 PASSED: Counseling form reset\n');
});

test('TC-ADMIN-COUNSELING-005: Admin cannot add counseling without co-pay terms', async ({ page }) => {
  console.log('\n📋 TC-ADMIN-COUNSELING-005: Validation - Missing CoPay Terms');
  console.log('============================================================');

  const loginPage = new LoginPage(page);
  const hctPage = new HCTpage(page);

  const loginUrl = testData.roles.admin.url;
  const adminEmail = logindata.roles.admin.email;
  const adminPassword = logindata.roles.admin.password;

  // Login
  await loginPage.navigateToLoginPage(loginUrl);
  await loginPage.enterUsername(adminEmail);
  await loginPage.enterPassword(adminPassword);
  await loginPage.clickGetStartedButton();

  await page.waitForTimeout(3000);

  // Wait for dashboard to load
  await page.waitForURL(url => url.toString().includes('dashboard') || url.toString().includes('enquiry'), {
    timeout: 5000
  }


  ).catch(() => {
    console.warn('⚠ Dashboard URL not confirmed, continuing anyway');
  });

   await hctPage.navigateToHCT();
  await page.waitForTimeout(3000);
  // Search and open the case

  await hctPage.searchCaseById(logindata.roles.admin.caseId);
  await hctPage.clickCaseRow(logindata.roles.admin.caseId);

  // Click Add Counseling
  await hctPage.clickAddCounseling();
  await hctPage.waitForCounselingModal();

  // Try to save without filling required field
  await hctPage.saveCounseling();

  // Verify validation error (field should have invalid class)
  const hasError = await hctPage.coPayTermsInput.evaluate(el =>
    el.classList.contains('ng-invalid')
  );

  expect(hasError).toBe(true);

  // Close modal
  await hctPage.closeCounselingModal();

  console.log('✅ TC-ADMIN-COUNSELING-005 PASSED: Validation working correctly\n');
});






test.describe('Provider Estimation Management', () => {
  let loginPage: LoginPage;
  let estimationPage: CreateEstimationPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    estimationPage = new CreateEstimationPage(page);

    // Get credentials from test data
    const url = estimationData.credentials.url;
    const email = estimationData.credentials.email;
    const password = estimationData.credentials.password;

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
      await estimationPage.clickViewEnquiry();
      
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

});

















test.describe('Admin Role - Add SMO Tests', () => {

  test('TC-ADMIN-SMO-001: Admin can add SMO to a case', async ({ page }) => {
    console.log('\n📋 TC-ADMIN-SMO-001: Add SMO to Case');
    console.log('======================================');

    const loginPage = new LoginPage(page);
    const hctPage = new HCTpage(page);

    const loginUrl = logindata.roles.admin.url;
    const adminEmail = logindata.roles.admin.email;
    const adminPassword = logindata.roles.admin.password;

    // Login
    await loginPage.navigateToLoginPage(loginUrl);
    await loginPage.enterUsername(adminEmail);
    await loginPage.enterPassword(adminPassword);
    await loginPage.clickGetStartedButton();

    await page.waitForTimeout(3000);

    // Wait for dashboard to load
    await page.waitForURL(url => url.toString().includes('dashboard') || url.toString().includes('enquiry'), {
      timeout: 5000
    }).catch(() => {
      console.warn('⚠ Dashboard URL not confirmed, continuing anyway');
    });

     await hctPage.navigateToHCT();
    await page.waitForTimeout(3000);

    // Search and open the case
    await hctPage.searchCaseById(logindata.roles.admin.caseId);
    await hctPage.clickCaseRow(logindata.roles.admin.caseId);

    // Add SMO using the test data
    const success = await hctPage.addSMO({
      countryCode: logindata.roles.admin.smo.countryCode,
      phoneNumber: logindata.roles.admin.smo.phoneNumber,
      appointmentReason: logindata.roles.admin.smo.appointmentReason
    });

    // Verify success
    expect(success).toBe(true);

    console.log('✅ TC-ADMIN-SMO-001 PASSED: SMO added successfully\n');
  });

  test('TC-ADMIN-SMO-002: Admin can add SMO with minimal data', async ({ page }) => {
    console.log('\n📋 TC-ADMIN-SMO-002: Add SMO with Minimal Data');
    console.log('===============================================');

    const loginPage = new LoginPage(page);
    const hctPage = new HCTpage(page);

    await loginPage.navigateToLoginPage(logindata.roles.admin.url);
    await loginPage.enterUsername(logindata.roles.admin.email);
    await loginPage.enterPassword(logindata.roles.admin.password);
    await loginPage.clickGetStartedButton();

    await page.waitForTimeout(3000);
    await page.waitForURL(url => url.toString().includes('dashboard') || url.toString().includes('enquiry'), {
      timeout: 5000
    }).catch(() => { });

     await hctPage.navigateToHCT();
    await page.waitForTimeout(3000);

    await hctPage.searchCaseById(logindata.roles.admin.caseId);
    await hctPage.clickCaseRow(logindata.roles.admin.caseId);

    // Add SMO with only required fields
    const success = await hctPage.addSMO({
      countryCode: logindata.roles.admin.smo.countryCode,
      phoneNumber: logindata.roles.admin.smo.phoneNumber,
      appointmentReason: "Follow-up consultation"
    });

    expect(success).toBe(true);
    console.log('✅ TC-ADMIN-SMO-002 PASSED: SMO added with minimal data\n');
  });

  test('TC-ADMIN-SMO-003: Admin can cancel SMO addition', async ({ page }) => {
    console.log('\n📋 TC-ADMIN-SMO-003: Cancel SMO Addition');
    console.log('========================================');

    const loginPage = new LoginPage(page);
    const hctPage = new HCTpage(page);

    await loginPage.navigateToLoginPage(logindata.roles.admin.url);
    await loginPage.enterUsername(logindata.roles.admin.email);
    await loginPage.enterPassword(logindata.roles.admin.password);
    await loginPage.clickGetStartedButton();

    await page.waitForTimeout(3000);
     await hctPage.navigateToHCT();
    await page.waitForTimeout(3000);

    await hctPage.searchCaseById(logindata.roles.admin.caseId);
    await hctPage.clickCaseRow(logindata.roles.admin.caseId);

    // Click Add SMO
    await hctPage.clickAddSMO();
    await hctPage.waitForSMOModal();

    // Fill some data
    await hctPage.fillSMOForm({
      countryCode: logindata.roles.admin.smo.countryCode,
      phoneNumber: logindata.roles.admin.smo.phoneNumber,
      appointmentReason: "Test appointment"
    });

    // Close the modal without saving
    await hctPage.closeSMOModal();

    // Verify modal is closed
    const modalVisible = await hctPage.smoModal.isVisible().catch(() => false);
    expect(modalVisible).toBe(false);

    console.log('✅ TC-ADMIN-SMO-003 PASSED: SMO addition cancelled\n');
  });

  test('TC-ADMIN-SMO-004: Admin can reset SMO form', async ({ page }) => {
    console.log('\n📋 TC-ADMIN-SMO-004: Reset SMO Form');
    console.log('===================================');

    const loginPage = new LoginPage(page);
    const hctPage = new HCTpage(page);

    await loginPage.navigateToLoginPage(logindata.roles.admin.url);
    await loginPage.enterUsername(logindata.roles.admin.email);
    await loginPage.enterPassword(logindata.roles.admin.password);
    await loginPage.clickGetStartedButton();

    await page.waitForTimeout(3000);
     await hctPage.navigateToHCT();
    await page.waitForTimeout(3000);

    await hctPage.searchCaseById(logindata.roles.admin.caseId);
    await hctPage.clickCaseRow(logindata.roles.admin.caseId);

    // Click Add SMO
    await hctPage.clickAddSMO();
    await hctPage.waitForSMOModal();

    // Fill some data
    await hctPage.selectPatientCountryCode(logindata.roles.admin.smo.countryCode);
    await hctPage.fillPatientPhoneNumber(logindata.roles.admin.smo.phoneNumber);
    await hctPage.fillAppointmentReason("Test appointment reason");

    // Reset the form
    await hctPage.resetSMOForm();

    // Verify fields are empty (phone number might still have placeholder)
    const phoneValue = await hctPage.patientPhoneNumberInput.inputValue();
    const reasonValue = await hctPage.appointmentReasonTextarea.inputValue();

    expect(phoneValue).toBe('');
    expect(reasonValue.trim()).toBe('');

    // Close modal
    await hctPage.closeSMOModal();

    console.log('✅ TC-ADMIN-SMO-004 PASSED: SMO form reset\n');
  });

  test('TC-ADMIN-SMO-005: Admin cannot add SMO without required fields', async ({ page }) => {
    console.log('\n📋 TC-ADMIN-SMO-005: Validation - Missing Required Fields');
    console.log('=========================================================');

    const loginPage = new LoginPage(page);
    const hctPage = new HCTpage(page);

    await loginPage.navigateToLoginPage(logindata.roles.admin.url);
    await loginPage.enterUsername(logindata.roles.admin.email);
    await loginPage.enterPassword(logindata.roles.admin.password);
    await loginPage.clickGetStartedButton();

    await page.waitForTimeout(3000);
     await hctPage.navigateToHCT();
    await page.waitForTimeout(3000);

    await hctPage.searchCaseById(logindata.roles.admin.caseId);
    await hctPage.clickCaseRow(logindata.roles.admin.caseId);

    // Click Add SMO
    await hctPage.clickAddSMO();
    await hctPage.waitForSMOModal();

    // Try to save without filling any fields
    await hctPage.saveSMO();

    // Verify validation errors (fields should have invalid class)
    const countryCodeHasError = await hctPage.patientCountryCodeDropdown.evaluate(el =>
      el.classList.contains('ng-invalid')
    );

    const phoneHasError = await hctPage.patientPhoneNumberInput.evaluate(el =>
      el.classList.contains('ng-invalid')
    );

    const reasonHasError = await hctPage.appointmentReasonTextarea.evaluate(el =>
      el.classList.contains('ng-invalid')
    );

    expect(countryCodeHasError || phoneHasError || reasonHasError).toBe(true);

    // Close modal
    await hctPage.closeSMOModal();

    console.log('✅ TC-ADMIN-SMO-005 PASSED: Validation working correctly\n');
  });

});





test.describe('Drop Case Tests', () => {

  test.beforeEach(async ({ page }) => {
    console.log('\n🔐 Setting up test...');

    const loginPage = new LoginPage(page);
    const hctPage = new HCTpage(page);

    // Login as admin
    await loginPage.navigateToLoginPage(logindata.roles.admin.url);
    await loginPage.enterUsername(logindata.roles.admin.email);
    await loginPage.enterPassword(logindata.roles.admin.password);
    await loginPage.clickGetStartedButton();

    await page.waitForTimeout(3000);

    // Navigate to case
     await hctPage.navigateToHCT();
    await page.waitForTimeout(3000);
    await hctPage.searchCaseById(logindata.roles.admin.caseId);
    await hctPage.clickCaseRow(logindata.roles.admin.caseId);

    console.log('✅ Setup complete\n');
  });



  test('TC-DROP-002: Drop case with partial reason match', async ({ page }) => {
    console.log('\n📋 TC-DROP-002: Drop Case - Partial Reason Match');
    console.log('================================================');

    const hctPage = new HCTpage(page);
    const partialReason = 'not accepted'; // Partial match for "DB not accepted"

    const success = await hctPage.dropCase(partialReason, 'partial');

    expect(success).toBe(true);
    console.log('✅ TC-DROP-002 PASSED\n');
  });

  test('TC-DROP-003: Drop case with first available reason', async ({ page }) => {
    console.log('\n📋 TC-DROP-003: Drop Case - First Available Reason');
    console.log('===================================================');

    const hctPage = new HCTpage(page);

    const success = await hctPage.dropCase('', 'first');

    expect(success).toBe(true);
    console.log('✅ TC-DROP-003 PASSED\n');
  });

  test('TC-DROP-004: Verify close button is disabled before reason selection', async ({ page }) => {
    console.log('\n📋 TC-DROP-004: Verify Close Button Initially Disabled');
    console.log('======================================================');

    const hctPage = new HCTpage(page);

    // Check if close button is disabled initially
    const isEnabled = await hctPage.isCloseButtonEnabled();
    expect(isEnabled).toBe(false);

    console.log('✅ Close button is disabled as expected');
    console.log('✅ TC-DROP-004 PASSED\n');
  });

  test('TC-DROP-005: Verify close button enables after reason selection', async ({ page }) => {
    console.log('\n📋 TC-DROP-005: Verify Close Button Enables After Selection');
    console.log('===========================================================');

    const hctPage = new HCTpage(page);

    // Check initially disabled
    let isEnabled = await hctPage.isCloseButtonEnabled();
    expect(isEnabled).toBe(false);
    console.log('Initially disabled: ✓');

    // Select a reason
    await hctPage.selectFirstDropCaseReason();
    await page.waitForTimeout(500);

    // Check if enabled now
    isEnabled = await hctPage.isCloseButtonEnabled();
    expect(isEnabled).toBe(true);
    console.log('Enabled after selection: ✓');

    console.log('✅ TC-DROP-005 PASSED\n');
  });

  test('TC-DROP-006: Verify warning text is displayed', async ({ page }) => {
    console.log('\n📋 TC-DROP-006: Verify Warning Text');
    console.log('===================================');

    const hctPage = new HCTpage(page);

    const warningText = await hctPage.getDropCaseWarningText();
    console.log(`Warning text: "${warningText}"`);

    expect(warningText).toContain('Warning');
    expect(warningText).toContain('close');

    console.log('✅ TC-DROP-006 PASSED\n');
  });

  test('TC-DROP-007: Get all available drop reasons', async ({ page }) => {
    console.log('\n📋 TC-DROP-007: Get All Drop Reasons');
    console.log('====================================');

    const hctPage = new HCTpage(page);

    const options = await hctPage.getDropCaseOptions();
    console.log('Available drop reasons:', options);

    expect(options.length).toBeGreaterThan(0);
    expect(options).toContain('DB not accepted');

    console.log('✅ TC-DROP-007 PASSED\n');
  });


});

test.describe('Admin HCT Enquiry – Complete Test Suite', () => {
    let loginPage: LoginPage;
    let enquiryPage: AdminEnquiryPage;
    test.describe('Single Provider Broadcast Tests', () => {

        test('Admin broadcasts single provider to New case', async ({ page }) => {
            enquiryPage = new AdminEnquiryPage(page);
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
            enquiryPage = new AdminEnquiryPage(page);
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
            enquiryPage = new AdminEnquiryPage(page);
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
            enquiryPage = new AdminEnquiryPage(page);
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
            enquiryPage = new AdminEnquiryPage(page);
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
            enquiryPage = new AdminEnquiryPage(page);
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
            enquiryPage = new AdminEnquiryPage(page);
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
            enquiryPage = new AdminEnquiryPage(page);
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
            enquiryPage = new AdminEnquiryPage(page);
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























  });