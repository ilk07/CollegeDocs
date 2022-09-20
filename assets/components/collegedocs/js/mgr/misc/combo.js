CollegeDocs.combo.Search = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        xtype: 'twintrigger',
        ctCls: 'x-field-search',
        allowBlank: true,
        msgTarget: 'under',
        emptyText: _('search'),
        name: 'query',
        triggerAction: 'all',
        clearBtnCls: 'x-field-search-clear',
        searchBtnCls: 'x-field-search-go',
        onTrigger1Click: this._triggerSearch,
        onTrigger2Click: this._triggerClear,
    });
    CollegeDocs.combo.Search.superclass.constructor.call(this, config);
    this.on('render', function () {
        this.getEl().addKeyListener(Ext.EventObject.ENTER, function () {
            this._triggerSearch();
        }, this);
    });
    this.addEvents('clear', 'search');
};
Ext.extend(CollegeDocs.combo.Search, Ext.form.TwinTriggerField, {

    initComponent: function () {
        Ext.form.TwinTriggerField.superclass.initComponent.call(this);
        this.triggerConfig = {
            tag: 'span',
            cls: 'x-field-search-btns',
            cn: [
                {tag: 'div', cls: 'x-form-trigger ' + this.searchBtnCls},
                {tag: 'div', cls: 'x-form-trigger ' + this.clearBtnCls}
            ]
        };
    },

    _triggerSearch: function () {
        this.fireEvent('search', this);
    },

    _triggerClear: function () {
        this.fireEvent('clear', this);
    },

});
Ext.reg('collegedocs-combo-search', CollegeDocs.combo.Search);
Ext.reg('collegedocs-field-search', CollegeDocs.combo.Search);


//console.log(MODx.config.collegedocs_doc_types);
CollegeDocs.combo.Doctype = function (config) {
    config = config || {};
		  
    Ext.applyIf(config, {
		store: new Ext.data.ArrayStore({
            id: 0
            ,fields: ['value']
            ,data: this.getTypes()
        })
        ,mode: 'local'
        ,displayField: 'value'
		,hiddenName: 'doctype'
        ,valueField: 'value'
		,lazyRender:true
		,emptyText: _('collegedocs_item_doctype')
		,listeners: {
            'afterrender': function(combo){ 		
				if(config.file_type) {
					this.setValue(config.file_type);
				}
				//else {
				//	this.setValue(combo.store.data.keys[0]);
				//}
            }
       }
    });
    CollegeDocs.combo.Doctype.superclass.constructor.call(this, config);
};
Ext.extend(CollegeDocs.combo.Doctype, MODx.combo.ComboBox, {
    getTypes: function () {
        var array = [];
        var types = MODx.config.collegedocs_doc_types.split(',');
        for (var i = 0; i < types.length; i++) {
            if(types[i] !== '') {
				array.push([types[i]]);
			}
        }
        return array;
    }
});
Ext.reg('college-combo-doctype', CollegeDocs.combo.Doctype);