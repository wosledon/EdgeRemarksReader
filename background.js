var remarkReader = {

    global_engine: null,
    global_voices: null,
    global_voices_index: 15,
    global_messages: [
        "脱下裤子说",
        "偷偷亲了你一口说",
        "抱着妹子说",
        "抱着王阿姨说",
        "大吼一声说",
        "开着法拉利说",
        "流着口水说",
        "一边偷看王寡妇洗澡一边说",
        "拿着肥皂对你说"
    ],

    // 加载语音引擎
    initVoiceEngine: function () {
        const synthVoice = () => {
            const awaitVoices = new Promise(resolve =>
                    window.speechSynthesis.onvoiceschanged = resolve)
                .then(() => {
                    const synth = window.speechSynthesis;

                    var voices = synth.getVoices();
                    console.log(voices)
                    global_voices = voices;
                    const utterance = new SpeechSynthesisUtterance();
                    utterance.voice = voices[this.global_voices_index];
                    utterance.text = "语音助手已启动！";

                    synth.speak(utterance);

                    this.global_engine = synth;
                })
                .then(() => {
                    this.bilibiliLive();
                    this.catFmLive();
                });
        }

        synthVoice();
    },
    // 实现Speak方法s
    toSpeak: function (text) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.voice = global_voices[this.global_voices_index];
        utterance.text = text;
        this.global_engine.speak(utterance);
    },

    bilibiliLive: function () {
        var that = this;

        $("#chat-items").bind("DOMNodeInserted", function (event) {
            var element = event.target;

            if ($(element).hasClass('danmaku-item')) {
                console.log("聊天")

                var chats = $("#chat-items > .chat-item").last();
                var name = chats.attr('data-uname');
                var content = chats.attr('data-danmaku')
                var command = typeof (content) == "undefined" ? "" : content.split("+");
                console.log(command)
                if (command.length >= 2) {
                    switch (command[0].trim()) {
                        case "语音模式":
                            switch (command[1].trim()) {
                                case "普通话":
                                    that.global_voices_index = 15;
                                    that.toSpeak("普通话模式已启动。");
                                    return;
                                case "粤语":
                                    that.global_voices_index = 14;
                                    that.toSpeak("粤语模式已启动。");
                                    return;
                                case "猛男模式":
                                    that.global_voices_index = 16;
                                    that.toSpeak("猛男模式已启动。");
                                    return;
                            }
                            return;
                        case "添加短语":
                            that.global_messages.push(command[1]);
                            that.toSpeak("短语" + command[1] + "已添加。");
                            return;
                            // case "短语列表":
                            //     // chat-input
                            //     // live-skin-highlight-button-bg

                            //     // for (var i = 0; i < that.global_messages.length; i++) {
                            //     //     setTimeout(() => {
                            //     //         $(".chat-input").val(i + ":" + that.global_messages[i])
                            //     //         $(".bl-button .live-skin-highlight-button-bg .live-skin-button-text .bl-button--primary .bl-button--small").click();
                            //     //     }, 1 * 1000);
                            //     // }
                            //     // that.global_messages.push(command[1]);
                            //     return;
                        case "删除短语":
                            var index = parseInt(command[1]);
                            var dContext = that.global_messages[index];
                            delete that.global_messages[index];
                            that.toSpeak("短语" + dContext + "已删除。");
                            return;
                    }
                }

                console.log(that.global_messages)

                if (typeof (name) != "undefined") {
                    that.toSpeak(name + "，" + that.global_messages[Math.floor(Math.random() * that.global_messages.length)] + "：" + content);
                    that.chatXiaoAi(that, name, content)
                }
            }

            if ($(element).hasClass('gift-item')) {
                var name = $(element).children('.username').text();
                var gift = $(element).children('.gift-name').text();
                var num = $(element).children('.gift-num').text().replace("x", "乘");
                console.log("礼物用户", name)
                that.toSpeak("感谢" + name + "赠送的" + gift + num);
            }
        });
    },

    catFmLive: function () {
        console.log(1)
        $(".message-list").bind("DOMNodeInserted", function (event) {
            console.log(2)
        })

        $('.message-list').on('onchange', function () {
            console.log(3)
        })
    },

    init: function () {
        this.initVoiceEngine();
        this.bilibiliLive();
        //this.catFmLive();
    },

    initButton: function () {
        $(".upper-row").append('<button style="margin-right:40px;width:100px;height:30px;background-color:#2b88ad;border-radius:5px;color:white;border:0px;cursor:pointer;" id="start_helper">启动小助手</button>');
        $('#start_helper').click(() => {
            remarkReader.init();
            $('#start_helper').attr("disabled", "disabled").css("background-color", "gray");
        });
        //$('.upper-row').append("<iframe id='xiaoaiframe' src=''></iframe>")
    },

    chatXiaoAi: function (that, name, text) {
        // // 输出第一个使用插件页面的url
        // if (pups.length) {
        //     console.log(pups[0].location.href)
        // }
        // $.ajax({
        //     url: 'http://jiuli.xiaoapi.cn/i/xiaoai_tts.php?msg=' + text,
        //     type: "GET",
        //     dataType:'jsonp',
        //     success: function (res) {
        //         var result = JSON.parse(res);
        //         that.toSpeak(name + '同学，' + result.text.replace('小爱', '我'));
        //     },
        //     error: function (err) {
        //         that.toSpeak(name + '同学，不好意思，我听不懂你在说什么！');
        //         console.log(111, err)
        //     }
        // })
    }
}

$(function () {
    $(document).ready(function () {
        // console.log("启动");
        // remarkReader.init();
        remarkReader.initButton();
    });


})