import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
function AdminPage() {
  const [customerData, setCustomerData] = useState([]);
  const {user }= useUser();
  const Useremail = user.emailAddresses[0].emailAddress;

  async function loadCustomerRequest() {
 try{
  const getCustomerArray = await axios.post("/admin" , {Useremail});
  //console.log(getCustomerArray.data)
  setCustomerData(getCustomerArray.data.uniqueCustomers)
 }
catch(err){}

//console.log(getCustomerArray.data.uniqueCustomers[0].primaryEmailAddress.emailAddress);
//console.log(getCustomerArray.data.uniqueCustomers);


    // const CustomerData = 
    // setCustomerData(CustomerData)
  }

  useEffect(() => {
    loadCustomerRequest();
  });

  return (
    <section className="w-full min-h-full flex flex-wrap gap-6 p-10">
  
      {customerData?.map((item) => (
        
        <div className="h-fit items-center gap-[2vw] shadow-3xl p-4 rounded-lg bg-sec-black md:max-w-[60vh] border-accent border-2">
<p className="font-montserrat font-semibold  text-white">
Full Name:{" "}
  <span className="text-accent">
    {" "}
    {item[0]?.fullName}{" "}
  </span>
</p>
<p className="font-montserrat font-semibold  text-white">
Id:{" "}
  <span className="text-accent">
    {" "}
    {item[0]?.id}{" "}
  </span>
</p>
<p className="font-montserrat font-semibold  text-white">
Email address:{" "}
  <span className="text-accent">
    {" "}
    {item[0]?.primaryEmailAddress.emailAddress}{" "}
  </span>
</p>
<p className="font-montserrat font-semibold  text-white">
 Address:{" "}
  <span className="text-accent">
    {" "}
    {item[1]}{" "}
  </span>
</p>

</div>

      ))}
    
    </section>
  );
}

export default AdminPage;

