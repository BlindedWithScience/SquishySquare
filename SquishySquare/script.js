onload = () => {
	const canvas = document.getElementById("CANVAS");
	const ctx = canvas.getContext("2d");

	canvas.width = 500;
	canvas.height = 500;
	const sqSide = 50;

	ctx.fillStyle = "black";
	
	const mouse = {
                x: undefined,
                y: undefined,
                x0: undefined,
                y0: undefined
        };


	canvas.onmouseenter = (data) => {
		const clientRect = canvas.getBoundingClientRect();
		ctx.fillRect(data.clientX - clientRect.x - sqSide, data.clientY - clientRect.y - sqSide, 100, 100);
	};
	

	canvas.onmouseleave = (data) => {
		const clientRect = canvas.getBoundingClientRect();
		ctx.clearRect(0, 0, 1000, 1000);
	};


	canvas.onmousemove = (data) => {
		const clientRect = canvas.getBoundingClientRect();

		mouse.x0 = mouse.x;
		mouse.y0 = mouse.y;
		mouse.x = data.clientX - clientRect.x;
		mouse.y = data.clientY - clientRect.y;
		
		dx = mouse.x0 - mouse.x;
		dy = mouse.y0 - mouse.y;
		
		const factor = {
			yScale: 1,
			yPos: 1,
			xScale: 1,
			xPos: 1
		}

		ctx.clearRect(0, 0, 1000, 1000);
		
		if (canvas.width - mouse.x < sqSide) {	
			factor.yScale = sqSide / (canvas.width - mouse.x);
			factor.yPos = (canvas.width - mouse.x) / sqSide;
		} else if (mouse.x < sqSide) {
			factor.yScale = sqSide / mouse.x;
			factor.yPos = mouse.x / sqSide;
		};
		
		if (canvas.height - mouse.y < sqSide) {	
			factor.xScale = sqSide / (canvas.height - mouse.y);
			factor.xPos = (canvas.height - mouse.y) / sqSide;
		} else if (mouse.y < sqSide) {
			factor.xScale = sqSide / mouse.y;
			factor.xPos = mouse.y / sqSide;
		};
		
		if (factor.xScale != 1 && factor.yScale != 1) {
			factor.yScale = 1;
			factor.yPos = 1;
			factor.xScale = 1;
			factor.xPos = 1;
		};
		

		ctx.setTransform(factor.xScale, 0, 0, factor.yScale, 0, 0);
		ctx.fillRect(mouse.x * factor.xPos - sqSide, mouse.y * factor.yPos - sqSide, sqSide * 2, sqSide * 2);
	};
}
