import React, { useState, useEffect, useRef } from "react";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import "./App.css";
const App = () => {
  const [timeVal, setTimeVal] = useState(0);
  const [displayTime, setDisplayTime] = useState(timeVal * 60);
  const [isActive, setIsActive] = useState(false);

  const timeRef = useRef();

  useEffect(() => {
    setDisplayTime(timeVal * 60);
  }, [timeVal]);

  useEffect(() => {
    if (isActive) {
      timeRef.current = setInterval(() => {
        setDisplayTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timeRef.current);
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timeRef.current);
    }

    return () => clearInterval(timeRef.current);
  }, [isActive]);

  const timeToDisplay = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleStart = () => {
    if (timeVal > 0) {
      setIsActive(true);
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeVal(0);
    setDisplayTime(timeVal * 60);
  };

  return (
    <div className="appCont">
      <div className="appInput">
        <div className="">Enter Minutes: </div>
        <input
          type="number"
          className="appInputText"
          value={timeVal}
          onChange={(e) => setTimeVal(parseInt(e.target.value))}
        />
      </div>
      <h3>{timeToDisplay(displayTime)}</h3>
      <div className="alignIcons">
        <div className="icon1" onClick={handleStart} disabled={isActive}>
          <CiPlay1 />
        </div>
        <div
          className={!isActive ? "icon2" : "icon1"}
          onClick={handlePause}
          disabled={!isActive}
        >
          <CiPause1 />
        </div>
        <div className="icon1" onClick={handleReset}>
          <GrPowerReset />
        </div>
      </div>
    </div>
  );
};

export default App;
