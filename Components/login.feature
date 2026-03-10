@regression @login @authentication @security
Feature: Multi-Role User Authentication for Healthcare Platform

  As a healthcare platform user with specific role-based access
  I want to securely authenticate using role-specific credentials
  So that I can access appropriate modules and patient data securely

  Background:
    Given the user navigates to the login page

  # ==================== POSITIVE LOGIN SCENARIOS ====================

  Scenario Outline: Successful login with email credentials
    Given the user accesses the "<Role>" login portal
    When the user enters valid email credentials for "<Role>"
    And clicks the "Get Started" login button
    Then the user should be redirected to the "<Role>" dashboard
    And the welcome message should match "<WelcomeMessage>"

    Examples:
      | Role        | WelcomeMessage               |
      | admin       | Welcome to Careever!         |
      | insurance   | Welcome to Honda Insurance!  |
      | provider    | Welcome to TestProvider152!  |
      | facilitator | Welcome to TestProvider152!  |

  Scenario Outline: Successful login with mobile number credentials
    Given the user accesses the "<Role>" login portal
    When the user enters valid mobile number credentials for "<Role>"
    And clicks the "Get Started" login button
    Then the user should be redirected to the "<Role>" dashboard
    And the welcome message should match "<WelcomeMessage>"

    Examples:
      | Role        | WelcomeMessage               |
      | admin       | Welcome to Careever!         |
      | insurance   | Welcome to Honda Insurance!  |
      | provider    | Welcome to TestProvider152!  |
      | facilitator | Welcome to TestProvider152!  |

  Scenario Outline: Successful login with Remember Me enabled
    Given the user accesses the "<Role>" login portal
    When the user enters valid credentials for "<Role>"
    And enables the "Remember Me" checkbox
    And clicks the "Get Started" login button
    Then the user should be redirected to the "<Role>" dashboard
    And session cookie should persist across browser sessions

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Successful login without Remember Me option
    Given the user accesses the "<Role>" login portal
    When the user enters valid credentials for "<Role>"
    And ensures "Remember Me" checkbox is unchecked
    And clicks the "Get Started" login button
    Then the user should be redirected to the "<Role>" dashboard
    And session should expire on browser close

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  # ==================== NEGATIVE LOGIN SCENARIOS ====================

  Scenario Outline: Login attempt with invalid email credentials
    Given the user accesses the "<Role>" login portal
    When the user enters invalid email for "<Role>"
    And enters valid password for "<Role>"
    And clicks the "Get Started" login button
    Then authentication should fail
    And error message should indicate invalid credentials
    And user should remain on login page

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Login attempt with invalid mobile credentials
    Given the user accesses the "<Role>" login portal
    When the user enters invalid mobile number for "<Role>"
    And enters valid password for "<Role>"
    And clicks the "Get Started" login button
    Then authentication should fail
    And error message should indicate invalid credentials
    And user should remain on login page

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Login attempt with invalid password
    Given the user accesses the "<Role>" login portal
    When the user enters valid username for "<Role>"
    And enters invalid password
    And clicks the "Get Started" login button
    Then authentication should fail
    And error message should indicate invalid credentials
    And user should remain on login page

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Login attempt with completely invalid credentials
    Given the user accesses the "<Role>" login portal
    When the user enters invalid username for "<Role>"
    And enters invalid password
    And clicks the "Get Started" login button
    Then authentication should fail
    And error message should indicate invalid credentials
    And user should remain on login page

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  # ==================== VALIDATION SCENARIOS ====================

  Scenario Outline: Login attempt with empty email field
    Given the user accesses the "<Role>" login portal
    When the user leaves email field empty
    And enters valid password for "<Role>"
    And clicks the "Get Started" login button
    Then form validation should prevent submission
    And email field should display required field error
    And login process should not initiate

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Login attempt with empty mobile field
    Given the user accesses the "<Role>" login portal
    When the user leaves mobile field empty
    And enters valid password for "<Role>"
    And clicks the "Get Started" login button
    Then form validation should prevent submission
    And mobile field should display required field error
    And login process should not initiate

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Login attempt with empty password field
    Given the user accesses the "<Role>" login portal
    When the user enters valid username for "<Role>"
    And leaves password field empty
    And clicks the "Get Started" login button
    Then form validation should prevent submission
    And password field should display required field error
    And login process should not initiate

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Login attempt with all fields empty
    Given the user accesses the "<Role>" login portal
    When the user leaves all fields empty
    And clicks the "Get Started" login button
    Then form validation should prevent submission
    And all fields should display required field errors
    And login process should not initiate

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Login attempt with invalid email format
    Given the user accesses the "<Role>" login portal
    When the user enters invalid email format
    And enters valid password for "<Role>"
    And clicks the "Get Started" login button
    Then form validation should prevent submission
    And email field should display format validation error
    And login process should not initiate

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Login attempt with invalid mobile format
    Given the user accesses the "<Role>" login portal
    When the user enters invalid mobile number format
    And enters valid password for "<Role>"
    And clicks the "Get Started" login button
    Then form validation should prevent submission
    And mobile field should display format validation error
    And login process should not initiate

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  # ==================== SECURITY & EDGE CASE SCENARIOS ====================

  Scenario Outline: Account lockout after multiple failed attempts
    Given the user accesses the "<Role>" login portal
    When the user enters invalid credentials
    And clicks the "Get Started" login button repeatedly
    Then after exceeding maximum failed attempts
    The account should be temporarily locked
    And appropriate lockout message should be displayed

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Password field character masking
    Given the user accesses the "<Role>" login portal
    When the user types in the password field
    Then all characters should be masked
    And actual password should not be visible

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Session persistence with Remember Me
    Given the user has logged in with "Remember Me" enabled as "<Role>"
    When the user closes the browser
    And reopens the "<Role>" login portal
    Then the user should be automatically authenticated
    And redirected to the "<Role>" dashboard

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: No session persistence without Remember Me
    Given the user has logged in without "Remember Me" as "<Role>"
    When the user closes the browser
    And reopens the "<Role>" login portal
    Then the user should see the login form
    And must re-enter credentials

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Prevent back navigation after logout
    Given the user has logged out as "<Role>"
    When the user clicks browser back button
    Then the user should not see cached dashboard
    And should be redirected to login page

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Direct dashboard access without authentication
    Given the user is not authenticated
    When the user attempts to access "<Role>" dashboard directly
    Then the user should be redirected to login page
    And authentication should be required

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Concurrent sessions from different browsers
    Given a user is logged in as "<Role>" in one browser
    When the same user logs in as "<Role>" in another browser
    Then the system should handle concurrent sessions
    According to security policy for "<Role>"

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Input trimming for leading/trailing spaces
    Given the user accesses the "<Role>" login portal
    When the user enters username with leading spaces
    And enters password with trailing spaces
    And clicks the "Get Started" login button
    Then input should be automatically trimmed
    And login should succeed if trimmed credentials are valid

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Case sensitivity for credentials
    Given the user accesses the "<Role>" login portal
    When the user enters valid username with different case
    And enters valid password with different case
    And clicks the "Get Started" login button
    Then authentication should fail
    And case sensitivity error should be apparent

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Session timeout after inactivity
    Given the user has logged in as "<Role>" without "Remember Me"
    When the user remains inactive beyond session timeout
    Then the session should expire automatically
    And user should be redirected to login page

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Maintain session with Remember Me during inactivity
    Given the user has logged in as "<Role>" with "Remember Me"
    When the user remains inactive beyond normal session timeout
    Then the session should persist
    And user should remain authenticated

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Clear form after failed login attempt
    Given the user has failed a login attempt as "<Role>"
    When the user returns to login page
    Then the username field should be cleared
    And the password field should be cleared
    And error message should be removed

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |

  Scenario Outline: Browser refresh maintains form state
    Given the user has entered partial credentials as "<Role>"
    When the user refreshes the browser page
    Then the form should retain entered values
    Unless "Remember Me" determines otherwise

    Examples:
      | Role        |
      | admin       |
      | insurance   |
      | provider    |
      | facilitator |