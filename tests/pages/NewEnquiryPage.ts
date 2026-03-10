import { Page, Locator } from '@playwright/test';

export class NewEnquiryPage {
  readonly page: Page;

  // ==================== ERROR LOCATORS ====================
  readonly selectedCaseType: Locator;
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly stateError: Locator;
  readonly emailError: Locator;
  readonly phoneError: Locator;
  readonly ageError: Locator;
  readonly genderError: Locator;
  readonly cityError: Locator;
  readonly countryError: Locator;
  readonly caseTypeError: Locator;
  readonly dobError: Locator;
  readonly hospitalError: Locator;
  readonly treatmentError: Locator;
  readonly prefCountryError: Locator;
  readonly prefStateError: Locator;
  readonly prefCityError: Locator;

  // Generic validation errors
  readonly minLengthError: Locator;
  readonly maxLengthError: Locator;
  readonly specialCharError: Locator;
  readonly numericError: Locator;
  readonly negativeNumberError: Locator;
  readonly dateError: Locator;
  readonly formatError: Locator;
  readonly requiredError: Locator;
  readonly validationErrors: Locator;

  // Collection of all error locators
  readonly allFieldErrors: Record<string, Locator>;

  // ==================== CASE HISTORY ELEMENTS ====================
  readonly caseInfoHeader: Locator;
  readonly caseHistoryNote: Locator;
  readonly caseHistoryTable: Locator;
  readonly caseHistoryRows: Locator;
  readonly caseIdCells: Locator;
  readonly caseDateCells: Locator;
  readonly caseRadioButtons: Locator;
  readonly statusBadges: Locator;
  readonly caseHistoryContainer: Locator;
  readonly caseHistoryHeaders: Locator;
  readonly caseStatusBadges: Locator;

  // ==================== FORM ELEMENTS ====================
  readonly formContainer: Locator;
  readonly memberIdInput: Locator;
  readonly searchButton: Locator;
  readonly newEnquiryButton: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly gender: Locator;
  readonly age: Locator;
  readonly dob: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly hospital: Locator;
  readonly treatment: Locator;
  readonly caseType: Locator;
  readonly notes: Locator;
  readonly prefCountry: Locator;
  readonly prefState: Locator;
  readonly prefCity: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly toastMessage: Locator;

  // ==================== UI ELEMENTS ====================
  readonly loader: Locator;
  readonly errorMessage: Locator;
  readonly modal: Locator;
  readonly modalCloseButton: Locator;
  readonly validationError: Locator;
  readonly retryButton: Locator;
  readonly maternityFields: Locator;
  readonly duplicateWarning: Locator;
  readonly modalHeader: Locator;
  readonly modalFooter: Locator;
  readonly cancelButton: Locator;

  // ==================== FIELD MAPPING ====================
  private fieldMapping: Record<string, Locator> = {};
  private errorMapping: Record<string, Locator> = {};

