import React from 'react';
import { __ } from '@wordpress/i18n';
import PluginGrid from '../PluginGrid';
import { Panel, PanelBody, PanelRow } from '@wordpress/components';
import { getSuggestionsPluginsQueryOptions } from '@/queryOptions/getSuggestionsPluginsQueryOptions';
import { useQuery } from '@tanstack/react-query';
import { Flex, FlexItem, Spinner } from '@wordpress/components';
import { PlooginsData } from '@/types/plooginsData';

declare const plooginsData: PlooginsData;

interface PluginRecommendationsProps {
    userDescription: string;
}

const PluginRecommendations = ({ userDescription }: PluginRecommendationsProps) => {

    const locale = plooginsData.locale || 'en_US';

    const { data, isPending, isLoading } = useQuery(
        getSuggestionsPluginsQueryOptions({
            userDescription,
            siteDescription: '',
            siteLocale: locale,
            sitePlugins: [],
            numSuggestions: 3,
        }),
    );

    if (isLoading) {
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

    return (
        <>
            {data && data.map((feature, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                    <Panel>
                        <PanelBody title={feature.feature_translation}>
                            <PanelRow>
                                {feature.suggestions.length > 0 && (
                                    <PluginGrid results={feature.suggestions} />
                                )}
                            </PanelRow>
                        </PanelBody>
                    </Panel>
                </div>
            ))}
        </>   
    );
};

export default PluginRecommendations;