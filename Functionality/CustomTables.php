<?php

namespace Ploogins\Functionality;

use Ploogins\Components\SearchesTable;

class CustomTables
{

    protected $plugin_name;
    protected $plugin_version;

    public function __construct($plugin_name, $plugin_version)
    {
        $this->plugin_name = $plugin_name;
        $this->plugin_version = $plugin_version;

        add_action('Ploogins/setup', [$this, 'install_tables']);
    }

    public function install_tables()
    {
        SearchesTable::create_table();
    }
}
