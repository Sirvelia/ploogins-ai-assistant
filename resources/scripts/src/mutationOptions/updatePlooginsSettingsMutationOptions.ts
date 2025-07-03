import { updatePlooginsSettings } from '@/api/wp';
import { Settings } from '@/api/wp';

export function updatePlooginsSettingsMutationOptions() {
    return {
        mutationFn: (settings: Settings) => {
            return new Promise((resolve, reject) => {
                updatePlooginsSettings(settings)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
            });
        }
    }
}