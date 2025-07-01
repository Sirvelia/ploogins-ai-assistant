import { useEffect, useState, useRef } from "react";
import { PlooginsData } from '@/types/plooginsData';

declare const plooginsData: PlooginsData;

export const useSearchPlugins = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);
    const isAbortedRef = useRef(false);

    useEffect(() => {
        if (searchQuery) {
            searchPlugins();
        }
    }, [searchQuery]);

    useEffect(() => {
        if (searchResults && searchResults.plugins && searchResults.plugins.length > 0) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [searchResults]);

    const searchPlugins = async () => {
        // Cancel any existing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new AbortController for this request
        abortControllerRef.current = new AbortController();
        isAbortedRef.current = false;

        setSearchResults([]);

        try {
            const response = await fetch(plooginsData.ploogins_public_api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: searchQuery
                }),
                signal: abortControllerRef.current.signal
            });
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                isAbortedRef.current = true;
                return;
            }
            // Handle other errors
            console.error('Error searching plugins:', error);
        }
    }

    return { searchQuery, setSearchQuery, searchResults, setSearchResults, searchPlugins, isLoading };
}