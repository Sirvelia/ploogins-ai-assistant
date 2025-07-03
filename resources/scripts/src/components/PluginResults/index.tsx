import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useMutation, useQuery } from '@tanstack/react-query';
import getSearchPluginsQueryOptions from '@/queryOptions/getSearchPluginsQueryOptions';
import getRandomPluginsQueryOptions from '@/queryOptions/getRandomPluginsQueryOptions';
import { Flex, FlexItem, Spinner } from '@wordpress/components';
import PluginGrid from '@/components/PluginGrid';
import { getPlooginsSettingsQueryOptions } from '@/queryOptions/getPlooginsSettingsQueryOptions';
import { addSearchEntryMutationOptions } from '@/mutationOptions/addSearchEntryMutationOptions';
import { SearchEntry } from '@/api/wp';
import { Settings } from '@/api/wp';

type PluginResultsProps = {
    query: string;
};

const PluginResults = ({query}: PluginResultsProps) => {

    const { data: settings } = useQuery(getPlooginsSettingsQueryOptions())

    const { data: searchResults, isPending: isSearchPluginsPending } = useQuery(
        getSearchPluginsQueryOptions({ query, ...settings })
    );

    const { data: randomPluginsResults, isPending: isRandomPluginsPending } = useQuery(
        getRandomPluginsQueryOptions(settings as Settings)
    );

    const results = query ? searchResults?.plugins : randomPluginsResults;
    const isPending = query ? isSearchPluginsPending : isRandomPluginsPending;

    const addSearchEntryMutation = useMutation(addSearchEntryMutationOptions());

    useEffect(() => {
        if (searchResults) {

            const searchEntry = {
                search_intent_id: searchResults.search_intent_id,
                query: query,
                api_args: settings,
                plugins: searchResults.plugins.map(({ id, slug }) => ({ id, slug }))
            }

            addSearchEntryMutation.mutate(searchEntry as SearchEntry);
        }
    }, [results]);

    if (isPending) {
        return (
            <Flex justify="center" align="center" style={{ padding: '4rem 0' }}>
                <FlexItem >
                    <Spinner
                        style={{
                            height: 'calc(4px * 20)',
                            width: 'calc(4px * 20)'
                        }}
                    />
                </FlexItem>
            </Flex>
        );
    }

    return <PluginGrid results={results ?? []} />
}

export default PluginResults;