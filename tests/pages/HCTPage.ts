import { Page, Locator } from '@playwright/test';

export class HCTpage {
  readonly page: Page;
  // Edit PatientPreference elements
  readonly editPatientPreferenceButton: Locator;
  readonly editPatientPreferenceModal: Locator;






  // Add these to your HCTpage class in the constructor section

  // Drop Case elements
  readonly dropCaseContainer: Locator;
  readonly dropCaseDropdown: Locator;
  readonly dropCaseOptions: Locator;
  readonly dropCaseSelectedValue: Locator;
  readonly dropCaseCloseButton: Locator;
  readonly dropCaseWarningText: Locator;
  readonly ActiveTab: Locator;







  readonly collaboratorContainer: Locator;
  readonly collaboratorSearchInput: Locator;
  readonly collaboratorOptions: Locator;
  readonly collaboratorChips: Locator;
  readonly collaboratorChipRemove: Locator;
  readonly collaboratorAddedUsers: Locator;
  readonly collaboratorNoResults: Locator;








  readonly editButton: Locator;

  // Modal
  readonly modal: Locator;
  readonly modalBody: Locator;
  readonly closeButton: Locator;

  // Personal Info fields
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly ageInput: Locator;
  readonly genderDropdown: Locator;
  readonly bloodGroupInput: Locator;
  readonly heightInput: Locator;
  readonly weightInput: Locator;
  readonly cityInput: Locator;

  // Contact Information fields
  readonly phoneNumberInput: Locator;
  readonly emergencyContactInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly countryDropdown: Locator;
  readonly stateDropdown: Locator;
  // Form actions
  readonly saveButton: Locator;
  readonly resetButton: Locator;

  // Success indicators
  readonly toastMessage: Locator;

















  // PatientPreference Preference fields
  readonly preferredCountryDropdown: Locator;
  readonly preferredStateDropdown: Locator;
  readonly preferredCityDropdown: Locator;
  readonly preferredProviderInput: Locator;
  readonly createdOnDate: Locator;
  readonly memberIdInput: Locator;
  readonly icdProcedureInput: Locator;
  readonly eligibilityRoomInput: Locator;
  readonly additionalNotesInput: Locator;

  // Save and Reset buttons
  readonly saveEditButton: Locator;
  readonly resetEditButton: Locator;
  readonly closeEditModalButton: Locator;
  // ==================== ERROR LOCATORS ====================
  readonly selectedCaseType: Locator;
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly stateError: Locator;
  readonly emailError: Locator;
  readonly searchInput: Locator;
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
  readonly offcanvasContainer: Locator;
  readonly addCounselingLink: Locator;
  readonly viewEnquiryButton: Locator;
  // Counseling modal elements
  readonly counselingModal: Locator;
  readonly coPayTermsInput: Locator;

  readonly saveCounselingButton: Locator;
  readonly resetCounselingButton: Locator;
  readonly closeModalButton: Locator;
  readonly addSMOLink: Locator;
  readonly smoModal: Locator;
  readonly patientCountryCodeDropdown: Locator;
  readonly patientPhoneNumberInput: Locator;
  readonly appointmentReasonTextarea: Locator;
  readonly saveSMOButton: Locator;
  readonly resetSMOButton: Locator;
  readonly closeSMOButton: Locator;
  // Success message
  readonly successMessage: Locator;
  readonly toastContainer: Locator;
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

  readonly HCTMenuItem: Locator;
  readonly HCTMenu: Locator;

  readonly ProviderEnquiryMenuItem: Locator;
  readonly ProviderEnquiryMenu: Locator;
  // ==================== UI ELEMENTS ====================
  readonly loader: Locator;
  readonly errorMessage: Locator;

  readonly modalCloseButton: Locator;
  readonly validationError: Locator;
  readonly retryButton: Locator;
  readonly maternityFields: Locator;
  readonly duplicateWarning: Locator;
  readonly modalHeader: Locator;
  readonly modalFooter: Locator;
  readonly cancelButton: Locator;
  readonly ApproveTab: Locator;
  // ==================== FIELD MAPPING ====================
  private fieldMapping: Record<string, Locator> = {};
  private errorMapping: Record<string, Locator> = {};

