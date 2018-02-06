{
	const DOM = {};
	DOM.intro = document.querySelector(".content--intro");
	DOM.shape = DOM.intro.querySelector("svg.shape");
	DOM.path = DOM.shape.querySelector("path");
	DOM.enter = document.querySelector(".enter");
	charming(DOM.enter);
	DOM.enterLetters = Array.from(DOM.enter.querySelectorAll("span"));
	// Set the SVG transform origin.
	DOM.shape.style.transformOrigin = "50% 0%";

	const init = () => {
		imagesLoaded(document.body, {background: true} , () => document.body.classList.remove("loading"));
		DOM.enter.addEventListener("click", navigate);
		DOM.enter.addEventListener("touchenter", navigate);
		DOM.enter.addEventListener("mouseenter", enterHoverInFn);
		DOM.enter.addEventListener("mouseleave", enterHoverOutFn);
	};

	let loaded;
	const navigate = () => {
		if ( loaded ) {return;}
		loaded = true;

		anime({
			targets: DOM.intro,
			duration: 1100,
			easing: "easeInOutSine",
			translateY: "-200vh"
		});
		
		anime({
			targets: DOM.shape,
			scaleY: [
				{value:[0.8,1.8],duration: 550,easing: "easeInQuad"},
				{value:1,duration: 550,easing: "easeOutQuad"}
			]
		});

		anime({
			targets: DOM.path,
			duration: 1100,
			easing: "easeOutQuad",
			d: DOM.path.getAttribute("pathdata:id")
		});
	};

	let isActive;
	let enterTimeout;

	const enterHoverInFn = () => enterTimeout = setTimeout(() => {
		isActive = true;
		anime.remove(DOM.enterLetters);
		anime({
			targets: DOM.enterLetters,
			delay: (t,i) => i * 15,
			translateY: [
				{value: 10, duration: 150, easing: "easeInQuad"},
				{value: [-10,0], duration: 150, easing: "easeOutQuad"}
			],
			opacity: [
				{value: 0, duration: 150, easing: "linear"},
				{value: 1, duration: 150, easing: "linear"}
			],
			color: {
				value: "#ff963b",
				duration: 1,
				delay: (t,i,l) => i * 15 + 150
			}
		});
	}, 50);

	const enterHoverOutFn = () => {
		clearTimeout(enterTimeout);
		if( !isActive ) {return;}
		isActive = false;

		anime.remove(DOM.enterLetters);
		anime({
			targets: DOM.enterLetters,
			delay: (t,i,l) => (l - i - 1) * 15,
			translateY: [
				{value: 10, duration: 150, easing: "easeInQuad"},
				{value: [-10,0], duration: 150, easing: "easeOutQuad"}
			],
			opacity: [
				{value: 0, duration: 150, easing: "linear"},
				{value: 1, duration: 150, easing: "linear"}
			],
			color: {
				value: "#ffffff",
				duration: 1,
				delay: (t,i,l) => (l - i - 1) * 15 + 150
			}
		});
	};

	init();
}

let rid = null;
    let frames = 0;
    let index = 0;
    let fontSize = 50;

    let lines = [];
    let points = [];

    let speed = 11;

    const ctx = canvas.getContext("2d");
    const btx = buffer.getContext("2d");

    let bw = buffer.width = fontSize;
    let bh = buffer.height = fontSize;
    let cw = canvas.width = window.innerWidth;
    let ch = canvas.height = 300;
    btx.fillStyle = ctx.fillStyle = "#fff";
    btx.font = ctx.font = `${fontSize }px Courier New`;

    let text = [
        "你好，我叫 Simon，来自北方",
        "我的目标是成为一位全栈工程师",
        "并正在为此而努力",
        "我笃爱开源",
        "希望能为开源社区贡献自己的一份力量",
        "我崇尚自由",
        "讨厌形式主义和经验主义",
        "我不善交际",
        "手指是我最忠实的朋友",
        "这就是我",
        "请叫我 Simon",
        ":smile: "
    ];

    class Line {
        constructor(text) {
            this.text = text;
            this.width = ctx.measureText(this.text).width;
            this.startingPoint = -this.width / 2;
            this.letters = [];

            this.lettersRy();
        }

        lettersRy() {
            for (let i = 0; i < this.text.length; i++) {
                let letter = this.text[i];
                let _start =
                    this.startingPoint + ctx.measureText(this.text.substring(0, i)).width;
                let pos = { x: _start, y: (ch - fontSize) / 2 };
                this.letters.push(new Letter(i, pos, letter));
            }
        }
    }

    class Letter {
        constructor(i, pos, letter) {
            this.index = index;
            this.letter = letter;
            this.pos = pos;
            this.points = [];
            this.addToPointsRy();
        }
        addToPointsRy() {
            btx.clearRect(0, 0, bw, bh);
            btx.fillText(this.letter, 2, bh - 5);
            let imgData = btx.getImageData(0, 0, bw, bh);
            let pixels = imgData.data;

            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i] == 255) {
                    let x = 0.25 * i % bw;
                    let y = ~~(0.25 * i / bw);
                    this.points.push(new Particle(x + this.pos.x, y + this.pos.y));
                }
            }
        }
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.pos = { x, y };
            this.pn = {
                // positive or negative
                x: Math.random() > 0.2 ? 1 : -1,
                y: Math.random() > 0.2 ? -1 : 1
            };
            this.vel = {
                x: this.pn.x * (this.pn.x + Math.random() * 10) / 90,
                y: this.pn.y * (this.pn.y + Math.random() * 10) / 90,
                alp: (0.1 + Math.random()) / 60
            };
            this.alp = 1;
        }

        draw() {
            ctx.fillStyle = `rgba(255,255,255,${ this.alp })`;
            ctx.beginPath();
            ctx.fillRect(this.pos.x, this.pos.y, 1, 1);
        }

        update() {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
            this.alp -= this.vel.alp;
        }
    }

    for (let i = 0; i < text.length; i++) {
        lines.push(new Line(text[i]));
    }

    let numLine = 0;
    let line = lines[numLine];

    ctx.translate(cw / 2, 0);

    function Frame() {
        rid = window.requestAnimationFrame(Frame);

        ctx.clearRect(-cw, -ch, 2 * cw, 2 * ch);
        points.map((p, i) => {
            p.update();
            p.draw();
            if (p.alp <= 0) {
                points.splice(i, 1);
            }
        });

        if (frames % speed == 0) {
            line.letters[index].points.map(p => {
                p.pos = { x: p.x, y: p.y };
                p.alp = 1;
            });
            points = points.concat(line.letters[index].points);
            index++;
        }

        if (index == line.letters.length) {
            numLine++;
            line = lines[numLine % text.length];
            index = 0;
            frames = 0;
        }
        frames++;
    }

    function Init() {
        cw = canvas.width = window.innerWidth;
        ctx.translate(cw / 2, 0);
        if (rid) {
            window.cancelAnimationFrame(rid);
            rid = null;
        }
        Frame();
    }

    setTimeout(function() {
        Init();
        window.addEventListener("resize", Init, false);
    }, 15);