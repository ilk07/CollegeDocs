<?php

namespace CollegeDocs;

use MODX\Revolution\modX;

class CollegeDocs
{
    /** @var \modX $modx */
    public $modx;
    /** @var array $config */
    public $config = [];

    public function __construct(modX $modx, array $config = [])
    {
        $this->modx = $modx;
        $corePath = MODX_CORE_PATH . 'components/collegedocs/';
        $assetsUrl = MODX_ASSETS_URL . 'components/collegedocs/';

        $this->config = array_merge([
            'corePath' => $corePath,
            'modelPath' => $corePath . 'model/',
            'processorsPath' => $corePath . 'Processors/',

            'connectorUrl' => $assetsUrl . 'connector.php',
            'assetsUrl' => $assetsUrl,
            'cssUrl' => $assetsUrl . 'css/',
            'jsUrl' => $assetsUrl . 'js/',
        ], $config);

        $this->modx->lexicon->load('collegedocs:default');
    }

	
}
