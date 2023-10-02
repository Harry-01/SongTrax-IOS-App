import { useEffect, useState } from "react";
import PreviewBtn from "./PreviewBtn";
import { APIKEY, baseURL, getSample } from "../utils";
import CreatedDate from "./CreatedDate";

/**
 * Sample Share Card that shows details to be displayed in share page
 *
 * @component 
 * @param {Object} props - The component props.
 * @param {number} props.sampleId - id of current sample

 * @returns {JSX.Element} The rendered React component.
 */
const SampleShareCard = ({ sampleId }) => {
    const [sampleData, setSampleData] = useState({
        id: null,
        api_key: "",
        name: "",
        recording_data: "[]",
        type: "",
        datetime: "",
    });
    const [recordingData, setRecordingData] = useState([]);
    const [instrument, setInstrument] = useState("");

    const formattedRecordingData = recordingData.map((item) => {
        const note = Object.keys(item)[0];
        const bars = Object.values(item)[0];
        return { note, bars };
    });

    /**
     * initalise state when mounted
     */
    async function initialiseState() {
        const sampleData = await getSample(sampleId);
        setRecordingData(JSON.parse(sampleData.recording_data));
        setSampleData(sampleData);
        setInstrument(sampleData.type);
    }

    useEffect(() => {
        initialiseState();
    }, []);

    return (
        <div className="card">
            <div className="song-details">
                <h3>{sampleData.name}</h3>
                <CreatedDate dateTime={sampleData.datetime} />
            </div>
            <PreviewBtn
                recordingData={formattedRecordingData}
                instrument={instrument}
            />
        </div>
    );
};

export default SampleShareCard;
