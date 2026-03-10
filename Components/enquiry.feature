Feature: Insurance Dashboard - New Inquiry Creation

  As an insurance agent
  I want to login and create a new inquiry
  So that I can process insurance requests for clients

  Background:
    Given I navigate to the insurance login page

  Scenario: Create new inquiry with valid member details
    When I login with valid insurance credentials
    Then I should be redirected to the dashboard
    When I click on "New Inquiry" button
    Then I should see the new inquiry form
    When I fill the inquiry form with valid member details
    And I click the "Save" button
    Then the inquiry should be created successfully
    And I should see a success message