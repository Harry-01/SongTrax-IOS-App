import "../App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SampleListPage from "./SampleListPage";
import EditSamplePage from "./EditSamplePage";
import CreateSamplePage from "./CreateSamplePage";
import ShareSamplePage from "./ShareSamplePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toneObject, toneTransport } from "../data/instruments.js";
import { createContext, useState } from "react";

export const ToneObj = createContext();

/**
 * App is where we handle the routing and setup contexts for the app
 *
 * @component
 * @param {Object} props - The component props.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function App() {
    const [shareList, setShareList] = useState([]);
    const contextValue = { toneObject, toneTransport };

    return (
        <div className="App">
            <BrowserRouter>
                <ToneObj.Provider value={contextValue}>
                    <Header />
                    <Routes>
                        <Route
                            path="/edit/:editId"
                            element={<EditSamplePage />}
                        />
                        <Route path="/edit" element={<CreateSamplePage />} />
                        <Route
                            path="/"
                            element={
                                <SampleListPage
                                    shareList={shareList}
                                    setShareList={setShareList}
                                />
                            }
                        />
                        <Route
                            path="/share/:sampleId"
                            element={
                                <ShareSamplePage setShareList={setShareList} />
                            }
                        />
                    </Routes>
                </ToneObj.Provider>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
