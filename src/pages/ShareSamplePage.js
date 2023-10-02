import { useParams } from "react-router-dom";
import SampleShareCard from "../components/SampleShareCard";
import LocationToggle from "../components/LocationToggle";
import { useEffect, useState } from "react";
import { APIKEY, baseURL } from "../utils";
import BackArrow from "../components/BackArrow";

/**
 * ShareSamplePage Shows the locations that are being shared to
 * for a particular sample
 *
 * @component
 * @param {Object} props - The component props.
 *
 * @returns {JSX.Element} The rendered React page
 */
const ShareSamplePage = () => {
    const { sampleId } = useParams();
    const [locations, setLocations] = useState([]);
    

    /**
     * Get all locations from /location endpoint
     *
     * @returns {Object[]} - all locations
     */
    async function getLocations() {
        const url = `${baseURL}location/?api_key=${APIKEY}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

    /**
     * Filter all location where sharing is true
     */
    async function getFilteredLocations() {
        const sampleLocations = await getLocations();
        const filteredLocations = sampleLocations.filter(
            (item) => item.sharing === true
        );
        setLocations(filteredLocations);
    }

    useEffect(() => {
        getFilteredLocations();
    }, []);

    return (
        <main>
            <div className="title-row title">
                <BackArrow />
                <h2>Edit Sample:</h2>
            </div>
            {/* <h2 className="title">Share This Sample</h2> */}

            <SampleShareCard sampleId={sampleId} />

            {locations.map((location) => (
                <LocationToggle
                    key={location.id}
                    locationId={location.id}
                    sampleId={sampleId}
                    locationName={location.name}
                />
            ))}
        </main>
    );
};

export default ShareSamplePage;
