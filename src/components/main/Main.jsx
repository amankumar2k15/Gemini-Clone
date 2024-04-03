import React, { useContext, useRef, useState } from 'react'
import "./Main.scss"
import { GeminiContext } from '../../context/Context'
import VoiceLoader from '../voice-loader/VoiceLoader'

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(GeminiContext)
    const [showWave, setShowWave] = useState(false);
    const [listening, setListening] = useState(false);
    const audioRef = useRef();

    {/* //for voice recognition */ }
    const handleVoiceInput = () => {
        const recognition = new window.webkitSpeechRecognition(); // Create a speech recognition instance

        recognition.lang = 'en-US'; // Set the language to English
        recognition.start(); // Start listening for speech
        setShowWave(true); // Show wave UI when listening starts

        recognition.onstart = () => {
            console.log('Listening...');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript; // Get the transcribed speech
            setInput(transcript); // Set the input value to the transcribed speech
            recognition.stop(); // Stop listening
            setListening(false); // Update state to indicate that listening has stopped
            setShowWave(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            recognition.stop();
            setListening(false);
            setShowWave(false);
        };

        recognition.onend = () => {
            console.log('Listening ended.');
            setShowWave(false); // Hide wave UI when listening ends
        };
    };


    // Function to play sound
    const playSound = () => {
        if (audioRef.current) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => console.error('Error playing audio:', error));
            }
        }
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src='/img/user_icon.png' alt='user_icon' />
            </div>
            <div className="main-container">

                {!showResult
                    ? (
                        <>
                            <div className='greet'>
                                <p><span>Hello, Aman</span></p>
                                <p>How can i help you today?</p>
                            </div>
                            <div className="cards">
                                <div className="card"
                                    onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")}
                                >
                                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                                    <img src='/img/compass_icon.png' alt='compass_icon' />
                                </div>
                                <div className="card"
                                    onClick={() => onSent("Briefly summarize this concept: urban planning")}
                                >
                                    <p>Briefly summarize this concept: urban planning</p>
                                    <img src='/img/bulb_icon.png' alt='bulb_icon' />
                                </div>
                                <div className="card"
                                    onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}
                                >
                                    <p>Brainstorm team bonding activities for our work retreat</p>
                                    <img src='/img/message_icon.png' alt='message_icon' />
                                </div>
                                <div className="card"
                                    onClick={() => onSent("Improve the readability of the following code")}
                                >
                                    <p>Improve the readability of the following code</p>
                                    <img src='/img/code_icon.png' alt='code_icon' />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="result">
                            <div className="result-title">
                                <img src="/img/user_icon.png" alt="user_icon" />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className="result-data">
                                <img src='/img/gemini_icon.png' alt='gemini_icon' />
                                {loading
                                    ?
                                    <div className='loader'>
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                    :
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                }
                            </div>
                        </div>
                    )
                }

                <div className='main-bottom relative'>
                    {/* //showing wave when click on mic button  */}
                    {showWave && <VoiceLoader />}
                    <div className="search-box">
                        <input type="text" placeholder='Enter a prompt here'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div>
                            <img src="/img/gallery_icon.png" alt="gallery_icon" />
                            {/* //for voice recognition */}
                            <div className='mic_box'
                                onClick={() => { handleVoiceInput(); setListening(true); playSound(); }}
                            >
                                <img src="/img/mic_icon.png" alt="mic_icon" />
                            </div>
                            {
                                input ?
                                    <div className='mic_box'
                                        onClick={() => onSent()}
                                    >
                                        <img src="/img/send_icon.png" alt=""

                                        />
                                    </div>

                                    :
                                    null
                            }
                        </div>
                    </div>

                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>

            {/* Audio element */}
            <audio ref={audioRef}>
                <source src="/img/gemini.wav" type="audio/wav" />
                Your browser does not support the audio element.
            </audio>
        </div>
    )
}

export default Main