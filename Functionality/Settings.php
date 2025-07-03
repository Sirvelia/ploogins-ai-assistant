<?php

namespace Ploogins\Functionality;

class Settings
{
    protected $plugin_name;
    protected $plugin_version;

    public function __construct($plugin_name, $plugin_version)
    {
        $this->plugin_name = $plugin_name;
        $this->plugin_version = $plugin_version;

        add_action('admin_init', [$this, 'register_settings']);
        add_action('rest_api_init', [$this, 'register_settings']);

        // Add filter to ensure defaults are applied when retrieving options
        add_filter('rest_pre_get_setting', [$this, 'apply_defaults_to_rest'], 10, 3);
    }

    public function get_default_settings()
    {
        return array(
            'featured_authors' => [],
            'featured_plugins' => [],
            'exclude_plugins' => [],
            'exclude_premium' => true,
            'min_last_updated' => '',
            'min_active_installs' => null,
            'min_rating' => null,
            'max_rating' => null,
            'min_tested_version' => null,
            'max_results' => 20,
        );
    }

    /**
     * Apply defaults when retrieving settings via REST API
     */
    public function apply_defaults_to_rest($result, $name, $group)
    {
        if ($name === 'ploogins') {
            $stored_value = get_option('ploogins', array());
            $defaults = $this->get_default_settings();

            // Merge stored values with defaults
            $result = wp_parse_args($stored_value, $defaults);

            return $result;
        }

        return $result;
    }

    public function register_settings()
    {
        $default = $this->get_default_settings();

        $schema = array(
            'type'       => 'object',
            'properties' => array(
                'featured_authors' => array(
                    'description' => __('A list of featured plugin authors name. Featured authors will appear first on the results list', 'ploogins-ai-assistant'),
                    'type' => 'array',
                    'items' => array(
                        'type' => 'string'
                    ),
                ),
                'featured_plugins' => array(
                    'description' => __('A list of featured plugin slugs. Featured plugins will appear first on the results list', 'ploogins-ai-assistant'),
                    'type' => 'array',
                    'items' => array(
                        'type' => 'string'
                    ),
                ),
                'exclude_plugins' => array(
                    'description' => __('A list of excluded plugin slugs. Excluded plugins will never appear as a search result', 'ploogins-ai-assistant'),
                    'type' => 'array',
                    'items' => array(
                        'type' => 'string'
                    ),
                ),
                'exclude_premium' => array(
                    'description' => __('If true, premium plugins will be excluded from the plugin searches. Default is true', 'ploogins-ai-assistant'),
                    'type' => 'boolean',
                ),
                'min_last_updated' => array(
                    'description' => __('If set, only results updated at or after the given date will be shown. The date must be in Y-m-d format', 'ploogins-ai-assistant'),
                    'type' => 'string',
                ),
                'min_active_installs' => array(
                    'description' => __('If set, only results with equal or more installs than the given number will be shown', 'ploogins-ai-assistant'),
                    'type' => ['integer', 'null'],
                ),
                'min_rating' => array(
                    'description' => __('If set, only results with an equal or bigger rating than the given number will be shown. The rating values range from 0 to 5', 'ploogins-ai-assistant'),
                    'type' => ['number', 'null'],
                ),
                'max_rating' => array(
                    'description' => __('If set, only results with an equal or less rating than the given number will be shown. The rating values range from 0 to 5', 'ploogins-ai-assistant'),
                    'type' => ['number', 'null'],
                ),
                'min_tested_version' => array(
                    'description' => __('If set, only results updated at or after the given WordPress version will be shown', 'ploogins-ai-assistant'),
                    'type' => ['string', 'null'],
                ),
                'max_results' => array(
                    'description' => __('The number of maximum results to show per query. Defaults to 20 results', 'ploogins-ai-assistant'),
                    'type' => 'integer',
                ),
            ),
        );

        register_setting(
            'options',
            'ploogins',
            array(
                'type' => 'object',
                'default' => $default,
                'show_in_rest' => array(
                    'schema' => $schema,
                ),
            )
        );
    }
}
