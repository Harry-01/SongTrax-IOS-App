import { useEffect, useState } from "react";
import SampleCard from "../components/SampleCard";
import { APIKEY, baseURL } from "../utils";
import CreateSampleBtn from "../components/CreateSampleBtn";

/**
 * SampleListPage list all the sample card
 *
 * @component
 * @param {Object} props - The component props.
 *
 * @returns {JSX.Element} The rendered React page
 */
const SampleListPage = () => {
    const [samples, setSamples] = useState([]);

    async function getSampleLocations() {
        const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

    /**
     * Determines if share button shows share or shared
     *
     * @param {string} sampleId - id of sample
     * @returns {Boolean} - true if the sample is shared to any location and false otherwise
     */
    async function assignIsShare(sampleId) {
        const data = await getSampleLocations();
        const filteredData = data.filter((item) => item.sample_id === sampleId);
        return filteredData.length === 0;
    }

    /**
     * Fetch sample data from /sample endpint
     *
     * @return {Object[]} - all samples
     */
    async function fetchSamples() {
        const url = `${baseURL}sample/?api_key=${APIKEY}`;
        const response = await fetch(url);
        const json = await response.json();
        setSamples(json);
    }

    /**
     * Sorts the sample based on the sample created date
     */
    const sortedSamples = samples.sort((a, b) => {
        var c = new Date(a.datetime);
        var d = new Date(b.datetime);
        return d - c;
    });

    useEffect(() => {
        fetchSamples();
    }, []);

    return (
        <main>
            <h2 className="title">My Songs</h2>
            <CreateSampleBtn />

            {sortedSamples.map((sample) => (
                <SampleCard
                    key={sample.id}
                    index={sample.id}
                    name={sample.name}
                    isShared={() => assignIsShare(sample.id)}
                    instrument={sample.type}
                    recordingData={JSON.parse(sample.recording_data)}
                    datetime={sample.datetime}
                />
            ))}

            <CreateSampleBtn />
        </main>
    );
};

export default SampleListPage;
