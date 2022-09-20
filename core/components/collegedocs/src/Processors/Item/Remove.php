<?php

namespace CollegeDocs\Processors\Item;

use CollegeDocs\Model\CollegeDocsItem;
use MODX\Revolution\Processors\Processor;

class Remove extends Processor
{
    public $objectType = 'CollegeDocsItem';
    public $classKey = CollegeDocsItem::class;
    public $languageTopics = ['collegedocs'];
    public $permission = 'remove';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = json_decode($this->getProperty('ids'), true);
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('collegedocs_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var CollegeDocsItem $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('collegedocs_item_err_nf'));
            }

            $object->remove();
        }

        return $this->success();
    }
}
