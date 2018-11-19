/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'Desktop.SystemStatus',
        'Desktop.VideoWindow',
        'Desktop.GridWindow',
        'Desktop.TabWindow',
        'Desktop.AccordionWindow',
        'Desktop.Notepad',
        'Desktop.BogusMenuModule',
        'Desktop.BogusModule',
//      'Desktop.Blockalanche',
        'Desktop.Settings'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [
            new Desktop.VideoWindow(),
            //new Desktop.Blockalanche(),
            new Desktop.SystemStatus(),
            new Desktop.GridWindow(),
            new Desktop.TabWindow(),
            new Desktop.AccordionWindow(),
            new Desktop.Notepad(),
            new Desktop.BogusMenuModule(),
            new Desktop.BogusModule()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                	{ name: '应用管理', iconCls: 'computer-shortcut', module: 'grid-win' },
                    { name: '用户管理', iconCls: 'users-shortcut', module: 'acc-win'},
                    { name: '浏览器', iconCls: 'brower-shortcut', module: 'systemstatus'},
                    { name: '数据管理', iconCls: 'database-shortcut', module: 'grid-win' },
                    { name: '系统状态', iconCls: 'systemStatus-shortcut', module: 'systemstatus'},
                    { name: '控制台', iconCls: 'console-shortcut', module: 'systemstatus'},
                    { name: '回收站', iconCls: 'recycleBin-shorcut', module: 'systemstatus'},
                    //{ name: '记事本', iconCls: 'notepad-shortcut', module: 'notepad'}
                ]
            }),

            wallpaper: 'css/images/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
    },

    onSettings: function () {
        var dlg = new Desktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
