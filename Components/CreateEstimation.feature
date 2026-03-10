Feature: Provider estimation creation and update

  Background:
    Given the user navigates to NewPro portal
    And the user is logged in with valid credentials
    And the user clicks View enquiry button

  @regular
  Scenario: Create and update estimation for Regular case
    When the user searches enquiry with case id "CS1734"
    And the user opens enquiry card
    And the user opens estimations tab
    And the user clicks new estimation button
    And the user saves the new estimation
    Then the estimation card should be displayed with New status
    When the user clicks view and edit button on estimation card
    And the user is on Edit estimation tab
    And the user enters estimation amount "11000000" in the first numeric field
    And the user saves estimation as draft
    Then the estimation should be saved successfully with status as draft

  @maternity
  Scenario: Create and update estimation for Maternity case
    When the user searches enquiry with case id "CS1734"
    And the user opens enquiry card
    And the user opens estimations tab
    And the user clicks new estimation button
    And the user saves the new estimation
    Then the estimation card should be displayed with New status
    When the user clicks view and edit button on estimation card
    And the user is on Edit estimation tab
    And the user enters estimation amount "11000000" in the first numeric field
    And the user saves estimation as draft
    Then the estimation should be saved successfully with status as draft
