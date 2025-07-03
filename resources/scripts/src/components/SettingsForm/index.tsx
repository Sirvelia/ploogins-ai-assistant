import React, { useMemo, useState } from 'react';
import { DataForm, Field } from '@wordpress/dataviews';
import '@wordpress/dataviews/build-style/style.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPlooginsSettingsQueryOptions } from '@/queryOptions/getPlooginsSettingsQueryOptions';
import { __ } from '@wordpress/i18n';
import { updatePlooginsSettingsMutationOptions } from '@/mutationOptions/updatePlooginsSettingsMutationOptions';
import { Settings } from '@/api/wp';
import { FormTokenField, TextControl, ToggleControl } from '@wordpress/components';

const SettingForm = () => {
    
    const queryClient = useQueryClient()
    
    const { data: settings, isPending } = useQuery(getPlooginsSettingsQueryOptions())
    
    const updatePlooginsSettings = useMutation({
        ...updatePlooginsSettingsMutationOptions(),
        onMutate: async (updatedData: Settings) => {
            // Optimistically update the cache
            await queryClient.cancelQueries({ queryKey: ['ploogins-settings'] });

            const previousSettings = queryClient.getQueryData<Settings>(['ploogins-settings']);
            
            queryClient.setQueryData(['ploogins-settings'], (previousSettings: Settings) => 
                ({
                    ...previousSettings,
                    ...updatedData
                })
            );

            return { previousSettings };
        },
        onError: (err, newTodo, context) => {
            if (context && context.previousSettings) {
                queryClient.setQueryData(['ploogins-settings'], context.previousSettings);
            }
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['ploogins-settings'] })
        },
    });
    
    const handleSave = (updatedData: Settings) => {
        const mergedSettings = {
            ...settings,
            ...updatedData
        };
        updatePlooginsSettings.mutate(mergedSettings);
    };

    const fields = useMemo(() => [
        {
            id: 'featured_authors',
            label: __('Featured Authors', 'ploogins-ai-assistant'),
            Edit: ({ data, field, onChange }: { data: any, field: any, onChange: any }) => {
                const value = field.getValue({ item: data });

                return (
                    <FormTokenField
                        value={value}
                        label={field.label}
                        onChange={(tokens) => {
                            onChange({ [field.id]: tokens });
                        }}
                    />
                );
            }
        },
        {
            id: 'featured_plugins',
            label: __('Featured Plugins', 'ploogins-ai-assistant'),
            Edit: ({ data, field, onChange }: { data: any, field: any, onChange: any }) => {
                const value = field.getValue({ item: data });

                return (
                    <FormTokenField
                        value={value}
                        label={field.label}
                        onChange={(tokens) => {
                            onChange({ [field.id]: tokens });
                        }}
                    />
                );
            }
        },
        {
            id: 'exclude_plugins',
            label: __('Exclude Plugins', 'ploogins-ai-assistant'),
            Edit: ({data, field, onChange}: { data: any, field: any, onChange: any }) => {
                const value = field.getValue({item: data });

                return (
                    <FormTokenField
                        value={value}
                        label={field.label}
                        onChange={(tokens) => {
                            onChange({ [field.id]: tokens });
                        }}
                    />
                );
            }
        },
        // {
        //     id: 'exclude_premium',
        //     label: __('Exclude Premium Plugins', 'ploogins-ai-assistant'),
        //     Edit: ({ data, field, onChange }: { data: any, field: any, onChange: any }) => {
        //         const value = field.getValue({ item: data });

        //         return (
        //             <ToggleControl
        //                 checked={value}
        //                 label={field.label}
        //                 onChange={(value) => {
        //                     onChange({ [field.id]: value });
        //                 }}
        //             />
        //         );
        //     }
        // },
        {
            id: 'min_last_updated',
            label: __('Minimum Last Updated', 'ploogins-ai-assistant'),
            Edit: ({ data, field, onChange }: { data: any, field: any, onChange: any }) => {
                const value = field.getValue({ item: data });

                return (
                    <TextControl
                        value={value}
                        label={field.label}
                        onChange={(value) => {
                            onChange({ [field.id]: value });
                        }}
                        help={__('Enter a date in YYYY-MM-DD format to exclude plugins not updated since this date.', 'ploogins-ai-assistant')}
                    />
                );
            }
        },
        {
            id: 'min_active_installs',
            label: __('Minimum Active Installs', 'ploogins-ai-assistant'),
            type: 'integer',
        },
        {
            id: 'min_rating',
            label: __('Minimum Rating', 'ploogins-ai-assistant'),
            type: 'integer',
        },
        {
            id: 'max_rating',
            label: __('Maximum Rating', 'ploogins-ai-assistant'),
            type: 'integer',
        },
        {
            id: 'min_tested_version',
            label: __('Minimum Tested Version', 'ploogins-ai-assistant'),
            type: 'text',
        },
        {
            id: 'max_results',
            label: __('Maximum Results', 'ploogins-ai-assistant'),
            type: 'integer',
        }
    ], []);
    
    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <DataForm
            data={settings || {}}
            fields={fields as Field<Settings>[]}
            form={{
                fields: [
                    'featured_authors',
                    'featured_plugins',
                    'exclude_plugins',
                    'exclude_premium',
                    'min_last_updated',
                    'min_active_installs',
                    'min_rating',
                    'max_rating',
                    'min_tested_version',
                    'max_results',
                ],
                labelPosition: 'top',
                type: 'regular'
            }}
            onChange={handleSave}
            />
        </div>
    );
}

export default SettingForm;