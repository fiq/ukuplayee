import React, {useRef, useEffect} from "react";
import "./sound-hole.css";
const SoundHole = ({children}) => {

    const canvasRef = useRef(null);

    useEffect((props)=> {
        console.log(children);
        
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "black";
        ctx.beginPath();
        const centreX = canvas.width/2;
        const centreY = canvas.height/2;
        ctx.arc(centreX, centreY, 100, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();         
    })

    return (
        <div className="sound-hole">
            <canvas className="sound-hole-canvas" ref={canvasRef}></canvas>
            {children}
        </div>
    );

}

export default SoundHole;