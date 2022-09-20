<?php

use MODX\Revolution\modExtraManagerController;

/**
 * The home manager controller for CollegeDocs.
 *
 */
class CollegeDocsHomeManagerController extends modExtraManagerController
{
    /** @var CollegeDocs\CollegeDocs $CollegeDocs */
    public $CollegeDocs;


    /**
     *
     */
    public function initialize()
    {
        $this->CollegeDocs = $this->modx->services->get('CollegeDocs');
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return ['collegedocs:default'];
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('collegedocs');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->CollegeDocs->config['cssUrl'] . 'mgr/main.css');
        $this->addJavascript($this->CollegeDocs->config['jsUrl'] . 'mgr/collegedocs.js');
        $this->addJavascript($this->CollegeDocs->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->CollegeDocs->config['jsUrl'] . 'mgr/misc/combo.js');
        $this->addJavascript($this->CollegeDocs->config['jsUrl'] . 'mgr/widgets/items.grid.js');
        $this->addJavascript($this->CollegeDocs->config['jsUrl'] . 'mgr/widgets/items.windows.js');
        $this->addJavascript($this->CollegeDocs->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->CollegeDocs->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addHtml('<script type="text/javascript">
        CollegeDocs.config = ' . json_encode($this->CollegeDocs->config) . ';
        CollegeDocs.config.connector_url = "' . $this->CollegeDocs->config['connectorUrl'] . '";
        Ext.onReady(function() {MODx.load({ xtype: "collegedocs-page-home"});});
        </script>');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        $this->content .= '<div id="collegedocs-panel-home-div"></div>';
        return '';
    }
}
