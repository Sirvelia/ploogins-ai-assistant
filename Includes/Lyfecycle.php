<?php

namespace PlooginsPlugin\Includes;

class Lyfecycle
{
    public static function activate($network_wide)
    {
        do_action('PlooginsPlugin/setup', $network_wide);
    }

    public static function deactivate($network_wide)
    {
        do_action('PlooginsPlugin/deactivation', $network_wide);
    }

    public static function uninstall()
    {
        do_action('PlooginsPlugin/cleanup');
    }
}
