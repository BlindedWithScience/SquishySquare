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


	

	canvas.onmousemove = (data) => {
		const clientRect = canvas.getBoundingClientRect();

		ctx.setTransform();

		mouse.x0 = mouse.x;
		mouse.y0 = mouse.y;
		mouse.x = data.clientX - clientRect.x;
		mouse.y = data.clientY - clientRect.y;
		
		let x = mouse.x;
		let y = mouse.y;

		let xScale = 1;
		let yScale = 1;

		ctx.clearRect(0, 0, 1000, 1000);
		

		if (canvas.width - mouse.x < sqSide) {	
			yScale = sqSide / (canvas.width - mouse.x);
			xScale = 1 / yScale;

		} else if (mouse.x < sqSide) {
			yScale = sqSide / mouse.x;
			xScale = 1 / yScale;
		} else if (canvas.height - mouse.y < sqSide) {	

			xScale = sqSide / (canvas.height - mouse.y);
			yScale = 1 / xScale;

		} else if (mouse.y < sqSide) {

			xScale = sqSide / mouse.y;
			yScale = 1 / xScale;

		};

		ctx.setTransform(xScale, 0, 0, yScale, mouse.x, mouse.y);
		ctx.fillRect(-sqSide, -sqSide, sqSide * 2, sqSide * 2);
	};
}

