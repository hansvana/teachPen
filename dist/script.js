(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TeachPen = function () {
    function TeachPen(filename) {
        _classCallCheck(this, TeachPen);

        this._filename = filename;
        this._markdown = "";
        this._currentSlide = 1;
        this.initEvents();
        this.getSlide();
    }

    _createClass(TeachPen, [{
        key: "initEvents",
        value: function initEvents() {
            var _this = this;

            document.addEventListener('keyup', function (evt) {
                console.log(evt.keyCode);
                switch (evt.keyCode) {
                    case 40:
                        _this._currentSlide++;
                        _this.getSlide();
                        break;
                    case 38:
                        _this._currentSlide--;
                        _this.getSlide();
                        break;

                }
            });
        }
    }, {
        key: "getSlide",
        value: function getSlide() {
            var _this2 = this;

            var d = this.load().then(function (data) {
                _this2._markdown = data.split("***");
                _this2.parse().then(function (parsed) {
                    document.body.innerHTML = parsed.join("");

                    var cells = document.getElementsByClassName("code");
                    Array.prototype.forEach.call(cells, function (cell) {
                        var txt = cell.innerText.trim();
                        var mode = cell.className.replace('code', '').trim();
                        mode = mode == "html" ? "xml" : mode;

                        cell.innerHTML = "";
                        var cdmr = CodeMirror(cell, {
                            mode: mode,
                            value: txt,
                            theme: "material",
                            scrollbarStyle: "null"
                        });
                    });
                });
            }).catch(function (reason) {
                console.error(reason);
            });
        }
    }, {
        key: "load",
        value: function load() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var req = new XMLHttpRequest();
                req.open('GET', _this3._filename, true);
                req.send();

                req.onload = function () {
                    if (req.status >= 200 && req.status < 300) {
                        resolve(req.response);
                    } else {
                        reject(req.statusText);
                    }
                };
                req.onerror = function () {
                    reject(this.statusText);
                };
            });
        }
    }, {
        key: "parse",
        value: function parse() {
            var _this4 = this;

            return new Promise(function (resolve, reject) {

                var paragraphs = _this4._markdown[_this4._currentSlide].split(/\n\s+/);

                var result = paragraphs.map(function (p) {
                    [[/\</g, "&lt;"], [/\>/g, "&gt;"], [/# (.*)/, "<h1>$1</h1>"], [/\!\!\[(.*?)\]\((.*?)\)/g, "<div class='coverImage' style='background-image: url($2)'></div>"], [/\!\[(.*?)\]\((.*?)\)/g, "<div class='imgContainer'><img src='$2' alt='$1'></div>"], [/\[(.*?)\]\((.*?)\)/g, "<a href='$2' target='_blank'>$1</a>"], [/\`\`\`(.+)/, "<div class='code $1'>"], [/\`\`\`/, "</div>"], [/\*\*(.*?)\*\*/g, "<strong>$1</strong>"], [/\*(.*?)\*/g, "<em>$1</em>"], [/\~\~(.*?)\~\~/g, "<span class='faded'>$1</span>"]].forEach(function (regex) {
                        p = p.trim().replace(regex[0], regex[1]);
                    });

                    if (p.charAt(0) !== '<') {
                        p = "<p>" + p + "</p>";
                        p = p.replace(/\n/g, "<br>");
                    }

                    return p;
                });

                resolve(result);
            });
        }
    }]);

    return TeachPen;
}();

var t = new TeachPen("dist/slides1.md");

},{}]},{},[1]);
