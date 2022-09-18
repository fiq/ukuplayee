import React, { useRef, useEffect } from "react";
import "./acquila.css";

const Acquila = (playing) => {
    const acquilaRef = useRef("parent");
    const canvasRef = useRef(null);
    console.log("acquila");

    useEffect((props) => {
        const canvas = canvasRef.current;
        const parent = acquilaRef.current;

        const ctx = canvas.getContext('2d');
        canvas.height = parent.scrollHeight;
        console.log(parent);
        console.debug(parent.height)
        ctx.fillStyle = "black";
        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvas.height);
        ctx.lineWidth = 20;
        ctx.stroke();
    });
    return (
        <div className="acquila" ref={acquilaRef}>
            <canvas height="100%" className="string-canvas" ref={canvasRef}>
            </canvas>
        </div>
    );
};

export default Acquila;
