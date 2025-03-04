import { Button } from "antd";
import React from "react";
import { persistApplicationsToLocalStorage } from "../services/local-storage/localStorageService";

const Settings: React.FC = () => {
    const handleAddApplication = () => {
        persistApplicationsToLocalStorage();
    };
    return (
        <div>
            {/* <h1>Settings</h1> */}
            <Button onClick={handleAddApplication}>Add Applications</Button>
        </div>
    );
};

export default Settings;
