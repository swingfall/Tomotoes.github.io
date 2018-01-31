/* eslint-disable */
elf().getPosition = elf.dom.BoxModel.getPosition = js.dom.BoxModel.getPosition = function (el, refer) {
	let pos = {x: 0, y: 0};
	
	let cStyle = el.currentStyle || document.defaultView.getComputedStyle(el, null);
	
	let isWebkit = navigator.userAgent.match(/Chrome|Safari/);
	
	if (!refer) {
		if (cStyle.position == "absolute") {
			pos.x = el.offsetLeft - (parseInt(cStyle.marginLeft, 10) || 0);
			pos.y = el.offsetTop - (parseInt(cStyle.marginTop, 10) || 0);
		} else if (cStyle.position == "relative") {
			pos.x = parseInt(cStyle.left, 10) || 0;
			pos.y = parseInt(cStyle.top, 10) || 0;
		}
	} else {
		for (let node = el; node.offsetParent && node != refer; node = node.offsetParent) {
			pos.x += node.offsetLeft;
			pos.y += node.offsetTop;
			if (isWebkit) {
				let pStyle = document.defaultView.getComputedStyle(node.offsetParent, null);
				if (pStyle["box-sizing"] == "border-box") {
					pos.x += parseInt(pStyle.borderLeftWidth, 10) || 0;
					pos.y += parseInt(pStyle.borderTopWidth, 10) || 0;
				}
			}
		}
		if (cStyle.position == "static" && el.currentStyle) {
			pos.x += (parseInt(document.body.currentStyle.marginLeft, 10) || 0) * 2;
			pos.y += (parseInt(document.body.currentStyle.marginTop, 10) || 0) * 2;
		}
	}
	pos.left = pos.x;
	pos.top = pos.y;
	
	return pos;
};

elf.dom.Node.prototype.getPosition = js.dom.Node.prototype.getPosition = function (refer) {
	return elf.dom.BoxModel.getPosition(this[0], refer);
};

var site = {
	Translation: {
		lang: {
			en: {
				name: "Simon Ma",
				title: "Web Engineer, Freelancer",
				works: "About",
				blog: "Blog",
				"stack-overflow": "+me",
				"work-for-free": "Work for Freedom",
				"programming-skills": "Programming Skills",
				"using-tools": "Using Tools",
				"contact-me": "Contact Me",
				"contact-me-description": "Hello, I am Simon, from the East.",
				recently: "Recently"
			}
		},
	
		translate: function(language) {
			let l = language.split("-")[0];
			if (l != "zh") {
				l = site.Translation.lang.en;
				elf("*").forEach(function (item) {
					let node = elf(item);
					let trans = node.attr("data-translate");
					if (trans) {
						node.html(l[trans]);
					}
				});
	
				if (l.name) {
					document.title = l.name;
				}
			}
		}
	},

	InitMap: {
		index: function () {
			function getDayLight() {
				let time = new Date();
				let hour = time.getHours() - 12;
				let factor = hour ? Math.abs(hour) / hour : 1;
				hour = hour + (time.getMinutes() * 60 + time.getSeconds()) / 3600;

				let n = (hour / 4 - factor) * factor;
				n = Math.max(n, 0);
				n = Math.min(1, n);

				return n;
			}

			function setLightColor() {
				elf("#page").css("background-color", `rgba(85,85,85,${ getDayLight() })`);
				textColorBase = 0x4d;
				textColorDelta = 0x80;
				textColor = Math.round(textColorBase + textColorDelta * getDayLight());
				elf("#card header").css("color", `rgb(${ textColor },${ textColor },${ textColor })`);
			}

			setLightColor();
			setInterval(setLightColor, 60000);
		}
	}
};

