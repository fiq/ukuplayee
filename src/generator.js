import * as Tone from "tone";
//FIX ME - GCEA to be calculated based on tuning
const fretboard = [
    ["A4", "A#4", "B4", "C4", "C#4", "D4"],
    ["E4", "F4", "F#4", "G4", "G#4", "A5"],
    ["C4", "C#4", "D4", "D#4", "E4", "F4"],
    ["G4", "G#4", "A4", "A#4", "B4", "C4"]
];


const buildSampler = (note) => new Tone.Sampler({
    urls: {
        [note]: `/samples/${note}.mp3`,
    }
}).toDestination();


const stringSamplers = [
    buildSampler("A4"),
    buildSampler("E4"),
    buildSampler("C4"),
    buildSampler("G4"),
];

export const getNoteName = (string, fret) => fretboard[string-1][fret];

export const play = async (string, fret, args={})=> {
    console.log(`playing sample of ${string} at fret ${fret}`);
    await Tone.start();
    const pluck = new Tone.PluckSynth().toDestination();
    const note = getNoteName(string, fret)
    // FIXME: Unternary 
    const duration = args.muted ? "32n" : "1n";

    stringSamplers[string-1].triggerAttackRelease(note, duration);

    if (!args.muted) {
        pluck.triggerAttack(note, Tone.now());
        pluck.triggerRelease(Tone.now() + 1);
    }
}


export const playSynth = (string, fret) => {
    console.log(`playing ${string} at fred ${fret}`);
    Tone.start();
    const synthPluck = new Tone.PolySynth().toDestination();
    const synth = new Tone.PluckSynth().toDestination();
    const note = getNoteName(string, fret);
    // TODO: Establish if this should be 8n
    synthPluck.triggerAttackRelease(note, "0.5");

    synth.triggerAttack(note, Tone.now());
    synth.triggerRelease(Tone.now() + 0.5);
}
