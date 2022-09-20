CollegeDocs.window.CreateItemFile = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'collegedocs-item-file-window-create';
    }
    Ext.applyIf(config, {
        title: _('collegedocs_item_create'),
        width: 650,
        autoHeight: true,
         fileUpload: true,
        enctype : 'multipart/form-data',
        url: CollegeDocs.config.connector_url,
        action: 'CollegeDocs\\Processors\\Item\\Create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    CollegeDocs.window.CreateItemFile.superclass.constructor.call(this, config);
    
};

Ext.extend(CollegeDocs.window.CreateItemFile, MODx.Window, {
    
    getFields: function (config) {
        return [
        
        {
            layout: 'column', // создаем слой типа форма
            cls: 'main-wrapper',
            style: 'padding: 0 0 15px 0',
            width: '100%',
            items: [
                {
					columnWidth: 1
					,layout: 'form'
					,defaults: { msgTarget: 'under' }
					,border:false
					,items: [
					{
						xtype: 'fileuploadfield',
						name: 'loader',
						allowBlank:true,
						anchor: '100%',
						id: 'collegedocs_file-loader',
						hidden: true,
						listeners: {
							change: function() {
						 
							}
						}
					}, {
						xtype: 'button',
						fieldLabel: _('collegedocs_item_file_upload'),
						text: 'Загрузить файл',
						cls:'collegedocs-btn-success',
						allowBlank: false,
						anchor: '100%',
						listeners: {
							click: {fn: function(){
								document.getElementById('collegedocs_file-loader-file').click();
								document.getElementById('collegedocs_file-loader-file').addEventListener('change', function() {
									document.getElementById('collegedocs_file-holder').innerHTML = document.getElementById('collegedocs_file-loader-file').files[0].name;
								}, false);
							}, scope: this}
						}
					}]
				}, 
				{
                    columnWidth: .5,
                    hideLabels: false,
                    style: 'margin-left:0',
                    items:[
                        {
                            layout: 'form', 
                            labelAlign: 'top',
                            items: [
                                {
                                    xtype: 'modx-combo',
                                    fieldLabel: _('collegedocs_item_choose_resource'),
                                    name: 'resource_id',
                                    displayField: 'pagetitle',
                                    hiddenName: 'resource_id',
                                    valueField: 'id',
                                    fields: ['pagetitle','id'],
                                    pageSize: 20,
                                    emptyText: _('collegedocs_item_resource'),
                                    url: MODx.config.connector_url,
                                    baseParams:{
                                        action: 'CollegeDocs\\Processors\\Resource\\GetList',
                                        category: MODx.config.collegedocs_docs_category || '1000000'
                                    },
                                    typeAhead: true,
                                    editable: true,
                                    anchor: '99%',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'textarea',
                                    fieldLabel: _('collegedocs_item_load_name'),
                                    name: 'load_name',
                                    
                                    //id: config.id + '-load_name',
                                    id: 'collegedocs_file-holder',
                                    anchor: '99%',
                                    allowBlank: false,
                                    height: 150,
                                }
                            ],
                        }
                    ]
                },
                {
                    columnWidth: .5,
                    hideLabels: false,
                    style: 'margin-left:0',
                    items:[
                        {
                            layout: 'form', 
                            labelAlign: 'top',
                            items: [
                                {
                                    xtype: 'college-combo-doctype',
                                    fieldLabel: _('collegedocs_item_choose_doctype'),
                                    anchor: '99%',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'textarea',
                                    fieldLabel: _('collegedocs_item_description'),
                                    name: 'description',
                                    id: config.id + '-description',
                                    height: 150,
                                    anchor: '99%',
                                    allowBlank: true,
                                }
                            ],
                        }
                    ]
                },
                
            ]
        }, 
        {
		    xtype: 'textfield',
			name: 'file1',
			id: 'collegedocs_file-file1',
			anchor: '99%',
			allowBlank: true,
			labelStyle: 'display: none;',
			style: {height: '1px', 'min-height': '1px', 'font-size': '1px', color: '#fff', padding: 0, border: 'none'}
		},
		{
            xtype: 'hidden',
            name: 'itemtype',
            id: config.id + '-itemtype',
        },
        
        {
            xtype: 'xcheckbox',
            boxLabel: _('collegedocs_item_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        },
        
        ];
    },

    loadDropZones: function () {
    }

});
Ext.reg('collegedocs-item-file-window-create', CollegeDocs.window.CreateItemFile);



CollegeDocs.window.CreateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'collegedocs-item-window-create';
    }
    Ext.applyIf(config, {
        title: _('collegedocs_item_create'),
        width: 650,
        autoHeight: true,
        url: CollegeDocs.config.connector_url,
        action: 'CollegeDocs\\Processors\\Item\\Create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    CollegeDocs.window.CreateItem.superclass.constructor.call(this, config);
};
Ext.extend(CollegeDocs.window.CreateItem, MODx.Window, {

    getFields: function (config) {
        return [
         {
            layout: 'column', // создаем слой типа форма
            cls: 'main-wrapper',
            style: 'padding: 0 0 15px 0',
            width: '100%',
            items: [
                {
					columnWidth: 1
					,layout: 'form'
					,defaults: { msgTarget: 'under' }
					,border:false
					,items: [
			    		{
		    				xtype: 'textfield',
		    				fieldLabel: _('collegedocs_item_url'),
	    					name: 'url',
    						allowBlank:false,
						    anchor: '100%',
					    },
				    ]
				}, 
				{
                    columnWidth: .5,
                    hideLabels: false,
                    style: 'margin-left:0',
                    items:[
                        {
                            layout: 'form', 
                            labelAlign: 'top',
                            items: [
                                {
                                    xtype: 'modx-combo',
                                    fieldLabel: _('collegedocs_item_choose_resource'),
                                    name: 'resource_id',
                                    displayField: 'pagetitle',
                                    hiddenName: 'resource_id',
                                    valueField: 'id',
                                    fields: ['pagetitle','id'],
                                    pageSize: 20,
                                    emptyText: _('collegedocs_item_resource'),
                                    url: MODx.config.connector_url,
                                    baseParams:{
                                        action: 'CollegeDocs\\Processors\\Resource\\GetList',
                                        category: MODx.config.collegedocs_docs_category || '1000000'
                                    },
                                    typeAhead: true,
                                    editable: true,
                                    anchor: '99%',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'textarea',
                                    fieldLabel: _('collegedocs_item_load_name'),
                                    name: 'load_name',
                                    id: config.id + '-load_name',
                                    anchor: '99%',
                                    allowBlank: false,
                                    height: 150,
                                }
                            ],
                        }
                    ]
                },
                {
                    columnWidth: .5,
                    hideLabels: false,
                    style: 'margin-left:0',
                    items:[
                        {
                            layout: 'form', 
                            labelAlign: 'top',
                            items: [
                                {
                                    xtype: 'college-combo-doctype',
                                    fieldLabel: _('collegedocs_item_choose_doctype'),
                                    anchor: '99%',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'textarea',
                                    fieldLabel: _('collegedocs_item_description'),
                                    name: 'description',
                                    id: config.id + '-description',
                                    height: 150,
                                    anchor: '99%',
                                    allowBlank: true,
                                }
                            ],
                        }
                    ]
                },
                
            ]
        }, 
		{
            xtype: 'hidden',
            name: 'itemtype',
            id: config.id + '-itemtype',
        },
        {
            xtype: 'xcheckbox',
            boxLabel: _('collegedocs_item_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        },
        
        ];
    },

    loadDropZones: function () {
    }

});
Ext.reg('collegedocs-item-window-create', CollegeDocs.window.CreateItem);

CollegeDocs.window.UpdateItemFile = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'collegedocs-item-file-window-update';
    }
    Ext.applyIf(config, {
        //title: _('collegedocs_item_update'),
        title: 'Обновление файла',
        width: 650,
        autoHeight: true,
        url: CollegeDocs.config.connector_url,
        action: 'CollegeDocs\\Processors\\Item\\Update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    CollegeDocs.window.UpdateItemFile.superclass.constructor.call(this, config);
};
Ext.extend(CollegeDocs.window.UpdateItemFile, MODx.Window, {

    getFields: function (config) {
        
          return [
        
        {
            layout: 'column', // создаем слой типа форма
            cls: 'main-wrapper',
            style: 'padding: 0 0 15px 0',
            width: '100%',
            items: [
                {
					columnWidth: 1,
					layout: 'form',
					defaults: { msgTarget: 'under' },
					border:false,
					items: [
					    {
					        xtype: 'displayfield',
                            fieldLabel: _('collegedocs_item_name'),
                            name: 'name',
					    },
					    {
                            xtype: 'hidden',
                            name: 'id',
                            id: config.id + '-id',
                        }, 
					]
				}, 
				{
                    columnWidth: .5,
                    hideLabels: false,
                    style: 'margin-left:0',
                    items:[
                        {
                            layout: 'form', 
                            labelAlign: 'top',
                            items: [
                                {
                                    xtype: 'modx-combo',
                                    fieldLabel: _('collegedocs_item_choose_resource'),
                                    name: 'resource_id',
                                    displayField: 'pagetitle',
                                    hiddenName: 'resource_id',
                                    valueField: 'id',
                                    fields: ['pagetitle','id'],
                                    pageSize: 20,
                                    emptyText: _('collegedocs_item_resource'),
                                    url: MODx.config.connector_url,
                                    baseParams:{
                                        action: 'CollegeDocs\\Processors\\Resource\\GetList',
                                        category: MODx.config.collegedocs_docs_category || '1000000'
                                    },
                                    typeAhead: true,
                                    editable: true,
                                    anchor: '99%',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'textarea',
                                    fieldLabel: _('collegedocs_item_load_name'),
                                    name: 'load_name',
                                    id: config.id + '-load_name',
                                    anchor: '99%',
                                    allowBlank: false,
                                    height: 150,
                                }
                            ],
                        }
                    ]
                },
                {
                    columnWidth: .5,
                    hideLabels: false,
                    style: 'margin-left:0',
                    items:[
                        {
                            layout: 'form', 
                            labelAlign: 'top',
                            items: [
                                {
                                    xtype: 'college-combo-doctype',
                                    fieldLabel: _('collegedocs_item_choose_doctype'),
                                    anchor: '99%',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'textarea',
                                    fieldLabel: _('collegedocs_item_description'),
                                    name: 'description',
                                    id: config.id + '-description',
                                    height: 150,
                                    anchor: '99%',
                                    allowBlank: true,
                                }
                            ],
                        }
                    ]
                },
                
            ]
        }, 
        {
            xtype: 'xcheckbox',
            boxLabel: _('collegedocs_item_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        },
        
        ];
        
        
        
    },

    loadDropZones: function () {
    }

});
Ext.reg('collegedocs-item-file-window-update', CollegeDocs.window.UpdateItemFile);


CollegeDocs.window.UpdateItemLink = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'collegedocs-item-link-window-update';
    }
    Ext.applyIf(config, {
        title: _('collegedocs_item_link_update'),
        width: 650,
        autoHeight: true,
        url: CollegeDocs.config.connector_url,
        action: 'CollegeDocs\\Processors\\Item\\Update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    CollegeDocs.window.UpdateItemLink.superclass.constructor.call(this, config);
};
Ext.extend(CollegeDocs.window.UpdateItemLink, MODx.Window, {

    getFields: function (config) {
        return [
        {
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, 
        {
            xtype: 'textfield',
            fieldLabel: _('collegedocs_item_url'),
            name: 'url',
            id: config.id + '-url',
            anchor: '99%',
            allowBlank: false,
        },
        {
            xtype: 'textfield',
            fieldLabel: _('collegedocs_item_load_name'),
            name: 'load_name',
            id: config.id + '-load_name',
            anchor: '99%',
            allowBlank: false,
        }, 
        {
            xtype: 'textarea',
            fieldLabel: _('collegedocs_item_description'),
            name: 'description',
            id: config.id + '-description',
            anchor: '99%',
            height: 150,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('collegedocs_item_active'),
            name: 'active',
            id: config.id + '-active',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('collegedocs-item-link-window-update', CollegeDocs.window.UpdateItemLink);