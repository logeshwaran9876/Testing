@regression @admin @hct @broadcast_provider
Feature: Admin HCT enquiry – search case and broadcast providers and facilitators

  Background:
    Given I navigate to "http://app.dev.mycareever.com/auth/signin?q=admin"
    When I login as admin with valid credentials
    Then I should be logged in successfully
    And I navigate to the enquiries page

  # ============================================================
  # SCENARIO 1: Broadcast Provider to a Case
  # ============================================================
  Scenario: Admin searches a New case and broadcasts a provider
    Given I am on the enquiries page
    When I search for case ID "CS1736"
    And I filter enquiries by status "New"
    Then I should see the case "CS1736" in the results

    When I click on the case "CS1736"
    Then the case details panel should open

    When I navigate to the Providers tab
    And I click on the "Add Provider" button
    Then the Add Provider modal should open

    When I enter provider name "TestProvider152"
    And I search for the provider
    Then I should see provider "TestProvider152" in the results

    When I select provider "TestProvider152"
    And I click on the "Broadcast" button
    Then the provider should be broadcasted successfully
    And I should see a broadcast success message

  # ============================================================
  # SCENARIO 2: Broadcast Facilitator to a Case
  # ============================================================
  Scenario: Admin searches a New case and broadcasts a facilitator
    Given I am on the enquiries page
    When I search for case ID "CS1766"
    And I filter enquiries by status "New"
    Then I should see the case "CS1766" in the results

    When I click on the case "CS1766"
    Then the case details panel should open

    When I navigate to the Providers tab
    And I click on the "Add Provider" button
    Then the Add Provider modal should open

    When I open the facilitator dropdown
    And I search facilitator "Lokiee.dev"
    Then I should see facilitator "Lokiee.dev" in the list

    When I select facilitator "Lokiee.dev"
    And I click on the "Broadcast" button
    Then the facilitator should be broadcasted successfully
    And I should see a broadcast success message

  # ============================================================
  # SCENARIO 3: Broadcast Facilitator with Provider
  # ============================================================
  Scenario: Admin searches a New case and broadcasts facilitator with provider
    Given I am on the enquiries page
    When I search for case ID "CS1774"
    And I filter enquiries by status "New"
    Then I should see the case "CS1774" in the results

    When I click on the case "CS1774"
    Then the case details panel should open

    When I navigate to the Providers tab
    And I click on the "Add Provider" button
    Then the Add Provider modal should open

    When I open the facilitator dropdown
    And I search facilitator "Lokiee.dev"
    And I select facilitator "Lokiee.dev"

    When I enter provider name "Loky@123"
    And I search for the provider
    Then I should see provider "Loky@123" in the results

    When I select provider "Loky@123"
    And I click on the "Broadcast" button
    Then the facilitator and provider should be broadcasted successfully
    And I should see a broadcast success message
