<?php

namespace PlooginsPlugin\Functionality\Admin;

class AdminMenus
{

    protected $plugin_name;
    protected $plugin_version;

    public function __construct($plugin_name, $plugin_version)
    {
        $this->plugin_name = $plugin_name;
        $this->plugin_version = $plugin_version;

        add_action('admin_menu', [$this, 'add_admin_menus']);
    }

    public function add_admin_menus()
    {
        add_submenu_page(
            'plugins.php',
            __('Ploogins', 'ploogins-ai-assistant'),
            __('AI Assistant', 'ploogins-ai-assistant'),
            'manage_options',
            'ploogins-install',
            [$this, 'render_ploogins_install_page']
        );
    }

    public function render_ploogins_install_page()
    {
        printf(
            '<div class="wrap" id="ploogins-install-subpage">%s</div>',
            esc_html__('Loading…', 'ploogins-ai-assistant')
        );
    }
}
