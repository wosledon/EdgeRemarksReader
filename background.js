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
                    utterance.text = "语音功能已启动！输入“普通话”、“粤语”或“猛男模式”即可切换语音模式！";

                    synth.speak(utterance);

                    this.global_engine = synth;
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
        var chatBoxId = "chat-items";
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

    init: function () {
        this.initVoiceEngine();
        this.bilibiliLive();
    }
}

$(function () {
    $(document).ready(function () {
        remarkReader.init();
    });
})