import { Routes, Route } from "react-router-dom";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { LoginLayout } from "./layouts/LoginLayout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<ProtectedLayout />} />
            <Route path="/login" element={<LoginLayout />} />
        </Routes>
    );
}

export default App;
