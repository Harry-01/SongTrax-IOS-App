import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PreviewBtn from "../components/PreviewBtn.js";
import SaveBtn from "../components/SaveBtn.js";
import Selector from "../components/Selector.js";
import Sequencer from "../components/Sequencer.js";
import BackArrow from "../components/BackArrow.js";
import {
    getSample,
    initialRecordingData,
    instruments,
    toggleBar,
} from "../utils.js";

/**
 * EditSamplePage allows user to update a chosen sample
 *
 * @component
 * @param {Object} props - The component props.
 *
 * @returns {JSX.Element} The rendered React page
 */
const EditSamplePage = () => {
    let { editId } = useParams();
    const [recordingData, setRecordingData] = useState(initialRecordingData);
    const [selectedInstrument, setSelectedInstrument] = useState("Piano");
    const [sampleName, setSampleName] = useState("");

    /**
     * Sets the states so that sample data are shown
     *
     * @param {number} editId - the sample id being edited
     */
    async function setInitialState(editId) {
        const data = await getSample(editId);
        const parsedData = JSON.parse(data.recording_data);
        const newData = parsedData.map((item) => {
            const [note, bars] = Object.entries(item)[0];
            return {
                note,
                bars,
            };
        });
        setRecordingData(newData);
        setSelectedInstrument(data.type);
        setSampleName(data.name);
    }

    useEffect(() => {
        setInitialState(editId);
    }, []);

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
                <h2>Edit Sample:</h2>
            </div>
            {/* <h2 className="title">Edit Sample:</h2> */}
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
                    <SaveBtn
                        recordingData={recordingData}
                        sampleName={sampleName}
                        selectedInstrument={selectedInstrument}
                        editId={editId}
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
                    index={index}
                    sequence={sequence}
                    selectedInstrument={selectedInstrument}
                    onUpdateBars={
                        // (updatedBars) =>
                        // updateSequence(index, updatedBars)
                        (changeID) => handleChange(changeID, index)
                    }
                />
            ))}
        </main>
    );
};

export default EditSamplePage;
