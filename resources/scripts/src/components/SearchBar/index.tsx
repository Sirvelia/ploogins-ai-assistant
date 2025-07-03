import React from 'react';
import { Button, Flex, FlexItem, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const SearchBar = (props: {
    search: string;
    setSearch: (search: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    placeholder?: string;
    style?: React.CSSProperties;
}) => {
    return (
        <form onSubmit={props.handleSubmit} style={props.style}>
            <Flex gap={0} expanded={true} align="normal">
                <FlexItem isBlock={true} style={{ flex: 1 }}>
                    <TextControl
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                        onChange={(value) => props.setSearch(value)}
                        value={props.search}
                        placeholder={props.placeholder || __('Discover Plugins with AI', 'ploogins-ai-assistant')}
                        type="search"
                        style={{ borderRadius: 0 }}
                    />
                </FlexItem>
                <FlexItem>
                    <Button
                        variant="primary"
                        type="submit"
                        style={{ height: '100%', borderRadius: 0 }}
                    >
                        {__('Search', 'ploogins-ai-assistant')}
                    </Button>
                </FlexItem>
            </Flex>
        </form>
    );
};

export default SearchBar;