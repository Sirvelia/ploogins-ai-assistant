<?php

namespace PlooginsPlugin\Functionality;

use PluboRoutes\Endpoint\GetEndpoint;
use PluboRoutes\Endpoint\PostEndpoint;
use PluboRoutes\Endpoint\PutEndpoint;
use PluboRoutes\Endpoint\DeleteEndpoint;

class ApiEndpoints
{

    protected $plugin_name;
    protected $plugin_version;

    protected $namespace = 'ploogins/v1';

    public function __construct($plugin_name, $plugin_version)
    {
        $this->plugin_name = $plugin_name;
        $this->plugin_version = $plugin_version;
        add_action('after_setup_theme', [$this, 'load_plubo_routes']);
        add_filter('plubo/endpoints', [$this, 'add_endpoints']);
    }

    public function load_plubo_routes($routes)
    {
        \PluboRoutes\RoutesProcessor::init();
    }

    public function add_endpoints($endpoints)
    {
        $endpoints[] = new GetEndpoint(
            $this->namespace,
            'get-plugins',
            [$this, 'get_plugins'],
            function() {
                return current_user_can('manage_options');
            }
        );

        $endpoints[] = new GetEndpoint(
            $this->namespace,
            'get-activate-url',
            [$this, 'get_activate_url'],
            function () {
                return current_user_can('manage_options');
            }
        );

        return $endpoints;
    }

    public function get_plugins()
    {
        $plugins = get_plugins();
        $active_plugins = get_option('active_plugins');

        return new \WP_REST_Response([
            'plugins' => $plugins,
            'active_plugins' => $active_plugins,
        ]);
    }

    public function get_activate_url($request)
    {
        $plugin = sanitize_text_field($request->get_param('plugin'));
        $activate_url = add_query_arg(
            array(
                '_wpnonce' => wp_create_nonce( 'activate-plugin_' . $plugin ),
                'action'   => 'activate',
                'plugin'   => $plugin,
            ),
            network_admin_url( 'plugins.php' )
        );

        return new \WP_REST_Response([
            'activate_url' => $activate_url,
        ]);
    }
}
