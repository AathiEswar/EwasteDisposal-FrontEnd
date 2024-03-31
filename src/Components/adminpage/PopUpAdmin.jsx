import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function PopUpAdmin({handleRequesAccept , userId}) {
    
  const [staticModal, setStaticModal] = useState(false);

  const toggleOpen = () => setStaticModal(!staticModal);

 

  return (
    <>
      <MDBBtn style={{ backgroundColor: '#25a18e', color: 'white' }} onClick={toggleOpen}>Accept Request</MDBBtn>

      <MDBModal  staticBackdrop tabIndex='-1' open={staticModal} setOpen={setStaticModal}>
        <MDBModalDialog>
          <MDBModalContent style={{border : "4px solid #25a18e" , backgroundColor : "#202020"}}>
            <MDBModalHeader style={{border : "none"}}>
              <MDBModalTitle style={{color: "white"}} >CONFIRMATION</MDBModalTitle>
              <MDBBtn color='none' onClick={toggleOpen} ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody  style={{border : "none" , color:"white"}}>
            By confirming this request you are agreeing to dispose e-wastes that are in possession of the customer 
            and not completing the service causes reduction in credit points 
             </MDBModalBody>
            <MDBModalFooter  style={{border : "none"}}>
              <MDBBtn color='danger' className='background-accent hover:background-accent' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn style={{backgroundColor : "#25a18e"}} onClick={()=>{
               handleRequesAccept(userId)
                toggleOpen()
                }}>CONFIRM</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
