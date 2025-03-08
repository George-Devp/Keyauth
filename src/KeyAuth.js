import axios from 'axios';

class KeyAuthAPI {
    static async login(username, password) {
        try {
            const response = await axios.post('https://keyauth.win/api/1.3/', {
                username,
                password,
            }, {
                timeout: 5000, // Timeout set to 5 seconds
            });

            if (response.data.success) {
                return {
                    success: true,
                    data: response.data,
                };
            } else {
                throw new Error(response.data.message || 'Unknown error');
            }
        } catch (error) {
            let errorMessage = 'An error occurred';

            // Handle specific error types
            if (error.response) {
                // Server error
                errorMessage = `Server error: ${error.response.status}`;
            } else if (error.request) {
                // Network error
                errorMessage = 'Network error. Please check your connection.';
            } else if (error.code === 'ECONNABORTED') {
                // Timeout error
                errorMessage = 'Request timed out. Please try again later.';
            } else {
                // Other error
                errorMessage = error.message;
            }

            return { success: false, message: errorMessage };
        }
    }
}

export default KeyAuthAPI;
