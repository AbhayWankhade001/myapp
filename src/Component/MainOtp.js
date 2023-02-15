import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import "./App.css";
import OtpInput from "otp-input-react";
import { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { toast, Toaster } from "react-hot-toast";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const confetiRef = useRef(null);

  useEffect(() => {
    if (confetiRef.current) {
      setHeight(confetiRef.current.clientHeight);
      setWidth(confetiRef.current.clientWidth);
    }
  }, [confetiRef]);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => { },
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;
    firebase
      .auth()
      .signInWithPhoneNumber(formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
        firebase
          .database()
          .ref("users/" + formatPh)
          .set({ phoneNumber: formatPh });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function getUsers() {
    firebase
      .database()
      .ref("users")
      .on("value", (snapshot) => {
        const users = snapshot.val();
        const currentUser = users[ph];
        setCurrentUser(currentUser);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        firebase
          .database()
          .ref("messages")
          .once("value", (snapshot) => {
            const messages = snapshot.val();
            setMessages(messages);
          });
        firebase
          .database()
          .ref("messages")
          .on("child_added", (snapshot) => {
            const newMessage = snapshot.val();
            setMessages((messages) => [...messages, newMessage]);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("OTP is Incorrect");
        firebase.auth().signInWithPhoneNumber();
      });
  }


  return (
    <section className="bg-white-500 flex items-center justify-center h-screen confetti-wrap" ref={confetiRef}>

      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        {user ? (
          <div>
            <Confetti numberOfPieces={250} width={width} height={height} />
            <div className="alig">
              <img src="./Frame (1).png" alt="Success icon" />
              <h2 className="text-center text-black font-medium text-2xl">
                You have successfully logged in!
              </h2>
            </div>
            <Link to="/About"><button>kszgjsvh</button></Link>
            <button
              className="btn btn-secondary btn-lg"

              onClick={() => {
                setUser(null)
                setShowOTP(false)
                firebase.auth().signOut()
              }}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div id="recaptcha-container"></div>
            {showOTP ? (
              <>
                <div className="text-4xl font-bold text-center mb-4">Verify OTP</div>
                <div className="text-center mb-4">
                  Enter the OTP sent to your phone number ending in {ph.slice(-4)}
                </div>
                <div className="flex items-center justify-center mb-8">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="opt-container "
                  ></OtpInput>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="btn btn-primary btn-lg me-4"
                    onClick={onOTPVerify}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <CgSpinner className="animate-spin mr-2" />
                        Verifying
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={() => setShowOTP(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-4xl font-bold text-center mb-8">
                  Phone Number Verification
                </div>
                <div className="mb-8">
                  <PhoneInput country={"in"} value={ph} onChange={setPh} enableSearch={true} />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={onSignup}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <CgSpinner className="animate-spin mr-2" />
                        Sending OTP
                      </>
                    ) : (
                      <>
                        <BsTelephoneFill className="me-2" />
                        Send OTP
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );


};
export default App;



