<?php

return [
    'CollegeDocsUserPolicy' => [
		'name' => 'CollegeDocsManagerPolicy',
        'description' => 'Политика разрешений на управление документами колледжа в разделе Сведения об образовательной организации',
        'data' => [
            'save' => true,
			'view' => true,
			'list' => true,
			'remove' => true,
        ],
		'lexicon' => 'collegedocs:permissions',		
    ],
];
