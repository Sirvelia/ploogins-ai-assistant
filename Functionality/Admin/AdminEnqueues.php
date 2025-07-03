<?php

namespace Ploogins\Functionality\Admin;

class AdminEnqueues
{

    protected $plugin_name;
    protected $plugin_version;

    public function __construct($plugin_name, $plugin_version)
    {
        $this->plugin_name = $plugin_name;
        $this->plugin_version = $plugin_version;

        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
    }

    public function enqueue_admin_scripts()
    {
        // Verify user has admin capabilities
        if (!current_user_can('manage_options')) {
            return;
        }

        $current_page = isset($_GET['page']) ? sanitize_text_field(wp_unslash($_GET['page'])) : '';

        $allowed_pages = [
            'ploogins',
            'ploogins-install',
            'ploogins-recommend',
            'ploogins-history',
            'ploogins-settings',
        ];

        if (is_admin() && in_array($current_page, $allowed_pages, true)) {
            wp_enqueue_style('wp-components');
            wp_enqueue_style($this->plugin_name, ploogins_asset('app.css'), [], $this->plugin_version);

            wp_enqueue_script($this->plugin_name, ploogins_asset('app.js'), [], $this->plugin_version, true);
            
            wp_add_inline_script($this->plugin_name, 'const plooginsData = ' . wp_json_encode([
                'ajax_url' => admin_url('admin-ajax.php'),
                'wp_rest_url' => get_rest_url(),
                'wp_ploogins_api_url' => get_rest_url(null, 'ploogins/v1'),
                'ploogins_public_api_url' => 'https://api.ploogins.com/v1/public/',
                'locale' => get_locale(),
                'nonce' => wp_create_nonce('wp_rest')
            ]) . ';');
        }

    }
}
