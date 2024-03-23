import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
function AdminPage() {
  const [customerData, setCustomerData] = useState([]);
  const {user }= useUser();
  const Useremail = user.emailAddresses[0].emailAddress;

  async function loadCustomerRequest() {

 const getCustomerArray = await axios.post("/admin" , {Useremail})
//console.log(getCustomerArray.data.uniqueCustomers);
setCustomerData(getCustomerArray.data.uniqueCustomers)
    // const CustomerData = 
    // setCustomerData(CustomerData)
  }

  useEffect(() => {
    loadCustomerRequest();
  });

  return (
    <div className="text-white">
      {customerData?.map((item) => (
        <p>{item}</p>
      ))}
    </div>
  );
}

export default AdminPage;
