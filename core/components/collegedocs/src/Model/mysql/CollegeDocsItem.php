<?php
namespace CollegeDocs\Model\mysql;

use xPDO\xPDO;

class CollegeDocsItem extends \CollegeDocs\Model\CollegeDocsItem
{

    public static $metaMap = array (
        'package' => 'CollegeDocs\\Model',
        'version' => '3.0',
        'table' => 'collegedocs_items',
        'extends' => 'xPDO\\Om\\xPDOSimpleObject',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'name' => '',
            'description' => '',
            'resource_id' => NULL,
            'url' => '',
            'load_name' => '',
            'filetype' => NULL,
            'catpath' => '',
            'source' => 0,
            'itemtype' => '',
            'doctype' => '',
            'active' => 1,
        ),
        'fieldMeta' => 
        array (
            'name' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'description' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'resource_id' => 
            array (
                'dbtype' => 'int',
                'precision' => '11',
                'phptype' => 'integer',
                'attributes' => 'unsigned',
                'null' => false,
            ),
            'url' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'load_name' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'filetype' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '100',
                'phptype' => 'string',
                'null' => true,
            ),
            'catpath' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'source' => 
            array (
                'dbtype' => 'int',
                'precision' => '11',
                'phptype' => 'integer',
                'null' => true,
                'default' => 0,
            ),
            'itemtype' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '50',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
            'doctype' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '255',
                'phptype' => 'string',
                'null' => true,
                'default' => '',
            ),
            'active' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'phptype' => 'boolean',
                'null' => true,
                'default' => 1,
            ),
        ),
        'indexes' => 
        array (
            'name' => 
            array (
                'alias' => 'name',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'name' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'active' => 
            array (
                'alias' => 'active',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'active' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
        ),
        'aggregates' => 
        array (
            'Resource' => 
            array (
                'class' => 'modResource',
                'local' => 'resource_id',
                'foreign' => 'id',
                'cardinality' => 'one',
                'owner' => 'foreign',
            ),
        ),
    );

}
