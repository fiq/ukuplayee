import * as Tone from "tone";
//FIX ME - GCEA to be calculated based on tuning
const fretboard = [
    ["A4", "A#4", "B4", "C4", "C#4", "D4"],
    ["E4", "F4", "F#4", "G4", "G#4", "A5"],
    ["C4", "C#4", "D4", "D#4", "E4", "F4"],
    ["G4", "G#4", "A4", "A#4", "B4", "C4"]
];

export const play = (string, fret) => {
    console.log(`playing ${string} at fred ${fret}`);
    Tone.start();
    const synthPluck = new Tone.PolySynth().toDestination();
    const synth = new Tone.PluckSynth().toDestination();
    //synthPluck.triggerAttackRelease(fretboard[string-1][fret], "8n");
    synthPluck.triggerAttackRelease(fretboard[string-1][fret], "0.5");

    synth.triggerAttack(fretboard[string-1][fret], Tone.now());
    synth.triggerRelease(Tone.now() + 0.5);
}
