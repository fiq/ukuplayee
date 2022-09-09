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
    const poly = new Tone.PolySynth().toDestination();
    const note = getNoteName(string, fret)
    // FIXME: Unternary 
    const duration = args.muted ? "32n" : "1n";
    stringSamplers[string-1].triggerAttackRelease(note, duration);

    if (!args.muted) {
        poly.triggerAttackRelease(note, "32n");
        pluck.triggerAttack(note, Tone.now());
        pluck.triggerRelease(Tone.now() + 1);
    }
}

