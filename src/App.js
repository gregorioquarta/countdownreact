import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import AudioOne from "./audio/gong.ogg";
import Audiotwo from "./audio/buzz.ogg";

function App() {
  const [countDownActive, setCountDownActive] = useState(false);
  const [final, setFinal] = useState(false);
  const [countDownAmount, setCountDownAmount] = useState(5400);
  const [actualCountDownAmount, setactualCountDownAmount] = useState();
  const [isShow, setIsShown] = useState(false);
  const [allowed, setAllowed] = useState(false);

  console.log("Countdown : ", actualCountDownAmount);

  const audio_1 = new Audio(AudioOne);
  const audio_2 = new Audio(Audiotwo);

  function reload() {
    window.location.reload(false);
  }
  function startCountDown() {
    // Toutes les 10 minutes un gong
    setInterval(function () {
      audio_1.play();
      audio_1.loop = false;
      console.log("gong");
    }, 600000);
    //600000

    setCountDownActive(true);
    //console.log("test");

    // décompte des secondes
    var timer = setInterval(function () {
      countdown--;
      var hours = Math.floor(countdown / 3600);
      var minutes = Math.floor((countdown % 3600) / 60);
      var seconds = countdown % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      document.getElementById("countdown").innerHTML = hours + ":" + minutes + ":" + seconds;
      if (countdown < 1) {
        clearInterval(timer);
      }
      setactualCountDownAmount(countdown);
      console.log(countdown);
    }, 1000);
  }

  var countdown = countDownAmount; // en sec 60 minutes * 60 seconds

  // Quand il reste 1 minute, une alerte toutes les 10 secondes

  var finalCountdown = setInterval(function () {
    if (countdown <= 60) {
      setFinal(true);
      console.log(countdown + " secondes");
      audio_2.play();
      audio_2.loop = false;
      console.log("buzz");
    }
    if (countdown < 1) {
      clearInterval(finalCountdown);
    }
  }, 10000);

  const changeformat = (el) => {
    setCountDownAmount(el);
    setAllowed(true);
  };

  //Fonction return
  return (
    <div id="body" className={final ? "final" : ""}>
      <audio controls style={{ display: "none" }}>
        <source src={AudioOne} type="audio/ogg" />
      </audio>
      <audio controls style={{ display: "none" }}>
        <source src={Audiotwo} type="audio/ogg" />
      </audio>

      <div id="countdown"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>

      <div className="button_container" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
        <button id="mon-bouton" onClick={() => startCountDown()} className={countDownActive ? "hide" : ""} disabled={!allowed}>
          Start
        </button>
        <div className={isShow ? "show" : ""}>
          <button onClick={() => changeformat(3600)} className={countDownActive ? "timesetup hide" : "timesetup"}>
            1H00
          </button>
          <button onClick={() => changeformat(5400)} className={countDownActive ? "timesetup hide" : "timesetup"}>
            1H30
          </button>
        </div>
      </div>
      <button id="reset" onClick={() => reload()}>
        Reset
      </button>
    </div>
  );
}

export default App;
