import { useState } from "react";
import { APIKEY, baseURL } from "../utils";
import { useNavigate } from "react-router-dom";

/**
 * A button component for creating a sample.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.recordingData - The recording data to be sent when creating a sample.
 * @param {string} props.sampleName - The name of the sample.
 * @param {string} props.selectedInstrument - The selected musical instrument.
 * @returns {JSX.Element} The rendered React component.
 */
const CreateBtn = ({ recordingData, sampleName, selectedInstrument }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Creates a sample by sending a POST request to /sample endpoint
     */
    async function CreateSample() {
        setIsLoading(true);
        const url = `${baseURL}sample/?api_key=${APIKEY}`;
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
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // The request was successful (status code 200-299)
            setIsLoading(false);
            const json = await response.json();
            navigate("/");
            // Handle the response data or success here
            console.log("Request was successful:", json);
        } else {
            // The request failed (status code outside the range 200-299)
            // Handle the error here
            setIsLoading(false);
            console.error("Request failed with status:", response.status);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={CreateSample}
                className="bright-button"
            >
                Create
            </button>
            <div class={`loader ${!isLoading ? `hidden` : null}`}></div>
        </>
    );
};

export default CreateBtn;
