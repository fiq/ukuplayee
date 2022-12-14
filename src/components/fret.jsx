import React, { useState, useContext } from "react";
import Acquila from "./acquila";
import './fret.css'
import * as Generator from "../generator";
import { getNoteName } from "../generator";
import strumContext from "./strum-context";
import { debounce } from "underscore";

// FIXME - Major refactor required - split out string interactions into a non-display component
const Fret = (props) => {
    const [lastPlayed, setLastPlayed] = useState("[🎵]");
    const [isPlaying, setPlaying] = useState(false);
    const [isPressed, setPressed] = useState(false);

    const string = props["string"];
    const fret = props["fret"];
    const strumState = useContext(strumContext);
    const note = getNoteName(props["string"], props["fret"]);

    const getFormattedNote = (displayString, displayFret) => {
        return `[${Generator.getNoteName(displayString, displayFret)}🎵]`;
    };

    const debouncedPlay = debounce(async (string, fret, opts={}) => {
        setPlaying(true);
        await Generator.play(string, fret, opts);
        setTimeout(()=>{
            setPlaying(false);
            setPressed(false);
        }, 300);
        console.debug(`Completed strumming ${string} on ${note}`);        
    }, 5);

    const pressFret = async () => {
        setPressed(true);
        strumState.fretState[string-1][fret] = 1;
        console.debug(strumState);
        console.log(`Setting string ${string} at fret ${fret}`);

        if ([!props.isOpen]) {
            console.debug(`fretting ${fret}`);
            debouncedPlay(props["string"], props["fret"], { muted: true });
        }
    };

    const getFretToStrum = () => {
        // closest pressed frets (optimise if working with longer necks)
        const lowestFret = strumState.fretState[string-1].slice().reverse().indexOf(1);
        if (-1 === lowestFret) {
            console.debug(`Can not find frets to interact with on ${string}`);
            return;
        }
        return strumState.fretState.length - lowestFret; // caller to check for -1
    };

    const play = async (event) => {
        console.log(event);
        await pressFret();

        if (!props.isOpen) {
            return;
        } 

        // check for fretted notes on this string
        const playFret = getFretToStrum();

        console.log("Got fret:"+playFret);
        // bail early if there are no registered strum events
        if (playFret === -1) {
            return;
        }

        setLastPlayed(getFormattedNote(string, playFret));
        debouncedPlay(string, playFret);
    };

    const releaseFret = (string, fret) => {
        setPressed(false);
        strumState.fretState[string-1][fret] = 0;
        setLastPlayed(getFormattedNote(string, 0));
        console.debug(`Released fret ${fret} on string ${string}`);
        console.debug(strumContext.fretState);
    };


    const strum = (e) => {
        e.preventDefault();
        const touched = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        touched.click();
    };

    const debouncePlay = debounce(play, props.isOpen? 5 : 400, true);

    const releaseCurrentFret = debounce(async () => releaseFret(string, fret), 10, true);
    const debounceReleaseFret = () => {
        releaseCurrentFret();
        setTimeout(()=>setPressed(false), 500);
    };

    return (
        <div id={`fret-${fret}-string-${string}`} className={props.isOpen ? "fret-open" : "fret"} onClick={debouncePlay} onTouchStart={debouncePlay} onTouchMove={strum} onTouchEnd={debounceReleaseFret} onTouchCancel={debounceReleaseFret} fret={fret} string={string}>
            {props.isOpen ? <p className="note-strum">{note} {lastPlayed}</p> : <p className="note-fret">{note}</p>}
            <Acquila pressed={isPressed} playing={isPlaying}/>
        </div>
    )
}

export default Fret;
