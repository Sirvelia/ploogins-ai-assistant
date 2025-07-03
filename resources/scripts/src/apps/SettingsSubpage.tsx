import React from 'react';
import { createRoot } from 'react-dom/client';
import domReady from '@wordpress/dom-ready';
import Settings from '@/pages/Settings';

const queryClient = new QueryClient()
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

domReady(() => {
    const container = document.getElementById('ploogins-settings-subpage');

    if (container) {
        const root = createRoot(container);
        root.render(
            <QueryClientProvider client={queryClient}>
                <Settings />
            </QueryClientProvider>
        );
    }
});