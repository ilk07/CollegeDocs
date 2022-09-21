<?php

namespace CollegeDocs\Processors\Resource;

use MODX\Revolution\modResource;
use MODX\Revolution\Processors\Model\GetListProcessor;
//use CollegeDocs\Model\Src;
use xPDO\Om\xPDOObject;
use xPDO\Om\xPDOQuery;

class GetList extends GetListProcessor
{
    public $objectType = 'modResource';
    public $classKey = modResource::class;
    public $defaultSortField = 'menuindex';
    public $defaultSortDirection = 'ASC';
    //public $permission = 'collegedocs_list';


    /**
     * We do a special check of permissions
     * because our objects is not an instances of modAccessibleObject
     *
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
		
		$category = (int)$this->getProperty('category');
		
		if(!empty($category)){

			$childs = $this->modx->getChildIds($category, 50, ['context' => 'web']);
			$childs[] = $category;
			$c->where(
			[
				'id:IN' => $childs,
			]);
		} else {
			$this->modx->log(MODX_LOG_LEVEL_ERROR, 'Отсутствует категория');
		}
		
        return $c;
    }


    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = $object->toArray();
        return $array;
    }
}
