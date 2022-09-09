import React, { useState, useContext } from "react";
import Acquila from "./acquila";
import './fret.css'
import * as Generator  from "../generator";
import { getNoteName } from "../generator";
import strumContext from "./strum-context";
import { debounce } from "underscore";

const Fret = (props) => {
    const [lastPlayed, setLastPlayed] = useState("[🎵]");
    const string = props["string"];
    const fret = props["fret"];
    const strumState = useContext(strumContext);
    console.log("state");
    console.log(strumState);
    const note = getNoteName(props["string"], props["fret"]);

    const pressedFret = () => {
        if (strumState.fretted[string].indexOf(fret) !== -1) {
            console.debug("Avoid double hammering"); //fix me
            return;
        }
        strumState.fretted[string].push(fret);
        console.log(`fretting ${fret}`);
        console.log(strumState);
        Generator.play(props["string"], props["fret"], { muted: true });
        return;
    };

    const getFretToStrum = () => {
        // closest pressed frets
        const frets = strumState.fretted[string].sort((a,b)=>b-a);
        console.log("Sorted frets");
        console.log(frets);
        if (frets.length) {
            return frets[0];
        }
        // default to an open string
        return fret;
    };

    const play = async (event) => {
        console.log(event);
        if (!props["isOpen"]) {
            return pressedFret();
        } 

        // check for fretted notes on this string
        const playFret = getFretToStrum();
        setLastPlayed(`[${Generator.getNoteName(string, playFret)}🎵]`);
        releaseFret(string, playFret);
        Generator.play(string, playFret);
    };

    const releaseFret = (string, fret) => {
        const pressedFretIndex = strumState.fretted[string].indexOf(fret);
        if (-1 !== pressedFretIndex) {
            console.debug(`Releasing fret ${fret} on string ${string}`);
            // mutation warning
            strumState.fretted[string].splice(pressedFretIndex - 1, 1);
        }
    };

    const debouncePlay = debounce(play, 200, true);

    const releaseCurrentFret = debounce(()=>releaseFret(string,fret), 200, true);
    const debounceReleaseFret = () => {
        if (props["isOpen"]) {
            return;
        }
        console.log("Debouncing release fret");
        releaseCurrentFret();
    };

    return (
        <div className={props["isOpen"] ? "fret-open" : "fret"} onClick={debouncePlay} onTouchMove={debouncePlay} onTouchEnd={debounceReleaseFret}>
            {note} {!props["isOpen"] || lastPlayed}
            <Acquila/>
        </div>
    )
}

export default Fret;
