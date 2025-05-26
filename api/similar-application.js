// API service for handling similar application submissions

/**
 * Submit a new similar application
 * @param {Object} applicationData - The application form data
 * @returns {Promise} - Promise with the response
 */
export async function submitSimilarApplication(applicationData) {
  try {
    // This will be replaced with actual API call when backend is ready
    // For now, using mock data with simulated delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Submitted application data:', applicationData);
        resolve({
          success: true,
          message: '申请提交成功',
          data: {
            id: 'app-' + Date.now(),
            ...applicationData,
            status: 'pending',
            createdAt: new Date().toISOString()
          }
        });
      }, 1000);
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
}

/**
 * Get application status by ID
 * @param {string} applicationId - The application ID
 * @returns {Promise} - Promise with application status
 */
export async function getApplicationStatus(applicationId) {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: applicationId,
          status: 'pending', // 或 'approved', 'rejected'
          updatedAt: new Date().toISOString()
        });
      }, 500);
    });
  } catch (error) {
    console.error('Error getting application status:', error);
    throw error;
  }
}

/**
 * Get user's applications
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with list of user's applications
 */
export async function getUserApplications(userId) {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 'app-123456',
              applicationType: '同乡',
              name: '张三',
              status: 'approved',
              createdAt: '2025-05-20T10:30:00Z'
            },
            {
              id: 'app-234567',
              applicationType: '同学',
              name: '张三',
              status: 'pending',
              createdAt: '2025-05-22T15:45:00Z'
            }
          ]
        });
      }, 700);
    });
  } catch (error) {
    console.error('Error fetching user applications:', error);
    throw error;
  }
}
