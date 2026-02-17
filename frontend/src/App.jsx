import Table from "./components/Table";
import { Route, Routes } from "react-router-dom";
import AIdashboard from "./pages/AIdashboard";
import PolicyCreator from "./pages/PolicyCreator";
import ServiceViewer from "./pages/ServiceViewer";
import TempPage from "./pages/TempPage";

function App() {
    return (
        //<main className="w-screen h-screen">
        //  <Table />
        //</main>

        <Routes>
            <Route index element={<Table />} />
            <Route path="/ai-dashboard" element={<AIdashboard />} />
            <Route path="/service-viewer" element={<ServiceViewer />} />
            <Route path="/policy-editor" element={<PolicyCreator />} />
            <Route path="/service-viewer" element={<ServiceViewer />} />
            <Route path="/db-test" element={<TempPage />} />
        </Routes>
    );
}

export default App;
