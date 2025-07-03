<?php

namespace Ploogins\Components;

use Ploogins\Entities\SearchEntry;

class SearchesTable
{

    protected static $table_name = 'ploogins_searches';

    protected static $cache_group = 'ploogins';

    public static function get_table_name()
    {
        global $wpdb;
        return $wpdb->prefix . self::$table_name;
    }

    public static function create_table()
    {
        global $wpdb;

        $table_name = self::get_table_name();
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            search_intent_id varchar(36) NOT NULL,
            time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
            query text NOT NULL,
            api_args JSON NOT NULL,
            plugins JSON NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);

        $db_version = PLOOGINSPLUGIN_DB_VERSION ?? '1.0.0';
        add_option($table_name . '_db_version', $db_version);
    }

    public static function get_search_entries()
    {
        $cache_key = 'ploogins_search_entries';
        
        $search_entries = wp_cache_get($cache_key, self::$cache_group);
        
        if (false === $search_entries) {
            global $wpdb;

            $table_name = self::get_table_name();

            $search_entries = $wpdb->get_results(
                $wpdb->prepare("SELECT * FROM %i ORDER BY time DESC", $table_name)
            );

            foreach ($search_entries as &$entry) {
                $entry->api_args = json_decode($entry->api_args, true);
                $entry->plugins = json_decode($entry->plugins, true);
            }

            wp_cache_set($cache_key, $search_entries, self::$cache_group, 3600);
        }

        return $search_entries;
    }

    public static function reset_search_entries_cache()
    {
        $cache_key = 'ploogins_search_entries';

        wp_cache_delete($cache_key, self::$cache_group);
    }
}
