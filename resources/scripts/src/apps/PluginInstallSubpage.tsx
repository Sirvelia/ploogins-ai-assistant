import React from 'react';
import { createRoot } from 'react-dom/client';
import domReady from '@wordpress/dom-ready';
import PluginInstall from '@/pages/PluginInstall';

const queryClient = new QueryClient()
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

domReady(() => {
    const container = document.getElementById('ploogins-install-subpage');

    if (container) {
        const root = createRoot(container);
        root.render(
            <QueryClientProvider client={queryClient}>
                <PluginInstall />
            </QueryClientProvider>
        );
    }
});