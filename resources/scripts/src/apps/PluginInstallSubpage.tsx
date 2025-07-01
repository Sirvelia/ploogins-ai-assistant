import React from 'react';
import { createRoot } from 'react-dom/client';
import domReady from '@wordpress/dom-ready';
import PluginInstall from '@/pages/PluginInstall';

domReady(() => {
    const container = document.getElementById('ploogins-install-subpage');

    if (container) {
        const root = createRoot(container);
        root.render(<PluginInstall />);
    }
});