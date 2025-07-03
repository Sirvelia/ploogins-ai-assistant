import { addSearchEntry, SearchEntry } from "@/api/wp";

export function addSearchEntryMutationOptions() {
    return {
        mutationFn: (searchEntry: SearchEntry) => {
            return new Promise((resolve, reject) => {
                addSearchEntry(searchEntry)
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