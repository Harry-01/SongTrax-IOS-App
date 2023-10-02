export const APIKEY = "bIpxex9hLJ";
export const baseURL = "https://comp2140.uqcloud.net/api/";

/**
 * Toggle only the selected bar and leave other notes unchanged
 *
 * @param {Object[]} recordingData - recording data of sample
 * @param {number} changeID - id of bar to be toggled
 * @param {number} index - id of note the bar is in
 * @param {() => void} setRecordingData - function to change recordingData
 */
export const toggleBar = (recordingData, changeID, index, setRecordingData) => {
    const newState = [...recordingData];
    // Toggle the desired element
    newState[index].bars[changeID] = !newState[index].bars[changeID];
    setRecordingData(newState);
};

// export const formattedRecordingData = () => {
//     return recordingData.map((item) => {
//         const { note, bars } = item;
//         return { [note]: bars };
//     });
// }

export const initialRecordingData = [
    { note: "B", bars: Array(16).fill(false) },
    { note: "A", bars: Array(16).fill(false) },
    { note: "G", bars: Array(16).fill(false) },
    { note: "F", bars: Array(16).fill(false) },
    { note: "E", bars: Array(16).fill(false) },
    { note: "D", bars: Array(16).fill(false) },
    { note: "C", bars: Array(16).fill(false) },
];

/**
 * get the sample data given its id
 *
 * @param {number} id - id of sample
 * @returns {Object} - record of given sample in json format
 */
export async function getSample(id) {
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export const instruments = ["Piano", "French Horn", "Guitar", "Drums"];
