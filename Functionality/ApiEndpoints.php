<?php

namespace Ploogins\Functionality;

use PluboRoutes\Endpoint\GetEndpoint;
use PluboRoutes\Endpoint\PostEndpoint;
use Ploogins\Entities\SearchEntry;
use Ploogins\Components\SearchesTable;

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
            'site-plugins',
            [$this, 'get_plugins'],
            function() {
                return current_user_can('manage_options');
            }
        );

        $endpoints[] = new GetEndpoint(
            $this->namespace,
            'plugin-activate-url',
            [$this, 'get_activate_url'],
            function () {
                return current_user_can('manage_options');
            }
        );

        $endpoints[] = new PostEndpoint(
            $this->namespace,
            'search-entries',
            [$this, 'add_search_entry'],
            function () {
                return current_user_can('manage_options');
            }
        );

        $endpoints[] = new GetEndpoint(
            $this->namespace,
            'search-entries',
            [$this, 'get_search_entries'],
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

    public function add_search_entry($request)
    {

        $search_intent_id = sanitize_text_field($request->get_param('search_intent_id'));
        $query = sanitize_text_field($request->get_param('query'));
        $api_args = $request->get_param('api_args');
        $plugins = $request->get_param('plugins');

        if (is_array($api_args)) {
            $api_args = map_deep($api_args, 'sanitize_text_field');
        } else {
            $api_args = sanitize_text_field($api_args);
        }

        if (is_array($plugins)) {
            $plugins = map_deep($plugins, 'sanitize_text_field');
        } else {
            $plugins = sanitize_text_field($plugins);
        }

        $search_entry = new SearchEntry([
            'search_intent_id' => $search_intent_id,
            'query' => $query,
            'api_args' => $api_args,
            'plugins' => $plugins,
        ]);
        $search_entry->save();

        SearchesTable::reset_search_entries_cache();

        return new \WP_REST_Response([
            'search_entry' => $search_entry,
        ]);
    }

    public function get_search_entries()
    {
        $search_entries = SearchesTable::get_search_entries();

        return new \WP_REST_Response($search_entries);
    }
}
