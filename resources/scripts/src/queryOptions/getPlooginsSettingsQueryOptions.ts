import { queryOptions } from "@tanstack/react-query";
import { getPlooginsSettings } from "@/api/wp";

export function getPlooginsSettingsQueryOptions() {
    return queryOptions({
        queryKey: ['ploogins-settings'],
        queryFn: getPlooginsSettings
    });
}