<?php

namespace Ploogins\Includes;

class Lyfecycle
{
    public static function activate($network_wide)
    {
        do_action('Ploogins/setup', $network_wide);
    }

    public static function deactivate($network_wide)
    {
        do_action('Ploogins/deactivation', $network_wide);
    }

    public static function uninstall()
    {
        do_action('Ploogins/cleanup');
    }
}
