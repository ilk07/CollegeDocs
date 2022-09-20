<?php

/** @var  MODX\Revolution\modX $modx */
/** @var  CollegeDocs\CollegeDocs $CollegeDocs */

if (file_exists(dirname(__FILE__, 4) . '/config.core.php')) {
    require_once dirname(__FILE__, 4) . '/config.core.php';
} else {
    require_once dirname(__FILE__, 5) . '/config.core.php';
}

require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
require_once MODX_CONNECTORS_PATH . 'index.php';
$CollegeDocs = $modx->services->get('CollegeDocs');
$modx->lexicon->load('collegedocs:default');

// handle request
$path = $modx->getOption(
    'processorsPath',
    $CollegeDocs->config,
    $modx->getOption('core_path') . 'components/collegedocs/' . 'Processors/'
);
$modx->getRequest();

/** @var MODX\Revolution\modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest([
    'processors_path' => $path,
    'location' => '',
]);
