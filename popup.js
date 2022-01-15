function sendXiaoAi(text) {
    $.ajax({
        url: 'http://jiuli.xiaoapi.cn/i/xiaoai_tts.php?msg=' + text,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            return (res.text)
        },
        error: function (err) {

        }
    })
}