<?php

namespace CollegeDocs\Processors\Item;

use CollegeDocs\Model\CollegeDocsItem;
use MODX\Revolution\Processors\Processor;


class Enable extends Processor
{
    public $objectType = 'CollegeDocsItem';
    public $classKey = CollegeDocsItem::class;
    public $languageTopics = ['collegedocs'];
    public $permission = 'save';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('collegedocs_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var CollegeDocsItem $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('collegedocs_item_err_nf'));
            }

            $object->set('active', true);
            $object->save();
        }

        return $this->success();
    }
}