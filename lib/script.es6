class TeachPen {
    constructor(filename) {
        this._filename = filename;
        this._markdown = "";
        this._currentSlide = this.initPage();

        this.initEvents();
        this.getSlide();
    }

    initPage() {
        let url = location.href;
        let regQ = /[\?\&]page\=(\w*)\&?/;
        let regex = new RegExp(regQ);
        let results = regex.exec(url);
        return results == null ? 1 : results[1];
    }

    initEvents() {
        document.addEventListener('keyup', (evt) => {
            switch (evt.keyCode) {
                case 40:
                    this._currentSlide++;
                    this.getSlide();
                    break;
                case 38:
                    this._currentSlide--;
                    this.getSlide();
                    break;

            }
        });
    }

    getSlide() {
        let d = this.load()
                    .then(data => {
                        this._markdown = data.split("***")
                        this.parse()
                            .then(parsed => {
                                document.body.innerHTML = parsed.join("");

                                var cells = document.getElementsByClassName("code");
                                Array.prototype.forEach.call(cells, (cell) => {
                                    let txt = cell.innerText.trim();
                                    let mode = cell.className.replace('code','').trim();
                                    mode = (mode == "html" ? "xml" : mode);

                                    cell.innerHTML = "";
                                    let cdmr = CodeMirror(cell, {
                                        mode: mode,
                                        value: txt,
                                        theme: "material",
                                        scrollbarStyle: "null"
                                    });                                    
                                });

                                var url = [location.protocol, '//', location.host, location.pathname].join('');
                                history.pushState(null,null,url+"?page="+this._currentSlide);

                            });
                    })
                    .catch(reason => {console.error(reason)})

    }

    load() {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.open('GET', this._filename, true);
            req.send();

            req.onload = () => {
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

    parse() {
        return new Promise((resolve, reject) => {

            let paragraphs = this._markdown[this._currentSlide].split(/\n\s+/);

            let result = paragraphs.map( (p) => {
                [
                    [/\</g,"&lt;"],
                    [/\>/g,"&gt;"],
                    [/##red (.*)/,"<h2 style='background-color: #f00'>$1</h2>"],
                    [/## (.*)/,"<h2>$1</h2>"],
                    [/# (.*)/,"<h1>$1</h1>"],
                    [/\$\[fakebody\]\((.*?)\)/g, "<div id='fakebody'>$1</div>"],
                    [/\$\[hiddenrun\]/g, "<div id='hiddenrun'></div>"],
                    [/\!\!\[(.*?)\]\((.*?)\)/g,"<div class='coverImage' style='background-image: url($2)'></div>"],
                    [/\!\[(.*?)\]\((.*?)\)/g,"<div class='imgContainer'><img src='$2' style='height:$1px'></div>"],
                    [/\[(.*?)\]\((.*?)\)/g,"<a href='$2' target='_blank'>$1</a>"],
                    [/\`\`\`(.+)/,"<div class='code $1'>"],
                    [/\`\`\`/,"</div>"],
                    [/\*\*(.*?)\*\*/g,"<strong>$1</strong>"],
                    [/\*(.*?)\*/g,"<em>$1</em>"],
                    [/\~\~(.*?)\~\~/g,"<span class='faded'>$1</span>"],

                ].forEach((regex) => {
                    p = p.trim().replace(regex[0],regex[1]);
                });

                if (p.charAt(0) !== '<') {
                    p = "<p>"+p+"</p>";
                    p = p.replace(/\n/g,"<br>");
                }

                return p;
            });

            resolve(result);
        });
    }
}

let t = new TeachPen("dist/slides1.md");