CollegeDocs.grid.Items = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'collegedocs-grid-items';
    }
    Ext.applyIf(config, {
        url: CollegeDocs.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'CollegeDocs\\Processors\\Item\\GetList',
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                const row = grid.store.getAt(rowIndex);
                this.updateItem(grid, e, row);
            }
        },
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0,
            getRowClass: function (rec) {
                return !rec.data.active
                    ? 'collegedocs-grid-row-disabled'
                    : '';
            }
        },
        paging: true,
        remoteSort: true,
        autoHeight: true,
    });
    CollegeDocs.grid.Items.superclass.constructor.call(this, config);


    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
    
    //collegedocs_doc_types
    
};
Ext.extend(CollegeDocs.grid.Items, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        const ids = this._getSelectedIds();

        const row = grid.getStore().getAt(rowIndex);
        const menu = CollegeDocs.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },

    createItem: function (btn, e) {
        const w = MODx.load({
            xtype: 'collegedocs-item-window-create',
            id: Ext.id(),
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({active: true, itemtype: 'link'});
        w.show(e.target);
    },
    
    createItemFile: function (btn, e) {
        const w = MODx.load({
            xtype: 'collegedocs-item-file-window-create',
            id: Ext.id(),
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({active: true, itemtype: 'file'});
        w.show(e.target);
    },

    updateItemFile: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        const id = this.menu.record.id;

        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'CollegeDocs\\Processors\\Item\\Get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        const w = MODx.load({
                            xtype: 'collegedocs-item-file-window-update',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
            }
        });
    },
    
    updateItemLink: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        const id = this.menu.record.id;

        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'CollegeDocs\\Processors\\Item\\Get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        const w = MODx.load({
                            xtype: 'collegedocs-item-link-window-update',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
            }
        });
    },
    
    removeItem: function () {
        const ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('collegedocs_items_remove')
                : _('collegedocs_item_remove'),
            text: ids.length > 1
                ? _('collegedocs_items_remove_confirm')
                : _('collegedocs_item_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'CollegeDocs\\Processors\\Item\\Remove',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },

    disableItem: function () {
        const ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'CollegeDocs\\Processors\\Item\\Disable',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        })
    },

    enableItem: function () {
        const ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'CollegeDocs\\Processors\\Item\\Enable',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        })
    },

    getFields: function () {
        return ['id', 'name', 'description', 
        'resource_id',
        'pagetitle',
        'url',
        'load_name',
        'filetype',
        'catpath',
        'itemtype',
        'active', 'actions'];
        
    },

    getColumns: function () {
        return [
        
        //{
        //    header: _('collegedocs_item_id'),
        //    dataIndex: 'id',
        //    sortable: true,
        //    width: 70
        //},
        {
            header: _('collegedocs_item_pagetitle'),
            dataIndex: 'pagetitle',
            sortable: true,
            width: 250,
            renderer: function(value){
            if(value)
                return '<div style="white-space:normal">'+ value +'</div>';
            }
        },
        {
            header: _('collegedocs_item_load_name'),
            dataIndex: 'load_name',
            sortable: true,
            width: 250,
            renderer: function(value){
            if(value)
                return '<div style="white-space:normal">'+ value +'</div>';
            }
        },
        {
            header: _('collegedocs_item_description'),
            dataIndex: 'description',
            sortable: false,
            width: 250,
            renderer: function(value){
            if(value)
                return '<div style="white-space:normal">'+ value +'</div>';
            }
        },
        {
            header: _('collegedocs_item_itemtype'),
            dataIndex: 'itemtype',
            sortable: true,
            width: 100,
            renderer: function(value){
                if(value === 'file'){
                        return '<div>файл</div>';
                }
                if(value === 'link'){
                        return '<div class="action-blue">ссылка</div>';
                }
            }
        },
        {
            header: _('collegedocs_item_url'),
            dataIndex: 'url',
            sortable: true,
            width: 100,
            renderer: function(value){
            if(value)
                return '<div style="white-space:normal"><a href="'+ value +'" target="_blank">Просмотр</a></div>';
            }
        },
        {
            header: _('collegedocs_item_filetype'),
            dataIndex: 'filetype',
            sortable: true,
            width: 100,
            renderer: function(value){
                if(value){
                    return value.toUpperCase();
                } else {
                    return '<div>-</div>'
                }
            }
        },
        //{
        //    header: _('collegedocs_item_catpath'),
        //    dataIndex: 'catpath',
        //    sortable: true,
        //    width: 200,
        //},
        //{
        //    header: _('collegedocs_item_name'),
        //    dataIndex: 'name',
        //    sortable: true,
        //    width: 200,
        //},
        //{
        //    header: _('collegedocs_item_resource_id'),
        //    dataIndex: 'resource_id',
        //    sortable: true,
        //    width: 250,
        //},
        {
            header: _('collegedocs_item_active'),
            dataIndex: 'active',
            renderer: CollegeDocs.utils.renderBoolean,
            sortable: true,
            width: 100,
        }, {
            header: _('collegedocs_grid_actions'),
            dataIndex: 'actions',
            renderer: CollegeDocs.utils.renderActions,
            sortable: false,
            width: 100,
            id: 'actions'
        }];
    },

    getTopBar: function () {
        return [
        {
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('collegedocs_item_file_create'),
            handler: this.createItemFile,
            cls:'collegedocs-btn-success',
            scope: this
        }, 
        {
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('collegedocs_item_url_create'),
            handler: this.createItem,
            //cls:'collegedocs-btn-link',
            scope: this
        },
        
        '->', 
        {
            xtype: 'modx-combo',
            width: 450,
            name: 'resource_id',
            displayField: 'pagetitle',
            hiddenName: 'resource_id',
            valueField: 'id',
            fields: ['pagetitle','id'],
            emptyText: 'фильтр по разделам',
            pageSize: 25,
            url: MODx.config.connector_url,
            baseParams:{
                action: 'CollegeDocs\\Processors\\Resource\\GetList',
                category: MODx.config.collegedocs_docs_category || '1000000'
            },
            typeAhead: true,
            editable: true,
            anchor: '99%',
            allowBlank: false,
            listeners:{
				select: {fn: this._filterCategory, scope: this}
			},
        },
        {
            text: '<i class="icon icon-refresh"></i>',
            handler: this._clearFilter,
            scope: this
        },
        //{
        //    xtype: 'collegedocs-field-search',
        //    width: 250,
        //    listeners: {
        //        search: {
        //            fn: function (field) {
        //                this._doSearch(field);
        //            }, scope: this
        //        },
        //        clear: {
        //            fn: function (field) {
        //                field.setValue('');
        //                this._clearSearch();
        //            }, scope: this
        //        },
        //    }
        //}
        ];
    },

    onClick: function (e) {
        const elem = e.getTarget();
        if (elem.nodeName == 'BUTTON') {
            const row = this.getSelectionModel().getSelected();
            if (typeof(row) != 'undefined') {
                const action = elem.getAttribute('action');
                if (action == 'showMenu') {
                    const ri = this.getStore().find('id', row.id);
                    return this._showMenu(this, ri, e);
                }
                else if (typeof this[action] === 'function') {
                    this.menu.record = row.data;
                    return this[action](this, e);
                }
            }
        }
        return this.processEvent('click', e);
    },

    _getSelectedIds: function () {
        const ids = [];
        const selected = this.getSelectionModel().getSelections();

        for (const i in selected) {
            if (!selected.hasOwnProperty(i)) {
                continue;
            }
            ids.push(selected[i]['id']);
        }

        return ids;
    },

    //_doSearch: function (tf) {
    //    this.getStore().baseParams.query = tf.getValue();
    //    this.getBottomToolbar().changePage(1);
    //},

    //_clearSearch: function () {
    //    this.getStore().baseParams.query = '';
    //    this.getBottomToolbar().changePage(1);
    //},
    
    _filterCategory: function(cb) {
		this.getStore().baseParams.category = cb.value;
		this.getBottomToolbar().changePage(1);
	},
	
	_clearFilter: function(cb) {
		this.getStore().baseParams.category = '';
		this.getBottomToolbar().changePage(1);
	},
    
});
Ext.reg('collegedocs-grid-items', CollegeDocs.grid.Items);
