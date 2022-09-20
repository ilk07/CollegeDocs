CollegeDocs.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'collegedocs-panel-home',
            renderTo: 'collegedocs-panel-home-div'
        }]
    });
    CollegeDocs.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(CollegeDocs.page.Home, MODx.Component);
Ext.reg('collegedocs-page-home', CollegeDocs.page.Home);