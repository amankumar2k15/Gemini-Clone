import React, { useContext } from 'react'
import "./Main.scss"
import { GeminiContext } from '../../context/Context'

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(GeminiContext)


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
                                <div className="card">
                                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                                    <img src='/img/compass_icon.png' alt='compass_icon' />
                                </div>
                                <div className="card">
                                    <p>Briefly summarize this concept: urban planning</p>
                                    <img src='/img/bulb_icon.png' alt='bulb_icon' />
                                </div>
                                <div className="card">
                                    <p>Brainstorm team bonding activities for our work retreat</p>
                                    <img src='/img/message_icon.png' alt='message_icon' />
                                </div>
                                <div className="card">
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

                <div className='main-bottom'>
                    <div className="search-box">
                        <input type="text" placeholder='Enter a prompt here'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div>
                            <img src="/img/gallery_icon.png" alt="" />
                            <img src="/img/mic_icon.png" alt="" />
                            {
                                input ?
                                    <img src="/img/send_icon.png" alt=""
                                        onClick={() => onSent()}
                                    />
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
        </div>
    )
}

export default Main