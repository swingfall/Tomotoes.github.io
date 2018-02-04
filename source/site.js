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
	$("#page").css("background-color", `rgba(85,85,85,${ getDayLight() })`);
	textColorBase = 0x4d;
	textColorDelta = 0x80;
	textColor = Math.round(textColorBase + textColorDelta * getDayLight());
	$("#card header").css("color", `rgb(${ textColor },${ textColor },${ textColor })`);
}

let fileConut = 0;
const fileMax = 8;

function getHitokoto() {
	if (localStorage.getItem("motto")) {
		return;
	}
	try {
		$.ajax({
			type: "GET",
			url: "https://sslapi.hitokoto.cn/",
			dataType: "json",
			timeout: 2500,
			success: function (data) {
				if (data.hitokoto.length > 12) {
					fileConut++;
					if (fileConut > fileMax) {
						localStorage.setItem("motto", "为了正义！");
					} else {
						getHitokoto();
					}
				} else {
					localStorage.setItem("motto", data.hitokoto);
				}
			},
			error: function () {
				localStorage.setItem("motto", "生活不止眼前的苟且");
			}
		});
	} catch (e) {
		localStorage.setItem("motto", "生活不止眼前的苟且");
	}

}

function preLoad() {
	const _iframe = document.createElement('iframe');
	_iframe.style.display = 'none';
	_iframe.setAttribute('src', "https://tomotoes.com/blog");
	document.body.appendChild(_iframe);

	const I = new Image();
	I.src = "https://tomotoes.com/images/live2d/" + Number(localStorage.getItem("model")) + ".png";
	I.style.display = "none";
	document.body.appendChild(I);

}

window.onload = function () {

	setLightColor();
	setInterval(setLightColor, 60000);

	preLoad();

	getHitokoto();

}