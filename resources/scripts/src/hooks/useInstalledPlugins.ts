import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "react";
import { PlooginsData } from '@/types/plooginsData';

declare const plooginsData: PlooginsData;
interface InstalledPlugin {
    [key: string]: {
        Name: string;
        PluginURI: string;
        Version: string;
        Description: string;
        Author: string;
        AuthorURI: string;
        TextDomain: string;
        DomainPath: string;
        Network: boolean;
        RequiresWP: string;
        RequiresPHP: string;
        UpdateURI: string;
        RequiresPlugins: string;
        Title: string;
        AuthorName: string;
    };
}

interface ActivePlugin {
    [key: string]: string;
}

export const useInstalledPlugins = () => {
    const [installedPlugins, setInstalledPlugins] = useState<InstalledPlugin>({});
    const [activePlugins, setActivePlugins] = useState<ActivePlugin>({});
    
    useEffect(() => {
        fetchPlugins();
    }, []);

    const fetchPlugins = () => {
        apiFetch.use(apiFetch.createNonceMiddleware(plooginsData.nonce));

        apiFetch({
            path: plooginsData.wp_ploogins_api_url + '/get-plugins',
        })
        .then((data) => {
            setInstalledPlugins((data as { plugins: InstalledPlugin }).plugins);
            setActivePlugins((data as { active_plugins: ActivePlugin }).active_plugins);
        })
        .catch((error: Error) => console.error('Error fetching plugins:', error));
    };

    return {
        installedPlugins,
        activePlugins,
        fetchPlugins,
    };
}