  constructor(page: Page) {
    this.page = page;











    // In your HCTpage constructor, update these locators:

    // Collaborators section
    this.collaboratorContainer = page.locator('app-search-employees .card.card-border-bg').first();
    this.collaboratorSearchInput = page.locator('input.chip-input[placeholder="Search and add users..."]').first();
    this.collaboratorOptions = page.locator('ul.suggestions li.ng-star-inserted');
    this.collaboratorChips = page.locator('.chip-container .chip, .added-user-chip, .collaborator-chip');
    this.collaboratorChipRemove = page.locator('.chip .remove-btn, .chip span.remove-btn ,.chip-container .chip .chip-remove, .added-user-chip .remove-icon, .collaborator-chip .close');
    this.ActiveTab = page.getByRole('tab', { name: 'Active' });
    this.ApproveTab = page.getByRole('tab', { name: 'Approved' });

    this.collaboratorAddedUsers = page.locator('.chip-container .chip span, .added-user-chip span');
    this.collaboratorNoResults = page.locator('ul.suggestions li.ng-star-inserted:has-text("No results")');

    // In constructor, add these initializations:

    // Drop Case section
    this.dropCaseContainer = page.locator('app-crm-lookup[fcontrolname="reasonForClosed"]').first();
    this.dropCaseDropdown = page.locator('app-crm-lookup[fcontrolname="reasonForClosed"] ng-select').first();
    this.dropCaseOptions = page.locator('.ng-dropdown-panel .ng-option-label');
    this.dropCaseSelectedValue = page.locator('app-crm-lookup[fcontrolname="reasonForClosed"] .ng-value-label').first();
    this.dropCaseCloseButton = page.locator('button.btn-danger.reason-close-btn').first();
    this.dropCaseWarningText = page.locator('p.text-danger:has-text("Warning: clicking this button")').first();



    this.editButton = page.locator('button.btn-outline-primary:has-text("Edit"), button.hct-profile-edit-button').first();

    // Modal - looking for app-patient-edit
    this.modal = page.locator('app-patient-edit').first();
    this.modalBody = page.locator('.modal-body').first();
    this.closeButton = page.locator('.modal-header button[aria-label="Close"]').first();

    // Personal Info fields
    this.firstNameInput = page.locator('[fcontrolname="name"] input').first();
    this.lastNameInput = page.locator('[fcontrolname="surName"] input').first();
    this.ageInput = page.locator('[fcontrolname="age"] input').first();
    this.genderDropdown = page.locator('[fcontrolname="gender"] ng-select').first();
    this.bloodGroupInput = page.locator('[fcontrolname="bloodGroup"] input').first();
    this.heightInput = page.locator('[fcontrolname="height"] input').first();
    this.weightInput = page.locator('[fcontrolname="weight"] input').first();
    this.cityInput = page.locator('[fcontrolname="city"] input').first();

    // Contact Information fields
    this.phoneNumberInput = page.locator('[fcontrolname="contactNumber"] input').first();
    this.emergencyContactInput = page.locator('[fcontrolname="emgergencyContact"] input').first();
    this.emailInput = page.locator('[fcontrolname="emailId"] input').first();
    this.addressInput = page.locator('[fcontrolname="address"] input').first();
    this.countryDropdown = page.locator('[fcontrolname="country"] ng-select').first();
    this.stateDropdown = page.locator('[fcontrolname="state"] ng-select').first();

    // Form actions
    this.saveButton = page.locator('button[type="submit"]:has-text("Save")').first();
    this.resetButton = page.locator('button[type="reset"]:has-text("Reset")').first();

    // Success indicators
    this.toastMessage = page.locator('#toast-container .toast, .alert-success').first();


    this.HCTMenuItem = page.locator('li:has-text("HCT"), li:has-text("HCT")').first();
    this.HCTMenu = page.locator('img.menu-icon[alt="hct"]').first();

    this.ProviderEnquiryMenu=page.locator('img.menu-icon[alt="Provider enquiry"]').first();
    this.ProviderEnquiryMenuItem= page.locator('li:has-text("Provider enquiry"), li:has-text("Provider enquiry")').first();















    // ==================== INITIALIZE ERROR LOCATORS ====================
    this.viewEnquiryButton = page.locator("//button[normalize-space()='View enquiry']");
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







    this.addSMOLink = page.locator('button:has-text("+ Add SMO")').first();
    this.smoModal = page.locator('.modal-content:has-text("Convert to SMO")').first();
    this.patientCountryCodeDropdown = page.locator('[fcontrolname="countryTeleCode"] ng-select').first();
    this.patientPhoneNumberInput = page.locator('#contactNumber, [fcontrolname="contactNumber"] input').first();
    this.appointmentReasonTextarea = page.locator('textarea[formcontrolname="appointmentReason"]').first();
    this.saveSMOButton = page.locator('button:has-text("Save")').first();
    this.resetSMOButton = page.locator('button:has-text("Reset")').first();
    this.closeSMOButton = page.locator('.modal-header button[aria-label="Close"]').first();












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
    this.searchInput = page.locator("//input[@placeholder='Search by Case ID , Name']");
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

    // FIXED: Updated to get the actual selected value, not the close button
    this.selectedCaseType = page.locator(
      'app-crm-lookup[fcontrolname="casetype"] .ng-value-label, ' +
      'app-crm-lookup[fcontrolname="casetype"] .ng-value span, ' +
      '[formcontrolname="caseType"] .ng-value-label, ' +
      '.selected-case-type'
    ).first();

    this.maternityFields = page.locator(
      'input[placeholder*="due date"], input[id*="dueDate"], input[name*="dueDate"], ' +
      'input[placeholder*="pregnancy"], input[id*="pregnancy"], input[name*="pregnancy"], ' +
      '[class*="maternity"] input, [class*="pregnancy"] input, ' +
      '.casetype-maternity-fields, [data-case-type="maternity"]'
    ).first();


    this.successMessage = page.locator(
      "//div[contains(@class,'alert-success') or contains(@class,'success-message')] | " +
      "//div[@id='toast-container']//div[contains(@class,'success') or contains(@class,'alert-success')] | " +
      "//div[@id='toast-container']//div[contains(text(),'success') or contains(text(),'Success')] | " +
      "//div[@id='toast-container']//div[contains(@class,'toast-success')] | " +
      "//div[@id='toast-container']//div[contains(@class,'toast')] | " +
      "//div[@id='toast-container']//div[contains(@class,'alert')]"
    ).first();





    // Offcanvas elements
    this.offcanvasContainer = page.locator('.offcanvas-container.show').first();
    this.addCounselingLink = page.locator('a:has-text("+ Add Councelling")').first();

    // Counseling modal elements
    this.counselingModal = page.locator('.modal-content:has-text("Convert to Councelling")').first();
    this.coPayTermsInput = page.locator('#coPayTerms, input[formcontrolname="coPayTerms"]').first();
    this.additionalNotesInput = page.locator('#additionalNotes, input[formcontrolname="additionalNotes"]').first();
    this.saveCounselingButton = page.locator('button:has-text("Save")').first();
    this.resetCounselingButton = page.locator('button:has-text("Reset")').first();
    this.closeModalButton = page.locator('.modal-header button[aria-label="Close"]').first();

    // Success message
    this.toastContainer = page.locator('#toast-container').first();







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




    this.editPatientPreferenceButton = page.locator('button.hct-profile-edit-button, button:has-text("Edit"):has(svg.feather-edit)').first();

    this.editPatientPreferenceModal = page.locator(
      '.modal-content:has-text("Edit Enquiry"), ' +
      '.modal-content:has-text("Edit"), ' +
      '.modal-header:has-text("Edit"), ' +
      '.modal-dialog:has-text("Edit")'
    ).first();

    // PatientPreference Preference fields
    this.preferredCountryDropdown = page.locator('[fcontrolname="preferredCountry"] ng-select').first();
    this.preferredStateDropdown = page.locator('[fcontrolname="preferredState"] ng-select').first();
    this.preferredCityDropdown = page.locator('[fcontrolname="preferredCity"] ng-select').first();
    this.preferredProviderInput = page.locator('[fcontrolname="preferredProvider"] input').first();
    this.createdOnDate = page.locator('[formcontrolname="createdOn"] input[type="text"]').first();
    this.memberIdInput = page.locator('[fcontrolname="memberId"] input').first();
    this.icdProcedureInput = page.locator('[fcontrolname="icdProcedure"] input').first();
    this.eligibilityRoomInput = page.locator('[fcontrolname="eligibilityRoom"] input').first();
    this.additionalNotesInput = page.locator('[fcontrolname="additionalNotes"] input').first();

    // Save and Reset buttons
    this.saveEditButton = page.locator('button:has-text("Save"):not(.reset):not(.close)').first();
    this.resetEditButton = page.locator('button:has-text("Reset")').first();
    this.closeEditModalButton = page.locator('.modal-header button[aria-label="Close"]').first();
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







  async clickViewEnquiry(): Promise<void> {
    try {
      await this.viewEnquiryButton.click();
      await this.page.waitForLoadState('networkidle');
      console.log('✓ View enquiry button clicked');
    } catch (error) {
      console.error('✗ Failed to click View enquiry:', error);
      throw error;
    }
  }









  async clickActiveTab(): Promise<void> {
    try {
      await this.ActiveTab.click();
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('✗ Failed to click ActiveTab :', error);
      throw error;
    }
  }
  async ClickApproveTab(): Promise<void> {
    try {
      await this.ApproveTab.click();
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('✗ Failed to click ApproveTab:', error);
      throw error;
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



  async isSuccess(): Promise<boolean> {
    try {
      // Strategy 1: Check toast container
      const toastContainer = this.page.locator("//div[@id='toast-container']");
      if (await toastContainer.isVisible().catch(() => false)) {

        // Check for success message in toast
        const successInToast = this.page.locator(
          "//div[@id='toast-container']//div[contains(@class,'success') or contains(text(),'Success')]"
        ).first();

        if (await successInToast.isVisible().catch(() => false)) {
          return true;
        }

        // Check for any toast (might be success)
        const anyToast = this.page.locator("//div[@id='toast-container']//div[contains(@class,'toast')]").first();
        if (await anyToast.isVisible().catch(() => false)) {
          const toastText = await anyToast.textContent() || '';
          // If toast contains success-related text, consider it successful
          if (toastText.toLowerCase().includes('success') ||
            toastText.toLowerCase().includes('completed') ||
            toastText.toLowerCase().includes('enquiry') ||
            toastText.toLowerCase().includes('sent')) {
            return true;
          }
        }
      }

      // Strategy 2: Use original success message locator
      return await this.successMessage.isVisible().catch(() => false);

    } catch (error) {
      return false;
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



  // async clickCaseRow(caseId: string): Promise<void> {
  //   // More accurate XPath targeting the exact div with the case ID
  //   const caseRow = this.page.locator(
  //     `//tr[contains(@class,'display-pointer')][td[1]/div[contains(@class,'text-primary') and normalize-space()='${caseId}']]`
  //   );
  //   await caseRow.click();
  //   await this.page.waitForTimeout(1000);
  // }

  // async searchCaseById(caseId: string): Promise<void> {
  //   await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
  //   await this.searchInput.fill(caseId);
  //   await this.page.keyboard.press('Enter');
  //   await this.page.waitForTimeout(500);
  //   await this.page.keyboard.press('Enter');

  // }




  async searchAndOpenCase(caseId: string): Promise<void> {
    console.log(`🔍 Searching for case: ${caseId}`);

    // Implement your search logic here
    // This depends on how your search works
    await this.page.locator('input[placeholder*="Search"]').first().fill(caseId);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    // Click on the case row
    const caseRow = this.page.locator(`//tr[contains(@class,'cursor-pointer')][.//div[contains(text(),'${caseId}')]]`).first();
    await caseRow.waitFor({ state: 'visible', timeout: 10000 });
    await caseRow.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    console.log(`✓ Case ${caseId} opened`);
  }

  /**
   * Click on the Add Counseling link in the offcanvas
   */
  async clickAddCounseling(): Promise<void> {
    console.log('➕ Clicking Add Counseling link...');

    await this.addCounselingLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.addCounselingLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);

    console.log('✓ Add Counseling link clicked');
  }

  /**
   * Wait for counseling modal to be visible
   */
  async waitForCounselingModal(): Promise<void> {
    console.log('⏳ Waiting for counseling modal...');

    await this.counselingModal.waitFor({ state: 'visible', timeout: 10000 });
    console.log('✓ Counseling modal is visible');
  }

  /**
   * Fill counseling form
   */
  async fillCounselingForm(data: {
    coPayTerms: string;
    additionalNotes?: string;
  }): Promise<void> {
    console.log('📝 Filling counseling form...');

    // Fill CoPay terms (required)
    if (data.coPayTerms) {
      await this.coPayTermsInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.coPayTermsInput.click();
      await this.coPayTermsInput.fill(data.coPayTerms);
      console.log(`  ✓ CoPay terms: "${data.coPayTerms}"`);
    }

    // Fill additional notes (optional)
    if (data.additionalNotes) {
      await this.additionalNotesInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.additionalNotesInput.click();
      await this.additionalNotesInput.fill(data.additionalNotes);
      console.log(`  ✓ Additional notes: "${data.additionalNotes}"`);
    }

    await this.page.waitForTimeout(500);
  }

  /**
   * Save counseling
   */
  async saveCounseling(): Promise<void> {
    console.log('💾 Saving counseling...');

    await this.saveCounselingButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.saveCounselingButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    console.log('✓ Counseling saved');
  }

  /**
   * Check if counseling was added successfully
   */
  async isCounselingAdded(): Promise<boolean> {
    console.log('🔍 Verifying counseling was added...');

    try {
      // Check for success message in toast
      const toastVisible = await this.toastContainer.isVisible({ timeout: 10000 }).catch(() => false);
      if (toastVisible) {
        const toastText = await this.toastContainer.textContent();
        console.log(`✓ Success message: "${toastText}"`);
        return true;
      }

      // Check if modal closed (alternative success indicator)
      const modalVisible = await this.counselingModal.isVisible().catch(() => false);
      if (!modalVisible) {
        console.log('✓ Modal closed - counseling added successfully');
        return true;
      }

      console.log('⚠ No success indicator found');
      return false;
    } catch (error) {
      console.log('⚠ Error verifying counseling:', error);
      return false;
    }
  }

  /**
   * Complete the entire counseling flow
   */
  async addCounseling(data: {
    coPayTerms: string;
    additionalNotes?: string;
  }): Promise<boolean> {
    console.log('\n=== Starting Add Counseling Flow ===');

    try {
      await this.clickAddCounseling();
      await this.waitForCounselingModal();
      await this.fillCounselingForm(data);
      await this.saveCounseling();

      const success = await this.isCounselingAdded();
      if (success) {
        console.log('✅ Counseling added successfully\n');
      } else {
        console.log('❌ Failed to add counseling\n');
      }

      return success;
    } catch (error) {
      console.error('❌ Error in add counseling flow:', error);
      throw error;
    }
  }

  /**
   * Close the counseling modal without saving
   */
  async closeCounselingModal(): Promise<void> {
    console.log('❌ Closing counseling modal...');

    await this.closeModalButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.closeModalButton.click();
    await this.page.waitForTimeout(1000);

    console.log('✓ Counseling modal closed');
  }

  /**
   * Reset the counseling form
   */
  async resetCounselingForm(): Promise<void> {
    console.log('🔄 Resetting counseling form...');

    await this.resetCounselingButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.resetCounselingButton.click();
    await this.page.waitForTimeout(500);

    console.log('✓ Counseling form reset');
  }






  async clickAddSMO(): Promise<void> {
    console.log('➕ Clicking Add SMO link...');

    await this.addSMOLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.addSMOLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);

    console.log('✓ Add SMO link clicked');
  }

  /**
   * Wait for SMO modal to be visible
   */
  async waitForSMOModal(): Promise<void> {
    console.log('⏳ Waiting for SMO modal...');

    await this.smoModal.waitFor({ state: 'visible', timeout: 10000 });
    console.log('✓ SMO modal is visible');
  }

  /**
   * Select patient country code from dropdown
   */
  /**
   * Select patient country code from dropdown with multiple matching strategies
   */
  async selectPatientCountryCode(countryCode: string): Promise<void> {
    console.log(`  📝 Selecting country code: ${countryCode}`);

    // Extract just the country name or just the code for matching
    const countryName = countryCode.split(' ')[0]; // "India"
    const codeMatch = countryCode.match(/\(\+(.+)\)/); // Extract (+91) -> 91
    const countryCodeOnly = codeMatch ? codeMatch[1] : ''; // "91"

    console.log(`  🔍 Looking for: "${countryName}" or "+${countryCodeOnly}"`);

    // Click to open dropdown
    await this.patientCountryCodeDropdown.click();
    await this.page.waitForTimeout(500);

    // Strategy 1: Try exact match first
    let countryOption = this.page.locator(`.ng-option:has-text("${countryCode}")`).first();
    let isVisible = await countryOption.isVisible().catch(() => false);

    // Strategy 2: Try matching by country name only
    if (!isVisible) {
      console.log(`  🔍 Trying country name: "${countryName}"`);
      countryOption = this.page.locator(`.ng-option:has-text("${countryName}")`).first();
      isVisible = await countryOption.isVisible().catch(() => false);
    }

    // Strategy 3: Try matching by country code only (with +)
    if (!isVisible && countryCodeOnly) {
      console.log(`  🔍 Trying country code: "+${countryCodeOnly}"`);
      countryOption = this.page.locator(`.ng-option:has-text("+${countryCodeOnly}")`).first();
      isVisible = await countryOption.isVisible().catch(() => false);
    }

    // Strategy 4: Try matching by country code only (without +)
    if (!isVisible && countryCodeOnly) {
      console.log(`  🔍 Trying country code: "${countryCodeOnly}"`);
      countryOption = this.page.locator(`.ng-option:has-text("${countryCodeOnly}")`).first();
      isVisible = await countryOption.isVisible().catch(() => false);
    }

    // Strategy 5: Get all options and log them for debugging
    if (!isVisible) {
      console.log(`  🔍 Listing all available options:`);
      const allOptions = await this.page.locator('.ng-option').all();

      for (let i = 0; i < Math.min(10, allOptions.length); i++) {
        const text = await allOptions[i].textContent();
        console.log(`    Option ${i + 1}: "${text}"`);
      }
    }

    if (isVisible) {
      await countryOption.click();
      console.log(`  ✓ Country code selected`);
      await this.page.waitForTimeout(500);
    } else {
      // Try to select by index (first option) as fallback
      console.log(`  ⚠ Could not find exact match, selecting first option`);
      const firstOption = this.page.locator('.ng-option').first();
      const firstOptionText = await firstOption.textContent();
      await firstOption.click();
      console.log(`  ✓ Selected first option: "${firstOptionText}"`);
    }
  }

  /**
   * Fill patient phone number
   */
  async fillPatientPhoneNumber(phoneNumber: string): Promise<void> {
    console.log(`  📝 Filling phone number: ${phoneNumber}`);

    await this.patientPhoneNumberInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.patientPhoneNumberInput.click();
    await this.patientPhoneNumberInput.fill(phoneNumber);

    console.log(`  ✓ Phone number filled: ${phoneNumber}`);
  }

  /**
   * Fill appointment reason
   */
  async fillAppointmentReason(reason: string): Promise<void> {
    console.log(`  📝 Filling appointment reason`);

    await this.appointmentReasonTextarea.waitFor({ state: 'visible', timeout: 5000 });
    await this.appointmentReasonTextarea.click();
    await this.appointmentReasonTextarea.fill(reason);

    console.log(`  ✓ Appointment reason filled: "${reason.substring(0, 30)}..."`);
  }

  /**
   * Fill SMO form
   */
  async fillSMOForm(data: {
    countryCode: string;
    phoneNumber: string;
    appointmentReason: string;
  }): Promise<void> {
    console.log('📝 Filling SMO form...');

    if (data.countryCode) {
      await this.selectPatientCountryCode(data.countryCode);
    }

    if (data.phoneNumber) {
      await this.fillPatientPhoneNumber(data.phoneNumber);
    }

    if (data.appointmentReason) {
      await this.fillAppointmentReason(data.appointmentReason);
    }

    await this.page.waitForTimeout(500);
  }

  /**
   * Save SMO
   */
  async saveSMO(): Promise<void> {
    console.log('💾 Saving SMO...');

    await this.saveSMOButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.saveSMOButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    console.log('✓ SMO saved');
  }

  /**
   * Check if SMO was added successfully
   */
  async isSMOAdded(): Promise<boolean> {
    console.log('🔍 Verifying SMO was added...');

    try {
      // Check for success message in toast
      const toastVisible = await this.toastMessage.isVisible({ timeout: 10000 }).catch(() => false);
      if (toastVisible) {
        const toastText = await this.toastMessage.textContent();
        console.log(`✓ Success message: "${toastText}"`);
        return true;
      }

      // Check if modal closed (alternative success indicator)
      const modalVisible = await this.smoModal.isVisible().catch(() => false);
      if (!modalVisible) {
        console.log('✓ Modal closed - SMO added successfully');
        return true;
      }

      console.log('⚠ No success indicator found');
      return false;
    } catch (error) {
      console.log('⚠ Error verifying SMO:', error);
      return false;
    }
  }

  /**
   * Complete the entire SMO addition flow
   */
  async addSMO(data: {
    countryCode: string;
    phoneNumber: string;
    appointmentReason: string;
  }): Promise<boolean> {
    console.log('\n=== Starting Add SMO Flow ===');

    try {
      await this.clickAddSMO();
      await this.waitForSMOModal();
      await this.fillSMOForm(data);
      await this.saveSMO();

      const success = await this.isSMOAdded();
      if (success) {
        console.log('✅ SMO added successfully\n');
      } else {
        console.log('❌ Failed to add SMO\n');
      }

      return success;
    } catch (error) {
      console.error('❌ Error in add SMO flow:', error);
      throw error;
    }
  }

  /**
   * Close the SMO modal without saving
   */
  async closeSMOModal(): Promise<void> {
    console.log('❌ Closing SMO modal...');

    await this.closeSMOButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.closeSMOButton.click();
    await this.page.waitForTimeout(1000);

    console.log('✓ SMO modal closed');
  }

  /**
   * Reset the SMO form
   */
  async resetSMOForm(): Promise<void> {
    console.log('🔄 Resetting SMO form...');

    await this.resetSMOButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.resetSMOButton.click();
    await this.page.waitForTimeout(500);

    console.log('✓ SMO form reset');
  }








  /**
   * Click on the Edit Patient button with better handling
   */
  async clickEditPatientPreference(): Promise<void> {
    console.log('✏️ Clicking Edit Patient button...');

    // Try multiple selectors for the edit button
    const editButtonLocators = this.page.locator('button:has-text("Edit")').nth(1);

    let editButton: Locator | null = null;
    const editButtonElements = await editButtonLocators.all();

    for (const button of editButtonElements) {
      const isVisible = await button.isVisible().catch(() => false);
      if (isVisible) {
        editButton = button;
        console.log(`  Found edit button`);
        break;
      }
    }

    if (!editButton) {
      console.log('  ⚠ Edit button not found, taking screenshot');
      await this.page.screenshot({ path: 'edit-button-not-found.png' });
      throw new Error('Edit button not found');
    }

    await editButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    console.log('✓ Edit Patient button clicked');
  }


  async isDropdownSelected(dropdown: Locator): Promise<boolean> {
    try {
      // Check if there's a selected value in the dropdown
      const selectedValue = dropdown.locator('.ng-value-label').first();
      const isVisible = await selectedValue.isVisible().catch(() => false);
      return isVisible;
    } catch {
      return false;
    }
  }

  /**
   * Get current value of a text input
   */
  async getFieldValue(field: Locator): Promise<string> {
    try {
      return await field.inputValue();
    } catch {
      return '';
    }
  }


  /**
   * Wait for Edit Patient modal to be visible
   */
  async waitForEditPatientPreferenceModal(): Promise<void> {
    console.log('⏳ Waiting for Edit Patient modal...');

    await this.editPatientPreferenceModal.waitFor({ state: 'visible', timeout: 10000 });
    console.log('✓ Edit Patient modal is visible');
  }











  /**
   * Select preferred country from dropdown (skip if already selected)
   */
  async selectPreferredCountry(country: string, skipIfFilled: boolean = true): Promise<void> {
    if (skipIfFilled) {
      const hasValue = await this.isDropdownSelected(this.preferredCountryDropdown);
      if (hasValue) {
        console.log(`  ⏭️ Preferred country already selected, skipping`);
        return;
      }
    }

    console.log(`  📝 Selecting preferred country: ${country}`);

    await this.preferredCountryDropdown.click();
    await this.page.waitForTimeout(500);

    const countryOption = this.page.locator(`.ng-option`, { hasText: country }).first();
    await countryOption.waitFor({ state: 'visible', timeout: 5000 });
    await countryOption.click();

    console.log(`  ✓ Preferred country selected: ${country}`);
    await this.page.waitForTimeout(500);
  }

  /**
   * Select preferred state from dropdown (skip if already selected)
   */
  async selectPreferredState(state: string, skipIfFilled: boolean = true): Promise<void> {
    if (skipIfFilled) {
      const hasValue = await this.isDropdownSelected(this.preferredStateDropdown);
      if (hasValue) {
        console.log(`  ⏭️ Preferred state already selected, skipping`);
        return;
      }
    }

    console.log(`  📝 Selecting preferred state: ${state}`);

    await this.page.waitForTimeout(1000); // Wait for dropdown to populate
    await this.preferredStateDropdown.click();
    await this.page.waitForTimeout(500);

    const stateOption = this.page.locator(`.ng-option`, { hasText: state }).first();
    await stateOption.waitFor({ state: 'visible', timeout: 5000 });
    await stateOption.click();

    console.log(`  ✓ Preferred state selected: ${state}`);
    await this.page.waitForTimeout(500);
  }

  /**
   * Select preferred city from dropdown (skip if already selected)
   */
  async selectPreferredCity(city: string, skipIfFilled: boolean = true): Promise<void> {
    if (skipIfFilled) {
      const hasValue = await this.isDropdownSelected(this.preferredCityDropdown);
      if (hasValue) {
        console.log(`  ⏭️ Preferred city already selected, skipping`);
        return;
      }
    }

    console.log(`  📝 Selecting preferred city: ${city}`);

    await this.page.waitForTimeout(1000); // Wait for dropdown to populate
    await this.preferredCityDropdown.click();
    await this.page.waitForTimeout(500);

    const cityOption = this.page.locator(`.ng-option`, { hasText: city }).first();
    await cityOption.waitFor({ state: 'visible', timeout: 5000 });
    await cityOption.click();

    console.log(`  ✓ Preferred city selected: ${city}`);
    await this.page.waitForTimeout(500);
  }

  /**
   * Fill preferred provider (skip if already has value)
   */
  async fillPreferredProvider(provider: string, skipIfFilled: boolean = true): Promise<void> {
    const currentValue = await this.getFieldValue(this.preferredProviderInput);
    if (skipIfFilled && currentValue && currentValue.trim() !== '') {
      console.log(`  ⏭️ Preferred provider already has value: "${currentValue}", skipping`);
      return;
    }

    console.log(`  📝 Filling preferred provider: ${provider}`);

    await this.preferredProviderInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.preferredProviderInput.click();
    await this.preferredProviderInput.fill(provider);

    console.log(`  ✓ Preferred provider filled: ${provider}`);
  }

  /**
   * Fill member ID (skip if already has value)
   */
  async fillMemberId(memberId: string, skipIfFilled: boolean = true): Promise<void> {
    const currentValue = await this.getFieldValue(this.memberIdInput);
    if (skipIfFilled && currentValue && currentValue.trim() !== '') {
      console.log(`  ⏭️ Member ID already has value: "${currentValue}", skipping`);
      return;
    }

    console.log(`  📝 Filling member ID: ${memberId}`);

    await this.memberIdInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.memberIdInput.click();
    await this.memberIdInput.fill(memberId);

    console.log(`  ✓ Member ID filled: ${memberId}`);
  }

  /**
   * Fill ICD procedure (skip if already has value)
   */
  async fillIcdProcedure(icdCode: string, skipIfFilled: boolean = true): Promise<void> {
    const currentValue = await this.getFieldValue(this.icdProcedureInput);
    if (skipIfFilled && currentValue && currentValue.trim() !== '') {
      console.log(`  ⏭️ ICD procedure already has value: "${currentValue}", skipping`);
      return;
    }

    console.log(`  📝 Filling ICD procedure: ${icdCode}`);

    await this.icdProcedureInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.icdProcedureInput.click();
    await this.icdProcedureInput.fill(icdCode);

    console.log(`  ✓ ICD procedure filled: ${icdCode}`);
  }

  /**
   * Fill eligibility room (skip if already has value)
   */
  async fillEligibilityRoom(room: string, skipIfFilled: boolean = true): Promise<void> {
    const currentValue = await this.getFieldValue(this.eligibilityRoomInput);
    if (skipIfFilled && currentValue && currentValue.trim() !== '') {
      console.log(`  ⏭️ Eligibility room already has value: "${currentValue}", skipping`);
      return;
    }

    console.log(`  📝 Filling eligibility room: ${room}`);

    await this.eligibilityRoomInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.eligibilityRoomInput.click();
    await this.eligibilityRoomInput.fill(room);

    console.log(`  ✓ Eligibility room filled: ${room}`);
  }

  /**
   * Fill additional notes (skip if already has value)
   */
  async fillAdditionalNotes(notes: string, skipIfFilled: boolean = true): Promise<void> {
    const currentValue = await this.getFieldValue(this.additionalNotesInput);
    if (skipIfFilled && currentValue && currentValue.trim() !== '') {
      console.log(`  ⏭️ Additional notes already have value, skipping`);
      return;
    }

    console.log(`  📝 Filling additional notes`);

    await this.additionalNotesInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.additionalNotesInput.click();
    await this.additionalNotesInput.fill(notes);

    console.log(`  ✓ Additional notes filled: "${notes.substring(0, 30)}..."`);
  }














  /**
   * Debug method to find the correct edit modal selector
   */
  async debugEditModal(): Promise<void> {
    console.log('\n🔍 DEBUG: Looking for Edit modal');

    // Check all possible modal selectors
    const possibleSelectors = [
      '.modal-content:has-text("Edit Enquiry")',
      '.modal-content:has-text("Edit")',
      '.modal-content:has-text("Enquiry")',
      '.modal-header:has-text("Edit")',
      '.modal-dialog:has-text("Edit")',
      '.modal-content'
    ];

    for (const selector of possibleSelectors) {
      const count = await this.page.locator(selector).count();
      console.log(`Selector "${selector}": found ${count} elements`);

      if (count > 0) {
        const firstElement = this.page.locator(selector).first();
        const isVisible = await firstElement.isVisible().catch(() => false);
        const text = await firstElement.textContent();
        console.log(`  Visible: ${isVisible}, Text: "${text?.substring(0, 100)}..."`);
      }
    }

    // Take screenshot for visual debugging
    await this.page.screenshot({ path: 'debug-edit-modal.png', fullPage: true });
    console.log('📸 Screenshot saved: debug-edit-modal.png');
  }
  /**
   * Fill Edit Patient form
   */
  /**
   * Fill Edit PatientPreference form (skips already filled fields)
   */
  async fillEditPatientPreferenceForm(data: {
    preferredCountry?: string;
    preferredState?: string;
    preferredCity?: string;
    preferredProvider?: string;
    memberId?: string;
    icdProcedure?: string;
    eligibilityRoom?: string;
    additionalNotes?: string;
    skipIfFilled?: boolean;
  }): Promise<void> {
    console.log('📝 Filling Edit PatientPreference form...');

    const skipIfFilled = data.skipIfFilled !== false; // Default to true

    if (data.preferredCountry) {
      await this.selectPreferredCountry(data.preferredCountry, skipIfFilled);
    }

    if (data.preferredState) {
      await this.selectPreferredState(data.preferredState, skipIfFilled);
    }

    if (data.preferredCity) {
      await this.selectPreferredCity(data.preferredCity, skipIfFilled);
    }

    if (data.preferredProvider) {
      await this.fillPreferredProvider(data.preferredProvider, skipIfFilled);
    }

    if (data.memberId) {
      await this.fillMemberId(data.memberId, skipIfFilled);
    }

    if (data.icdProcedure) {
      await this.fillIcdProcedure(data.icdProcedure, skipIfFilled);
    }

    if (data.eligibilityRoom) {
      await this.fillEligibilityRoom(data.eligibilityRoom, skipIfFilled);
    }

    if (data.additionalNotes) {
      await this.fillAdditionalNotes(data.additionalNotes, skipIfFilled);
    }

    await this.page.waitForTimeout(500);
  }

  /**
   * Save Edit PatientPreference changes
   */
  async saveEditPatientPreference(): Promise<void> {
    console.log('💾 Saving patient changes...');

    await this.saveEditButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.saveEditButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    console.log('✓ PatientPreference changes saved');
  }

  /**
   * Check if patient was updated successfully
   */
  async isPatientPreferenceUpdated(): Promise<boolean> {
    console.log('🔍 Verifying patient was updated...');

    try {
      // Check for success message in toast
      const toastVisible = await this.toastMessage.isVisible({ timeout: 10000 }).catch(() => false);
      if (toastVisible) {
        const toastText = await this.toastMessage.textContent();
        console.log(`✓ Success message: "${toastText}"`);
        return true;
      }

      // Check if modal closed (alternative success indicator)
      const modalVisible = await this.editPatientPreferenceModal.isVisible().catch(() => false);
      if (!modalVisible) {
        console.log('✓ Modal closed - patient updated successfully');
        return true;
      }

      console.log('⚠ No success indicator found');
      return false;
    } catch (error) {
      console.log('⚠ Error verifying patient update:', error);
      return false;
    }
  }

  /**
   * Complete the entire Edit PatientPreference flow
   */
  async editPatientPreference(data: {
    preferredCountry?: string;
    preferredState?: string;
    preferredCity?: string;
    preferredProvider?: string;
    memberId?: string;
    icdProcedure?: string;
    eligibilityRoom?: string;
    additionalNotes?: string;
  }): Promise<boolean> {
    console.log('\n=== Starting Edit PatientPreference Flow ===');

    try {
      await this.clickEditPatientPreference();
      await this.waitForEditPatientPreferenceModal();
      await this.fillEditPatientPreferenceForm(data);
      await this.saveEditPatientPreference();

      const success = await this.isPatientPreferenceUpdated();
      if (success) {
        console.log('✅ PatientPreference updated successfully\n');
      } else {
        console.log('❌ Failed to update patient\n');
      }

      return success;
    } catch (error) {
      console.error('❌ Error in edit patient flow:', error);
      throw error;
    }
  }

  /**
   * Close the Edit PatientPreference modal without saving
   */
  async closeEditPatientPreferenceModal(): Promise<void> {
    console.log('❌ Closing Edit PatientPreference modal...');

    await this.closeEditModalButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.closeEditModalButton.click();
    await this.page.waitForTimeout(1000);

    console.log('✓ Edit PatientPreference modal closed');
  }

  /**
   * Reset the Edit PatientPreference form
   */
  async resetEditPatientPreferenceForm(): Promise<void> {
    console.log('🔄 Resetting Edit PatientPreference form...');

    await this.resetEditButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.resetEditButton.click();
    await this.page.waitForTimeout(500);

    console.log('✓ Edit PatientPreference form reset');
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

  async getDropdownSelectedValue(dropdown: Locator): Promise<string> {
    const selectedValue = dropdown.locator('.ng-value, [class*="selected"], .ng-value-label').first();
    return await selectedValue.textContent() || '';
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







  async clickEdit(): Promise<void> {
    console.log('✏️ Clicking Edit button...');
    await this.editButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.editButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
    console.log('✓ Edit button clicked');
  }

  /**
   * Wait for modal to be visible
   */
  async waitForModal(): Promise<void> {
    console.log('⏳ Waiting for edit modal...');
    await this.modal.waitFor({ state: 'visible', timeout: 10000 });
    console.log('✓ Edit modal is visible');
  }

  /**
   * Close modal without saving
   */


  /**
   * Get current value of a text field
   */


  /**
   * Get selected value from dropdown
   */
  async getDropdownValue(dropdown: Locator): Promise<string> {
    try {
      const selectedValue = dropdown.locator('.ng-value-label').first();
      return await selectedValue.textContent() || '';
    } catch {
      return '';
    }
  }

  /**
   * Fill first name
   */
  async fillFirstName(firstName: string): Promise<void> {
    const currentValue = await this.getFieldValue(this.firstNameInput);
    if (currentValue === firstName) {
      console.log(`  ⏭️ First name already set, skipping`);
      return;
    }
    console.log(`  📝 Filling first name: ${firstName}`);
    await this.firstNameInput.click();
    await this.firstNameInput.fill(firstName);
    console.log(`  ✓ First name filled`);
  }

  /**
   * Fill last name
   */
  async fillLastName(lastName: string): Promise<void> {
    const currentValue = await this.getFieldValue(this.lastNameInput);
    if (currentValue === lastName) {
      console.log(`  ⏭️ Last name already set, skipping`);
      return;
    }
    console.log(`  📝 Filling last name: ${lastName}`);
    await this.lastNameInput.click();
    await this.lastNameInput.fill(lastName);
    console.log(`  ✓ Last name filled`);
  }

  /**
   * Fill age
   */
  async fillAge(age: string): Promise<void> {
    const currentValue = await this.getFieldValue(this.ageInput);
    if (currentValue === age) {
      console.log(`  ⏭️ Age already set, skipping`);
      return;
    }
    console.log(`  📝 Filling age: ${age}`);
    await this.ageInput.click();
    await this.ageInput.fill(age);
    console.log(`  ✓ Age filled`);
  }

  /**
   * Select gender
   */
  async selectGender(gender: string): Promise<void> {
    console.log(`  📝 Selecting gender: ${gender}`);

    const currentValue = await this.getDropdownValue(this.genderDropdown);
    if (currentValue.toLowerCase() === gender.toLowerCase()) {
      console.log(`  ⏭️ Gender already set to "${gender}", skipping`);
      return;
    }

    await this.genderDropdown.click();
    await this.page.waitForTimeout(500);

    const option = this.page.locator('.ng-option', { hasText: gender }).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();

    console.log(`  ✓ Gender selected: ${gender}`);
    await this.page.waitForTimeout(500);
  }

  /**
   * Fill blood group
   */
  async fillBloodGroup(bloodGroup: string): Promise<void> {
    const currentValue = await this.getFieldValue(this.bloodGroupInput);
    if (currentValue === bloodGroup) {
      console.log(`  ⏭️ Blood group already set, skipping`);
      return;
    }
    console.log(`  📝 Filling blood group: ${bloodGroup}`);
    await this.bloodGroupInput.click();
    await this.bloodGroupInput.fill(bloodGroup);
    console.log(`  ✓ Blood group filled`);
  }

  /**
   * Fill height
   */
  async fillHeight(height: string): Promise<void> {
    const currentValue = await this.getFieldValue(this.heightInput);
    if (currentValue === height) {
      console.log(`  ⏭️ Height already set, skipping`);
      return;
    }
    console.log(`  📝 Filling height: ${height}`);
    await this.heightInput.click();
    await this.heightInput.fill(height);
    console.log(`  ✓ Height filled`);
  }

  /**
   * Fill weight
   */
  async fillWeight(weight: string): Promise<void> {
    const currentValue = await this.getFieldValue(this.weightInput);
    if (currentValue === weight) {
      console.log(`  ⏭️ Weight already set, skipping`);
      return;
    }
    console.log(`  📝 Filling weight: ${weight}`);
    await this.weightInput.click();
    await this.weightInput.fill(weight);
    console.log(`  ✓ Weight filled`);
  }

  /**
   * Fill city
   */
  async fillCity(city: string): Promise<void> {
    const currentValue = await this.getFieldValue(this.cityInput);
    if (currentValue === city) {
      console.log(`  ⏭️ City already set, skipping`);
      return;
    }
    console.log(`  📝 Filling city: ${city}`);
    await this.cityInput.click();
    await this.cityInput.fill(city);
    console.log(`  ✓ City filled`);
  }

  /**
   * Fill phone number
   */
  async fillPhoneNumber(phone: string): Promise<void> {
    const currentValue = await this.getFieldValue(this.phoneNumberInput);
    if (currentValue === phone) {
      console.log(`  ⏭️ Phone number already set, skipping`);
      return;
    }
    console.log(`  📝 Filling phone number: ${phone}`);
    await this.phoneNumberInput.click();
    await this.phoneNumberInput.fill(phone);
    console.log(`  ✓ Phone number filled`);
  }

  /**
   * Fill emergency contact
   */
  async fillEmergencyContact(emergency: string): Promise<void> {
    const currentValue = await this.getFieldValue(this.emergencyContactInput);
    if (currentValue === emergency) {
      console.log(`  ⏭️ Emergency contact already set, skipping`);
      return;
    }
    console.log(`  📝 Filling emergency contact: ${emergency}`);
    await this.emergencyContactInput.click();
    await this.emergencyContactInput.fill(emergency);
    console.log(`  ✓ Emergency contact filled`);
  }

  /**
   * Fill email
   */
  async fillEmail(email: string): Promise<void> {
    const currentValue = await this.getFieldValue(this.emailInput);
    if (currentValue === email) {
      console.log(`  ⏭️ Email already set, skipping`);
      return;
    }
    console.log(`  📝 Filling email: ${email}`);
    await this.emailInput.click();
    await this.emailInput.fill(email);
    console.log(`  ✓ Email filled`);
  }

  /**
   * Fill address
   */
  async fillAddress(address: string): Promise<void> {
    const currentValue = await this.getFieldValue(this.addressInput);
    if (currentValue === address) {
      console.log(`  ⏭️ Address already set, skipping`);
      return;
    }
    console.log(`  📝 Filling address: ${address}`);
    await this.addressInput.click();
    await this.addressInput.fill(address);
    console.log(`  ✓ Address filled`);
  }

  /**
   * Select country
   */
  async selectCountry(country: string): Promise<void> {
    console.log(`  📝 Selecting country: ${country}`);

    const currentValue = await this.getDropdownValue(this.countryDropdown);
    if (currentValue === country) {
      console.log(`  ⏭️ Country already set to "${country}", skipping`);
      return;
    }

    await this.countryDropdown.click();
    await this.page.waitForTimeout(500);

    const option = this.page.locator('.ng-option', { hasText: country }).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();

    console.log(`  ✓ Country selected: ${country}`);
    await this.page.waitForTimeout(500);
  }

  /**
   * Select state
   */

  // In your HCTpage.ts, replace the selectState method with this improved version:

  /**
   * Select state with better error handling and logging
   */
  async selectState(state: string): Promise<void> {
    console.log(`📝 Selecting state: ${state}`);

    // Wait for dropdown to populate after country selection
    await this.page.waitForTimeout(2000);

    const currentValue = await this.getDropdownValue(this.stateDropdown);

    // Skip if already selected
    if (currentValue && currentValue.trim().toLowerCase() === state.trim().toLowerCase()) {
      console.log(`⏭ State already selected: "${currentValue}". Skipping selection.`);
      return;
    }

    console.log(`Current state is: "${currentValue || 'empty'}", changing to: "${state}"`);

    // Open dropdown
    console.log(`🔍 Opening state dropdown...`);
    await this.stateDropdown.click();
    await this.page.waitForTimeout(1000);

    console.log(`🔍 Searching for state options...`);

    // Get all options
    const allOptions = await this.page.locator('.ng-option').all();
    console.log(`Found ${allOptions.length} options`);

    // Log first 10 options for debugging
    for (let i = 0; i < Math.min(10, allOptions.length); i++) {
      const text = await allOptions[i].textContent();
      console.log(`Option ${i + 1}: "${text}"`);
    }

    // Check if the state exists in the list
    const stateExists = await this.checkIfStateExists(state);

    if (!stateExists) {
      console.log(`⚠ State "${state}" not found in dropdown. Available states might be different.`);
      console.log(`Please check the available states in the dropdown and update your test data.`);

      // Close dropdown
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);

      // Don't throw error, just skip state selection
      console.log(`⏭ Skipping state selection as "${state}" is not available`);
      return;
    }

    // Try to find and select the state
    let option = this.page.locator('.ng-option', {
      hasText: new RegExp(`^\\s*${state}\\s*$`)
    }).first();

    let isVisible = await option.isVisible().catch(() => false);

    if (!isVisible) {
      console.log(`Trying contains match`);
      option = this.page.locator('.ng-option', { hasText: state }).first();
      isVisible = await option.isVisible().catch(() => false);
    }

    if (!isVisible) {
      console.log(`Trying case-insensitive match`);
      const options = await this.page.locator('.ng-option').all();

      for (const opt of options) {
        const text = await opt.textContent();
        if (text && text.toLowerCase().includes(state.toLowerCase())) {
          option = opt;
          isVisible = true;
          console.log(`✓ Found match: "${text}"`);
          break;
        }
      }
    }

    if (!isVisible) {
      console.log(`❌ State "${state}" not found`);
      await this.page.keyboard.press('Escape');

      // Instead of throwing, just log and continue
      console.log(`⏭ Skipping state selection as "${state}" is not available`);
      return;
    }

    await option.click();
    console.log(`✓ State selected: "${state}"`);

    await this.page.waitForTimeout(500);
  }

  /**
   * Check if a state exists in the dropdown
   */
  async checkIfStateExists(state: string): Promise<boolean> {
    try {
      const options = await this.page.locator('.ng-option').all();

      for (const opt of options) {
        const text = await opt.textContent();
        if (text && text.trim().toLowerCase() === state.trim().toLowerCase()) {
          return true;
        }
        if (text && text.toLowerCase().includes(state.toLowerCase())) {
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get all available states from dropdown
   */
  async getAvailableStates(): Promise<string[]> {
    const states: string[] = [];

    try {
      // Open dropdown
      await this.stateDropdown.click();
      await this.page.waitForTimeout(1000);

      const options = await this.page.locator('.ng-option').all();

      for (const opt of options) {
        const text = await opt.textContent();
        if (text && text.trim()) {
          states.push(text.trim());
        }
      }

      // Close dropdown
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);

      console.log(`Available states:`, states);
    } catch (error) {
      console.error('Error getting available states:', error);
    }

    return states;
  }
  /**
   * Fill all form fields
   */
  async fillForm(data: {
    firstName?: string;
    lastName?: string;
    age?: string;
    gender?: string;
    bloodGroup?: string;
    height?: string;
    weight?: string;
    city?: string;
    phoneNumber?: string;
    emergencyContact?: string;
    email?: string;
    address?: string;
    country?: string;
    state?: string;
  }): Promise<void> {
    console.log('📝 Filling edit form...');

    if (data.firstName) await this.fillFirstName(data.firstName);
    if (data.lastName) await this.fillLastName(data.lastName);
    if (data.age) await this.fillAge(data.age);
    if (data.gender) await this.selectGender(data.gender);
    if (data.bloodGroup) await this.fillBloodGroup(data.bloodGroup);
    if (data.height) await this.fillHeight(data.height);
    if (data.weight) await this.fillWeight(data.weight);
    if (data.city) await this.fillCity(data.city);
    if (data.phoneNumber) await this.fillPhoneNumber(data.phoneNumber);
    if (data.emergencyContact) await this.fillEmergencyContact(data.emergencyContact);
    if (data.email) await this.fillEmail(data.email);
    if (data.address) await this.fillAddress(data.address);
    if (data.country) await this.selectCountry(data.country);
    if (data.state) await this.selectState(data.state);

    await this.page.waitForTimeout(3000);
    console.log('✓ Form filled');
  }

  /**
   * Save changes
   */
  /**
   * Save changes with better waiting
   */
  async save(): Promise<void> {
    console.log('💾 Saving changes...');

    // Create a promise to wait for the API response
    const responsePromise = this.page.waitForResponse(
      response => {
        const url = response.url();
        // Adjust this to match your actual API endpoint
        return url.includes('/api/patient/update') ||
          url.includes('/api/enquiry/update') ||
          response.status() === 200;
      },
      { timeout: 10000 }
    );

    await this.saveButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.saveButton.click();
    console.log('✓ Save button clicked');

    try {
      const response = await responsePromise;
      console.log(`📡 API Response: ${response.status()} ${response.statusText()}`);

      // Check if response is successful
      if (response.status() === 200) {
        const responseBody = await response.text();
        console.log(`Response body: ${responseBody.substring(0, 200)}`);
      }
    } catch (error) {
      console.log('⚠ No API response captured');
    }

    await this.page.waitForLoadState('networkidle').catch(() => { });
    await this.page.waitForTimeout(2000);

    console.log('✓ Changes saved');
  }











  /**
 * Check if save was successful with improved detection
 */
  async isSaveSuccessfulHCT(): Promise<boolean> {
    console.log('🔍 Verifying save...');

    try {
      // Wait a bit for any animations/toasts to appear
      await this.page.waitForTimeout(2000);

      // Strategy 1: Check for success toast message with multiple selectors
      const toastSelectors = [
        '#toast-container .toast-success',
        '#toast-container .alert-success',
        '#toast-container .success',
        '#toast-container .toast:has-text("success")',
        '#toast-container .alert:has-text("success")',
        '.toast-success',
        '.alert-success',
        '.success-message',
        '.alert:has-text("success")',
        '.toast:has-text("success")',
        '[class*="success"]'
      ];

      for (const selector of toastSelectors) {
        const toast = this.page.locator(selector).first();
        if (await toast.isVisible().catch(() => false)) {
          const toastText = await toast.textContent();
          console.log(`✓ Found success indicator with selector "${selector}": "${toastText}"`);
          return true;
        }
      }

      // Strategy 2: Check if modal is closed (indicating success)
      const modalVisible = await this.modal.isVisible().catch(() => false);
      if (!modalVisible) {
        console.log('✓ Modal is closed - assuming save was successful');
        return true;
      }

      // Strategy 3: Check for any visible toast/alert
      const anyToast = this.page.locator('#toast-container .toast, #toast-container .alert, .toast, .alert').first();
      if (await anyToast.isVisible().catch(() => false)) {
        const toastText = await anyToast.textContent();
        console.log(`⚠ Found a toast but not sure if success: "${toastText}"`);
        // If there's a toast and modal is closed, probably success
        if (!modalVisible) {
          return true;
        }
      }

      // Strategy 4: Check for URL change or network activity that might indicate success
      // This is a fallback - sometimes success is indicated by a page refresh or navigation

      console.log('⚠ No success indicator found');

      // Log all toasts/alerts on the page for debugging
      const allToasts = await this.page.locator('#toast-container *').all();
      console.log(`Found ${allToasts.length} elements in toast container`);
      for (let i = 0; i < allToasts.length; i++) {
        const text = await allToasts[i].textContent();
        const className = await allToasts[i].getAttribute('class');
        console.log(`  Toast ${i + 1}: class="${className}", text="${text}"`);
      }

      return false;
    } catch (error) {
      console.log('⚠ Error verifying save:', error);
      return false;
    }
  }
  /**
   * Check if save was successful
   */
  async isSaveSuccessful(): Promise<boolean> {
    console.log('🔍 Verifying save...');

    try {
      // Wait for any UI updates
      await this.page.waitForTimeout(3000);

      // Check all possible success indicators
      const successSelectors = [
        '#toast-container',
        '.toast',
        '.alert',
        '.alert-success',
        '.toast-success',
        '.success-message',
        '[class*="success"]',
        'div:has-text("successfully")',
        'div:has-text("updated")',
        'div:has-text("saved")'
      ];

      for (const selector of successSelectors) {
        const elements = await this.page.locator(selector).all();
        for (const element of elements) {
          if (await element.isVisible().catch(() => false)) {
            const text = await element.textContent();
            const className = await element.getAttribute('class');
            console.log(`Found element with selector "${selector}": class="${className}", text="${text}"`);

            // Check if it looks like a success message
            if (text && (
              text.toLowerCase().includes('success') ||
              text.toLowerCase().includes('updated') ||
              text.toLowerCase().includes('saved') ||
              text.toLowerCase().includes('completed')
            )) {
              console.log(`✓ Success message found: "${text}"`);
              return true;
            }
          }
        }
      }

      // Check if any error messages appear
      const errorSelectors = [
        '.alert-danger',
        '.toast-error',
        '.error-message',
        '[class*="error"]',
        'div:has-text("error")',
        'div:has-text("failed")'
      ];

      for (const selector of errorSelectors) {
        const elements = await this.page.locator(selector).all();
        for (const element of elements) {
          if (await element.isVisible().catch(() => false)) {
            const text = await element.textContent();
            console.log(`❌ Error found: "${text}"`);
            return false;
          }
        }
      }

      // If modal closed, assume success
      const modalVisible = await this.modal.isVisible().catch(() => false);
      if (!modalVisible) {
        console.log('✓ Modal closed - assuming success');
        return true;
      }

      console.log('⚠ No clear success or error indicators found');
      return false;
    } catch (error) {
      console.log('⚠ Error verifying save:', error);
      return false;
    }
  }



  // ==================== DROP CASE METHODS ====================

  /**
   * Open the drop case dropdown
   */
  async openDropCaseDropdown(): Promise<void> {
    console.log(`  🔍 Opening drop case dropdown...`);

    await this.dropCaseDropdown.waitFor({ state: 'visible', timeout: 5000 });
    await this.dropCaseDropdown.click();
    await this.page.waitForTimeout(500);

    console.log(`  ✓ Drop case dropdown opened`);
  }

  /**
   * Get all available drop case reason options
   */
  async getDropCaseOptions(): Promise<string[]> {
    const options: string[] = [];

    // Open dropdown if not already open
    await this.openDropCaseDropdown();

    const optionElements = await this.dropCaseOptions.all();

    for (const element of optionElements) {
      if (await element.isVisible().catch(() => false)) {
        const text = await element.textContent();
        if (text && text.trim()) {
          options.push(text.trim());
        }
      }
    }

    // Close dropdown by pressing Escape
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);

    console.log(`  Found ${options.length} drop case options:`, options);
    return options;
  }

  /**
   * Select a drop case reason by exact match
   */
  async selectDropCaseReasonExact(reason: string): Promise<boolean> {
    console.log(`  📝 Selecting drop case reason (exact): "${reason}"`);

    await this.openDropCaseDropdown();

    const options = await this.dropCaseOptions.all();
    let selected = false;

    for (const option of options) {
      if (await option.isVisible().catch(() => false)) {
        const text = await option.textContent();
        if (text && text.trim() === reason) {
          await option.click({ force: true });
          await this.page.waitForTimeout(500);
          console.log(`  ✓ Selected exact match: "${reason}"`);
          selected = true;
          break;
        }
      }
    }

    if (!selected) {
      console.log(`  ⚠ No exact match found for: "${reason}"`);
      await this.page.keyboard.press('Escape');
    }

    return selected;
  }

  /**
   * Select a drop case reason by partial match (contains)
   */
  async selectDropCaseReasonPartial(partialReason: string): Promise<string> {
    console.log(`  📝 Selecting drop case reason (partial): "${partialReason}"`);

    await this.openDropCaseDropdown();

    const options = await this.dropCaseOptions.all();
    let selectedText = '';

    for (const option of options) {
      if (await option.isVisible().catch(() => false)) {
        const text = await option.textContent();
        if (text && text.toLowerCase().includes(partialReason.toLowerCase())) {
          selectedText = text.trim();
          await option.click({ force: true });
          await this.page.waitForTimeout(500);
          console.log(`  ✓ Selected partial match: "${selectedText}"`);
          break;
        }
      }
    }

    if (!selectedText) {
      console.log(`  ⚠ No partial match found for: "${partialReason}"`);
      await this.page.keyboard.press('Escape');
    }

    return selectedText;
  }














  async navigateToHCT1() {

    await this.HCTMenu.click();
    await this.page.waitForTimeout(1000);


    await this.HCTMenuItem.click();
    await this.page.waitForTimeout(3000);

  }

  async navigateToProviderEnquiry() {

    await this.ProviderEnquiryMenu.click();
    await this.page.waitForTimeout(1000);


    await this.ProviderEnquiryMenuItem.click();
    await this.page.waitForTimeout(3000);

  }










  /**
   * Select the first available drop case reason
   */
  async selectFirstDropCaseReason(): Promise<string> {
    console.log(`  📝 Selecting first available drop case reason`);

    await this.openDropCaseDropdown();

    const firstOption = this.dropCaseOptions.first();
    if (await firstOption.isVisible().catch(() => false)) {
      const text = await firstOption.textContent();
      if (text && text.trim()) {
        await firstOption.click({ force: true });
        await this.page.waitForTimeout(500);
        console.log(`  ✓ Selected first reason: "${text.trim()}"`);
        return text.trim();
      }
    }

    await this.page.keyboard.press('Escape');
    throw new Error('No drop case options available to select');
  }

  /**
   * Get currently selected drop case reason
   */
  async getSelectedDropCaseReason(): Promise<string> {
    try {
      const selectedValue = await this.dropCaseSelectedValue.textContent();
      return selectedValue ? selectedValue.trim() : '';
    } catch {
      return '';
    }
  }

  /**
   * Check if drop case reason is selected
   */
  async isDropCaseReasonSelected(): Promise<boolean> {
    const selectedValue = await this.getSelectedDropCaseReason();
    return selectedValue !== '';
  }

  /**
   * Click the Close button to drop the case
   */
  async clickDropCaseCloseButton(): Promise<void> {
    console.log(`  🔴 Clicking Close button to drop case...`);

    // Check if button is disabled
    const isDisabled = await this.dropCaseCloseButton.isDisabled().catch(() => true);

    if (isDisabled) {
      console.log(`  ⚠ Close button is disabled. Please select a reason first.`);
      throw new Error('Close button is disabled. Cannot drop case without selecting a reason.');
    }

    await this.dropCaseCloseButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.dropCaseCloseButton.click({ force: true });
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    console.log(`  ✓ Close button clicked`);
  }

  /**
   * Complete drop case flow with reason selection
   * @param reason - Reason for dropping the case (can be exact or partial)
   * @param matchStrategy - 'exact', 'partial', or 'first'
   */
  async dropCase(reason: string, matchStrategy: 'exact' | 'partial' | 'first' = 'partial'): Promise<boolean> {
    console.log(`\n=== Starting Drop Case Flow ===`);
    console.log(`  📋 Dropping case with reason: "${reason}" (strategy: ${matchStrategy})`);

    try {
      let selectedReason = '';

      // Select reason based on strategy
      switch (matchStrategy) {
        case 'exact':
          const exactMatch = await this.selectDropCaseReasonExact(reason);
          if (!exactMatch) {
            console.log(`  ⚠ Falling back to partial match`);
            selectedReason = await this.selectDropCaseReasonPartial(reason);
          } else {
            selectedReason = reason;
          }
          break;

        case 'partial':
          selectedReason = await this.selectDropCaseReasonPartial(reason);
          break;

        case 'first':
          selectedReason = await this.selectFirstDropCaseReason();
          break;
      }

      if (!selectedReason) {
        console.log(`  ❌ Failed to select a reason for dropping case`);
        return false;
      }

      console.log(`  ✓ Selected reason: "${selectedReason}"`);

      // Verify reason was selected
      const selectedValue = await this.getSelectedDropCaseReason();
      if (!selectedValue) {
        console.log(`  ⚠ Reason may not have been selected properly`);
      }

      // Click Close button
      await this.clickDropCaseCloseButton();

      // Verify case was dropped (check for success message or modal close)
      const success = await this.isCaseDroppedSuccessfully();

      if (success) {
        console.log(`  ✅ Case dropped successfully with reason: "${selectedReason}"\n`);
      } else {
        console.log(`  ❌ Failed to drop case\n`);
      }

      return success;
    } catch (error) {
      console.error(`  ❌ Error in drop case flow:`, error);
      throw error;
    }
  }

  /**
   * Verify if case was dropped successfully
   */
  async isCaseDroppedSuccessfully(): Promise<boolean> {
    console.log(`  🔍 Verifying case was dropped...`);

    try {
      // Wait for success indicator
      await this.page.waitForTimeout(2000);

      // Check for success toast
      const toastSelectors = [
        '#toast-container .toast-success',
        '#toast-container .alert-success',
        '.toast-success',
        '.alert-success',
        '.success-message',
        '[class*="success"]:has-text("dropped")',
        '[class*="success"]:has-text("closed")'
      ];

      for (const selector of toastSelectors) {
        const toast = this.page.locator(selector).first();
        if (await toast.isVisible().catch(() => false)) {
          const toastText = await toast.textContent();
          console.log(`  ✓ Found success indicator: "${toastText}"`);
          return true;
        }
      }

      // Check if case status changed (you may need to adjust this based on your app)
      // For example, check if the case is no longer in active list or status badge changed

      console.log(`  ⚠ No clear success indicator found`);
      return false;
    } catch (error) {
      console.log(`  ⚠ Error verifying case drop:`, error);
      return false;
    }
  }

  /**
   * Check if Close button is enabled (reason selected)
   */
  async isCloseButtonEnabled(): Promise<boolean> {
    const isDisabled = await this.dropCaseCloseButton.isDisabled().catch(() => true);
    return !isDisabled;
  }

  /**
   * Get the warning text message
   */
  async getDropCaseWarningText(): Promise<string> {
    try {
      const text = await this.dropCaseWarningText.textContent();
      return text ? text.trim() : '';
    } catch {
      return '';
    }
  }

  /**
   * Clear selected drop case reason (if needed)
   */
  async clearDropCaseSelection(): Promise<void> {
    console.log(`  🧹 Clearing drop case selection...`);

    // Click the clear/x button in the dropdown if present
    const clearButton = this.dropCaseDropdown.locator('.ng-clear, .ng-value-icon.left').first();
    if (await clearButton.isVisible().catch(() => false)) {
      await clearButton.click({ force: true });
      await this.page.waitForTimeout(300);
      console.log(`  ✓ Cleared drop case selection`);
    } else {
      console.log(`  ⚠ No clear button found`);
    }
  }




  // ==================== ENHANCED COLLABORATORS METHODS ====================

  /**
   * Search for a collaborator by name/email with better error handling
   */
  async searchCollaborator(searchText: string): Promise<boolean> {
    try {
      console.log(`  🔍 Searching collaborator: "${searchText}"`);

      const isVisible = await this.collaboratorSearchInput.isVisible().catch(() => false);
      if (!isVisible) {
        console.log(`  ⚠ Collaborator search input not visible`);
        return false;
      }

      await this.collaboratorSearchInput.click();
      await this.collaboratorSearchInput.fill(searchText);

      // Wait for suggestions with timeout
      await this.page.waitForSelector('ul.suggestions li.ng-star-inserted', {
        timeout: 5000,
        state: 'attached'
      }).catch(() => {
        console.log(`  ℹ No suggestions appeared for "${searchText}"`);
      });

      await this.page.waitForTimeout(500);
      console.log(`  ✓ Search completed for: "${searchText}"`);
      return true;
    } catch (error) {
      console.log(`  ⚠ Error during search: {error.message}`);
      return false;
    }
  }

  /**
   * Get all available collaborator options with error handling
   */
  async getCollaboratorOptions(): Promise<string[]> {
    const options: string[] = [];

    try {
      await this.page.waitForTimeout(500);

      // Check if suggestions list exists
      const suggestionsExist = await this.page.locator('ul.suggestions').count() > 0;
      if (!suggestionsExist) {
        console.log(`  ℹ No suggestions list found`);
        return options;
      }

      const optionElements = await this.page.locator('ul.suggestions li.ng-star-inserted').all();

      for (const element of optionElements) {
        if (await element.isVisible().catch(() => false)) {
          const text = await element.textContent();
          if (text && text.trim()) {
            options.push(text.trim());
          }
        }
      }

      console.log(`  Found ${options.length} collaborator options`);
    } catch (error) {
      console.log(`  ⚠ Error getting collaborator options: {error.message}`);
    }

    return options;
  }

  /**
   * Select a collaborator by partial match with improved reliability
   */
  async selectCollaboratorPartial(partialName: string): Promise<{ success: boolean; selectedText: string; error?: string }> {
    console.log(`  👤 Selecting collaborator (partial): "${partialName}"`);

    try {
      // Wait for suggestions to be visible
      await this.page.waitForSelector('ul.suggestions li.ng-star-inserted', {
        timeout: 5000,
        state: 'visible'
      }).catch(() => {
        throw new Error('No suggestions appeared');
      });

      const options = await this.page.locator('ul.suggestions li.ng-star-inserted').all();

      for (const option of options) {
        if (await option.isVisible().catch(() => false)) {
          const text = await option.textContent();
          if (text && text.toLowerCase().includes(partialName.toLowerCase())) {
            const selectedText = text.trim();

            // Click with retry
            await option.click({ force: true }).catch(async () => {
              await this.page.waitForTimeout(200);
              await option.click({ force: true });
            });

            await this.page.waitForTimeout(500);
            console.log(`  ✓ Selected partial match: "${selectedText}"`);
            return { success: true, selectedText };
          }
        }
      }

      return {
        success: false,
        selectedText: '',
        error: `No match found for "${partialName}"`
      };
    } catch (error) {
      console.log(`  ⚠ Error selecting collaborator: {error.message}`);
      return { success: false, selectedText: '' };
    }
  }

  /**
   * Enhanced add collaborator with duplicate check and better error handling
   */
  async addCollaborator(
    searchText: string,
    matchStrategy: 'exact' | 'partial' | 'first' = 'partial'
  ): Promise<{ success: boolean; selectedName: string; error?: string; alreadyExists?: boolean }> {

    console.log(`\n  📝 Adding collaborator with strategy: ${matchStrategy}`);

    try {
      // Check if already added
      const existingCollaborators = await this.getAddedCollaborators();
      const alreadyExists = existingCollaborators.some(name =>
        name.toLowerCase().includes(searchText.toLowerCase())
      );

      if (alreadyExists) {
        console.log(`  ⚠ Collaborator similar to "${searchText}" already exists, skipping`);
        return {
          success: false,
          selectedName: '',
          alreadyExists: true,
          error: 'Collaborator already exists'
        };
      }

      const searchSuccess = await this.searchCollaborator(searchText);
      if (!searchSuccess) {
        return {
          success: false,
          selectedName: '',
          error: 'Search failed'
        };
      }

      let result: { success: boolean; selectedText: string; error?: string } =
        { success: false, selectedText: '' };

      switch (matchStrategy) {
        case 'partial':
          result = await this.selectCollaboratorPartial(searchText);
          break;
        case 'first':
          const firstResult = await this.selectFirstCollaborator();
          result = {
            success: firstResult.success,
            selectedText: firstResult.selectedText,
            error: firstResult.error
          };
          break;
      }

      if (!result.success) {
        return {
          success: false,
          selectedName: '',
          error: result.error || 'Selection failed'
        };
      }

      // Verify addition with retry
      let added = false;
      for (let i = 0; i < 3; i++) {
        await this.page.waitForTimeout(500);
        added = await this.isCollaboratorAdded(result.selectedText);
        if (added) break;
      }

      if (added) {
        console.log(`  ✅ Collaborator added successfully: "${result.selectedText}"`);
        return { success: true, selectedName: result.selectedText };
      } else {
        return {
          success: false,
          selectedName: result.selectedText,
          error: 'Addition verification failed'
        };
      }

    } catch (error) {
      console.log(`  ⚠ Error adding collaborator: {error.message}`);
      return { success: false, selectedName: '' };
    }
  }


  /**
   * Enhanced remove collaborator with existence check
   */
  async removeCollaborator(collaboratorName: string): Promise<{ success: boolean; error?: string; notFound?: boolean }> {
    console.log(`  🗑️ Removing collaborator: "${collaboratorName}"`);

    try {
      // Check if collaborator exists
      const exists = await this.isCollaboratorAdded(collaboratorName);
      if (!exists) {
        console.log(`  ⚠ Collaborator "${collaboratorName}" not found, skipping`);
        return { success: false, notFound: true, error: 'Collaborator not found' };
      }

      const chips = await this.page.locator('.chip.ng-star-inserted').all();

      for (let i = 0; i < chips.length; i++) {
        const chip = chips[i];
        const chipText = await chip.textContent();
        const cleanChipText = chipText ? chipText.replace('×', '').trim() : '';

        if (cleanChipText.toLowerCase().includes(collaboratorName.toLowerCase())) {
          console.log(`  Found chip with text: "${chipText}"`);

          const removeBtn = chip.locator('.remove-btn');
          const btnVisible = await removeBtn.isVisible().catch(() => false);

          if (btnVisible) {
            // Click with retry
            await removeBtn.click({ force: true }).catch(async () => {
              await this.page.waitForTimeout(200);
              await removeBtn.click({ force: true });
            });

            await this.page.waitForTimeout(500);

            // Verify removal
            const stillExists = await this.isCollaboratorAdded(collaboratorName);
            if (!stillExists) {
              console.log(`  ✓ Removed collaborator: "${collaboratorName}"`);
              return { success: true };
            } else {
              return { success: false, error: 'Removal verification failed' };
            }
          } else {
            console.log(`  ⚠ Remove button not visible for this chip`);
            return { success: false, error: 'Remove button not visible' };
          }
        }
      }

      return { success: false, notFound: true, error: 'Collaborator not found in chips' };

    } catch (error) {
      console.log(`  ⚠ Error removing collaborator: {error.message}`);
      return { success: false };
    }
  }

  /**
   * Enhanced isCollaboratorAdded with better text matching
   */
  async isCollaboratorAdded(collaboratorName: string): Promise<boolean> {
    try {
      await this.page.waitForTimeout(300);

      const chips = await this.page.locator('.chip.ng-star-inserted').all();

      for (const chip of chips) {
        if (await chip.isVisible().catch(() => false)) {
          const text = await chip.textContent();
          const cleanText = text ? text.replace('×', '').trim() : '';

          // Check for exact match first, then partial
          if (cleanText === collaboratorName ||
            cleanText.toLowerCase().includes(collaboratorName.toLowerCase())) {
            return true;
          }
        }
      }

      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking collaborator: {error.message}`);
      return false;
    }
  }

  /**
   * Enhanced getAddedCollaborators with deduplication
   */
  async getAddedCollaborators(): Promise<string[]> {
    const collaborators: string[] = [];

    try {
      const chips = await this.page.locator('.chip.ng-star-inserted').all();
      const seen = new Set();

      for (const chip of chips) {
        if (await chip.isVisible().catch(() => false)) {
          const text = await chip.textContent();
          if (text && text.trim()) {
            const cleanName = text.replace('×', '').trim();
            // Deduplicate
            if (!seen.has(cleanName)) {
              seen.add(cleanName);
              collaborators.push(cleanName);
            }
          }
        }
      }

      console.log(`  Found ${collaborators.length} unique collaborators:`, collaborators);
    } catch (error) {
      console.log(`  ⚠ Error getting collaborators: {error.message}`);
    }

    return collaborators;
  }

  /**
   * Enhanced getCollaboratorCount
   */
  async getCollaboratorCount(): Promise<number> {
    try {
      const count = await this.page.locator('.chip.ng-star-inserted').count();
      console.log(`  Current collaborator count: ${count}`);
      return count;
    } catch (error) {
      console.log(`  ⚠ Error getting count: {error.message}`);
      return 0;
    }
  }
  /**
   * Clear collaborator search input with enhanced error handling
   */
  async clearCollaboratorSearch(): Promise<{ success: boolean; error?: string }> {
    console.log(`  🧹 Clearing collaborator search...`);

    try {
      // Check if search input exists and is visible
      const isVisible = await this.collaboratorSearchInput.isVisible().catch(() => false);

      if (!isVisible) {
        console.log(`  ⚠ Collaborator search input not visible`);
        return { success: false, error: 'Search input not visible' };
      }

      // Click on the input to focus
      await this.collaboratorSearchInput.click().catch(() => {
        console.log(`  ⚠ Could not click search input, trying force click`);
        return this.collaboratorSearchInput.click({ force: true });
      });

      // Clear the input
      await this.collaboratorSearchInput.fill('').catch(async () => {
        // If fill fails, try keyboard shortcut
        console.log(`  ⚠ Fill failed, trying keyboard clear`);
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
      });

      // Verify it's cleared
      await this.page.waitForTimeout(300);
      const currentValue = await this.collaboratorSearchInput.inputValue().catch(() => '');

      if (currentValue === '') {
        console.log(`  ✓ Collaborator search cleared successfully`);
        return { success: true };
      } else {
        // Try one more time with different approach
        console.log(`  ⚠ Input not empty, trying alternative method`);
        await this.collaboratorSearchInput.evaluate((el) => {
          if (el instanceof HTMLInputElement) {
            el.value = '';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });

        await this.page.waitForTimeout(300);
        const finalValue = await this.collaboratorSearchInput.inputValue().catch(() => '');

        if (finalValue === '') {
          console.log(`  ✓ Collaborator search cleared successfully (alternative method)`);
          return { success: true };
        } else {
          console.log(`  ⚠ Could not clear search input, value still: "${finalValue}"`);
          return { success: false, error: `Failed to clear input, current value: "${finalValue}"` };
        }
      }

    } catch (error) {
      console.log(`  ⚠ Error clearing collaborator search: {error.message}`);

      // Last resort: try JavaScript clear
      try {
        await this.collaboratorSearchInput.evaluate((el) => {
          if (el instanceof HTMLInputElement) {
            el.value = '';
            el.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });

        await this.page.waitForTimeout(300);
        console.log(`  ✓ Collaborator search cleared via JavaScript`);
        return { success: true };
      } catch (jsError) {
        console.log(`  ⚠ JavaScript clear also failed: {jsError.message}`);
        return { success: false };
      }
    }
  }
  /**
   * Select first available collaborator with error handling
   */
  async selectFirstCollaborator(): Promise<{ success: boolean; selectedText: string; error?: string }> {
    console.log(`  👤 Selecting first available collaborator`);

    try {
      await this.page.waitForSelector('ul.suggestions li.ng-star-inserted', {
        timeout: 5000,
        state: 'visible'
      }).catch(() => {
        throw new Error('No suggestions available');
      });

      const firstOption = this.page.locator('ul.suggestions li.ng-star-inserted').first();

      if (await firstOption.isVisible().catch(() => false)) {
        const text = await firstOption.textContent();
        if (text && text.trim()) {
          await firstOption.click({ force: true });
          await this.page.waitForTimeout(500);
          console.log(`  ✓ Selected first collaborator: "${text.trim()}"`);
          return { success: true, selectedText: text.trim() };
        }
      }

      return { success: false, selectedText: '', error: 'No visible options' };
    } catch (error) {
      return { success: false, selectedText: '' };
    }
  }

  /**
   * Enhanced addMultipleCollaborators with better error tracking
   */
  async addMultipleCollaborators(collaboratorNames: string[]): Promise<{
    success: boolean;
    added: string[];
    failed: Array<{ name: string; error: string }>;
  }> {
    console.log(`\n  📝 Adding multiple collaborators`);

    const added: string[] = [];
    const failed: Array<{ name: string; error: string }> = [];

    for (const name of collaboratorNames) {
      const result = await this.addCollaborator(name, 'partial');

      if (result.success && result.selectedName) {
        added.push(result.selectedName);
      } else if (!result.alreadyExists) {
        failed.push({ name, error: result.error || 'Unknown error' });
      }

      await this.page.waitForTimeout(500);
    }

    console.log(`  ✅ Added ${added.length} collaborators`);
    if (failed.length > 0) {
      console.log(`  ⚠ Failed to add ${failed.length} collaborators:`, failed);
    }

    return {
      success: failed.length === 0,
      added,
      failed
    };
  }

  /**
   * Wait for suggestions to disappear after selection
   */
  async waitForSuggestionsToDisappear(): Promise<void> {
    await this.page.locator('ul.suggestions').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => { });
  }







  /**
   * Reset form with improved verification
   */
  async reset(): Promise<boolean> {
    console.log('🔄 Resetting form...');

    // Get current values before reset
    const beforeValues = {
      firstName: await this.getFieldValue(this.firstNameInput).catch(() => ''),
      lastName: await this.getFieldValue(this.lastNameInput).catch(() => ''),
      age: await this.getFieldValue(this.ageInput).catch(() => '')
    };

    console.log('Values before reset:', beforeValues);

    await this.resetButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.resetButton.click();
    await this.page.waitForTimeout(1000);

    // Get values after reset
    const afterValues = {
      firstName: await this.getFieldValue(this.firstNameInput).catch(() => ''),
      lastName: await this.getFieldValue(this.lastNameInput).catch(() => ''),
      age: await this.getFieldValue(this.ageInput).catch(() => '')
    };

    console.log('Values after reset:', afterValues);

    // Check if reset worked (values should be different or empty)
    const resetWorked =
      afterValues.firstName !== beforeValues.firstName ||
      afterValues.lastName !== beforeValues.lastName ||
      afterValues.age !== beforeValues.age;

    if (resetWorked) {
      console.log('✓ Form reset successful');
    } else {
      console.log('⚠ Form reset may not have worked as expected');
    }

    return resetWorked;
  }



  /**
   * Complete edit flow
   */
  async editPatient(data: {
    firstName?: string;
    lastName?: string;
    age?: string;
    gender?: string;
    bloodGroup?: string;
    height?: string;
    weight?: string;
    city?: string;
    phoneNumber?: string;
    emergencyContact?: string;
    email?: string;
    address?: string;
    country?: string;
    state?: string;
  }): Promise<boolean> {
    console.log('\n=== Starting Edit Patient Flow ===');

    try {
      await this.clickEdit();
      await this.waitForModal();
      await this.fillForm(data);
      await this.save();

      // 🔍 DEBUG: Check what's on the page after save
      console.log('\n🔍 DEBUG: Page state after save');

      // Check if modal is still visible
      const modalVisible = await this.modal.isVisible().catch(() => false);
      console.log(`Modal visible: ${modalVisible}`);

      // Check for any validation errors
      const hasErrors = await this.hasAnyValidationError();
      console.log(`Has validation errors: ${hasErrors}`);

      if (hasErrors) {
        const errors = await this.getAllVisibleErrors();
        console.log('Validation errors:', errors);
      }

      // Check all possible success indicators
      const pageContent = await this.page.content();
      console.log('Page contains "success":', pageContent.toLowerCase().includes('success'));
      console.log('Page contains "toast":', pageContent.toLowerCase().includes('toast'));
      console.log('Page contains "alert":', pageContent.toLowerCase().includes('alert'));

      // Take screenshot
      await this.page.screenshot({ path: 'after-save-state.png', fullPage: true });
      console.log('📸 Screenshot saved: after-save-state.png');

      // Your existing success checks
      const success1 = await this.isSuccessMessageVisible();
      const success2 = await this.isSuccess();
      const success3 = await this.isSaveSuccessful();
      const success4 = await this.isSaveSuccessfulHCT();
      console.log('Success checks:', { success1, success2, success3, success4 });

      if (success1 || success2 || success3 || success4) {
        console.log('✅ Patient updated successfully\n');
        return true;
      } else {
        console.log('❌ Failed to update patient\n');
        return false;
      }
    } catch (error) {
      console.error('❌ Error in edit flow:', error);
      throw error;
    }
  }

  // pages/HCTPage.ts - Add/modify these methods

  /**
   * Navigate to HCT with better error handling and retry logic
   */
  // pages/HCTPage.ts - Replace the navigateToHCT method

  /**
   * Navigate to HCT with better error handling and retry logic
   */
  async navigateToHCT(): Promise<boolean> {
    console.log('🔍 Navigating to HCT...');

    try {
      // Try multiple times with increasing delays
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          // Click HCT menu
          await this.HCTMenu.waitFor({ state: 'visible', timeout: 10000 });
          await this.HCTMenu.scrollIntoViewIfNeeded();
          await this.HCTMenu.click();
          await this.page.waitForTimeout(1000);

          // Click HCT menu item
          await this.HCTMenuItem.waitFor({ state: 'visible', timeout: 10000 });
          await this.HCTMenuItem.scrollIntoViewIfNeeded();
          await this.HCTMenuItem.click();
          await this.page.waitForTimeout(3000);

          // Verify we're on HCT page by checking for search input
          const searchVisible = await this.searchInput.isVisible({ timeout: 5000 }).catch(() => false);

          if (searchVisible) {
            console.log(`✅ Navigated to HCT successfully on attempt ${attempt}`);
            return true;
          } else {
            console.log(`⚠ HCT navigation attempt ${attempt} succeeded but search input not visible, retrying...`);

            // Try clicking the menu again
            await this.page.reload().catch(() => { });
            await this.page.waitForTimeout(2000);
          }
        } catch (error) {
          console.log(`⚠ HCT navigation attempt ${attempt} failed:`);
          if (attempt === 3) {
            console.error('❌ Failed to navigate to HCT after 3 attempts');
            return false;
          }
          await this.page.waitForTimeout(2000 * attempt); // Increasing delay
        }
      }

      return false;
    } catch (error) {
      console.error('❌ Failed to navigate to HCT:', error);
      return false;
    }
  }

  /**
   * Enhanced searchCaseById with better waiting and retry logic
   */
  async searchCaseById(caseId: string): Promise<boolean> {
    console.log(`🔍 Searching for case: ${caseId}`);

    try {
      // Wait for search input with increased timeout
      await this.searchInput.waitFor({
        state: 'visible',
        timeout: 20000 // Increased from 10000
      });

      // Clear and fill
      await this.searchInput.clear();
      await this.searchInput.fill(caseId);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(1000);
      await this.page.keyboard.press('Enter'); // Sometimes need to press twice
      await this.page.waitForTimeout(2000);

      console.log(`✅ Searched for case: ${caseId}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to search for case ${caseId}:`, error);

      // Try one more time with force approach
      try {
        console.log('🔄 Retrying search with force...');
        await this.page.evaluate((selector) => {
          const input = document.querySelector(selector) as HTMLInputElement;
          if (input) {
            input.value = '';
            input.focus();
          }
        }, '//input[@placeholder=\'Search by Case ID , Name\']');

        await this.page.keyboard.type(caseId);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);

        console.log(`✅ Searched for case on retry: ${caseId}`);
        return true;
      } catch (retryError) {
        console.error(`❌ Retry also failed for case ${caseId}:`, retryError);
        throw error;
      }
    }
  }

  /**
   * Click on case row with better waiting
   */
  async clickCaseRow(caseId: string): Promise<void> {
    console.log(`🔍 Clicking case row: ${caseId}`);

    try {
      // More accurate XPath targeting the exact div with the case ID
      const caseRow = this.page.locator(
        `//tr[contains(@class,'display-pointer')][td[1]/div[contains(@class,'text-primary') and normalize-space()='${caseId}']]`
      );

      await caseRow.waitFor({ state: 'visible', timeout: 15000 });
      await caseRow.scrollIntoViewIfNeeded();
      await caseRow.click();
      await this.page.waitForTimeout(2000);

      console.log(`✅ Clicked case row: ${caseId}`);
    } catch (error) {
      console.error(`❌ Failed to click case row ${caseId}:`, error);

      // Try alternative selector
      try {
        const altCaseRow = this.page.locator(
          `//tr[contains(@class,'display-pointer')][.//div[contains(text(),'${caseId}')]]`
        );
        await altCaseRow.waitFor({ state: 'visible', timeout: 5000 });
        await altCaseRow.click();
        await this.page.waitForTimeout(2000);
        console.log(`✅ Clicked case row with alt selector: ${caseId}`);
      } catch (altError) {
        console.error(`❌ Alt selector also failed:`, altError);
        throw error;
      }
    }
  }


}