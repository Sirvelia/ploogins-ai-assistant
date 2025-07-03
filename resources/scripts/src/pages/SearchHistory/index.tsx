import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import SearchHistoryList from '@/components/SearchHistoryList';

const SearchHistory = () => {

    return (
        <Fragment>
            <h1>{__('Search History', 'ploogins-ai-assistant')}</h1>
            <hr />
            <SearchHistoryList />
        </Fragment>
    );
}

export default SearchHistory;