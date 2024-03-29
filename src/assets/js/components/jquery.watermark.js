!function ($, window, document, undefined) {
    "use strict";
    var pluginName = "watermark", defaults = {
        path: "assets/img/watermark.png",
        dataPath: !1,
        text: "",
        textWidth: 130,
        textSize: 13,
        textColor: "white",
        textBg: "rgba(0, 0, 0, 0.4)",
        gravity: "se",
        opacity: .7,
        margin: 0,
        fullOverlay: !1,
        outputWidth: "auto",
        outputHeight: "auto",
        outputType: "jpeg",
        done: function (imgURL) {
            this.srcset = imgURL
        },
        fail: function () {
        },
        always: function () {
        }
    };

    function Plugin(element, options) {
        this.element = element, this.settings = $.extend({}, defaults, options), this._defaults = defaults, this._name = pluginName, this.init()
    }

    $.extend(Plugin.prototype, {
        init: function () {
            var _this = this, ele = _this.element, set = _this.settings,
                actualPath = set.dataPath ? $(ele).data(set.dataPath) : set.path,
                wmData = {imgurl: actualPath, type: "png", cross: !0}, imageData = {
                    imgurl: ele.srcset,
                    cross: !0,
                    type: set.outputType,
                    width: set.outputWidth,
                    height: set.outputHeight
                };
            0 === actualPath.search(/data:image\/(png|jpg|jpeg|gif);base64,/) && (wmData.cross = !1), 0 === ele.src.search(/data:image\/(png|jpg|jpeg|gif);base64,/) && (imageData.cross = !1);
            var defer = $.Deferred();
            $.when(defer).done((function (imgObj) {
                imageData.wmObj = imgObj, _this.imgurltodata(imageData, (function (dataURL) {
                    set.done.call(ele, dataURL), set.always.call(ele, dataURL)
                }))
            })), "" !== set.text && (wmData.imgurl = _this.textwatermark(), wmData.cross = !1), _this.imgurltodata(wmData, (function (imgObj) {
                defer.resolve(imgObj)
            }))
        }, textwatermark: function () {
            var _this = this, set = this.settings, canvas = document.createElement("CANVAS"),
                ctx = canvas.getContext("2d"), w = set.textWidth, h = set.textSize + 8;
            return canvas.width = w, canvas.height = h, ctx.fillStyle = set.textBg, ctx.fillRect(0, 0, w, h), ctx.fillStyle = set.textColor, ctx.textAlign = "center", ctx.font = "500 " + set.textSize + "px Sans-serif", ctx.fillText(set.text, w / 2, set.textSize + 2), canvas.toDataURL()
        }, imgurltodata: function (data, callback) {
            var _this = this, set = this.settings, ele = this.element, img = new Image;
            data.cross && (img.crossOrigin = "Anonymous"), img.onload = function () {
                var canvas = document.createElement("CANVAS"), ctx = canvas.getContext("2d"), w = this.width,
                    h = this.height, ctxH;
                if (data.wmObj && ("auto" !== data.width && "auto" === data.height && data.width < w ? (h = h / w * data.width, w = data.width) : "auto" === data.width && "auto" !== data.height && data.height < h ? (w = w / h * data.height, h = data.height) : "auto" !== data.width && "auto" !== data.height && data.width < w && data.height < h && (w = data.width, h = data.height)), "w" !== set.gravity && "e" !== set.gravity || data.wmObj ? (canvas.width = w, canvas.height = h, ctxH = 0) : (canvas.width = h, canvas.height = w, ctxH = -h, ctx.rotate(90 * Math.PI / 180)), "jpeg" === data.type && (ctx.fillStyle = "#ffffff", ctx.fillRect(0, 0, w, h)), ctx.drawImage(this, 0, ctxH, w, h), data.wmObj) {
                    var op = set.opacity;
                    op > 0 && op < 1 && (ctx.globalAlpha = set.opacity);
                    var wmW = set.fullOverlay ? w : data.wmObj.width, wmH = set.fullOverlay ? h : data.wmObj.height,
                        pos = set.margin, gLeft, gTop;
                    switch (set.gravity) {
                        case"nw":
                            gLeft = pos, gTop = pos;
                            break;
                        case"n":
                            gLeft = w / 2 - wmW / 2, gTop = pos;
                            break;
                        case"ne":
                            gLeft = w - wmW - pos, gTop = pos;
                            break;
                        case"w":
                            gLeft = pos, gTop = h / 2 - wmH / 2;
                            break;
                        case"e":
                            gLeft = w - wmW - pos, gTop = h / 2 - wmH / 2;
                            break;
                        case"sw":
                            gLeft = pos, gTop = h - wmH - pos;
                            break;
                        case"s":
                            gLeft = w / 2 - wmW / 2, gTop = h - wmH - pos;
                            break;
                        case"c":
                            gLeft = w / 2 - wmW / 2, gTop = (h - wmH) / 2;
                            break;
                        default:
                            gLeft = w - wmW - pos, gTop = h - wmH - pos
                    }
                    ctx.drawImage(data.wmObj, gLeft, gTop, wmW, wmH)
                }
                var dataURL = canvas.toDataURL("image/" + data.type);
                if ("function" == typeof callback) if (data.wmObj) callback(dataURL); else {
                    var wmNew = new Image;
                    wmNew.src = dataURL, callback(wmNew)
                }
                canvas = null
            }, img.onerror = function () {
                return set.fail.call(this, this.src), set.always.call(ele, this.src), !1
            }, img.src = data.imgurl
        }
    }), $.fn.watermark = function (options) {
        return this.each((function () {
            $.data(this, "plugin_watermark") || $.data(this, "plugin_watermark", new Plugin(this, options))
        }))
    }
}(jQuery, window, document);