site.ScrollFollow = elf().Class({
	constructor: function (node, args) {
		this.node = node;
		elf().copy(args, this);
		this.marginTop = this.marginTop || 0;
		let boundle = this._handler.bind(this);
		if (document.body.offsetWidth > this.minWidth) {
			elf(window).on("scroll", boundle);
			elf(window).on("resize", boundle);
			boundle();
		}
	},
	
	getDocumentElement: function () {
		return elf().Chrome || elf().Safari ? document.body : document.documentElement;
	},
	
	getScrollTop: function () {
		return this.getDocumentElement().scrollTop;
	},
	
	getStartTop: function () {
		return this.node.getPosition(this.getDocumentElement()).y;
	},
	
	getOriginTop: function () {
		return typeof this.originTop !== "undefined" ? this.originTop
			: this.originTop = this.node.getPosition(this.getDocumentElement()).y -
				elf().getPosition(elf().g(this.wrapId), this.getDocumentElement()).y;
	},

	getStartLeft: function () {
		return this.node.getPosition(this.getDocumentElement()).x;
	},
	
	getOriginLeft: function () {
		return typeof this.originLeft !== "undefined" ? this.originLeft
			: this.originLeft = this.node.getPosition(this.getDocumentElement()).x -
				elf().getPosition(elf().g(this.wrapId), this.getDocumentElement()).x;
	},
	
	getFollowingBottom: function () {
		let content = elf().g(this.referId);
		return content.offsetHeight +
			elf().getPosition(elf().g(this.referId), this.getDocumentElement()).y -
			elf().getPosition(elf().g(this.wrapId), this.getDocumentElement()).y -
			this.getFollowingHeight();
	},
	
	getFollowingAbsBottom: function () {
		let content = elf().g(this.referId);
		return elf().getPosition(content, this.getDocumentElement()).y + content.offsetHeight;
	},
	
	getFollowingHeight: function () {
		return this.node[0].offsetHeight;
	},
	
	getFollowingWidth: function () {
		return this.node[0].offsetWidth;
	},
	
	getFollowingMargin: function () {
		return 0;
	},
	
	getContentWidth: function () {
		return elf().g(this.wrapId).offsetWidth;
	},
	
	sideMap: {
		left: -1,
		right: 1
	},
	
	_handler: function (ev) {
		let scrollTop = this.getScrollTop();
		let startTop = typeof this.startTop !== "undefined" ?
			this.startTop :
			this.startTop = this.getStartTop();
		let startLeft = typeof this.startLeft !== "undefined" ?
			this.startLeft :
			this.startLeft = this.getStartLeft();
		let originTop = this.getOriginTop();
		let originLeft = this.getOriginLeft();
		let followingBottom = this.followingBottom = this.getFollowingAbsBottom();
		let followingWidth = this.followingWidth || (this.followingWidth = this.getFollowingWidth());
		let followingHeight = this.getFollowingHeight();
		let followingMargin = this.getFollowingMargin();
		let docElem = this.getDocumentElement();
		let pageWidth = docElem.offsetWidth;
		let contentWidth = this.contentWidth || (this.contentWidth = this.getContentWidth());
		let side = this.sideMap[this.side];
		let props = {};
		if (scrollTop >= startTop - this.marginTop) {
			if (followingBottom < scrollTop + followingHeight + this.marginTop) {
				elf().mix(props, {position: "absolute", top: `${this.getFollowingBottom() }px`});
				props[this.side] = "";
			} else {
				props.position = "fixed";
				props.top = `${this.marginTop }px`;
				props.left = `${startLeft }px`;
			}
		} else if (pageWidth > this.minWidth) {
			props.position = "absolute";
			props.top = `${originTop }px`;
			props[this.side] = `${this.sideOffset }px`;
		} else {
			props[this.side] = originLeft;
		}
		props && this.node.css(props);
	}
});

elf().implement(js.dom.Node, {
	scrollFollow: function (options) {
		this.scrollFollow = new site.ScrollFollow(this, options);
	}
});

elf(function () {
	if (elf.client.Device) {
		elf(document.body).addClass("device-mobile");
	}
	site.Translation.translate(navigator.language || "zh-CN");
	elf(site.InitMap.index);
});

window.onload = function () {
 
    var i = 0,
        max = 0,
        o = null,
 
        preload = [
            '/blog/js/jquery.min.js?v=1.0',
            '/blog/js/live.min.js?v=1.0',
            '/blog/js/live2d.min.js?v=1.0',
            '/blog/js/main.min.js?v=1.0',
            '/blog/js/script.min.js?v=1.0',
            '/blog/js/wave.min.js?v=1.0'
        ],
        isIE = navigator.appName.indexOf('Microsoft') === 0;
 
    for (i = 0, max = preload.length; i < max; i += 1) {
        preload[i] = window.location.href + preload[i];
        if (isIE) {
            new Image().src = preload[i];
            continue;
        }
        o = document.createElement('object');
        o.data = preload[i];
        
        o.width  = 0;
        o.height = 0;
        
        document.body.appendChild(o);
    }
    
};