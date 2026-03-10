Feature: Approve HCT Enquiry Estimation

As an Admin
I want to review and approve provider estimations
So that cases can move forward in the workflow

Background:
Given Admin is logged into the HCT application
And Admin navigates to the enquiry dashboard

 

✅ Scenario 1: Admin approves estimation for a Regular case

Given Admin is logged in
And Admin is on the enquiry dashboard

When Admin clicks on "View enquiry" button
And Admin searches for case ID "CS1734"
And Admin opens the case details
And Admin clicks on "View" estimation button
Then Estimation modal should be displayed
And Estimation card should be visible with patient details
And Estimation cost should be displayed

When Admin clicks on "Approve" button
Then Estimation should be approved successfully
And success confirmation should be shown
And estimation status should update to "Approved"

 

🤰 Scenario 2: Admin approves estimation for a Maternity case

Given Admin is logged in
And Admin is on the enquiry dashboard

When Admin clicks on "View enquiry" button
And Admin searches for case ID "CS1766"
And Admin opens the case details
And Admin clicks on "View" estimation button
Then Estimation modal should be displayed
And Estimation card should be visible with patient details
And Estimation cost should be displayed

When Admin clicks on "Approve" button
Then Estimation should be approved successfully
And success confirmation should be shown
And estimation status should update to "Approved"

 

🔄 Scenario Outline: Admin approves estimations for different case types (Data-driven)

Given Admin is logged in
And Admin is on the enquiry dashboard

When Admin clicks on "View enquiry" button
And Admin searches for case ID "<caseId>"
And Admin opens the case details
And Admin clicks on "View" estimation button
Then Estimation modal should be displayed
And Estimation card should be visible
And Estimation cost should be displayed

When Admin clicks on "Approve" button
Then Estimation should be approved successfully
And success confirmation should be shown

