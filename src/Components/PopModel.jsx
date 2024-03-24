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

export default function ConfirmRequestButton({handleEvent, itemId}) {
    
  const [staticModal, setStaticModal] = useState(false);

  const toggleOpen = () => setStaticModal(!staticModal);

  return (
    <>
      <MDBBtn style={{ backgroundColor: '#25a18e', color: 'white' }} onClick={toggleOpen}>Send Request</MDBBtn>

      <MDBModal  staticBackdrop tabIndex='-1' open={staticModal} setOpen={setStaticModal}>
        <MDBModalDialog>
          <MDBModalContent style={{border : "4px solid #25a18e" , backgroundColor : "#202020"}}>
            <MDBModalHeader style={{border : "none"}}>
              <MDBModalTitle style={{color: "white"}} >CONFIRMATION</MDBModalTitle>
              <MDBBtn color='none' onClick={toggleOpen} ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody  style={{border : "none" , color:"white"}}>
            By confirming this request you are agreeing to send your personal information to the E-waste disposal center
            and in possession of an e-waste to be disposed by them 
            
             </MDBModalBody>
            <MDBModalFooter  style={{border : "none"}}>
              <MDBBtn color='danger' className='background-accent hover:background-accent' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn style={{backgroundColor : "#25a18e"}} onClick={()=>{
                handleEvent(itemId)
                toggleOpen()
                }}>CONFIRM</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
