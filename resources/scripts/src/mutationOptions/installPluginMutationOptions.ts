import { installPlugin } from '@/api/wp';

export function installPluginMutationOptions() {
    return {
        mutationFn: (pluginSlug: string) => {
            return new Promise((resolve, reject) => {
                installPlugin(pluginSlug)
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