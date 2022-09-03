import React, {useRef, useEffect} from "react";

const SoundHole = () => {

    const canvasRef = useRef(null);

    useEffect((props)=> {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "black";
        ctx.beginPath();
        const centreX = canvas.width/2;
        const centreY = canvas.height/2;
        ctx.arc(centreX, centreY, 50, 0, 2 * Math.PI);
        ctx.stroke();         
    })

    return (
        <canvas ref={canvasRef}></canvas>
    );

}

export default SoundHole;