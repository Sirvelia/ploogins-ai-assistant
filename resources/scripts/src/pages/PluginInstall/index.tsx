import React, { Fragment } from 'react';
import { __ } from '@wordpress/i18n';
import PluginResults from '@/components/PluginResults';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';

const PluginInstall = () => {

    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setQuery(search)
    };

    return (
        <Fragment>
            <h1>{__('Install Plugins with AI', 'ploogins-ai-assistant')}</h1>
            <hr />
            <SearchBar
                search={search}
                setSearch={setSearch}
                handleSubmit={handleSubmit}
                style={{ marginBottom: '1rem' }}
            />

            <PluginResults query={query} />       
        </Fragment>
    );
};

export default PluginInstall;