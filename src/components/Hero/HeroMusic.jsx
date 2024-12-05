import "../../styles/Music.css";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { TbPlayerTrackPrevFilled as Prev, TbPlayerTrackNextFilled as Next } from "react-icons/tb";

export default function HeroMusic() {

  const music=["../../../public/audio/html-music.mp3", "../../../public/audio/Lofiento.mp3", "../../../public/audio/Numb.mp3", "../../../public/audio/Quarantine.mp3", "../../../public/audio/seq.mp3"]

  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0)
  const [index, setIndex]=useState(0)
  const [duration, setDuration]=useState(0)
  const handleLoadedMusic=()=>{
    setDuration(Math.floor(refAudio.current.duration))
  }
  const handleNextMusic=()=>{
    setIndex(prevIndex=>(prevIndex+1) % music.length)
    setPlaying(false)
    setMinutes(0)
    setSeconds(0)
  }
  const handlePrevMusic=()=>{
    setIndex(prevIndex=>(prevIndex-1 + music.length) % music.length)
    setPlaying(false)
    setMinutes(0)
    setSeconds(0)
  }
  const intervalRef = useRef(null);

  const handleMusic = () => {
    setPlaying(!playing);
    console.log(Math.floor(refAudio.current.duration))
  };
  const handleEnded = () => {
    handleNextMusic();
    setTimeout(() => {
      refAudio.current.play();
    }, 0);
    setPlaying(true);
  };
  useEffect(() => {
    if (playing) {
      refAudio.current.volume = 0.2;
      refAudio.current.play();
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds >= 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      refAudio.current.pause();
      clearInterval(intervalRef.current);
    }
  
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  const handleRangeChange=(e)=>{
    const totalSeconds=Number(e.target.value)
    setMinutes(Math.floor(totalSeconds/60))
    setSeconds(totalSeconds%60)
    refAudio.current.currentTime=totalSeconds
  }
  const refAudio=useRef(null)

  return (
    <div className="music">
      <div className="containerTitle">
        <p className="title">HTML is not a lenguage programming</p>
      </div>
      <div className="controls">
        <audio
            ref={refAudio}
            src={music[index]}
            onLoadedMetadata={handleLoadedMusic}
            onEnded={handleEnded}
        />
        <Prev className="controls__logo" onClick={handlePrevMusic}/>
        <button onClick={handleMusic}>
          {playing ? <FaPause className="controls__logo" /> : <FaPlay className="controls__logo" />}
        </button>
        <Next className="controls__logo" onClick={handleNextMusic}/>
      </div>
      <div className="containerBar">
        <input
          type="range"
          value={minutes*60+seconds}
          min={0}
          max={duration}
          className="bar"
          onChange={handleRangeChange}
        />
        <p>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
      </div>
    </div>
  );
}
