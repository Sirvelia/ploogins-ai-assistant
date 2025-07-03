import { PlooginsData } from "@/types/plooginsData";
import Plugin from "@/types/Plugin";
import { addQueryArgs } from "@wordpress/url";
import { Settings } from "@/api/wp";

declare const plooginsData: PlooginsData;

interface SearchResults {
    plugins: Plugin[];
    search_intent_id: string;
    total_results: number;
}

export interface PlooginsAPIArguments extends Settings {
    query?: string;
}

export const getSearchPlugins = async (args: PlooginsAPIArguments): Promise<SearchResults> => {
    const response = await fetch(plooginsData.ploogins_public_api_url + 'search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: args.query,
            ...(args.featured_authors && args.featured_authors.length > 0 ? { featured_authors: args.featured_authors } : {}),
            ...(args.featured_plugins && args.featured_plugins.length > 0 ? { featured_plugins: args.featured_plugins } : {}),
            ...(args.exclude_plugins && args.exclude_plugins.length > 0 ? { exclude_plugins: args.exclude_plugins } : {}),
            ...(args.exclude_premium !== undefined ? { exclude_premium: args.exclude_premium } : {}),
            ...(args.min_last_updated ? { min_last_updated: args.min_last_updated } : {}),
            ...(args.min_active_installs ? { min_active_installs: args.min_active_installs } : {}),
            ...(args.min_rating ? { min_rating: args.min_rating } : {}),
            ...(args.max_rating ? { max_rating: args.max_rating } : {}),
            ...(args.min_tested_version ? { min_tested_version: args.min_tested_version } : {}),
            ...(args.max_results ? { max_results: args.max_results } : {}),
        }),
    });
    return response.json();
}


export const getRandomPlugins = async (args: Settings): Promise<Plugin[]> => {
    const response = await fetch(plooginsData.ploogins_public_api_url + 'random', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...(args.featured_authors && args.featured_authors.length > 0 ? { featured_authors: args.featured_authors } : {}),
            ...(args.featured_plugins && args.featured_plugins.length > 0 ? { featured_plugins: args.featured_plugins } : {}),
            ...(args.exclude_plugins && args.exclude_plugins.length > 0 ? { exclude_plugins: args.exclude_plugins } : {}),
            ...(args.exclude_premium !== undefined ? { exclude_premium: args.exclude_premium } : {}),
            ...(args.min_last_updated ? { min_last_updated: args.min_last_updated } : {}),
            ...(args.min_active_installs ? { min_active_installs: args.min_active_installs } : {}),
            ...(args.min_rating ? { min_rating: args.min_rating } : {}),
            ...(args.max_rating ? { max_rating: args.max_rating } : {}),
            ...(args.min_tested_version ? { min_tested_version: args.min_tested_version } : {}),
            ...(args.max_results ? { max_results: args.max_results } : {}),
            ...(args.max_results ? { num_results: args.max_results } : {}),
        }),
    });
    return response.json();
}