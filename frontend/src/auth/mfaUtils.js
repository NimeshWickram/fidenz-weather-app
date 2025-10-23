// Utility functions for handling MFA
export const handleMFAChallenge = async (getAccessTokenSilently, error) => {
  try {
    // If MFA is required, Auth0 will automatically redirect to the MFA page
    // This function can be used to handle MFA challenges programmatically if needed
    console.log('MFA challenge required:', error);
    
    // You can customize this behavior based on your needs
    // For example, you might want to show a specific UI element or message
    return null;
  } catch (mfaError) {
    console.error('Error handling MFA challenge:', mfaError);
    throw mfaError;
  }
};

export const checkMFAStatus = (user) => {
  // Check if the user has MFA enabled
  // This would typically be determined by Auth0 rules or user metadata
  if (user && user['https://example.com/isMFAEnabled']) {
    return user['https://example.com/isMFAEnabled'];
  }
  return false;
};

export default {
  handleMFAChallenge,
  checkMFAStatus
};