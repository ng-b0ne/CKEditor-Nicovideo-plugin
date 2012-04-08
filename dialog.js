CKEDITOR.dialog.add('nicovideo',function(editor){
    var videoSize = {};
    videoSize.l = {'width':600,'height':450};
    videoSize.m = {'width':400,'height':300};
    videoSize.s = {'width':200,'height':125};

    var elemVal = [
        {
            type:'html',
            html:'<div style="font-size:1.2em;">動画のURLを入力してください<br />'
                + '例）http://www.nicovideo.jp/watch/********</div>'
        },
        {
            type:'text',
            id:'url',
            label:'URL',
            validate:function(){
                var url = this.getValue();
                var matches = url.match(/^http:\/\/www\.nicovideo\.jp\/watch\/([a-z|0-9]+)/i);
                if (url == null || url == '') {
                    alert('動画のURLを入力してください');
                    return false;
                } else if (!(matches && matches[1])) {
                    alert('URLの形式が正しくありません');
                    return false;
                } else {
                    return true;
                }
            },
            required:true,
            commit:function(data){
                data.url = this.getValue();
                var matches = this.getValue().match(/^http:\/\/www\.nicovideo\.jp\/watch\/([a-z|0-9]+)/i);
                data.videoId = matches[1];
            }
        },
        {
            type:'radio',
            id:'size',
            label:'サイズ',
            items:[
                ['（大）600 × 450','l'],
                ['（中）400 × 300','m'],
                ['（小）200 × 125','s']
            ],
            'default':'l',
            commit:function(data){
                data.size = this.getValue();
            }
        }
    ];
    
    
    return {
        title:'ニコニコ動画投稿',
        minWidth:400,
        minHeight:200,
        contents :[{
            id : 'nicovideoPlugin',
            type : 'html',
            elements:elemVal
        }],
        onOk:function(){
            var dialog = this,data={};
            this.commitContent(data);
            var vSize = videoSize[data.size];
            var scriptTag = '<script type="text/javascript" src="http://ext.nicovideo.jp/thumb_watch/'
                + data.videoId+'?w='+vSize.width
                + '&amp;h='+vSize.height+'"></script>';
            editor.insertHtml(scriptTag);
        }
    };
});
