<?php

namespace CollegeDocs\Processors\Item;

use CollegeDocs\Model\CollegeDocsItem;
use MODX\Revolution\Processors\Model\UpdateProcessor;

class Update extends UpdateProcessor
{
    public $objectType = 'CollegeDocsItem';
    public $classKey = CollegeDocsItem::class;
    public $languageTopics = ['collegedocs'];
    public $permission = 'collegedocs_save';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return bool|string
     */
    public function beforeSave()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $id = (int)$this->getProperty('id');
        $load_name = trim($this->getProperty('load_name'));
        if (empty($id)) {
            return $this->modx->lexicon('collegedocs_item_err_ns');
        }
		
        if (empty($load_name)) {
            $this->modx->error->addField('load_name', $this->modx->lexicon('collegedocs_item_err_name'));
        } 
		//elseif ($this->modx->getCount($this->classKey, ['name' => $name, 'id:!=' => $id])) {
        //    $this->modx->error->addField('old_name', $this->modx->lexicon('collegedocs_item_err_ae'));
        //}

        return parent::beforeSet();
    }
}
