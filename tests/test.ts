




    // test('TC-ADMIN-002: Admin can add SMO to a case', async ({ page }) => {
    //     const { casePage, smoPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await smoPage.addSMO({
    //         smoName: 'SMO Agency',
    //         smoDate: '2026-03-16',
    //         smoNotes: 'SMO assigned for case management'
    //     });

    //     expect(await smoPage.isSMOAdded()).toBe(true);
    // });

    // test('TC-ADMIN-003: Admin can edit patient details', async ({ page }) => {
    //     const { casePage, patientPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await patientPage.editPatientDetails({
    //         phoneNumber: '9876543210',
    //         email: 'updated.patient@email.com',
    //         address: 'Updated Address, City'
    //     });

    //     expect(await patientPage.isPatientUpdated()).toBe(true);
    // });

    // test('TC-ADMIN-004: Admin can raise query on a case', async ({ page }) => {
    //     const { casePage, queryPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await queryPage.raiseQuery({
    //         queryType: 'Document Clarification',
    //         queryText: 'Please provide additional medical reports',
    //         priority: 'High'
    //     });

    //     expect(await queryPage.isQueryRaised()).toBe(true);
    // });

    // test('TC-ADMIN-005: Admin can edit patient preferences', async ({ page }) => {
    //     const { casePage, preferencePage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await preferencePage.editPreferences({
    //         preferredCountry: 'India',
    //         preferredState: 'Tamil Nadu',
    //         preferredCity: 'Chennai',
    //         preferredHospital: 'Apollo Hospital'
    //     });

    //     expect(await preferencePage.arePreferencesUpdated()).toBe(true);
    // });

    // test('TC-ADMIN-006: Admin can approve estimations', async ({ page }) => {
    //     const { casePage, estimationPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await estimationPage.approveEstimation({
    //         estimationId: 'EST123',
    //         approvalNotes: 'Estimation approved by Admin'
    //     });

    //     expect(await estimationPage.isEstimationApproved()).toBe(true);
    // });

    // test('TC-ADMIN-007: Admin can view estimation details', async ({ page }) => {
    //     const { casePage, estimationPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await estimationPage.viewEstimation('EST123');
    //     expect(await estimationPage.isEstimationDetailsVisible()).toBe(true);
    // });

    // test('TC-ADMIN-008: Admin can edit existing estimation', async ({ page }) => {
    //     const { casePage, estimationPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await estimationPage.editEstimation('EST123', {
    //         amount: '150000',
    //         description: 'Updated estimation amount'
    //     });

    //     expect(await estimationPage.isEstimationUpdated()).toBe(true);
    // });

    // test('TC-ADMIN-009: Admin can compare multiple estimations', async ({ page }) => {
    //     const { casePage, estimationPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await estimationPage.compareEstimations(['EST123', 'EST124', 'EST125']);
    //     expect(await estimationPage.isComparisonMatrixVisible()).toBe(true);
    // });

    // test('TC-ADMIN-010: Admin can view Hospital/Facilitator terms', async ({ page }) => {
    //     const { casePage, termsPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await estimationPage.openTermsTab();
    //     expect(await termsPage.areTermsVisible()).toBe(true);
    // });

    // test('TC-ADMIN-011: Admin can upload and view attachments', async ({ page }) => {
    //     const { casePage, attachmentPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await attachmentPage.uploadAttachment('test-document.pdf', 'Medical Report');

    //     expect(await attachmentPage.isAttachmentUploaded()).toBe(true);
    //     expect(await attachmentPage.canDownloadAttachment()).toBe(true);
    // });

    // test('TC-ADMIN-012: Admin can show estimation to Insurance', async ({ page }) => {
    //     const { casePage, estimationPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await estimationPage.showEstimationToInsurance('EST123');
    //     expect(await estimationPage.isSharedWithInsurance()).toBe(true);
    // });

    // test('TC-ADMIN-013: Admin can add collaborator to case', async ({ page }) => {
    //     const { casePage, collaborationPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await collaborationPage.addCollaborator('collaborator@example.com', 'Insurance');
    //     expect(await collaborationPage.isCollaboratorAdded()).toBe(true);
    // });

    // test('TC-ADMIN-014: Admin can remove collaborator from case', async ({ page }) => {
    //     const { casePage, collaborationPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await collaborationPage.removeCollaborator('collaborator@example.com');
    //     expect(await collaborationPage.isCollaboratorRemoved()).toBe(true);
    // });

    // // Additional Admin-specific tests

    // test('TC-ADMIN-015: Admin can view all dashboard tabs', async ({ page }) => {
    //     const { dashboardPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     const tabs = ['All', 'New', 'Estimation Pending', 'SLA Delay', 'Approved', 'Discharged', 'Closed'];

    //     for (const tab of tabs) {
    //         await dashboardPage.clickTab(tab);
    //         expect(await dashboardPage.isTabActive(tab)).toBe(true);
    //     }
    // });

    // test('TC-ADMIN-016: Admin can filter cases by status', async ({ page }) => {
    //     const { casePage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.filterByStatus('New');
    //     const allCasesHaveStatus = await casePage.verifyAllCasesHaveStatus('New');
    //     expect(allCasesHaveStatus).toBe(true);
    // });

    // test('TC-ADMIN-017: Admin can search cases by multiple criteria', async ({ page }) => {
    //     const { casePage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchByCaseId('CS1234');
    //     expect(await casePage.isCaseVisible('CS1234')).toBe(true);

    //     await casePage.searchByPatientName('John Doe');
    //     expect(await casePage.areSearchResultsDisplayed()).toBe(true);

    //     await casePage.searchByGopId('GOP123');
    //     expect(await casePage.areSearchResultsDisplayed()).toBe(true);
    // });

    // test('TC-ADMIN-018: Admin can export case data', async ({ page }) => {
    //     const { casePage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.exportToExcel();
    //     expect(await casePage.isExportSuccessful()).toBe(true);
    // });

    // test('TC-ADMIN-019: Admin can view audit logs', async ({ page }) => {
    //     const { auditPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await auditPage.navigateToAuditLogs();
    //     await auditPage.searchAuditLogs('CS1234');

    //     expect(await auditPage.areAuditLogsVisible()).toBe(true);
    // });

    // test('TC-ADMIN-020: Admin can manage user permissions', async ({ page }) => {
    //     const { adminPage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await adminPage.navigateToUserManagement();
    //     await adminPage.searchUser('john.doe@example.com');
    //     await adminPage.editUserPermissions({
    //         role: 'Case Manager',
    //         canAddCounseling: true,
    //         canAddSMO: true,
    //         canEditEstimation: false
    //     });

    //     expect(await adminPage.arePermissionsUpdated()).toBe(true);
    // });

    // test('TC-ADMIN-021: Admin can reassign cases', async ({ page }) => {
    //     const { casePage } = await loginAs(
    //         page,
    //         testData.users.admin.username,
    //         testData.users.admin.password,
    //         testData.users.admin.url
    //     );

    //     await casePage.searchAndOpenCase('CS1234');
    //     await casePage.reassignCase('new.manager@example.com');

    //     expect(await casePage.isCaseReassigned()).toBe(true);
    // });
