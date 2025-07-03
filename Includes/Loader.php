<?php

namespace Ploogins\Includes;

class Loader
{
    public function __construct()
    {
        $this->loadDependencies();
    }

    private function loadDependencies()
    {
        //FUNCTIONALITY CLASSES
        foreach (glob(PLOOGINSPLUGIN_PATH . 'Functionality/*.php') as $filename) {
            $class_name = '\\Ploogins\Functionality\\' . basename($filename, '.php');
            if (class_exists($class_name)) {
                try {
                    new $class_name(PLOOGINSPLUGIN_NAME, PLOOGINSPLUGIN_VERSION);
                } catch (\Throwable $e) {
                    ploogins_log($e);
                    continue;
                }
            }
        }

        //ADMIN FUNCTIONALITY
        if( is_admin() ) {
            foreach (glob(PLOOGINSPLUGIN_PATH . 'Functionality/Admin/*.php') as $filename) {
                $class_name = '\\Ploogins\Functionality\Admin\\' . basename($filename, '.php');
                if (class_exists($class_name)) {
                    try {
                        new $class_name(PLOOGINSPLUGIN_NAME, PLOOGINSPLUGIN_VERSION);
                    } catch (\Throwable $e) {
                        ploogins_log($e);
                        continue;
                    }
                }
            }
        }
    }
}
