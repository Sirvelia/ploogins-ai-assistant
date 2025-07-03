import { queryOptions } from "@tanstack/react-query"
import { getRandomPlugins } from '@/api/ploogins';
import { Settings } from '@/api/wp';

export default function getRandomPluginsQueryOptions(settings: Settings) {
    return queryOptions({
        queryKey: ['random-plugins', settings],
        queryFn: () => getRandomPlugins(settings),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}