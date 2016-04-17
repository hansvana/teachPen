class TeachPen {
    constructor(filename) {
        this._filename = filename;
        this._markdown = "";
        this._currentSlide = 1;
        this.initEvents();
        this.getSlide();
    }

    initEvents() {
        document.addEventListener('keyup', (evt) => {
           console.log(evt.keyCode);
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
                    [/# (.*)/,"<h1>$1</h1>"],
                    [/\[(.*?)\]\((.*?)\)/g,"<a href='$2' target='_blank'>$1</a>"],
                    [/\`\`\`(.+)/,"<div class='code $1'>"],
                    [/\`\`\`/,"</div>"],
                    [/\*\*(.*?)\*\*/g,"<strong>$1</strong>"],
                    [/\*(.*?)\*/g,"<em>$1</em>"]

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