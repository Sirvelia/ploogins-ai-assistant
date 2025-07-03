import React from "react";
import Plugin from "@/types/Plugin";
import { Modal, TabPanel } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { decodeEntities } from "@wordpress/html-entities";

interface PluginModalProps {
    plugin: Plugin;
    isOpen: boolean;
    closeModal: () => void;
}

const PluginModal: React.FC<PluginModalProps> = ({ plugin, isOpen, closeModal }) => {

    return (
        isOpen ? (
            <Modal title={decodeEntities(plugin.name)} size="large" onRequestClose={closeModal}>

            {plugin.banners?.low ? (
                <img
                    src={plugin.banners?.low}
                    alt={plugin.name}
                    style={{ width: '100%', height: 'auto', marginBottom: '1rem' }}
                />
            ) : null}

                <TabPanel
                    onSelect={() => { }}
                    tabs={[
                        {
                            name: 'description',
                            title: __('Description', 'ploogins-ai-assistant')
                        },
                        {
                            name: 'installation',
                            title: __('Installation', 'ploogins-ai-assistant')
                        },
                        {
                            name: 'changelog',
                            title: __('Changelog', 'ploogins-ai-assistant')
                        },
                        {
                            name: 'reviews',
                            title: __('Reviews', 'ploogins-ai-assistant')
                        }
                    ]}
                >
                    {(tab) => (
                        <div>
                            {tab.name === 'description' && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(plugin?.sections?.description || '') || ''
                                    }}
                                />
                            )}
                            {tab.name === 'installation' && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(plugin?.sections?.installation || '') || ''
                                    }}
                                />
                            )}
                            {tab.name === 'changelog' && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(plugin?.sections?.changelog || '') || ''
                                    }}
                                />
                            )}
                            {tab.name === 'reviews' && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(plugin?.sections?.reviews || '') || ''
                                    }}
                                />
                            )}
                        </div>
                    )}
                </TabPanel>

            </Modal>
        ) : null
    );
}

export default PluginModal;