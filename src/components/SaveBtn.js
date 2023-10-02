import { useState } from "react";
import { baseURL, APIKEY } from "../utils";
/**
 * Save button to update a selected sample
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object[]} props.recordingData - sample recording data
 * @param {string} props.selectedInstrument - instrument name of selected instrument
 * @param {string} props.sampleName - name of sample to be saved
 * @param {number} props.editId - id of sample to be edited (from params)
 *
 * @returns {JSX.Element} The rendered React component.
 */
const SaveBtn = ({ recordingData, selectedInstrument, sampleName, editId }) => {
    const [isLoading, setIsLoading] = useState(false);
    /**
     * sends a put request to sample/id endpoint for updating samples
     */
    async function updateSample() {
        setIsLoading(true);
        const url = `${baseURL}sample/${editId}/?api_key=${APIKEY}`;
        const formattedRecordingData = recordingData.map((item) => {
            const { note, bars } = item;
            return { [note]: bars };
        });

        const data = {
            type: selectedInstrument,
            name: sampleName,
            recording_data: JSON.stringify(formattedRecordingData),
            api_key: APIKEY,
        };

        const response = await fetch(url, {
            method: "PUT", // Method itself
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // We send data in JSON format
        });

        if (response.ok) {
            setIsLoading(false);
            // The request was successful (status code 200-299)
            const json = await response.json();

            // Handle the response data or success here
            console.log("Request was successful:", json);
        } else {
            setIsLoading(false);
            // The request failed (status code outside the range 200-299)
            // Handle the error here
            console.error("Request failed with status:", response.status);
        }
    }
    return (
        <>
            <button
                type="button"
                onClick={updateSample}
                className="bright-button"
            >
                Save
            </button>
            <div class={`loader ${!isLoading ? `hidden` : null}`}></div>
        </>
    );
};

export default SaveBtn;
