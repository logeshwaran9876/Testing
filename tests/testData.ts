// testData.ts
/**
 * Test Data and Configuration for Login Tests
 * Centralized test data from test.json
 */

export interface TestCredentials {
    username: string;
    password: string;
    mobile: string;
}

export interface RoleConfig {
    url: string;
    welcome_message: string;
    credentials: {
        valid: TestCredentials;
        invalid: TestCredentials;
    };
    dashboard_url: string;
}

export interface TestDataConfig {
    roles: {
        admin: RoleConfig;
        crmTeamLead: RoleConfig;
        hnmLead: RoleConfig;
        caseManager: RoleConfig;
        insurance: RoleConfig;
        provider: RoleConfig;
        facilitator: RoleConfig;
    };
    test_data: {
        invalid_formats: {
            email: string[];
            mobile: string[];
            password: string[];
        };
        security: {
            max_login_attempts: number;
            lockout_duration_minutes: number;
            session_timeout_minutes: number;
            remember_me_days: number;
        };
        validation_messages: {
            required_username: string;
            required_password: string;
            invalid_credentials: string;
            account_locked: string;
            invalid_email_format: string;
            invalid_mobile_format: string;
        };
    };
}

export const testData: TestDataConfig = {
    roles: {
        admin: {
            url: 'http://app.dev.mycareever.com/auth/signin?q=admin',
            welcome_message: 'Welcome to Careever!',
            credentials: {
                valid: {
                    username: 'admin@mycareever.com',
                    password: 'Password@123',
                    mobile: '+12345678901',
                },
                invalid: {
                    username: 'invalid_admin@fake.com',
                    password: 'WrongPassword123!',
                    mobile: '45686',
                },
            },
            dashboard_url: 'http://app.dev.mycareever.com/dashboard',
        },
        insurance: {
            url: 'http://honda.dev.mycareever.com/auth/signin',
            welcome_message: 'Welcome to Honda Insurance!',
            credentials: {
                valid: {
                    username: 'kesav@gmai.com',
                    password: 'Test@123',
                    mobile: '+12345678902',
                },
                invalid: {
                    username: 'invalid_agent@fake.com',
                    password: 'WrongPassword123!',
                    mobile: '55333',
                },
            },
            dashboard_url: 'http://honda.dev.mycareever.com/dashboard',
        },
        provider: {
            url: 'http://newpro.dev.mycareever.com/auth/signin',
            welcome_message: 'Welcome to TestProvider152!',
            credentials: {
                valid: {
                    username: 'logeshvaran.9876@gmail.com',
                    password: 'Test@123',
                    mobile: '+12345678903',
                },
                invalid: {
                    username: 'invalid_provider@fake.com',
                    password: 'WrongPassword123!',
                    mobile: '12345',
                },
            },
            dashboard_url: 'http://newpro.dev.mycareever.com/dashboard',
        },
        facilitator: {
            url: 'http://newfec.dev.mycareever.com/auth/signin',
            welcome_message: 'Welcome to TestProvider152!',
            credentials: {
                valid: {
                    username: 'logeshvaran.9876@gmail.com',
                    password: 'Test@123',
                    mobile: '+12345678904',
                },
                invalid: {
                    username: 'invalid_facilitator@fake.com',
                    password: 'WrongPassword123!',
                    mobile: '9876543',
                },
            },
            dashboard_url: 'http://newfec.dev.mycareever.com/dashboard',
        }, crmTeamLead: {
            url: 'http://app.dev.mycareever.com/auth/signin?q=admin',
            welcome_message: 'Welcome CRM Team Lead!',
            credentials: {
                valid: {
                    username: 'ashok@gmail.com',
                    password: 'Test@123',
                    mobile: '+12345678905'
                },
                invalid: {
                    username: 'invalid_crm@fake.com',
                    password: 'WrongPassword123!',
                    mobile: '11111'
                }
            },
            dashboard_url: 'http://app.dev.mycareever.com/dashboard'
        }, hnmLead: {
            url: 'http://app.dev.mycareever.com/auth/signin?q=admin',
            welcome_message: 'Welcome HNM Lead!',
            credentials: {
                valid: {
                    username: 'cs@gmail.com',
                    password: 'Test@123',
                    mobile: '+12345678906'
                },
                invalid: {
                    username: 'invalid_hnm@fake.com',
                    password: 'WrongPassword123!',
                    mobile: '22222'
                }
            },
            dashboard_url: 'http://app.dev.mycareever.com/dashboard'
        }, caseManager: {
            url: 'http://app.dev.mycareever.com/auth/signin?q=admin',
            welcome_message: 'Welcome Case Manager!',
            credentials: {
                valid: {
                    username: 'loky@10.gmail.com',
                    password: 'Test@123',
                    mobile: '+12345678907'
                },
                invalid: {
                    username: 'invalid_case@fake.com',
                    password: 'WrongPassword123!',
                    mobile: '33333'
                }
            },
            dashboard_url: 'http://app.dev.mycareever.com/dashboard'
        },






    },
    test_data: {
        invalid_formats: {
            email: [
                'invalidemail',
                'user@.com',
                '@domain.com',
                'user@domain.',
                'user@domain..com',
                'Harini#1234'
            ],
            mobile: [
                '12345',
                'abcdefghijk',
                '+123',
                '123-456-789',
            ],
            password: [
                '123',
                'password',
                '12345678',
                'wrong'
            ],
        },
        security: {
            max_login_attempts: 5,
            lockout_duration_minutes: 15,
            session_timeout_minutes: 30,
            remember_me_days: 30,
        },
        validation_messages: {
            required_username: 'Email or Mobile number is required',
            required_password: 'Password is required',
            invalid_credentials: 'Invalid username or password',
            account_locked: 'Account temporarily locked. Please try again later.',
            invalid_email_format: 'Please enter a valid email address',
            invalid_mobile_format: 'Please enter a valid mobile number',
        },
    },
};

/**
 * Get role configuration by role name
 */
export function getRoleConfig(role: keyof typeof testData.roles): RoleConfig {
    return testData.roles[role];
}

/**
 * Get validation message
 */
export function getValidationMessage(messageType: keyof typeof testData.test_data.validation_messages): string {
    return testData.test_data.validation_messages[messageType];
}

/**
 * Get invalid email formats
 */
export function getInvalidEmailFormats(): string[] {
    return testData.test_data.invalid_formats.email;
}

/**
 * Get invalid mobile formats
 */
export function getInvalidMobileFormats(): string[] {
    return testData.test_data.invalid_formats.mobile;
}

/**
 * Get security configuration
 */
export function getSecurityConfig() {
    return testData.test_data.security;
}