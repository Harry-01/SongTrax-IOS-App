import { Link } from "react-router-dom";
import PreviewBtn from "./PreviewBtn";
import CreatedDate from "./CreatedDate";
import { useEffect, useState } from "react";

/**
 * Sample Card that shows details to be displayed in sample list page
 *
 * @component 
 * @param {Object} props - The component props.
 * @param {number} props.index - index of sample
 * @param {string} props.name - name of the sample
 * @param {string} props.datetime - datetime of sample creation
 * @param {Object[]} props.recordingData - sample recording data
 * @param {string} props.instrument - instrument name of selected instrument
 * @param {string} props.isShared - determines share button look

 * @returns {JSX.Element} The rendered React component.
 */
const SampleCard = ({
    index,
    name,
    datetime,
    recordingData,
    instrument,
    isShared,
}) => {
    const formattedRecordingData = recordingData.map((item) => {
        const note = Object.keys(item)[0];
        const bars = Object.values(item)[0];
        return { note, bars };
    });
    const [shared, setShared] = useState();

    useEffect(() => {
        async function fetchData() {
            // Call the asynchronous isShared function and await its result
            const result = await isShared(index);

            // Update the shared state based on the result
            setShared(result);
        }

        fetchData();
    }, [isShared, index]);

    return (
        <section className="sample">
            <div className="card">
                <div className="song-details">
                    <h3>{name}</h3>
                    <CreatedDate dateTime={datetime} />
                </div>
                <div className="button-group-container">
                    <Link to={`/share/${index}`} className="bright-button">
                        {shared ? `share` : `shared`}
                    </Link>
                    <PreviewBtn
                        recordingData={formattedRecordingData}
                        instrument={instrument}
                    />
                    <Link to={`/edit/${index}`} className="bright-button">
                        Edit
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SampleCard;
