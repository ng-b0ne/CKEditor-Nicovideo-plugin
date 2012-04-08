CKEDITOR.plugins.add('nicovideo',{
    init: function(editor) {
        var pluginName = 'nicovideo';
        var buttonName = 'NicovideoBtn';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialog.js');
        
        editor.addCommand(pluginName,{
            exec:function(editor) {
                editor.openDialog(pluginName);
            },
            modes : { wysiwyg:1 }
        });

        editor.ui.addButton(buttonName,{
            label:'ニコニコ動画',
            command:pluginName,
            icon:this.path + 'images/nico-btn.png'
        });
    }
});