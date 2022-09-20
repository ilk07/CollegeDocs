let CollegeDocs = function (config) {
    config = config || {};
    CollegeDocs.superclass.constructor.call(this, config);
};
Ext.extend(CollegeDocs, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('collegedocs', CollegeDocs);

CollegeDocs = new CollegeDocs();