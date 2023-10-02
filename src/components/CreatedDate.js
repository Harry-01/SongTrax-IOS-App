import { useEffect, useState } from "react";

/**
 * A Label for the date of sample creation
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.dateTime - The datetime if sample creation in 

 * @returns {JSX.Element} The rendered React component.
 */
const CreatedDate = ({ dateTime }) => {
    const [dateStr, setDateStr] = useState("");
    /**
     * converts Date() string to a readable string to display
     * @returns string
     */
    function strTime() {
        if (!dateTime) {
            return ""; // Return an empty string if dateTime is not defined
        }
        const timeStamp = new Date(dateTime);
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const year = timeStamp.getFullYear();
        const month = (timeStamp.getMonth() + 1).toString().padStart(2, "0");
        const day = timeStamp.getDate().toString().padStart(2, "0");
        let hour = timeStamp.getHours().toString().padStart(2, "0");
        const minute = timeStamp.getMinutes().toString().padStart(2, "0");
        let amOrPm = "am";

        // Determine whether it's AM or PM
        if (hour >= 12) {
            amOrPm = "pm";
            if (hour > 12) {
                hour -= 12;
            }
        }
        return `${hour}:${minute} ${amOrPm} on ${day} ${
            months[+month]
        } ${year}`;
    }

    useEffect(() => {
        setDateStr(strTime());
    }, [dateTime]);

    return <p>{dateStr}</p>;
};

export default CreatedDate;
