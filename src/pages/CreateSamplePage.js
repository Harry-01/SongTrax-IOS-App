import { useState } from "react";
import CreateBtn from "../components/CreateBtn.js";
import PreviewBtn from "../components/PreviewBtn.js";
import Selector from "../components/Selector.js";
import Sequencer from "../components/Sequencer.js";
import { initialRecordingData, toggleBar, instruments } from "../utils.js";
import BackArrow from "../components/BackArrow.js";

/**
 * CreateSamplePage allows user to create a new sample
 *
 * @component
 * @param {Object} props - The component props.
 *
 * @returns {JSX.Element} The rendered React page
 */
const CreateSamplePage = () => {
    const [recordingData, setRecordingData] = useState(initialRecordingData);
    const [selectedInstrument, setSelectedInstrument] = useState("Piano");
    const [sampleName, setSampleName] = useState("");

    /**
     * Handles when a bar is changed by updating recordingData state
     *
     * @param {number} changeID - the id of the changed bar
     * @param {number} index - the note id that is changed
     */
    const handleChange = (changeID, index) => {
        toggleBar(recordingData, changeID, index, setRecordingData);
    };

    return (
        <main>
            <div className="title-row title">
                <BackArrow />
                <h2>Create Sample:</h2>
            </div>
            <form className="card edit-card">
                <input
                    type="text"
                    value={sampleName}
                    onChange={(e) => setSampleName(e.target.value)}
                ></input>
                <div className="button-group-container">
                    <PreviewBtn
                        recordingData={recordingData}
                        instrument={selectedInstrument}
                    />
                    <CreateBtn
                        recordingData={recordingData}
                        sampleName={sampleName}
                        selectedInstrument={selectedInstrument}
                    />
                </div>
            </form>

            <Selector
                instruments={instruments}
                selectedInstrument={selectedInstrument}
                setSelectedInstrument={setSelectedInstrument}
            />

            {recordingData.map((sequence, index) => (
                <Sequencer
                    key={index}
                    sequence={sequence}
                    selectedInstrument={selectedInstrument}
                    onUpdateBars={(changeID) => handleChange(changeID, index)}
                />
            ))}
        </main>
    );
};

export default CreateSamplePage;
