import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { Button, Flex, FlexItem } from '@wordpress/components';
import React, { useState, useMemo } from 'react';
import './style.css';
import Plugin from '@/types/Plugin';
import { useMutation, useQuery } from '@tanstack/react-query';
import getSitePluginsQueryOptions from '@/queryOptions/getSitePluginsQueryOptions';
import getPluginActivateUrlQueryOptions from '@/queryOptions/getPluginActivateUrlQueryOptions';
import { formatNumber, formatDateAgo } from '@/utils/formatting';
import { installPluginMutationOptions } from '@/mutationOptions/installPluginMutationOptions';
import PluginModal from '@/components/PluginModal';
import RatingStars from '../ui/RatingStars';
interface PluginCardProps {
    plugin: Plugin;
}

const Plugin = ({ plugin }: PluginCardProps) => {

    const { data: sitePlugins, refetch: fetchSitePlugins } = useQuery(getSitePluginsQueryOptions())

    const installedPlugins = sitePlugins?.plugins && typeof sitePlugins.plugins === 'object' ? sitePlugins.plugins : {};
    const activePlugins = Array.isArray(sitePlugins?.active_plugins) ? sitePlugins.active_plugins : [];

    const pluginKey = useMemo(() => {
        return Object.keys(installedPlugins).find((pluginPath) => {
            const pluginDir = pluginPath.split('/')[0];
            return pluginDir === plugin.slug;
        }) || '';
    }, [installedPlugins]);

    const { data: activateUrl, refetch: fetchActivateUrl } = useQuery(getPluginActivateUrlQueryOptions(pluginKey));

    const isInstalled = useMemo(() => {
        return Object.keys(installedPlugins).some((pluginPath) => {
            return pluginPath === pluginKey;
        });
    }, [installedPlugins, pluginKey]);

    const isActive = useMemo(() => {
        return activePlugins.some((activePlugin) => {
            return activePlugin === pluginKey;
        });
    }, [activePlugins, pluginKey]);

    const [isActivating, setIsActivating] = useState(false);

    const installMutation = useMutation({
        ...installPluginMutationOptions(),
        onSuccess: () => {
            fetchSitePlugins();
            fetchActivateUrl();
        }
    });
    
    const handleActivate = async () => {
        setIsActivating(true);
        window.location.href = activateUrl || '';
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="ploogin-card">
                <div className="ploogin-card__header">
                    {plugin.icon_src && (
                        <Button
                            variant="link"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <img
                                src={plugin.icon_src} 
                                alt={plugin.name}
                                className="ploogin-card__icon"
                            />
                        </Button>
                    )}
                    <div className="ploogin-card__header-main">
                        <div className="ploogin-card__title">
                            <h3>
                                <Button
                                    variant="link"
                                    onClick={() => setIsModalOpen(true)}
                                    style={{ padding: 0, fontWeight: 'inherit', fontSize: 'inherit', textDecoration: 'none', color: 'accent' }}
                                >
                                    {decodeEntities(plugin.name)}
                                </Button>
                            </h3>
                        </div>

                        <div className="ploogin-card__description">
                            {decodeEntities(plugin.short_description)}
                        </div>

                        <p className="ploogin-card__author">
                            {__('By', 'ploogins-ai-assistant')}{' '}
                            {plugin.author_profile ? (
                                <a href={plugin.author_profile} target="_blank" rel="noopener noreferrer">
                                    {decodeEntities(plugin.author)}
                                </a>
                            ) : (
                                decodeEntities(plugin.author)
                            )}
                        </p>
                    </div>
                    <div className="ploogin-card__header-actions">
                        {
                            isInstalled ? (
                                <Button variant={!isActive ? 'primary' : 'secondary'} disabled={isActivating || isActive} isPressed={isActivating || isActive} isBusy={isActivating} onClick={handleActivate}>
                                    {isActive ? __('Active', 'ploogins-ai-assistant') : __('Activate', 'ploogins-ai-assistant')}
                                </Button>
                            ) : (
                                <Button variant="secondary" disabled={installMutation.isPending} isPressed={installMutation.isPending} isBusy={installMutation.isPending} onClick={() => installMutation.mutate(plugin.slug)}>
                                    {__('Install Now', 'ploogins-ai-assistant')}
                                </Button>
                            )
                        }
                        <Button variant="tertiary" size="compact" onClick={() => setIsModalOpen(true)}>
                            {__('More Details', 'ploogins-ai-assistant')}
                        </Button>
                    </div>
                </div>
                <div className="ploogin-card__footer">
                    <div className="ploogin-card__footer-meta">

                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '0.5rem' }}>
                                <RatingStars rating={plugin.rating} />
                                <span className="ploogin-card__rating-count">({formatNumber(plugin.num_ratings)})</span>
                            </div>

                            <div className="ploogin-card__installs">
                                {formatNumber(plugin.active_installs)} {__('Active Installations', 'ploogins-ai-assistant')}
                            </div>
                        </div>

                        {plugin.last_updated && (
                            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'end', gap: '0.5rem' }}>
                                <strong>{__('Last Updated', 'ploogins-ai-assistant')}:</strong>  {formatDateAgo(plugin.last_updated)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <PluginModal plugin={plugin} isOpen={isModalOpen} closeModal={closeModal} />
        </>
    );
};

export default Plugin;