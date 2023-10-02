import * as Tone from "tone";

export const toneObject = Tone;

// export const synth = new toneObject.PolySynth().toDestination();

export const guitar = new toneObject.Sampler({
    urls: {
        F4: "F4.[mp3|ogg]",
        "F#2": "Fs2.[mp3|ogg]",
        "F#3": "Fs3.[mp3|ogg]",
        "F#4": "Fs4.[mp3|ogg]",
        G2: "G2.[mp3|ogg]",
        G3: "G3.[mp3|ogg]",
        G4: "G4.[mp3|ogg]",
        "G#2": "Gs2.[mp3|ogg]",
        "G#3": "Gs3.[mp3|ogg]",
        "G#4": "Gs4.[mp3|ogg]",
        A2: "A2.[mp3|ogg]",
        A3: "A3.[mp3|ogg]",
        A4: "A4.[mp3|ogg]",
        "A#2": "As2.[mp3|ogg]",
        "A#3": "As3.[mp3|ogg]",
        "A#4": "As4.[mp3|ogg]",
        B2: "B2.[mp3|ogg]",
        B3: "B3.[mp3|ogg]",
        B4: "B4.[mp3|ogg]",
        C3: "C3.[mp3|ogg]",
        C4: "C4.[mp3|ogg]",
        C5: "C5.[mp3|ogg]",
        "C#3": "Cs3.[mp3|ogg]",
        "C#4": "Cs4.[mp3|ogg]",
        "C#5": "Cs5.[mp3|ogg]",
        D2: "D2.[mp3|ogg]",
        D3: "D3.[mp3|ogg]",
        D4: "D4.[mp3|ogg]",
        D5: "D5.[mp3|ogg]",
        "D#2": "Ds2.[mp3|ogg]",
        "D#3": "Ds3.[mp3|ogg]",
        "D#4": "Ds3.[mp3|ogg]",
        E2: "E2.[mp3|ogg]",
        E3: "E3.[mp3|ogg]",
        E4: "E4.[mp3|ogg]",
        F2: "F2.[mp3|ogg]",
        F3: "F3.[mp3|ogg]",
    },
    release: 1,
    baseUrl: "/samples/guitar-acoustic/",
}).toDestination();

export const drums = new toneObject.Sampler({
    urls: {
        B3: "drums1.mp3",
        A3: "drums2.mp3",
        G3: "drums3.mp3",
        F3: "drums4.mp3",
        E3: "drums5.mp3",
        D3: "drums6.mp3",
        C3: "drums7.mp3",
    },
    release: 1,
    baseUrl: "/samples/drum-samples/",
}).toDestination();

export const frenchHorn = new toneObject.Sampler({
    urls: {
        B1: "A1.mp3",
        A1: "A3.mp3",
        G1: "C2.mp3",
        F1: "C4.mp3",
        E1: "D3.mp3",
        D1: "D5.mp3",
        C1: "F3.mp3",
    },
    release: 1,
    baseUrl: "/samples/french-horn/",
}).toDestination();

export const piano = new toneObject.Sampler({
    // urls: {
    //     A3: "A1.mp3",
    //     C3: "C2.mp3",
    //     D3: "D3.mp3",
    //     F3: "F3.mp3",
    //     E3: "A3.mp3",
    //     D3: "C4.mp3",
    //     C3: "D5.mp3",
    // },
    urls: {
        B3: "B3.mp3",
        A3: "A3.mp3",
        G3: "G3.mp3",
        F3: "F3.mp3",
        E3: "E3.mp3",
        D3: "D3.mp3",
        C3: "C3.mp3",
    },
    release: 1,
    baseUrl: "/samples/piano/",
}).toDestination();

export const toneTransport = toneObject.Transport;
