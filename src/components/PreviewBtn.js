import { useContext, useEffect, useState } from "react";
import { drums, frenchHorn, guitar, piano } from "../data/instruments";
import { ToneObj } from "../pages/App";

/**
 * A Preview button that playsback samples
 *
 * @component 
 * @param {Object} props - The component props.
 * @param {Object[]} props.recordingData - sample recording data
 * @param {string} props.instrument - instrument name of selected instrument

 * @returns {JSX.Element} The rendered React component.
 */
const PreviewBtn = ({ recordingData, instrument }) => {
    const { toneObject, toneTransport } = useContext(ToneObj);
    const [previewing, setPreviewing] = useState(false);
    /**
     * handles when preview button is clicked
     */
    function handleButtonClick() {
        addToTone();
        toneObject.start();
        toneTransport.stop();
        if (previewing) {
            setPreviewing(false);
        } else {
            setPreviewing(true);
            toneTransport.start();
        }
    }

    useEffect(() => {
        toneTransport.cancel();
    }, [instrument, toneTransport]);

    /**
     * Adds notes from recording data to tonePart to be played back
     */
    function addToTone() {
        // Tone.Transport.cancel()
        recordingData.forEach((sequence, index) => {
            sequence.bars.forEach((bar, ind) => {
                if (bar) {
                    //console.log(bar);
                    // Calculate the time with a 0.5-second delay
                    const time = `${ind * 0.5}s`;

                    // Add the event to the tonePart
                    if (instrument === "French Horn") {
                        tonePart.add(time, `${sequence.note}1`);
                    } else {
                        tonePart.add(time, `${sequence.note}3`);
                    }
                }
            });
        });
    }

    /**
     * change state of previewing after 16 bars or 8s
     */
    toneTransport.schedule((time) => {
        // Your setter method to turn previewing to false
        setPreviewing(false);
    }, "8s");

    /**
     * Callback function depending on the selected instrument
     *
     * @param {string} time - time when note is scheduled to play
     * @param {string} note - note that is scheduled to play
     */
    const instrumentCallback = (time, note) => {
        if (instrument === "Piano") {
            piano.triggerAttackRelease(note, "0.5s", time);
        } else if (instrument === "French Horn") {
            frenchHorn.triggerAttackRelease(note, "0.5s", time);
        } else if (instrument === "Guitar") {
            guitar.triggerAttackRelease(note, "0.5s", time);
        } else if (instrument === "Drums") {
            drums.triggerAttackRelease(note, "0.5s", time);
        }
    };

    /**
     * sets up a callback function to handle what should occur
     * at each scheduled time
     *
     * @param {string} time - time when note is scheduled to play
     * @param {string} note - note that is scheduled to play
     */
    const tonePart = new toneObject.Part((time, note) => {
        instrumentCallback(time, note);
    }, []).start(0);

    return (
        <button
            type="button"
            onClick={handleButtonClick}
            className="bright-button"
        >
            {previewing ? "Stop Previewing" : "Preview"}
        </button>
    );
};

export default PreviewBtn;
