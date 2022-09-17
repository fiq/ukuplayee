import React, {useRef, useEffect} from "react";
import "./acquila.css";

const Acquila = (playing) => {
    const canvasRef = useRef(null);
    console.log("acquila");

    useEffect((props) => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "black";
        const centreX = canvas.width/2;
        ctx.moveTo(centreX, 0)
        ctx.lineTo(centreX, canvas.height);
        ctx.stroke();         
    });
    return (
        <div className="acquila">
	    <canvas ref={canvasRef}>
		
	    </canvas>
	</div>
    );
};

export default Acquila;