  constructor(page: Page) {
    this.page = page;

    // ==================== INITIALIZE ERROR LOCATORS ====================

    // First Name Errors
    this.firstNameError = page.locator(
      'div.ng-star-inserted:has-text("First name is required"), ' +
      'div.ng-star-inserted:has-text("first name is required"), ' +
      'div.ng-star-inserted:has-text("Name is required"), ' +
      'div.ng-star-inserted:has-text("name is required"), ' +
      '.error-message:has-text("first name"), ' +
      '.invalid-feedback:has-text("first name"), ' +
      '.error:has-text("first name"), ' +
      '[class*="firstName"] .error-message, ' +
      '[class*="firstName"] .invalid-feedback, ' +
      '[class*="firstName"] div.ng-star-inserted, ' +
      '[formcontrolname="firstName"] + .error-message, ' +
      '[formcontrolname="firstName"] + .invalid-feedback, ' +
      '[formcontrolname="firstName"] + div.ng-star-inserted, ' +
      '#name + .error-message, #name + .invalid-feedback, ' +
      '#name-error, [for="name"] + .error, ' +
      '.ng-star-inserted:has-text("required"):has-text("name")'
    ).first();

    // Last Name Errors
    this.lastNameError = page.locator(
      'div.ng-star-inserted:has-text("Last name is required"), ' +
      'div.ng-star-inserted:has-text("last name is required"), ' +
      'div.ng-star-inserted:has-text("Surname is required"), ' +
      'div.ng-star-inserted:has-text("surname is required"), ' +
      '.error-message:has-text("last name"), ' +
      '.invalid-feedback:has-text("last name"), ' +
      '.error:has-text("last name"), ' +
      '.error-message:has-text("surname"), ' +
      '[class*="lastName"] .error-message, ' +
      '[class*="lastName"] .invalid-feedback, ' +
      '[class*="lastName"] div.ng-star-inserted, ' +
      '[class*="surName"] .error-message, ' +
      '[formcontrolname="lastName"] + .error-message, ' +
      '[formcontrolname="lastName"] + .invalid-feedback, ' +
      '[formcontrolname="lastName"] + div.ng-star-inserted, ' +
      '#surName + .error-message, #surName + .invalid-feedback, ' +
      '#surName-error, [for="surName"] + .error, ' +
      '.ng-star-inserted:has-text("required"):has-text("last")'
    ).first();

    // State Errors
    this.stateError = page.locator(
      'div.ng-star-inserted:has-text("State is required"), ' +
      'div.ng-star-inserted:has-text("state is required"), ' +
      '.error-message:has-text("state"), ' +
      '.invalid-feedback:has-text("state"), ' +
      '.error:has-text("state"), ' +
      '[class*="state"] .error-message, ' +
      '[class*="state"] .invalid-feedback, ' +
      '[class*="state"] div.ng-star-inserted, ' +
      '[formcontrolname="state"] + .error-message, ' +
      '[formcontrolname="state"] + .invalid-feedback, ' +
      '[formcontrolname="state"] + div.ng-star-inserted, ' +
      'app-crm-lookup[fcontrolname="state"] + .error-message, ' +
      'app-crm-lookup[fcontrolname="state"] + .invalid-feedback, ' +
      '.ng-star-inserted:has-text("required"):has-text("state")'
    ).first();

    // Email Errors
    this.emailError = page.locator(
      'div.ng-star-inserted:has-text("Email is required"), ' +
      'div.ng-star-inserted:has-text("email is required"), ' +
      'div.ng-star-inserted:has-text("Email is invalid"), ' +
      'div.ng-star-inserted:has-text("email is invalid"), ' +
      'div.ng-star-inserted:has-text("Valid email is required"), ' +
      'div.ng-star-inserted:has-text("Enter a valid email"), ' +
      '.error-message:has-text("email"), ' +
      '.invalid-feedback:has-text("email"), ' +
      '.error:has-text("email"), ' +
      '[class*="email"] .error-message, ' +
      '[formcontrolname="email"] + .error-message, ' +
      '[formcontrolname="email"] + .invalid-feedback, ' +
      '[formcontrolname="email"] + div.ng-star-inserted, ' +
      '#emailId + .error-message, #emailId + .invalid-feedback, ' +
      '#emailId-error, [for="emailId"] + .error, ' +
      '.ng-star-inserted:has-text("required"):has-text("email"), ' +
      '.ng-star-inserted:has-text("valid"):has-text("email")'
    ).first();

    // Phone Errors
    this.phoneError = page.locator(
      'div.ng-star-inserted:has-text("Phone is required"), ' +
      'div.ng-star-inserted:has-text("phone is required"), ' +
      'div.ng-star-inserted:has-text("Contact number is required"), ' +
      'div.ng-star-inserted:has-text("Mobile number is required"), ' +
      'div.ng-star-inserted:has-text("Invalid phone number"), ' +
      'div.ng-star-inserted:has-text("invalid phone"), ' +
      'div.ng-star-inserted:has-text("Phone must be 10 digits"), ' +
      '.error-message:has-text("phone"), ' +
      '.invalid-feedback:has-text("phone"), ' +
      '.error-message:has-text("contact"), ' +
      '.error-message:has-text("mobile"), ' +
      '[class*="phone"] .error-message, ' +
      '[class*="contact"] .error-message, ' +
      '[formcontrolname="phone"] + .error-message, ' +
      '[formcontrolname="contactNumber"] + .error-message, ' +
      '#contactNumber + .error-message, ' +
      '#contactNumber-error, ' +
      '.ng-star-inserted:has-text("required"):has-text("phone"), ' +
      '.ng-star-inserted:has-text("required"):has-text("contact"), ' +
      '.ng-star-inserted:has-text("invalid"):has-text("phone")'
    ).first();

    // Age Errors
    this.ageError = page.locator(
      'div.ng-star-inserted:has-text("Age is required"), ' +
      'div.ng-star-inserted:has-text("age is required"), ' +
      'div.ng-star-inserted:has-text("Invalid age"), ' +
      'div.ng-star-inserted:has-text("age must be"), ' +
      'div.ng-star-inserted:has-text("Age must be between"), ' +
      'div.ng-star-inserted:has-text("age should be"), ' +
      '.error-message:has-text("age"), ' +
      '.invalid-feedback:has-text("age"), ' +
      '[class*="age"] .error-message, ' +
      '[formcontrolname="age"] + .error-message, ' +
      '[formcontrolname="age"] + .invalid-feedback, ' +
      '#age + .error-message, #age + .invalid-feedback, ' +
      '#age-error, ' +
      '.ng-star-inserted:has-text("required"):has-text("age"), ' +
      '.ng-star-inserted:has-text("must be"):has-text("age")'
    ).first();

    // Gender Errors
    this.genderError = page.locator(
      'div.ng-star-inserted:has-text("Gender is required"), ' +
      'div.ng-star-inserted:has-text("gender is required"), ' +
      '.error-message:has-text("gender"), ' +
      '.invalid-feedback:has-text("gender"), ' +
      '[class*="gender"] .error-message, ' +
      '[formcontrolname="gender"] + .error-message, ' +
      '[formcontrolname="gender"] + .invalid-feedback, ' +
      'app-crm-lookup[fcontrolname="gender"] + .error-message, ' +
      '.ng-star-inserted:has-text("required"):has-text("gender")'
    ).first();

    // City Errors
    this.cityError = page.locator(
      'div.ng-star-inserted:has-text("City is required"), ' +
      'div.ng-star-inserted:has-text("city is required"), ' +
      '.error-message:has-text("city"), ' +
      '.invalid-feedback:has-text("city"), ' +
      '[class*="city"] .error-message, ' +
      '[formcontrolname="city"] + .error-message, ' +
      '[formcontrolname="city"] + .invalid-feedback, ' +
      'app-crm-lookup[fcontrolname="city"] + .error-message, ' +
      '.ng-star-inserted:has-text("required"):has-text("city")'
    ).first();

    // Country Errors
    this.countryError = page.locator(
      'div.ng-star-inserted:has-text("Country is required"), ' +
      'div.ng-star-inserted:has-text("country is required"), ' +
      '.error-message:has-text("country"), ' +
      '.invalid-feedback:has-text("country"), ' +
      '[class*="country"] .error-message, ' +
      '[formcontrolname="country"] + .error-message, ' +
      '[formcontrolname="country"] + .invalid-feedback, ' +
      'app-crm-lookup[fcontrolname="country"] + .error-message, ' +
      '.ng-star-inserted:has-text("required"):has-text("country")'
    ).first();

    // Case Type Errors
    this.caseTypeError = page.locator(
      'div.ng-star-inserted:has-text("Case type is required"), ' +
      'div.ng-star-inserted:has-text("case type is required"), ' +
      'div.ng-star-inserted:has-text("Case is required"), ' +
      '.error-message:has-text("case"), ' +
      '.invalid-feedback:has-text("case"), ' +
      '[class*="case"] .error-message, ' +
      '[formcontrolname="casetype"] + .error-message, ' +
      '[formcontrolname="casetype"] + .invalid-feedback, ' +
      'app-crm-lookup[fcontrolname="casetype"] + .error-message, ' +
      '.ng-star-inserted:has-text("required"):has-text("case")'
    ).first();

    // DOB Errors
    this.dobError = page.locator(
      'div.ng-star-inserted:has-text("Date of birth is required"), ' +
      'div.ng-star-inserted:has-text("DOB is required"), ' +
      'div.ng-star-inserted:has-text("Invalid date"), ' +
      'div.ng-star-inserted:has-text("Future date not allowed"), ' +
      'div.ng-star-inserted:has-text("Past date required"), ' +
      '.error-message:has-text("birth"), ' +
      '.invalid-feedback:has-text("dob"), ' +
      '[class*="dob"] .error-message, ' +
      '[class*="birth"] .error-message'
    ).first();

    // Hospital Errors
    this.hospitalError = page.locator(
      'div.ng-star-inserted:has-text("Hospital is required"), ' +
      'div.ng-star-inserted:has-text("hospital is required"), ' +
      '.error-message:has-text("hospital"), ' +
      '.invalid-feedback:has-text("hospital")'
    ).first();

    // Treatment Errors
    this.treatmentError = page.locator(
      'div.ng-star-inserted:has-text("Treatment is required"), ' +
      'div.ng-star-inserted:has-text("treatment is required"), ' +
      '.error-message:has-text("treatment"), ' +
      '.invalid-feedback:has-text("treatment")'
    ).first();

    // Preference Location Errors
    this.prefCountryError = page.locator(
      'div.ng-star-inserted:has-text("Preferred country is required"), ' +
      'div.ng-star-inserted:has-text("preferred country is required"), ' +
      '.error-message:has-text("preferred country")'
    ).first();

    this.prefStateError = page.locator(
      'div.ng-star-inserted:has-text("Preferred state is required"), ' +
      'div.ng-star-inserted:has-text("preferred state is required"), ' +
      '.error-message:has-text("preferred state")'
    ).first();

    this.prefCityError = page.locator(
      'div.ng-star-inserted:has-text("Preferred city is required"), ' +
      'div.ng-star-inserted:has-text("preferred city is required"), ' +
      '.error-message:has-text("preferred city")'
    ).first();

    // Generic/Min Length Errors
    this.minLengthError = page.locator(
      'div.ng-star-inserted:has-text("minimum"), ' +
      'div.ng-star-inserted:has-text("at least"), ' +
      'div.ng-star-inserted:has-text("too short"), ' +
      'div.ng-star-inserted:has-text("must be at least"), ' +
      'div.ng-star-inserted:has-text("minimum length"), ' +
      '.error-message:has-text("minimum"), ' +
      '.error-message:has-text("at least"), ' +
      '.invalid-feedback:has-text("minimum")'
    ).first();

    // Max Length Errors
    this.maxLengthError = page.locator(
      'div.ng-star-inserted:has-text("maximum"), ' +
      'div.ng-star-inserted:has-text("exceeds"), ' +
      'div.ng-star-inserted:has-text("too long"), ' +
      'div.ng-star-inserted:has-text("cannot exceed"), ' +
      'div.ng-star-inserted:has-text("must be less than"), ' +
      'div.ng-star-inserted:has-text("maximum length"), ' +
      '.error-message:has-text("maximum"), ' +
      '.error-message:has-text("too long"), ' +
      '.invalid-feedback:has-text("maximum")'
    ).first();

    // Special Character Errors
    this.specialCharError = page.locator(
      'div.ng-star-inserted:has-text("special character"), ' +
      'div.ng-star-inserted:has-text("special characters"), ' +
      'div.ng-star-inserted:has-text("only letters"), ' +
      'div.ng-star-inserted:has-text("alphabet"), ' +
      'div.ng-star-inserted:has-text("invalid character"), ' +
      'div.ng-star-inserted:has-text("accepts text only"), ' +
      'div.ng-star-inserted:has-text("letters only"), ' +
      '.error-message:has-text("special"), ' +
      '.error-message:has-text("only letters")'
    ).first();

    // Numeric Field Errors
    this.numericError = page.locator(
      'div.ng-star-inserted:has-text("must be a number"), ' +
      'div.ng-star-inserted:has-text("only numbers"), ' +
      'div.ng-star-inserted:has-text("digits only"), ' +
      'div.ng-star-inserted:has-text("numeric"), ' +
      'div.ng-star-inserted:has-text("accepts numbers only"), ' +
      '.error-message:has-text("number"), ' +
      '.error-message:has-text("digits")'
    ).first();

    // Negative Number Errors
    this.negativeNumberError = page.locator(
      'div.ng-star-inserted:has-text("positive"), ' +
      'div.ng-star-inserted:has-text("negative"), ' +
      'div.ng-star-inserted:has-text("greater than 0"), ' +
      'div.ng-star-inserted:has-text("must be positive"), ' +
      '.error-message:has-text("positive"), ' +
      '.error-message:has-text("negative")'
    ).first();

    // Date Validation Errors
    this.dateError = page.locator(
      'div.ng-star-inserted:has-text("future date"), ' +
      'div.ng-star-inserted:has-text("past date"), ' +
      'div.ng-star-inserted:has-text("invalid date"), ' +
      'div.ng-star-inserted:has-text("date format"), ' +
      '.error-message:has-text("date"), ' +
      '.invalid-feedback:has-text("date")'
    ).first();

    // Format Errors
    this.formatError = page.locator(
      'div.ng-star-inserted:has-text("invalid format"), ' +
      'div.ng-star-inserted:has-text("incorrect format"), ' +
      'div.ng-star-inserted:has-text("valid format"), ' +
      '.error-message:has-text("format")'
    ).first();

    // Required Field Errors
    this.requiredError = page.locator(
      'div.ng-star-inserted:has-text("is required"), ' +
      '.error-message:has-text("required"), ' +
      '.invalid-feedback:has-text("required")'
    ).first();

    // General validation errors collection
    this.validationErrors = page.locator(
      'div.ng-star-inserted:has-text("required"), ' +
      'div.ng-star-inserted:has-text("invalid"), ' +
      'div.ng-star-inserted:has-text("must be"), ' +
      'div.ng-star-inserted:has-text("cannot"), ' +
      '.error-message, .invalid-feedback, [class*="error"]'
    );

    // ==================== INITIALIZE CASE HISTORY LOCATORS ====================
    // FIXED: Updated to match exact HTML structure
    this.caseInfoHeader = page.locator('div.divider-text:has-text("Case info"), .case-info-header, [class*="case-info"] h4');

    this.caseHistoryNote = page.locator(
      'ngb-alert .alert-body:has-text("Please select any one of the cases below"), ' +
      '.alert-body:has-text("select any one"), ' +
      'ngb-alert:has-text("NOTE:")'
    ).first();

    this.caseHistoryTable = page.locator('app-shared-case-list table, .case-history-table, table[class*="case"]');
    this.caseHistoryRows = page.locator('app-shared-case-list tbody tr, .case-history-table tbody tr, [class*="case-row"]');

    // FIXED: Target the div containing the case ID in tbody only
    this.caseIdCells = page.locator(
      'app-shared-case-list tbody tr td:nth-child(2) div, ' +
      '.case-history-table tbody tr td:nth-child(2) div, ' +
      '[class*="case-id"] div'
    );

    // FIXED: Target the div containing the date in tbody only
    this.caseDateCells = page.locator(
      'app-shared-case-list tbody tr td:nth-child(3) div, ' +
      '.case-history-table tbody tr td:nth-child(3) div, ' +
      '[class*="case-date"] div'
    );

    this.caseRadioButtons = page.locator('app-shared-case-list tbody tr input[type="radio"], .case-selector input[type="radio"]');
    this.statusBadges = page.locator('app-shared-case-list .badge, .status-badge, [class*="status"] .badge');
    this.caseHistoryContainer = page.locator('app-shared-case-list, .case-history-container, [class*="case-history"]');

    // FIXED: Skip the first column (#) when getting headers
    this.caseHistoryHeaders = page.locator(
      'app-shared-case-list thead th:not(:first-child), ' +
      '.case-history-table thead th:not(:first-child)'
    );

    this.caseStatusBadges = page.locator('.badge-light-warning, .badge-light-secondary, .badge-light-success, .badge-light-danger');

    // ==================== INITIALIZE FORM LOCATORS ====================

    this.formContainer = page.locator('form, [role="form"], [class*="form-container"],[class*="modal-content"],[class*="modal-header"]');
    this.newEnquiryButton = page.locator('button:has-text("+New"), button:has-text("New"), button[aria-label*="New"], .new-enquiry-btn, [class*="new-enquiry"]').first();
    this.memberIdInput = page.locator('#uniqueId, input[id*="uniqueId"], input[placeholder*="Member ID"], input[name*="member"]').first();
    this.searchButton = page.getByRole('button', { name: /search|verify|find/i });
    this.firstName = page.locator('#name, input[id="name"], input[placeholder*="First Name"], [formcontrolname="firstName"]').first();
    this.lastName = page.locator('#surName, input[id="surName"], input[placeholder*="Last Name"], [formcontrolname="lastName"]').first();
    this.age = page.locator('#age, input[id="age"], input[placeholder*="Age"], [formcontrolname="age"]').first();
    this.dob = page.locator('input[placeholder*="birth"], input[name*="dob"], input[id*="dob"], input[type="date"], [formcontrolname="dob"]').first();
    this.email = page.locator('#emailId, input[id="emailId"], input[placeholder*="Email"], [formcontrolname="email"]').first();
    this.phone = page.locator('#contactNumber, input[id="contactNumber"], input[placeholder*="Phone"], [formcontrolname="phone"]').first();
    this.hospital = page.locator('input[placeholder*="Hospital"], input[name*="hospital"], [formcontrolname="hospital"]').first();
    this.treatment = page.locator('#enquiryLineOfTreatment, input[id="enquiryLineOfTreatment"], input[placeholder*="Treatment"], [formcontrolname="treatment"]').first();
    this.notes = page.locator('textarea[name*="notes"], textarea[placeholder*="Notes"], [formcontrolname="notes"]').first();
    this.gender = page.locator('app-crm-lookup[fcontrolname="gender"] ng-select, app-crm-lookup[fcontrolname="gender"] .ng-select, [formcontrolname="gender"]').first();
    this.country = page.locator('app-crm-lookup[fcontrolname="country"] ng-select, app-crm-lookup[fcontrolname="country"] .ng-select, [formcontrolname="country"]').first();
    this.state = page.locator('app-crm-lookup[fcontrolname="state"] ng-select, app-crm-lookup[fcontrolname="state"] .ng-select, [formcontrolname="state"]').first();
    this.city = page.locator('app-crm-lookup[fcontrolname="city"] ng-select, app-crm-lookup[fcontrolname="city"] .ng-select, [formcontrolname="city"]').first();
    this.prefCountry = page.locator('app-crm-lookup[fcontrolname="preferredCountry"] ng-select, app-crm-lookup[fcontrolname="preferredCountry"] .ng-select, [formcontrolname="preferredCountry"]').first();
    this.prefState = page.locator('app-crm-lookup[fcontrolname="preferredState"] ng-select, app-crm-lookup[fcontrolname="preferredState"] .ng-select, [formcontrolname="preferredState"]').first();
    this.prefCity = page.locator('app-crm-lookup[fcontrolname="preferredCity"] ng-select, app-crm-lookup[fcontrolname="preferredCity"] .ng-select, [formcontrolname="preferredCity"]').first();
    this.caseType = page.locator('app-crm-lookup[fcontrolname="casetype"] ng-select, app-crm-lookup[fcontrolname="casetype"] .ng-select, [formcontrolname="caseType"]').first();
    this.submitButton = page.locator('form button[type="submit"]:has-text("Save"), form button:has-text("Submit"), form button:has-text("Create"), button[class*="submit"]').first();
    this.successMessage = page.locator('[class*="success"], [role="status"]:has-text("success"), .alert-success, .toast-success');
    this.toastMessage = page.locator('[role="alert"], .toast, .alert');

    // ==================== INITIALIZE UI LOCATORS ====================

    this.loader = page.locator('[class*="loader"], [class*="spinner"], [role="status"]:has-text("loading"), .loading-indicator').first();
    this.errorMessage = page.locator('[class*="error"], [role="alert"]:has-text("error"), .alert-danger, .toast-error').first();
    this.modal = page.locator('[role="dialog"], .modal, [class*="modal-content"]').first();
    this.modalCloseButton = page.locator('button[aria-label="Close"], .modal-header button, .close, .btn-close').first();
    this.modalHeader = page.locator('.modal-header, [class*="modal-header"]').first();
    this.modalFooter = page.locator('.modal-footer, [class*="modal-footer"]').first();
    this.cancelButton = page.locator('button:has-text("Cancel"), .btn-cancel, button[class*="cancel"]').first();
    this.validationError = page.locator('[class*="error"], [class*="invalid"], .validation-error, .error-message').first();
    this.retryButton = page.getByRole('button', { name: /retry|try again|reload/i }).first();


    this.selectedCaseType = page.locator(
      'app-crm-lookup[fcontrolname="casetype"] .ng-value-label, ' +
      'app-crm-lookup[fcontrolname="casetype"] .ng-value span, ' +
      '[formcontrolname="caseType"] .ng-value-label, ' +
      '.ng-value-label'
    ).first();

    this.maternityFields = page.locator(
      'input[placeholder*="due date"], input[id*="dueDate"], input[name*="dueDate"], ' +
      'input[placeholder*="pregnancy"], input[id*="pregnancy"], input[name*="pregnancy"], ' +
      '[class*="maternity"] input, [class*="pregnancy"] input, ' +
      '.casetype-maternity-fields, [data-case-type="maternity"]'
    ).first();

    this.duplicateWarning = page.locator('[class*="warning"]:has-text("duplicate"), [role="alert"]:has-text("already exists"), .alert-warning:has-text("existing")').first();

    // ==================== INITIALIZE FIELD MAPPINGS ====================

    this.fieldMapping = {
      'firstName': this.firstName,
      'lastName': this.lastName,
      'state': this.state,
      'email': this.email,
      'phone': this.phone,
      'age': this.age,
      'gender': this.gender,
      'city': this.city,
      'country': this.country,
      'caseType': this.caseType,
      'dob': this.dob,
      'hospital': this.hospital,
      'treatment': this.treatment,
      'prefCountry': this.prefCountry,
      'prefState': this.prefState,
      'prefCity': this.prefCity
    };

    // ==================== INITIALIZE ERROR MAPPINGS ====================

    this.allFieldErrors = {
      'firstName': this.firstNameError,
      'lastName': this.lastNameError,
      'state': this.stateError,
      'email': this.emailError,
      'phone': this.phoneError,
      'age': this.ageError,
      'gender': this.genderError,
      'city': this.cityError,
      'country': this.countryError,
      'caseType': this.caseTypeError,
      'dob': this.dobError,
      'hospital': this.hospitalError,
      'treatment': this.treatmentError,
      'prefCountry': this.prefCountryError,
      'prefState': this.prefStateError,
      'prefCity': this.prefCityError,
      'minLength': this.minLengthError,
      'maxLength': this.maxLengthError,
      'specialChar': this.specialCharError,
      'numeric': this.numericError,
      'negativeNumber': this.negativeNumberError,
      'date': this.dateError,
      'format': this.formatError,
      'required': this.requiredError
    };
  }

