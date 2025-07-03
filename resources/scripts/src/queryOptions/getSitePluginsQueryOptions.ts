import { queryOptions } from "@tanstack/react-query"
import { getSitePlugins } from "@/api/wp"

export default function getSitePluginsQueryOptions() {
    return queryOptions({
        queryKey: ['site-plugins'],
        queryFn: getSitePlugins,
    })
}