import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
const BackArrow = () => {
    let navigate = useNavigate();
    return (
        <>
            <div onClick={() => navigate("/")}>
                <FontAwesomeIcon
                    icon={faCircleArrowLeft}
                    className="arrow"
                    size="2xl"
                />
            </div>
        </>
    );
};

export default BackArrow;
