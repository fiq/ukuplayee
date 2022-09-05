import React, { useContext } from "react";
import Acquila from "./acquila";
import './fret.css'
import * as Generator  from "../generator";
import { getNoteName } from "../generator";
import strumContext from "./strum-context";


const Fret = (props) => {
    const string = props["string"];
    const fret = props["fret"];
    const strumState = useContext(strumContext);
    console.log("state");
    console.log(strumState);
    const note = getNoteName(props["string"], props["fret"]);

    const play = (event) => {
        console.log(event);
        if (!props["isOpen"]) {
            strumState.fretted[string].push(fret);
            console.log(`fretting ${fret}`);
            console.log(strumState);
            Generator.play(props["string"], props["fret"], {muted:true});
            return;
        } 
        
        Generator.play(props["string"], props["fret"]);
    };

    const release =  (event) => {
        console.log(event);
        if (!props["isOpen"]) {
            const pressedFretIndex = strumState.fretted[string].indexOf(fret);
            if (-1 !== pressedFretIndex) {
                // mutation warning
                strumState.fretted[string].splice(pressedFretIndex-1, 1);
            }
        }
    };

    return (
        <div className={props["isOpen"] ? "fret-open" : "fret"} onClick={play} onTouchMove={play} onTouchEnd={release}>
            {note}
            <Acquila/>
        </div>
    )
}

export default Fret;