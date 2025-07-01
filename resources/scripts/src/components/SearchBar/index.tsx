import React from 'react';
import { Button, Flex, FlexItem, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const SearchBar = (props: {
    search: string;
    setSearch: (search: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
}) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Flex gap={2}>
                <FlexItem isBlock={true}>
                    <TextControl
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                        onChange={(value) => props.setSearch(value)}
                        value={props.search}
                        placeholder={__('Discover Plugins with AI', 'ploogins-ai-assistant')}
                    />
                </FlexItem>
                <FlexItem>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        {__('Search', 'ploogins-ai-assistant')}
                    </Button>
                </FlexItem>
            </Flex>
        </form>
    );
};

export default SearchBar;