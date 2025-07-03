<?php

/**
 * @wordpress-plugin
 * Plugin Name:       Ploogins - AI Assistant
 * Plugin URI:        https://ploogins.com/
 * Description:       AI Assistant
 * Version:           1.2.2
 * Author:            Ploogins
 * License:           GPL-3.0+
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain:       ploogins-ai-assistant
 * Requires PHP:      8.0
 */

if (!defined('WPINC')) {
    die('YOU SHALL NOT PASS!');
}

// PLUGIN CONSTANTS
define('PLOOGINSPLUGIN_NAME', 'ploogins-ai-assistant');
define('PLOOGINSPLUGIN_VERSION', '1.2.2');
define('PLOOGINSPLUGIN_PATH', plugin_dir_path(__FILE__));
define('PLOOGINSPLUGIN_BASENAME', plugin_basename(__FILE__));
define('PLOOGINSPLUGIN_URL', plugin_dir_url(__FILE__));
define('PLOOGINSPLUGIN_ASSETS_PATH', PLOOGINSPLUGIN_PATH . 'dist/' );
define('PLOOGINSPLUGIN_ASSETS_URL', PLOOGINSPLUGIN_URL . 'dist/' );
define('PLOOGINSPLUGIN_DB_VERSION', '1.0.0');

// AUTOLOAD
if (file_exists(PLOOGINSPLUGIN_PATH . 'vendor/autoload.php')) {
    require_once PLOOGINSPLUGIN_PATH . 'vendor/autoload.php';
}

// LYFECYCLE
register_activation_hook(__FILE__, [Ploogins\Includes\Lyfecycle::class, 'activate']);
register_deactivation_hook(__FILE__, [Ploogins\Includes\Lyfecycle::class, 'deactivate']);
register_uninstall_hook(__FILE__, [Ploogins\Includes\Lyfecycle::class, 'uninstall']);

// LOAD ALL FILES
$loader = new Ploogins\Includes\Loader();
