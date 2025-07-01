import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { PlooginsData } from '@/types/plooginsData';

declare const plooginsData: PlooginsData;

export const useActivateUrl = () => {
    const getActivateUrl = async (pluginDir: string): Promise<string> => {
        const queryParams = { plugin: pluginDir }

        try {
            const data = await apiFetch({
                path: addQueryArgs(plooginsData.wp_ploogins_api_url + '/get-activate-url', queryParams),
            });
            return (data as { activate_url: string }).activate_url;
        } catch (error) {
            console.error('Error fetching activate url:', error);
            throw error;
        }
    }

    return {
        getActivateUrl,
    }
}