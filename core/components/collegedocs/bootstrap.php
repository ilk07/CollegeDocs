<?php

/**
 * @var \MODX\Revolution\modX $modx
 * @var array $namespace
 */

// Load the classes
$modx->addPackage('CollegeDocs\Model', $namespace['path'] . 'src/', null, 'CollegeDocs\\');

$modx->services->add('CollegeDocs', function ($c) use ($modx) {
    return new CollegeDocs\CollegeDocs($modx);
});
