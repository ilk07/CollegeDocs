<?php

namespace CollegeDocs\Processors\Item;

use CollegeDocs\Model\CollegeDocsItem;
use MODX\Revolution\modResource;
use MODX\Revolution\Processors\Model\GetListProcessor;

use xPDO\Om\xPDOQuery;
use xPDO\Om\xPDOObject;

class GetList extends GetListProcessor
{
    public $objectType = 'CollegeDocsItem';
    public $classKey = CollegeDocsItem::class;
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $permission = 'collegedocs_list';


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
        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where([
                'old_name:LIKE' => "%{$query}%",
                'OR:description:LIKE' => "%{$query}%",
				'OR:pagetitle:LIKE' => "%{$query}%",
            ]);
        }
		
		//присоединяем таблицы ресурс, перевод
		$c->leftJoin('modResource', 'modResource', 'CollegeDocsItem.resource_id = modResource.id');	
		$c->select('CollegeDocsItem.* , modResource.pagetitle as pagetitle');			
		
		$category = trim($this->getProperty('category'));
		if (!empty($category)) {
			$c->where([
                'modResource.id' => $category,
            ]);
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
        $array['actions'] = [];

        // Edit
		
		if($array['itemtype'] == 'link'){
			$array['actions'][] = [
				'cls' => '',
				'icon' => 'icon icon-edit',
				'title' => $this->modx->lexicon('collegedocs_item_link_update'),
				'action' => 'updateItemLink',
				'button' => true,
				'menu' => true,
			];
		} else {
			$array['actions'][] = [
				'cls' => '',
				'icon' => 'icon icon-edit',
				'title' => $this->modx->lexicon('collegedocs_item_update'),
				//'multiple' => $this->modx->lexicon('collegedocs_items_update'),
				'action' => 'updateItemFile',
				'button' => true,
				'menu' => true,
			];
		}
		
        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-bell action-green',
                'title' => $this->modx->lexicon('collegedocs_item_enable'),
                'multiple' => $this->modx->lexicon('collegedocs_items_enable'),
                'action' => 'enableItem',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-bell action-gray',
                'title' => $this->modx->lexicon('collegedocs_item_disable'),
                'multiple' => $this->modx->lexicon('collegedocs_items_disable'),
                'action' => 'disableItem',
                'button' => true,
                'menu' => true,
            ];
        }

        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('collegedocs_item_remove'),
            'multiple' => $this->modx->lexicon('collegedocs_items_remove'),
            'action' => 'removeItem',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }
}
