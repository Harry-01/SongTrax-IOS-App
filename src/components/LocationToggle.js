import { useEffect, useState } from "react";
import { baseURL, APIKEY } from "../utils";

/**
 * A Label for the date of sample creation
 *
 * @component 
 * @param {Object} props - The component props.
 * @param {string} props.locationId - the id of location from api
 * @param {string} props.sampleId - id of sample from api

 * @returns {JSX.Element} The rendered React component.
 */
const LocationToggle = ({ locationId, sampleId, locationName }) => {
    const [sharing, setSharing] = useState(false);

    /**
     * Get all data from sampletolocation endpoint
     * @returns {object} - sampletolocation data in json
     */
    async function getSampleLocations() {
        const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

    /**
     * Gets the sampletolocation id if current sample and location
     *
     * @returns {number | null} - sampletolocation id of current sample and location toggle or null
     */
    async function getFilteredSampleLocationId() {
        const sampleLocationData = await getSampleLocations();
        const sampleLocationId = sampleLocationData.find(
            (item) =>
                item.sample_id.toString() === sampleId &&
                item.location_id === locationId
        );
        if (sampleLocationId) {
            return sampleLocationId.id;
        } else {
            return null;
        }
    }

    /**
     * set the initial state of sharing from api
     */
    async function setInitialSharingState() {
        const sampleLocationId = await getFilteredSampleLocationId();
        sampleLocationId ? setSharing(true) : setSharing(false);
        // if (sampleLocationId) {
        //     setSharing(true);
        // } else {
        //     setSharing(false);
        // }
    }

    /**
     *  Delete from sampletolocation of current location and sample
     */
    async function deleteSampleLocation() {
        const sampleLocationId = await getFilteredSampleLocationId();
        if (sampleLocationId) {
            const url = `${baseURL}sampletolocation/${sampleLocationId}/?api_key=${APIKEY}`;
            const response = await fetch(url, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Request was successful:");
            } else {
                // The request failed (status code outside the range 200-299)
                // Handle the error here
                console.error("Request failed with status:", response.status);
            }
        }
    }

    /**
     *  Insert from sampletolocation of current location and sample
     */
    async function insertSampleLocation() {
        const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
        const currentTime = new Date();
        const data = {
            api_key: APIKEY,
            sample_id: sampleId,
            location_id: locationId,
            datetime: currentTime,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        return json;
    }

    /**
     * Handle share button clicked
     */
    async function handleShareClick() {
        setSharing(true);
        await insertSampleLocation();
    }

    /**
     * Handle no share button clicked
     */
    async function handleNoShareClick() {
        setSharing(false);
        await deleteSampleLocation();
    }

    useEffect(() => {
        setInitialSharingState();
    }, []);

    return (
        <div className="toggle-row-container">
            <div className="location-name-label">
                <h4>{locationName}</h4>
            </div>

            <div className="sequence-row-container">
                <button
                    className={`toggle${sharing ? "-selected" : ""} `}
                    onClick={handleShareClick}
                    disabled={sharing}
                >
                    Shared
                </button>
                <button
                    className={`toggle${!sharing ? "-selected" : ""} `}
                    onClick={handleNoShareClick}
                    disabled={!sharing}
                >
                    Not Shared
                </button>
            </div>
        </div>
    );
};

export default LocationToggle;
