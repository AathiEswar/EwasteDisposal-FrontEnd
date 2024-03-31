import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react"; 
import { useUser } from "@clerk/clerk-react";
import CustomerCard from "../Components/adminpage/CustomerCard" 

function AdminPage() {
  const [customerData, setCustomerData] = useState([]);
  const {user }= useUser();
  const Useremail = user.emailAddresses[0].emailAddress;

  async function loadCustomerRequest() {
 
 try{
  const getCustomerArray = await axios.post("/admin" , {Useremail});
  // console.log(getCustomerArray);
   const destructuredArray = getCustomerArray.data.uniqueCustomers;
  // console.log(destructuredArray.length);
    const dataArray = [];

    for(let i=0;i<destructuredArray.length ; i++){
      dataArray.push([destructuredArray[i].userData , destructuredArray[i].address]);
    }

 //console.log(dataArray);
  //  destructuredArray.array.forEach(element => {
  //    //console.log(element);
  //    dataArray.push(element.userData);
  //  });



  setCustomerData(dataArray);
  // console.log(customerData);
}
catch(err){}

  }
//   async function handleRequesAccept(userId){
//     console.log("handle admin req");
//     const centerEmail = user.primaryEmailAddress.emailAddress;
//     await axios.post("/adminreq" , {userId , centerEmail})

// }

// async function handleOtp(userId , userEmail){
// await axios.post("/handleotp" , {userId , userEmail});
// }
  useEffect(() => {
    loadCustomerRequest();
  });

  return (
    <section className="max-w-full min-h-full flex flex-wrap gap-6 p-[5%]">
  
      {customerData?.map((item) => (
        <CustomerCard  item={item}/>
      )
      
      )}
 
    </section>
  );
}

export default AdminPage;

