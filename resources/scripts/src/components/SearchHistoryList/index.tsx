import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { DataViews, filterSortAndPaginate, View, Field } from '@wordpress/dataviews'
import { useQuery } from '@tanstack/react-query'
import { getSearchEntriesQueryOptions } from '@/queryOptions/getSearchEntriesQueryOptions'
import { SearchEntry } from '@/api/wp';
import { useMemo } from 'react';
import './style.css';
import { Panel, PanelBody } from '@wordpress/components';

const SearchHistoryList = () => {

    const {data: searchEntries, isPending} = useQuery(getSearchEntriesQueryOptions())

    const defaultLayouts = {
        table: {
            showMedia: false,
        }
    };

    const fields: Field<SearchEntry>[] = [
        {
            id: 'query',
            label: __('Query', 'ploogins-ai-assistant'),
            enableGlobalSearch: true,
        },
        {
            id: 'time',
            label: __('Time', 'ploogins-ai-assistant'),
        },
        {
            id: 'plugins_count',
            label: __('Plugins Count', 'ploogins-ai-assistant'),
            render: ({ item }) => (
                <p>{item.plugins.length}</p>
            )
        }
    ]

    const [view, setView] = useState<View>({
        type: 'table',
        perPage: 10,
        fields: [
            'query',
            'plugins_count',
            'time',
        ],
    });

    const { data, paginationInfo } = useMemo(() => {
        return filterSortAndPaginate(searchEntries ?? [], view, fields);
    }, [searchEntries, view]);

    return (
        <Panel>
            <PanelBody>
                <DataViews
                    getItemId={ (item: SearchEntry) => item.id.toString() }
                    data={data ?? []}
                    fields={fields}
                    view={view}
                    onChangeView={setView}
                    defaultLayouts={defaultLayouts}
                    paginationInfo={paginationInfo}
                />
            </PanelBody>
        </Panel>
    );
};

export default SearchHistoryList;