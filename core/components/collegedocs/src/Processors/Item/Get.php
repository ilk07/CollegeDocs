<?php

namespace CollegeDocs\Processors\Item;

use MODX\Revolution\Processors\Model\GetProcessor;
use CollegeDocs\Model\CollegeDocsItem;

class Get extends GetProcessor
{
    public $objectType = 'CollegeDocsItem';
    public $classKey = CollegeDocsItem::class;
    public $languageTopics = ['collegedocs:default'];
    public $permission = 'collegedocs_view';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return mixed
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        return parent::process();
    }
}
