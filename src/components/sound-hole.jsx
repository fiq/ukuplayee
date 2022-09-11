import React, {useRef, useEffect, useContext} from "react";
import "./sound-hole.css";
import Fret from "./fret"
import strumContext from "./strum-context";


const SoundHole = (props, {children}) => {

    const canvasRef = useRef(null);
    const strumState = useContext(strumContext);

    const renderOpenStrings = () => {
        const maxFrets = props.maxFrets || strumState.fretState.length();;
        const opens = [];
        for (let string = maxFrets; string > 0; string--) {
            opens.push(<Fret isOpen={true} string={string} fret={0} />)
        }
        return opens;
    }

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
    });

    return (
        <div>
            <div className="sound-hole">
                <canvas className="sound-hole-canvas" ref={canvasRef}></canvas>
                { renderOpenStrings() }
            </div>
        </div>
    );
}

export default SoundHole;