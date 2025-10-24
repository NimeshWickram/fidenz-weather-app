// Utility functions for user validation and authorization
const PRE_REGISTERED_USERS = [
    'careers@fidenz.com'
];

export const isUserPreRegistered = (userEmail) => {
    return PRE_REGISTERED_USERS.includes(userEmail);
};

export const validateUserAccess = (user) => {
    // Check if user exists
    if (!user) {
        return {
            isValid: false,
            reason: 'No user information provided'
        };
    }

    // Check if user email is pre-registered
    if (!isUserPreRegistered(user.email)) {
        return {
            isValid: false,
            reason: 'User is not pre-registered. Access denied.'
        };
    }

    // User is valid
    return {
        isValid: true,
        reason: 'User is pre-registered and authorized'
    };
};

export default {
    isUserPreRegistered,
    validateUserAccess
};