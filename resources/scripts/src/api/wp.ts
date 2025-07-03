import { PlooginsData } from "@/types/plooginsData";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

declare const plooginsData: PlooginsData;

interface GetPluginsResponse {
    plugins: InstalledPlugin[];
    active_plugins: ActivePlugin[];
}

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

type ActivePlugin = string;

interface GetActivateUrlResponse {
    activate_url: string;
}

interface SiteSettings {
    ploogins: Settings;
}

export interface Settings {
    featured_authors?: string[];
    featured_plugins?: string[];
    exclude_plugins?: string[];
    exclude_premium?: boolean;
    min_last_updated?: string;
    min_active_installs?: number;
    min_rating?: number;
    max_rating?: number;
    min_tested_version?: string;
    max_results?: number;
};

export const getSitePlugins = async (): Promise<GetPluginsResponse> => {
    apiFetch.use(apiFetch.createNonceMiddleware(plooginsData.nonce));
  
    const data = await apiFetch({
        path: plooginsData.wp_ploogins_api_url + '/site-plugins',
    });
    return data as GetPluginsResponse || { plugins: {}, active_plugins: [] };
}

export const getPluginActivateUrl = async (pluginDir: string): Promise<string> => {
    apiFetch.use(apiFetch.createNonceMiddleware(plooginsData.nonce));
    
    const queryParams = { plugin: pluginDir }
    const data = await apiFetch({
        path: addQueryArgs(plooginsData.wp_ploogins_api_url + '/plugin-activate-url', queryParams),
    });
    return (data as GetActivateUrlResponse).activate_url || '';
}

export const installPlugin = async (pluginSlug: string): Promise<void> => {
    apiFetch.use(apiFetch.createNonceMiddleware(plooginsData.nonce));
    
    await apiFetch({
        path: addQueryArgs(plooginsData.wp_rest_url + 'wp/v2/plugins', { slug: pluginSlug }),
        method: 'POST',
    });
    // No return value, just resolves when the plugin is installed
}

export const getPlooginsSettings = async (): Promise<Settings> => {
    apiFetch.use(apiFetch.createNonceMiddleware(plooginsData.nonce));
    
    const data = await apiFetch({
        path: plooginsData.wp_rest_url + 'wp/v2/settings'
    }) as SiteSettings;
    return data?.ploogins as Settings || {};
}

export const updatePlooginsSettings = async (settings: Settings): Promise<void> => {
    apiFetch.use(apiFetch.createNonceMiddleware(plooginsData.nonce));
    
    await apiFetch({
        path: plooginsData.wp_rest_url + 'wp/v2/settings',
        method: 'POST',
        data: {
            ploogins: settings
        },
    });
    // No return value, just resolves when the plugin is installed
}

export interface SearchEntry {
    id: number;
    search_intent_id: string;
    query: string;
    api_args: any;
    plugins: any;
}

export const addSearchEntry = async (searchEntry: SearchEntry): Promise<void> => {
    apiFetch.use(apiFetch.createNonceMiddleware(plooginsData.nonce));
    
    await apiFetch({
        path: plooginsData.wp_ploogins_api_url + '/search-entries',
        method: 'POST',
        data: searchEntry,
    });
    // No return value, just resolves when the search entry is added
}

export const getSearchEntries = async (): Promise<SearchEntry[]> => {
    apiFetch.use(apiFetch.createNonceMiddleware(plooginsData.nonce));
    
    const data = await apiFetch({
        path: plooginsData.wp_ploogins_api_url + '/search-entries',
    });
    return data as SearchEntry[];
}