<?php

if (!function_exists("ploogins_log")) {
    function ploogins_log($log)
    {
        $backtrace = debug_backtrace();
        $backtrace = $backtrace[1] ?? [];
        $class = $backtrace['class'] ?? '';
        $function = $backtrace['function'] ?? '';
        error_log("\nCLASS: " . $class . "\nFUNCTION:" . $function .  "\nLOG:" . print_r($log, true) . "\n");
    }
}

if (!function_exists("ploogins_asset")) {
    function ploogins_asset($asset_name)
    {
        $manifest = file_get_contents(PLOOGINSPLUGIN_ASSETS_PATH . "manifest.json");
        $manifest = json_decode($manifest, true);
        if (!isset($manifest[$asset_name])) return $asset_name;
        return PLOOGINSPLUGIN_ASSETS_URL . $manifest[$asset_name];
    }
}
