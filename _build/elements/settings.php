<?php

return [
    'docs_category' => [
		'key' => 'collegedocs_docs_category',
		'name' => 'setting_collegedocs_docs_category',
		'description' => 'setting_collegedocs_docs_category_desc',
	    'xtype' => 'numberfield',
		'lexicon' => 'collegedocs:setting',
        'value' => 0,
    ],
	'doc_types' => [
		'key' => 'collegedocs_doc_types',
		'name' => 'setting_collegedocs_doc_types',
		'description' => 'setting_collegedocs_doc_types_desc',
	    'xtype' => 'textfield',
		'lexicon' => 'collegedocs:setting',
        'value' => 'скан-копия, заверенная копия, документ с электронной подписью',
    ],
	'file_types' => [
		'key' => 'collegedocs_file_types',
		'name' => 'setting_collegedocs_file_types',
		'description' => 'setting_collegedocs_file_types_desc',
	    'xtype' => 'textfield',
		'lexicon' => 'collegedocs:setting',
        'value' => 'pdf,doc,docx,xls,xlsx',
    ],
	'media_source' => [
		'key' => 'collegedocs_source',
		'name' => 'setting_collegedocs_source',
		'description' => 'setting_collegedocs_source_desc',
	    'xtype' => 'numberfield',
		'lexicon' => 'collegedocs:setting',
        'value' => '1',
    ],
	'doccat' => [
		'key' => 'collegedocs_doccat',
		'name' => 'setting_collegedocs_doccat',
		'description' => 'setting_collegedocs_doccat_desc',
	    'xtype' => 'textfield',
		'lexicon' => 'collegedocs:setting',
        'value' => 'assets/docs/',
    ],
		
];
