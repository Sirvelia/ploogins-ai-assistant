import React, { Fragment, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import Plugin from '@/components/Plugin';
import PluginType from '@/types/Plugin';
import './style.css';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';
import { useSearchPlugins } from '@/hooks/useSearchPlugins';
import { Flex, FlexItem, Spinner } from '@wordpress/components';
import { useInstalledPlugins } from '@/hooks/useInstalledPlugins';

const PluginInstall = () => {

    const [search, setSearch] = useState('');
    const { setSearchQuery, searchResults, isLoading } = useSearchPlugins();
    const { installedPlugins, fetchPlugins, activePlugins } = useInstalledPlugins();

    useEffect(() => {
        setSearchQuery('Suprise me!');
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchQuery(search)
    };

    return (
        <Fragment>
            <h1 className="wp-heading-inline">{__('Install Plugins with AI', 'ploogins-ai-assistant')}</h1>

            <SearchBar
                search={search}
                setSearch={setSearch}
                handleSubmit={handleSubmit}
            />

            {isLoading ?
                <Flex justify="center" align="center">
                    <FlexItem>
                        <Spinner
                            style={{
                                height: 'calc(4px * 20)',
                                width: 'calc(4px * 20)'
                            }}
                        />
                    </FlexItem>
                </Flex>
            : (searchResults && searchResults.plugins && searchResults.plugins.length > 0 ? (
                <div className="ploogin-cards-grid">
                    {searchResults.plugins.map((plugin: PluginType) => (
                        <Plugin
                            key={plugin.slug}
                            plugin={plugin}
                            installedPlugins={installedPlugins}
                            fetchPlugins={fetchPlugins}
                            activePlugins={activePlugins}
                        />
                    ))}
                </div>
            ) : (
                <p>{__('No plugins found. Try a different search term.', 'ploogins-ai-assistant')}</p>
            ))}          
        </Fragment>
    );
};

export default PluginInstall;