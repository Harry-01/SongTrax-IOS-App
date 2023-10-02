/**
 * Save button to update a selected sample
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string[]} props.instruments - all instruments avaliable
 * @param {string} props.selectedInstrument - instrument name of selected instrument
 * @param {() => void} props.setSelectedInstrument - setter function to change selected instrument state
 *
 * @returns {JSX.Element} The rendered React component.
 */
const Selector = ({
    instruments,
    selectedInstrument,
    setSelectedInstrument,
}) => {
    return (
        <div className="toggle-row-container">
            <div className="row-label">
                <h4>Instrument</h4>
            </div>
            <div className="sequence-row-container">
                {instruments.map((instrument) => (
                    <button
                        key={instrument}
                        className={
                            selectedInstrument === instrument
                                ? "toggle-selected"
                                : "toggle"
                        }
                        onClick={() => setSelectedInstrument(instrument)}
                    >
                        {instrument}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Selector;
