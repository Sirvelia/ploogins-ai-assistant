export interface ContributorProfile {
    avatar: string;
    profile: string;
    display_name: string;
}

export interface Ratings {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
}

export interface Screenshot {
    src: string;
    caption: string;
}

export interface Sections {
    faq?: string;
    reviews?: string;
    changelog?: string;
    description?: string;
    screenshots?: string;
    installation?: string;
}

export interface LanguagePack {
    slug: string;
    type: string;
    package: string;
    updated: string;
    version: string;
    language: string;
}

export interface UpgradeNotice {
    "": string;
}

export default interface Plugin {
    id: number;
    slug: string;
    chunk: number;
    name: string;
    description: string;
    short_description: string;
    active_installs: number;
    added: string; // Date string in YYYY-MM-DD format
    author: string;
    downloads: number;
    icon_src: string;
    last_updated: string; // Date string in YYYY-MM-DD format
    num_ratings: number;
    rating: number;
    required_php_version: string;
    requires_version: string;
    support_threads: number;
    support_threads_resolved: number;
    tags: string[];
    tested_version: string;
    contributors: string;
    requires_plugins: string[];
    ratings: Ratings;
    homepage: string;
    business_model: string | null;
    repository_url: string;
    blueprints: any | null; // Type unclear from example
    wp_directory_status: string;
    version: string;
    author_profile: string;
    contributor_profiles: Record<string, ContributorProfile>;
    support_url: string;
    sections: Sections;
    download_link: string;
    screenshots: Record<string, Screenshot>;
    stable_tag: string;
    versions: Record<string, string>;
    commercial_support_url: string;
    donate_link: string;
    banners: {
        low: string;
        high: string;
    };
    blocks?: Record<string, {
        name: string;
        title: string;
    }>;
    block_assets: any[]; // Type unclear from example
    author_block_count: number;
    author_block_rating: number;
    preview_link: string;
    language_packs: LanguagePack[];
    upgrade_notice: UpgradeNotice;
    price: string;
}