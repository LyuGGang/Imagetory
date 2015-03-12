if ( typeof (fontApp) == typeof (undefined)) {
    fontApp = {};
}


fontApp = {
    data : {
        requestTranslateFontURL : 'http://localhost'
    },

    _cacheElement : {
        mainContentInfo : $('#main-content-info')
    },

    init : function() {
        this.addEventListener();
    },

    addEventListener : function() {
        this.actionSubmitFontBtnListener();
    },

    actionSubmitFontBtnListener : function() {
        var self = this;
        $('[data-event-request-font]').on('click', function () {
            self._cacheElement.mainContentInfo.empty();
            var fontname = $("input[name=uploadfont]")[0].files[0].name;
            fontname = fontname.split(".")[0];

            blockUI.block();
            self.requestTranslateFont(fontname);
        });
    },

    requestTranslateFont : function(fontname) {
        $('[data-form-request-font]').ajaxForm({
            type : 'post',
            beforeSubmit : function() {

            },
            success : function(result) {
                blockUI.unblock();

                if (result.status) {
                    '<div class="alert alert-info font-app-alert" role="alert">변환이 완료되었습니다.</div>' +
                    '<div class="bs-callout bs-callout-info">' +
                        '<h4>How To Use WebFont</h4>' +
                        "<p>@font-face {<br>&nbsp;&nbsp;font-family: '" + filename + "';<br>&nbsp;&nbsp;src:url('FontFilePath'/" + filename + ".woff') format('woff')<br>}<br>." + filename + "{<br>&nbsp;&nbsp;font-family: '" + filename + "';<br>}<br><h4><a href='#'>Webfont Download</a></h4></p>" +
                    '</div>';
                } else {
                    '<div class="alert alert-danger font-app-alert" role="alert">변환을 실패하였습니다.</div>' +
                    '<div class="bs-callout bs-callout-danger">' +
                        '<h4>변환 할 파일을 확인 후, 다시 시도해주세요.</h4>' +
                    '</div>';
                }
            }
        });
    }
}

blockUI = {
    block: function() {
        $.blockUI({
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });
    },
    unblock: function() {
        $.unblockUI();
    }
}

$(document).ready(function() {
    fontApp.init();
})