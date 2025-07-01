import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { Button } from '@wordpress/components';
import React, { useEffect, useState, useMemo, use } from 'react';
import './style.css';
import Plugin from '@/types/Plugin';
import { useManagePlugins } from '@/hooks/useManagePlugins';
import { useActivateUrl } from '@/hooks/useActivateUrl';

interface PluginCardProps {
    plugin: Plugin;
    installedPlugins: Plugin[];
    fetchPlugins: () => void;
    activePlugins: any[];
}

const Plugin = ({ plugin, installedPlugins, fetchPlugins, activePlugins }: PluginCardProps) => {

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M+';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K+';
        }
        return num.toString();
    };

    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        } catch {
            return dateString;
        }
    };

    const formatRating = (rating: number): string => {
        const validRating = Math.min(Math.max(rating, 0), 5);
        return validRating.toFixed(1);
    };

    const { installPlugin, isInstalling } = useManagePlugins();

    const pluginKey = useMemo(() => {
        return Object.keys(installedPlugins).find((pluginPath) => {
            const pluginDir = pluginPath.split('/')[0];
            return pluginDir === plugin.slug;
        }) || '';
    }, [installedPlugins]);

    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        if (installedPlugins) {
            setIsInstalled(
                Object.keys(installedPlugins).some((pluginPath) => {
                    const pluginDir = pluginPath.split('/')[0];
                    return pluginDir === plugin.slug;
                })
            );

        } else {
            setIsInstalled(false);
        }
    }, [installedPlugins]);

    const handleInstall = async () => {
        try {
            await installPlugin(plugin);
            setIsInstalled(true);
            await fetchPlugins();
        } catch (error) {
            console.error('Failed to install plugin:', error);
            // You might want to show an error message to the user here
        }
    }
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (activePlugins && activePlugins.length > 0) {
            setIsActive(
                activePlugins.some((activePlugin) => {
                    return activePlugin === pluginKey;
                })
            );
        } else {
            setIsActive(false);
        }
    }, [activePlugins]);

    const [isActivating, setIsActivating] = useState(false);
    const { getActivateUrl } = useActivateUrl();

    const handleActivate = async () => {
        setIsActivating(true);
        try {
            const activateUrl = await getActivateUrl(pluginKey);
            window.location.href = activateUrl;
        } catch (error) {
            console.error('Failed to activate plugin:', error);
        }
    }

    return (
        <div className="ploogin-card">
            <div className="ploogin-card__header">
                {plugin.icon_src && (
                    <img 
                        src={plugin.icon_src} 
                        alt={plugin.name}
                        className="ploogin-card__icon"
                    />
                )}
                <div className="ploogin-card__header-main">
                    <div className="ploogin-card__title">
                        <h3>{decodeEntities(plugin.name)}</h3>
                        <span className="ploogin-card__author">
                            {__('By', 'ploogins-ai-assistant')}{' '}
                            {plugin.author_profile ? (
                                <a href={plugin.author_profile} target="_blank" rel="noopener noreferrer">
                                    {decodeEntities(plugin.author)}
                                </a>
                            ) : (
                                decodeEntities(plugin.author)
                            )}
                        </span>
                    </div>
                    <div className="ploogin-card__description">
                        {decodeEntities(plugin.short_description)}
                    </div>
                </div>
                <div className="ploogin-card__header-actions">
                    {
                        isInstalled ? (
                            <Button variant={!isActive ? 'primary' : 'secondary'} disabled={isActivating || isActive} isPressed={isActivating || isActive} isBusy={isActivating} onClick={handleActivate}>
                                {isActive ? __('Active') : __('Activate')}
                            </Button>
                        ) : (
                            <Button variant="secondary" disabled={isInstalling} isPressed={isInstalling} isBusy={isInstalling} onClick={handleInstall}>
                                {__('Install Now')}
                            </Button>
                        )
                    }
                    <Button variant="tertiary" size="compact">
                        {__('More Details', 'ploogins-ai-assistant')}
                    </Button>
                </div>
            </div>
            <div className="ploogin-card__footer">
                <div className="ploogin-card__footer-meta">
                    <div className="ploogin-card__rating">
                        <span className="dashicons dashicons-star-filled"></span>
                        {formatRating(plugin.rating)} ({formatNumber(plugin.num_ratings)})
                    </div>
                    <div className="ploogin-card__installs">
                        {formatNumber(plugin.active_installs)} {__('Active Installations', 'ploogins-ai-assistant')}
                    </div>
                    {plugin.last_updated && (
                        <div className="ploogin-card__updated">
                            <strong>{__('Last Updated', 'ploogins-ai-assistant')}:</strong> {formatDate(plugin.last_updated)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Plugin;