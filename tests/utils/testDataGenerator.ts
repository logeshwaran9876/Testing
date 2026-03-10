import { faker } from '@faker-js/faker';

export class TestDataGenerator {
  /**
   * Generate a unique member ID
   */
  static generateMemberId(prefix: string = 'MEM'): string {
    return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }

  /**
   * Generate a realistic person with all required details
   */
  static generatePerson() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number('##########'),
      dateOfBirth: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }).toLocaleDateString('en-GB'),
      gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
      nationality: 'India',
      country: 'India'
    };
  }

  /**
   * Generate complete enquiry data
   */
  static generateEnquiry() {
    const person = this.generatePerson();
    return {
      memberId: this.generateMemberId(),
      ...person,
      state: faker.helpers.arrayElement(['Delhi', 'Maharashtra', 'Tamil Nadu']),
      city: faker.helpers.arrayElement(['New Delhi', 'Mumbai', 'Chennai']),
      preferenceCountry: 'India',
      preferenceState: faker.helpers.arrayElement(['Delhi', 'Maharashtra', 'Tamil Nadu']),
      preferenceCity: faker.helpers.arrayElement(['New Delhi', 'Mumbai', 'Chennai']),
      hospitalName: faker.helpers.arrayElement(['Apollo Hospital', 'Max Healthcare', 'Fortis Hospital']),
      caseType: faker.helpers.arrayElement(['regular', 'maternity', 'emergency']),
      lineOfTreatment: faker.helpers.arrayElement(['Cardiology', 'Oncology', 'Orthopedics', 'Obstetrics']),
      countryCode: '+91'
    };
  }

  /**
   * Generate invalid email addresses
   */
  static generateInvalidEmail(): string[] {
    return [
      'notanemail',
      'missing@domain',
      '@nodomain.com',
      'double@@domain.com',
      'spaces in@email.com',
      'special!chars@domain.com'
    ];
  }

  /**
   * Generate invalid phone numbers
   */
  static generateInvalidPhone(): string[] {
    return [
      '123',
      '12345678901234567890',
      'ABCDEFGHIJ',
      '!@#$%^&*()',
      '123-456',
      '(123) 456'
    ];
  }

  /**
   * Generate test data for batch testing
   */
  static generateBatchEnquiries(count: number = 5) {
    return Array.from({ length: count }, () => this.generateEnquiry());
  }

  /**
   * Generate edge case data
   */
  static generateEdgeCaseEnquiry() {
    return {
      memberId: `MEM${'A'.repeat(50)}`,
      firstName: 'VeryLongFirstNameThatExceedsNormalLength',
      lastName: 'VeryLongLastNameThatMayExceedTheFieldLimit',
      email: 'verylongemailaddress.withlongtextpattern@subdomainexample.co.uk',
      phone: '9999888877',
      countryCode: '+91',
      hospitalName: 'Apollo Hospital - Extended Campus with Long Name'
    };
  }

  /**
   * Generate enquiry with special characters
   */
  static generateSpecialCharacterEnquiry() {
    return {
      memberId: `MEM-${Date.now()}`,
      firstName: `José-${Date.now()}`,
      lastName: `García-López`,
      email: `jose.garcia+test${Date.now()}@example.co.in`,
      phone: '9876543210',
      countryCode: '+91',
      hospital: "St. John's Medical Centre"
    };
  }

  /**
   * Generate international enquiry
   */
  static generateInternationalEnquiry() {
    return {
      memberId: this.generateMemberId(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: '4155551234',
      countryCode: '+1',
      country: 'United States',
      state: 'California',
      city: 'San Francisco',
      hospitalName: 'UCSF Medical Center'
    };
  }
}

export class TestDataValidator {
  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone format
   */
  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }

  /**
   * Validate member ID format
   */
  static isValidMemberId(memberId: string): boolean {
    return memberId.length >= 3 && memberId.length <= 50;
  }

  /**
   * Validate name format
   */
  static isValidName(name: string): boolean {
    return name.length >= 2 && name.length <= 100;
  }

  /**
   * Validate date format (DD-MM-YYYY)
   */
  static isValidDate(date: string): boolean {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    return dateRegex.test(date);
  }

  /**
   * Validate complete enquiry data
   */
  static validateEnquiry(enquiry: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.isValidMemberId(enquiry.memberId)) {
      errors.push('Invalid Member ID');
    }

    if (!this.isValidName(enquiry.firstName)) {
      errors.push('Invalid First Name');
    }

    if (!this.isValidName(enquiry.lastName)) {
      errors.push('Invalid Last Name');
    }

    if (!this.isValidEmail(enquiry.email)) {
      errors.push('Invalid Email');
    }

    if (!this.isValidPhone(enquiry.phone)) {
      errors.push('Invalid Phone');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

export class TestDataCleanup {
  /**
   * Store created enquiry IDs for cleanup
   */
  private static createdEnquiries: string[] = [];

  /**
   * Add enquiry ID to cleanup list
   */
  static addEnquiryForCleanup(enquiryId: string) {
    this.createdEnquiries.push(enquiryId);
  }

  /**
   * Get all enquiries created during tests
   */
  static getCreatedEnquiries(): string[] {
    return this.createdEnquiries;
  }

  /**
   * Clear the cleanup list
   */
  static clearCleanupList() {
    this.createdEnquiries = [];
  }

  /**
   * Delete all created enquiries (would require API access)
   */
  static async deleteAllCreatedEnquiries() {
    // This would require actual API implementation
    // For now, just clear the list
    this.clearCleanupList();
  }
}
