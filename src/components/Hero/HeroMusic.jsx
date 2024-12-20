import "../../styles/Music.css";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { TbPlayerTrackPrevFilled as Prev, TbPlayerTrackNextFilled as Next } from "react-icons/tb";

export default function HeroMusic() {
  const music=[
    {
      "title":"HTML is not a programming language",
      "url":"/audio/html-music.mp3"
    },
    {
      "title":"Lofiento",
      "url":"/audio/Lofiento.mp3"
    },
    {
      "title":"Numb",
      "url":"/audio/Numb.mp3"
    },
    {
      "title":"Quarantine",
      "url":"/audio/Quarantine.mp3"
    },
    {
      "title":"Where's my seq?",
      "url":"/audio/seq.mp3"
    },
  ]

  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0)
  const [index, setIndex]=useState(0)
  const [duration, setDuration]=useState(0)
  const intervalRef = useRef(null);
  const refAudio=useRef(null)
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
  const handleMusic = () => {
    setPlaying(!playing);
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
  return (
    <div className="music">
      <div className="containerTitle">
        <p className="title">{music[index].title}</p>
      </div>
      <div className="controls">
        <audio
            ref={refAudio}
            src={music[index].url}
            onLoadedMetadata={handleLoadedMusic}
            onEnded={handleEnded}
            aria-label="music player"
        />
        <Prev className="controls__logo" onClick={handlePrevMusic} name="previous music"/>
        <button onClick={handleMusic} name='play music'>
          {playing ? <FaPause className="controls__logo" /> : <FaPlay className="controls__logo" />}
        </button>
        <Next className="controls__logo" onClick={handleNextMusic} name="next music"/>
      </div>
      <div className="containerBar">
        <input
          type="range"
          value={minutes*60+seconds}
          min={0}
          max={duration || 65}
          className="bar"
          onChange={handleRangeChange}
          aria-label="Progress for music"
        />
        <p>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
      </div>
    </div>
  );
}