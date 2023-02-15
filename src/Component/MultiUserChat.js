import React, { useState } from 'react';
import VerifyOTP from './VerifyOTP';
import ChatApp from './ChatApp';
import firebase from 'firebase/compat/app';
const MultiUserChat = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verified, setVerified] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [contactNumber, setContactNumber] = useState(null);

  const handleVerified = () => {
    setCurrentUser(firebase.auth().currentUser);
    setVerified(true);
  };

  return (
    <>
      {verified ?
        <ChatApp currentUser={currentUser} contactNumber={contactNumber} />
        :
        <VerifyOTP phoneNumber={phoneNumber} onVerified={handleVerified} />
      }
    </>
  );
};

export default MultiUserChat;
