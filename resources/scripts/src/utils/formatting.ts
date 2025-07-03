import { __ } from '@wordpress/i18n';

export const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M+';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
};

export const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    } catch {
        return dateString;
    }
};

export const formatRating = (rating: number): string => {
    const validRating = Math.min(Math.max(rating, 0), 5);
    return validRating.toFixed(1);
};

export const formatDateAgo = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 365) {
            const years = Math.floor(diffDays / 365);
            return `${years} ${years === 1 ? __('year', 'ploogins-ai-assistant') : __('years', 'ploogins-ai-assistant')} ${__('ago', 'ploogins-ai-assistant')}`;
        }
        
        if (diffDays >= 30) {
            const months = Math.floor(diffDays / 30);
            return `${months} ${months === 1 ? __('month', 'ploogins-ai-assistant') : __('months', 'ploogins-ai-assistant')} ${__('ago', 'ploogins-ai-assistant')}`;
        }
        
        return `${diffDays} ${diffDays === 1 ? __('day', 'ploogins-ai-assistant') : __('days', 'ploogins-ai-assistant')} ${__('ago', 'ploogins-ai-assistant')}`;
    } catch {
        return '__';
    }
};