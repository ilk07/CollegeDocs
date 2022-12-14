<?php

namespace CollegeDocs\Processors\Item;

use MODX\Revolution\Processors\Model\CreateProcessor;
use CollegeDocs\Model\CollegeDocsItem;

class Create extends CreateProcessor
{
    public $objectType = 'CollegeDocsItem';
    public $classKey = CollegeDocsItem::class;
    public $languageTopics = ['collegedocs'];
    public $permission = 'collegedocs_save';


    /**
     * @return bool
     */
    public function beforeSet()
    {
		
        $resource_id = trim($this->getProperty('resource_id'));
		$itemtype = trim($this->getProperty('itemtype'));
		
				
        if (empty($resource_id)) {
            $this->modx->error->addField('resource_id', $this->modx->lexicon('collegedocs_item_err_resource_id'));
        }
		if (empty($itemtype)) {
           $this->modx->error->addField('itemtype', $this->modx->lexicon('collegedocs_item_err_itemtype'));
        }		
		
		if($itemtype == 'file') { //если файл - запишем
			if(!$_FILES['loader']['tmp_name']) {
				$this->modx->log(MODX_LOG_LEVEL_ERROR, 'Отсутствует файл');
				$this->modx->error->addField('file1', $this->modx->lexicon('collegedocs_item_err_path'));
			}
			$source_id = $this->modx->getOption('collegedocs_source');
			//$source_id = 1;
			$filesfolder = $this->modx->getOption('collegedocs_doccat');
			//$filesfolder = 'assets/docs/';
			
		
			if(!empty($source_id)) {
				
				$source = $this->modx->getObject('sources.modMediaSource', $source_id);
				$source->initialize();
				$properties = $source->getProperties();
				
				$dir = $filesfolder.$resource_id.'/';
				
				$path = $this->modx->getOption('base_path').ltrim($properties['basePath']['value'],'/').$dir;
				if (!file_exists($path)) {
					mkdir($path);
				}
				
				
				
				$fd = explode('.',$_FILES['loader']['name']);
				$ext = array_pop($fd);
				
				//раскомментирвоать для сохранения названия файла в виде output-имя файла при загрузке
				//$filename = '';
				
				//$k = 0;
				//foreach ($fd as $i) {
				//	$k++;
				//	if($k <= count($fd)) {
				//	   $filename .= $i;
				//	}
				//}			
				
				$filename = str_replace('.', '', microtime(true)); //закомментировать для сохранения названия в ином виде
								
				$_FILES['loader']['name'] = $filename.'.'.$ext;
				$pathtosave = $dir.$_FILES['loader']['name'];
				
				//На дубли проверяем только если пищем исходные имена
				//if($lk = $this->modx->getObject($classKey,['path' => $pathtosave])) {
				//	return $this->failure($this->modx->lexicon('collegedocs_item_err_is'));
				//}
								
				if (!$source->uploadObjectsToContainer($dir, $_FILES)) {
					return $this->failure($this->modx->lexicon('collegedocs_item_file_err_save') . ': ' . print_r($source->getErrors(), 1));
				}
				
				$url = $source->getObjectUrl($pathtosave);
				$this->setProperty('url', $url);
				$this->setProperty('name', $_FILES['loader']['name']);
				$this->setProperty('source', $source_id);
				$this->setProperty('catpath', $dir);
				$this->setProperty('filetype', $ext);
			}
			else {
				return $this->failure($this->modx->lexicon('collegedocs_item_files_err_nosource'));
			}
			
			
			
		}
		
		//elseif ($this->modx->getCount($this->classKey, ['name' => $resource_id])) {
            //$this->modx->error->addField('name', $this->modx->lexicon('collegedocs_item_err_ae'));
        //}

        return parent::beforeSet();
    }
}
