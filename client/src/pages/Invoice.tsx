import React from "react";
import RequestTable from "../components/feature/RequestTable";

const requestData = [
    { id: "1", name: "John Doe", passType: "VIP", email: "john@example.com", gender: "Male", status: "Approved" },
    { id: "2", name: "Jane Smith", passType: "Regular", email: "jane@example.com", gender: "Female", status: "Pending" },
    { id: "3", name: "Sam Wilson", passType: "VIP", email: "sam@example.com", gender: "Male", status: "Rejected" },
  ];

export const Invoice: React.FC = () => {
    return (
        <div>
          <h1>Request List</h1>
          <RequestTable data={requestData} />
        </div>
      );
};

export default Invoice;