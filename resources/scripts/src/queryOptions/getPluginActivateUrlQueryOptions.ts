import { queryOptions } from "@tanstack/react-query";
import { getPluginActivateUrl } from '@/api/wp';

export default function getPluginActivateUrlQueryOptions(pluginDir: string) {
    return queryOptions({
        queryKey: ['plugin-activate-url', pluginDir],
        queryFn: () => getPluginActivateUrl(pluginDir),
        enabled: !!pluginDir, // Only run the query if pluginDir is not empty
    });
}