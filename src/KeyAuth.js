import axios from 'axios';

// KeyAuth API Configuration
const KeyAuthConfig = {
    name: "GeorgeAuth",          // App Name
    ownerid: "EdmsTKiuld",       // Account ID
    version: "1.0",              // App Version
    url: "https://keyauth.win/api/1.3/",  // API URL
};

const KeyAuthAPI = {
    // Login Function
    async login(username, password) {
        try {
            const response = await axios.post(KeyAuthConfig.url, {
                type: "login",
                name: KeyAuthConfig.name,
                ownerid: KeyAuthConfig.ownerid,
                version: KeyAuthConfig.version,
                username,
                password
            });

            if (response.data.success) {
                return { success: true, data: response.data };
            } else {
                return { success: false, message: response.data.message || "Unknown error occurred." };
            }
        } catch (error) {
            if (error.response) {
                // The server responded with a status other than 2xx
                return { success: false, message: `Server error: ${error.response.data.message || 'Unknown server error'}` };
            } else if (error.request) {
                // The request was made but no response was received
                return { success: false, message: "No response from server. Please check your internet connection." };
            } else {
                // Something happened in setting up the request
                return { success: false, message: `Request error: ${error.message}` };
            }
        }
    }
};

export default KeyAuthAPI;
