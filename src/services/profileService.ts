import { apiService } from './api';

export const profileService = {
    fetchUserProfile: async () => {
        try {
            const response = await apiService.getUserProfileData();

            if (response.error) {
                throw new Error(response.message || 'Failed to fetch profile');
            }

            return {
                success: true,
                data: response.data.user
            };
        } catch (error) {
            console.error('Profile fetch error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch profile'
            };
        }
    }
}; 