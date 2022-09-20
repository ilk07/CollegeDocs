<?php

/** @var xPDO\Transport\xPDOTransport $transport */
/** @var array $options */

use MODX\Revolution\modAccessPolicy;
use MODX\Revolution\modAccessPolicyTemplate;

if ($transport->xpdo) {
    $modx = $transport->xpdo;
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:
            // Assign policy to template
            $policy = $modx->getObject(modAccessPolicy::class, array('name' => 'CollegeDocsUserPolicy'));
            if ($policy) {
                $template = $modx->getObject(modAccessPolicyTemplate::class, ['name' => 'CollegeDocsUserPolicyTemplate']);
                if ($template) {
                    $policy->set('template', $template->get('id'));
                    $policy->save();
                } else {
                    $modx->log(
                        xPDO::LOG_LEVEL_ERROR,
                        '[CollegeDocs] Could not find CollegeDocsUserPolicyTemplate Access Policy Template!'
                    );
                }
            } else {
                $modx->log(xPDO::LOG_LEVEL_ERROR, '[CollegeDocs] Could not find CollegeDocsUserPolicyTemplate Access Policy!');
            }
            break;
    }
}
return true;
