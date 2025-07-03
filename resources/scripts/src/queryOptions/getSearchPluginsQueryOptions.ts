import { queryOptions } from "@tanstack/react-query"
import { getSearchPlugins } from '@/api/ploogins';
import { PlooginsAPIArguments } from '@/api/ploogins';

export default function getSearchPluginsQueryOptions(args: PlooginsAPIArguments) {
    return queryOptions({
        queryKey: ['search-plugins', args],
        queryFn: () => getSearchPlugins(args),
        enabled: !!args.query,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}