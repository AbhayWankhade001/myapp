import React, { useState } from 'react';
import firebase from 'firebase';
import { Form, Button } from 'react-bootstrap';

const VerifyOTP = ({ phoneNumber, onVerified }) => {
  const [otp, setOTP] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const verifyOTP = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
    firebase.auth().signInWithCredential(credential)
      .then(() => {
        onVerified();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sendOTP = () => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((verificationId) => {
        setVerificationId(verificationId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Form>
        <Form.Group controlId="otp">
          <Form.Label>Enter OTP</Form.Label>
          <Form.Control type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOTP(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={verifyOTP}>Verify OTP</Button>
      </Form>
      <div id="recaptcha-container"></div>
      <Button variant="primary" onClick={sendOTP}>Send OTP</Button>
    </>
  );
};

export default VerifyOTP;