  // ==================== ENHANCED VALIDATION METHODS ====================

  /**
   * Check if a specific field error is visible using field key
   */
  async isFieldErrorVisible(fieldKey: keyof typeof this.allFieldErrors): Promise<boolean> {
    const errorLocator = this.allFieldErrors[fieldKey];
    if (!errorLocator) return false;

    try {
      const isVisible = await errorLocator.isVisible().catch(() => false);
      if (isVisible) {
        console.log(`✅ Found error for ${String(fieldKey)}`);
        return true;
      }

      // Fallback: Try to find any error near the field
      if (fieldKey in this.fieldMapping) {
        const fieldLocator = this.fieldMapping[fieldKey as string];
        if (fieldLocator) {
          const nearbyError = await this.findNearbyError(fieldLocator);
          return nearbyError !== null;
        }
      }

      return false;
    } catch (error) {
      console.error(`Error checking field error for ${String(fieldKey)}:`, error);
      return false;
    }
  }

  /**
   * Check if a specific field error is visible with custom error message
   */
  async isFieldErrorWithMessage(fieldKey: keyof typeof this.allFieldErrors, errorMessage: string): Promise<boolean> {
    const fieldName = this.getFieldDisplayName(fieldKey as string);
    const errorLocator = this.page.locator(
      `div.ng-star-inserted:has-text("${errorMessage}"), ` +
      `.error-message:has-text("${errorMessage}"), ` +
      `.invalid-feedback:has-text("${errorMessage}"), ` +
      `[class*="error"]:has-text("${errorMessage}")`
    ).first();

    return await errorLocator.isVisible().catch(() => false);
  }

