import { Link } from "react-router-dom";
const CreateSampleBtn = () => {
    return (
        <div className="create-card">
            <Link to="/edit" className="full-button">
                Create Sample
            </Link>
        </div>
    );
};

export default CreateSampleBtn;
