import React, { useState, useContext } from "react";
import Acquila from "./acquila";
import './fret.css'
import * as Generator  from "../generator";
import { getNoteName } from "../generator";
import strumContext from "./strum-context";
import { debounce } from "underscore";

// FIXME - add a string parent to reduce complexity
const Fret = (props) => {
    const [lastPlayed, setLastPlayed] = useState("[🎵]");
    const string = props["string"];
    const fret = props["fret"];
    const strumState = useContext(strumContext);
    const note = getNoteName(props["string"], props["fret"]);

    const pressedFret = debounce(() => {
        if (-1 === strumState.fretted[string].indexOf(fret)) {
            strumState.fretted[string].push(fret);
            console.debug(`fretting ${fret}`);
            console.debug(strumState);
            Generator.play(props["string"], props["fret"], { muted: true });
            setTimeout(releaseCurrentFret, 1000);
        }
    }, 200);

    const getFretToStrum = () => {
        // closest pressed frets
        const frets = strumState.fretted[string].sort((a,b)=>b-a);
        console.debug("Sorted frets");
        console.debug(frets);
        if (frets.length) {
            return frets[0];
        }
        // default to an open string
        return fret;
    };

    const play = async (event) => {
        console.debug(event);
        if (!props["isOpen"]) {
            return pressedFret();
        } 

        // check for fretted notes on this string
        const playFret = getFretToStrum();
        setLastPlayed(`[${Generator.getNoteName(string, playFret)}🎵]`);
        Generator.play(string, playFret);
    };

    const releaseFret = (string, fret) => {
        console.log("releasing string")
        const pressedFretIndex = strumState.fretted[string].indexOf(fret);
        if (-1 !== pressedFretIndex) {
            console.debug(`Releasing fret ${fret} on string ${string}`);
            // mutation warning
            strumState.fretted[string].splice(pressedFretIndex - 1, 1);
        }
    };

    const debouncePlay = debounce(play, 5, true);

    const releaseCurrentFret = debounce(()=>releaseFret(string,fret), 250, true);
    const debounceReleaseFret = () => {
        if (props["isOpen"]) {
            return;
        }
        releaseCurrentFret();
    };

    return (
        <div className={props["isOpen"] ? "fret-open" : "fret"} onClick={debouncePlay} onTouchStart={debouncePlay} onTouchMove={debouncePlay} onTouchEnd={debounceReleaseFret} onTouchCancel={debounceReleaseFret}>
            {note} {!props["isOpen"] || lastPlayed}
            <Acquila/>
        </div>
    )
}

export default Fret;
