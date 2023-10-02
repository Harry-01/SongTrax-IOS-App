import { drums, frenchHorn, guitar, piano } from "../data/instruments.js";
/**
 * Save button to update a selected sample
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.sequence - a sequence of notes
 * @param {() => void} props.onUpdateBars - function to update a bar
 * @param {string} props.selectedInstrument - name of selected instrument
 *
 * @returns {JSX.Element} The rendered React component.
 */
const Sequencer = ({ sequence, onUpdateBars, selectedInstrument }) => {

    /**
     * Plays the sound of the selected note
     */
    function playNote() {
        switch (selectedInstrument) {
            case "Piano":
                piano.triggerAttackRelease(`${sequence.note}3`, "0.5s"); // Plays an G# note on 3rd octave
                break;
            case "French Horn":
                frenchHorn.triggerAttackRelease(`${sequence.note}1`, "0.5s"); // Plays an G# note on 3rd octave
                break;
            case "Guitar":
                guitar.triggerAttackRelease(`${sequence.note}#3`, "0.5s"); // Plays an G# note on 3rd octave
                break;
            case "Drums":
                drums.triggerAttackRelease(`${sequence.note}3`, "0.5s"); // Plays an G# note on 3rd octave
                break;
            default:
                console.log("error");
        }
    }

    /**
     * Handles when a bar is pressed
     * @param {number} barID 
     */
    function handleClick(barID) {
        playNote();
        onUpdateBars(barID);
    }

    return (
        <div className="toggle-row-container">
            <div className="row-label">
                <h4>{sequence.note}</h4>
            </div>
            <div className="sequence-row-container">
                {sequence.bars.map((bar, barID) => (
                    <button
                        key={barID}
                        className={bar === true ? "toggle-selected" : "toggle"}
                        onClick={() => handleClick(barID)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Sequencer;