  /**
   * Get specific error message for a field
   */
  async getFieldErrorMessage(fieldKey: keyof typeof this.allFieldErrors): Promise<string | null> {
    const errorLocator = this.allFieldErrors[fieldKey];
    if (!errorLocator) return null;

    try {
      if (await errorLocator.isVisible()) {
        return await errorLocator.textContent();
      }

      // Try to find nearby error
      if (fieldKey in this.fieldMapping) {
        const fieldLocator = this.fieldMapping[fieldKey as string];
        if (fieldLocator) {
          return await this.findNearbyError(fieldLocator);
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get all visible validation errors
   */
  async getAllVisibleErrors(): Promise<Array<{ field: string, message: string }>> {
    const errors: Array<{ field: string, message: string }> = [];
    const errorElements = await this.validationErrors.all();

    for (const element of errorElements) {
      try {
        if (await element.isVisible()) {
          const message = (await element.textContent())?.trim() || '';

          // Determine which field this error belongs to
          let field = 'unknown';
          for (const [key, locator] of Object.entries(this.allFieldErrors)) {
            if (locator === element) {
              field = key;
              break;
            }
          }

          errors.push({ field, message });
        }
      } catch (e) {
        // Skip if element becomes detached
      }
    }

    return errors;
  }

  /**
   * Find error message near a field
   */
  private async findNearbyError(fieldLocator: Locator): Promise<string | null> {
    try {
      const fieldElement = await fieldLocator.elementHandle();
      if (!fieldElement) return null;

      const errorElement = await fieldElement.$(
        'xpath=ancestor::div[contains(@class, "form-group") or contains(@class, "field") or contains(@class, "mb-3")]' +
        '//div[contains(@class, "ng-star-inserted") or contains(@class, "error") or contains(@class, "invalid-feedback")]'
      );

      if (errorElement) {
        return await errorElement.evaluate(el => el.textContent?.trim() || null);
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Wait for a specific field error to appear
   */
  async waitForFieldError(fieldKey: keyof typeof this.allFieldErrors, timeout = 5000): Promise<boolean> {
    const errorLocator = this.allFieldErrors[fieldKey];
    if (!errorLocator) return false;

    try {
      await errorLocator.waitFor({ state: 'visible', timeout });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if any validation error is visible
   */
  async hasAnyValidationError(): Promise<boolean> {
    const count = await this.validationErrors.count();
    return count > 0;
  }

  /**
   * Get field display name from key
   */
  private getFieldDisplayName(fieldKey: string): string {
    const displayNames: Record<string, string> = {
      'firstName': 'First name',
      'lastName': 'Last name',
      'state': 'State',
      'email': 'Email',
      'phone': 'Phone',
      'age': 'Age',
      'gender': 'Gender',
      'city': 'City',
      'country': 'Country',
      'caseType': 'Case type',
      'dob': 'Date of birth',
      'hospital': 'Hospital',
      'treatment': 'Treatment'
    };

    return displayNames[fieldKey] || fieldKey;
  }

  // ==================== IMPROVED CASE HISTORY METHODS ====================

  /**
   * Check if case history note is visible with multiple fallback approaches
   */
  async isCaseHistoryNoteVisible(): Promise<boolean> {
    try {
      // Approach 1: Direct locator
      const isVisible = await this.caseHistoryNote.isVisible().catch(() => false);
      if (isVisible) return true;

      // Approach 2: Look for any alert with NOTE
      const noteByText = this.page.locator('ngb-alert:has-text("NOTE:")').first();
      if (await noteByText.isVisible().catch(() => false)) return true;

      // Approach 3: Look for alert-body with specific text
      const alertBody = this.page.locator('.alert-body:has-text("select any one")').first();
      return await alertBody.isVisible().catch(() => false);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get case history table headers (skip the # column)
   */
  async getCaseHistoryTableHeaders(): Promise<string[]> {
    const headers: string[] = [];

    try {
      // Get all header cells
      const headerElements = await this.page.locator('app-shared-case-list thead th').all();

      // Skip the first column (#) which is index 0
      for (let i = 1; i < headerElements.length; i++) {
        const text = await headerElements[i].textContent();
        if (text) headers.push(text.trim());
      }

      // If no headers found with first approach, try alternative
      if (headers.length === 0) {
        const altHeaders = await this.page.locator('.case-history-table thead th:not(:first-child)').all();
        for (const element of altHeaders) {
          const text = await element.textContent();
          if (text) headers.push(text.trim());
        }
      }

      console.log('Found headers:', headers);
    } catch (error) {
      console.error('Error getting headers:', error);
    }

    return headers;
  }

  /**
   * Get all case IDs from history (excluding header)
   */
  async getCaseIdsFromHistory(): Promise<string[]> {
    const caseIds: string[] = [];

    try {
      // Get all case ID cells from tbody only (excluding thead)
      const rows = await this.page.locator('app-shared-case-list tbody tr').all();

      for (const row of rows) {
        // Get the second td in each row (index 1, since first is radio button)
        const caseIdCell = row.locator('td:nth-child(2) div').first();
        if (await caseIdCell.count() > 0) {
          const text = await caseIdCell.textContent();
          if (text) {
            const trimmedText = text.trim();
            // Only add if it looks like a case ID (starts with CS)
            if (trimmedText.startsWith('CS')) {
              caseIds.push(trimmedText);
            }
          }
        }
      }

      console.log(`Found ${caseIds.length} case IDs:`, caseIds);
    } catch (error) {
      console.error('Error getting case IDs:', error);
    }

    return caseIds;
  }

  /**
   * Get all case creation dates from history
   */
  async getCaseCreationDates(): Promise<string[]> {
    const dates: string[] = [];

    try {
      const rows = await this.page.locator('app-shared-case-list tbody tr').all();

      for (const row of rows) {
        // Get the third td in each row (index 2)
        const dateCell = row.locator('td:nth-child(3) div').first();
        if (await dateCell.count() > 0) {
          const text = await dateCell.textContent();
          if (text) {
            const trimmedText = text.trim();
            // Remove the time part if present (keep only date)
            const datePart = trimmedText.split(',')[0].trim();
            dates.push(datePart);
          }
        }
      }

      console.log(`Found ${dates.length} dates:`, dates);
    } catch (error) {
      console.error('Error getting dates:', error);
    }

    return dates;
  }

  /**
   * Get case history count (number of rows in tbody)
   */
  async getCaseHistoryCount(): Promise<number> {
    try {
      return await this.page.locator('app-shared-case-list tbody tr').count();
    } catch (error) {
      console.error('Error getting case count:', error);
      return 0;
    }
  }

  /**
   * Check if case history has radio buttons
   */
  async hasCaseHistoryRadioButtons(): Promise<boolean> {
    try {
      const radioCount = await this.page.locator('app-shared-case-list tbody tr input[type="radio"]').count();
      return radioCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Select the first case from history
   */
  async selectFirstCaseFromHistory(): Promise<void> {
    try {
      const firstRadio = this.page.locator('app-shared-case-list tbody tr:first-child input[type="radio"]').first();
      if (await firstRadio.count() > 0) {
        await firstRadio.check();
        console.log('✅ Selected first case from history');
      }
    } catch (error) {
      console.error('❌ Failed to select first case:', error);
    }
  }

  /**
   * Check if first case radio button is selected
   */
  async isFirstCaseRadioSelected(): Promise<boolean> {
    try {
      const firstRadio = this.page.locator('app-shared-case-list tbody tr:first-child input[type="radio"]').first();
      if (await firstRadio.count() > 0) {
        return await firstRadio.isChecked();
      }
    } catch (error) {
      console.error('Error checking radio selection:', error);
    }
    return false;
  }

  /**
   * Debug method to print case history table structure
   */
  async debugCaseHistoryTable() {
    console.log('\n🔍 DEBUG: Case History Table');

    try {
      // Check if table exists
      const tableExists = await this.caseHistoryTable.count();
      console.log(`Table exists: ${tableExists > 0}`);

      if (tableExists === 0) return;

      // Get headers
      const headers = await this.page.locator('app-shared-case-list thead th').all();
      console.log(`Found ${headers.length} header columns:`);
      for (let i = 0; i < headers.length; i++) {
        const text = await headers[i].textContent();
        console.log(`  [${i}] "${text}"`);
      }

      // Get rows
      const rows = await this.page.locator('app-shared-case-list tbody tr').all();
      console.log(`Found ${rows.length} data rows`);

      for (let i = 0; i < Math.min(3, rows.length); i++) {
        const row = rows[i];
        console.log(`  Row ${i + 1}:`);

        const cells = await row.locator('td').all();
        for (let j = 0; j < cells.length; j++) {
          const cell = cells[j];
          const text = await cell.textContent();
          console.log(`    Col ${j}: "${text?.trim()}"`);
        }
      }

      // Check for radio buttons
      const radioCount = await this.page.locator('app-shared-case-list tbody tr input[type="radio"]').count();
      console.log(`Radio buttons: ${radioCount}`);
    } catch (error) {
      console.error('Error debugging table:', error);
    }
  }

  /**
   * Debug method to check dropdown values
   */
  async debugDropdownValues() {
    console.log('\n🔍 DEBUG: Checking dropdown values');

    try {
      // Check case type dropdown specifically
      const caseTypeDropdown = this.caseType;
      const selectedValue = await caseTypeDropdown.locator('.ng-value-label, .ng-value span').first().textContent();
      console.log('Case type selected value:', selectedValue);

      // Check all ng-value elements
      const allNgValues = await this.page.locator('.ng-value, .ng-value-label, .ng-value span').all();
      console.log(`Found ${allNgValues.length} ng-value elements`);

      for (let i = 0; i < allNgValues.length; i++) {
        const text = await allNgValues[i].textContent();
        const html = await allNgValues[i].evaluate(el => el.outerHTML);
        console.log(`  [${i}] text: "${text}"`);
        console.log(`      html: ${html.substring(0, 100)}`);
      }

      // Check for any close buttons that might be interfering
      const closeButtons = await this.page.locator('.ng-clear, .ng-arrow-wrapper, button.close, [aria-label="Close"]').all();
      console.log(`Found ${closeButtons.length} potential close buttons`);
    } catch (error) {
      console.error('Error debugging dropdown:', error);
    }
  }

  // ==================== EXISTING METHODS (KEPT AS IS) ====================

  async clickNewEnquiryButton() {
    console.log('🔍 Looking for New Enquiry button...');
    try {
      await this.newEnquiryButton.click();
      console.log('✅ New Enquiry button clicked');
    } catch (e) {
      console.error('❌ Failed to click New Enquiry button:', e);
      throw e;
    }
  }

  async fillMemberIdInModal(memberId: string) {
    console.log(`🆔 Filling member ID: ${memberId}`);
    try {
      await this.memberIdInput.fill(memberId);
      console.log('✅ Member ID filled');
    } catch (e) {
      console.error('❌ Failed to fill member ID:', e);
      throw e;
    }
  }

  async clickSearchButton() {
    console.log('🔍 Clicking search button...');
    try {
      await this.searchButton.click();
      console.log('✅ Search button clicked');
    } catch (e) {
      console.error('❌ Failed to click search:', e);
      throw e;
    }
  }

  async fillCompleteFormMCP(data: any) {
    console.log('🤖 Starting MCP intelligent form fill...');
    try {
      await this.clearAllFields();

      if (data.firstName && await this.firstName.count() > 0) {
        await this.firstName.fill(String(data.firstName));
      }

      if (data.lastName && await this.lastName.count() > 0) {
        await this.lastName.fill(String(data.lastName));
      }

      if (data.gender) {
        await this.selectDropdownMCP(this.gender, String(data.gender), 'Gender');
      }

      if (data.age && await this.age.count() > 0) {
        await this.age.fill(String(data.age));
      }

      if (data.country) {
        await this.selectDropdownMCP(this.country, String(data.country), 'Country');
      }

      if (data.state) {
        await this.selectDropdownMCP(this.state, String(data.state), 'State');
      }

      if (data.city) {
        await this.selectDropdownMCP(this.city, String(data.city), 'City');
      }

      if (data.preferenceCountry) {
        await this.selectDropdownMCP(this.prefCountry, String(data.preferenceCountry), 'Preference Country');
      }

      if (data.preferenceState) {
        await this.selectDropdownMCP(this.prefState, String(data.preferenceState), 'Preference State');
      }

      if (data.preferenceCity) {
        await this.selectDropdownMCP(this.prefCity, String(data.preferenceCity), 'Preference City');
      }

      if (data.caseType) {
        await this.selectDropdownMCP(this.caseType, String(data.caseType), 'Case Type');
      }

      console.log('✅ All mandatory fields filled');
    } catch (e) {
      console.error('❌ MCP form fill error:', e);
      throw e;
    }
  }

  private async clearAllFields() {
    const allTextFields = [
      { name: 'firstName', locator: this.firstName },
      { name: 'lastName', locator: this.lastName },
      { name: 'dob', locator: this.dob },
      { name: 'email', locator: this.email },
      { name: 'phone', locator: this.phone },
      { name: 'hospital', locator: this.hospital },
      { name: 'treatment', locator: this.treatment },
      { name: 'notes', locator: this.notes }
    ];

    for (const field of allTextFields) {
      try {
        if (await field.locator.count() > 0) {
          await field.locator.fill('');
        }
      } catch (e) { }
    }
  }

  public async selectDropdownMCP(dropdown: Locator, value: string, fieldName: string = 'Field') {
    try {
      if (!await dropdown.isVisible()) return;

      await dropdown.click({ force: true });
      await this.page.waitForTimeout(600);

      const ngSelectInput = dropdown.locator('input[type="text"], input[role="combobox"]').first();
      if (await ngSelectInput.count() > 0) {
        await ngSelectInput.fill('');
        await this.page.waitForTimeout(300);

        for (const char of value) {
          await ngSelectInput.type(char, { delay: 50 });
        }
        await this.page.waitForTimeout(800);
      }

      const allOptions = await this.page.locator('.ng-option, [role="option"]').all();

      for (const option of allOptions) {
        const optionText = await option.textContent();
        if (optionText?.trim() === value && await option.isVisible()) {
          await option.click({ force: true });
          break;
        }
      }

      await this.page.waitForTimeout(400);
    } catch (e) {
      console.error(`  ❌ Failed to select ${fieldName}: ${value}`, e);
    }
  }

  async submitForm() {
    console.log('📤 SUBMITTING FORM...');
    try {
      if (await this.submitButton.count() === 0) {
        console.error('❌ Submit button not found!');
        return;
      }

      await this.submitButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.submitButton.click({ force: true });
      await this.page.waitForTimeout(2000);
      console.log('✅ Form submitted successfully');
    } catch (e) {
      console.error('❌ Failed to submit form:', e);
      throw e;
    }
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible().catch(() => false);
  }

  // ==================== NEW HELPER METHODS ====================

  async searchMember(memberId: string) {
    await this.clickNewEnquiryButton();
    await this.fillMemberIdInModal(memberId);
    await this.clickSearchButton();
    await this.page.waitForTimeout(2000);
  }

  async closeModal() {
    if (await this.modalCloseButton.isVisible().catch(() => false)) {
      await this.modalCloseButton.click();
    } else if (await this.cancelButton.isVisible().catch(() => false)) {
      await this.cancelButton.click();
    } else {
      await this.page.keyboard.press('Escape');
    }
    await this.page.waitForTimeout(500);
  }

  async clickOutsideModal() {
    await this.page.click('body', { position: { x: 10, y: 10 } });
    await this.page.waitForTimeout(500);
  }

  async isLoaderVisible(): Promise<boolean> {
    return await this.loader.isVisible().catch(() => false);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible().catch(() => false);
  }

  async isValidationErrorVisible(): Promise<boolean> {
    return await this.validationError.isVisible().catch(() => false);
  }

  async isMemberNotFoundMessageVisible(): Promise<boolean> {
    const notFoundMessages = this.page.locator('text=not found, text=does not exist, text=no records').first();
    return await notFoundMessages.isVisible().catch(() => false);
  }

  async clickRetryButton() {
    if (await this.retryButton.isVisible().catch(() => false)) {
      await this.retryButton.click();
    }
  }

  // Add this method to your NewEnquiryPage class if it doesn't exist
/**
 * Get the selected value specifically from the case type dropdown
 */
async getCaseTypeSelectedValue(): Promise<string> {
  try {
    // Try multiple specific selectors for case type
    const selectors = [
      this.page.locator('app-crm-lookup[fcontrolname="casetype"] .ng-value-label').first(),
      this.page.locator('app-crm-lookup[fcontrolname="casetype"] .ng-value span').first(),
      this.page.locator('[formcontrolname="caseType"] .ng-value-label').first()
    ];
    
    for (const selector of selectors) {
      const isVisible = await selector.isVisible().catch(() => false);
      if (isVisible) {
        const text = await selector.textContent();
        if (text && text.trim() !== '×' && text.trim() !== '') {
          return text.trim();
        }
      }
    }
    
    return '';
  } catch (error) {
    console.log('Error getting case type value:');
    return '';
  }
}

  async areMaternityFieldsVisible(): Promise<boolean> {
    return await this.maternityFields.isVisible().catch(() => false);
  }

  async isDuplicateWarningVisible(): Promise<boolean> {
    return await this.duplicateWarning.isVisible().catch(() => false);
  }

  async getSubmitCount(): Promise<number> {
    let submitCount = 0;
    this.page.on('request', request => {
      if (request.url().includes('/api/submit') || request.url().includes('/enquiry')) {
        submitCount++;
      }
    });
    return submitCount;
  }

  // ==================== DEPRECATED METHODS (Keep for backward compatibility) ====================

  /**
   * @deprecated Use isFieldErrorVisible('firstName') with maxLength check
   */
  async isFieldErrorMaxLength(fieldName: string): Promise<boolean> {
    const errorLocator = this.page.locator(`div.ng-star-inserted:has-text("${fieldName} must be less than 32 characters")`);
    return await errorLocator.isVisible().catch(() => false);
  }// Add this method to your NewEnquiryPage class if it doesn't exist
async getDropdownSelectedValue(dropdown: Locator): Promise<string> {
  try {
    // Try multiple selectors for the selected value
    const selectors = [
      dropdown.locator('.ng-value-label').first(),
      dropdown.locator('.ng-value span').first(),
      dropdown.locator('.ng-value').first(),
      this.page.locator('.ng-value-label').first()
    ];
    
    for (const selector of selectors) {
      const isVisible = await selector.isVisible().catch(() => false);
      if (isVisible) {
        const text = await selector.textContent();
        if (text && text.trim() !== '×' && text.trim() !== '') {
          return text.trim();
        }
      }
    }
    
    return '';
  } catch (error) {
    console.log('Error getting dropdown value:');
    return '';
  }
}

  /**
   * @deprecated Use isFieldErrorVisible('firstName') with format check
   */
  async isFieldErrorFormat(fieldName: string): Promise<boolean> {
    const errorLocator = this.page.locator(`div.ng-star-inserted:has-text("${fieldName} accepts text only")`);
    return await errorLocator.isVisible().catch(() => false);
  }

  /**
   * @deprecated Use getFieldErrorMessage() instead
   */
  async getFieldErrorText(fieldName: string): Promise<string> {
    const errorLocator = this.page.locator(`div.ng-star-inserted:has-text("${fieldName}")`).first();
    return await errorLocator.textContent() || '';
  }

  /**
   * @deprecated Use getAllVisibleErrors() instead
   */
  async getAllValidationErrors(): Promise<string[]> {
    const errors: string[] = [];
    const errorElements = await this.validationErrors.all();

    for (const element of errorElements) {
      const text = await element.textContent();
      if (text) errors.push(text);
    }

    return errors;
  }

  // ==================== LEGACY CASE HISTORY METHODS (Updated to use improved ones) ====================

  async isCaseInfoHeaderVisible(): Promise<boolean> {
    return await this.caseInfoHeader.isVisible().catch(() => false);
  }

  async isCaseHistoryTableVisible(): Promise<boolean> {
    return await this.caseHistoryTable.isVisible().catch(() => false);
  }

  async hasStatusBadges(): Promise<boolean> {
    const count = await this.statusBadges.count();
    return count > 0;
  }

  async hasBadgeType(badgeType: string): Promise<boolean> {
    const badges = this.page.locator(`.badge-light-${badgeType}, .badge-${badgeType}`);
    const count = await badges.count();
    return count > 0;
  }

  async getStatusBadgeTexts(): Promise<string[]> {
    const statuses: string[] = [];
    const badges = await this.statusBadges.all();

    for (const badge of badges) {
      const text = await badge.textContent();
      if (text) statuses.push(text.trim());
    }

    return statuses;
  }
}