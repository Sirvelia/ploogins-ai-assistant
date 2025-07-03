import { queryOptions } from "@tanstack/react-query"
import { getSearchEntries } from "@/api/wp"

export const getSearchEntriesQueryOptions = () => {
    return queryOptions({
        queryKey: ['search-entries'],
        queryFn: getSearchEntries,
    })
}