import React, { useContext } from 'react'
import "./Sidebar.scss"
import { useState } from 'react'
import { GeminiContext } from '../../context/Context'

const Sidebar = () => {
    const [extended, setExtended] = useState(true)
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(GeminiContext)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    return (
        <div className='sidebar'>
            <div className='top'>
                <div className='top-menu'>
                    <img className='menu' src='/img/menu_icon.png' alt='menuIcon' style={{ cursor: 'pointer' }}
                        onClick={() => setExtended(!extended)}
                    />
                    <div onClick={() => newChat()} className="new-chat">
                        <img src='/img/plus_icon.png' alt='plyus_icon' />
                        {extended ? <p>New Chat</p> : null}
                    </div>
                </div>
                {extended ?
                    <div className='recent'>
                        <p className="recent-title">Recent</p>
                        {/* //left side bar data  */}
                        {prevPrompts.map((item, index) => {
                            return (
                                <div key={index} className="recent-entry"
                                    onClick={() => loadPrompt(item)}
                                >
                                    <img src="/img/message_icon.png" alt="message_icon" />
                                    <p title={item}>{item.slice(0, 18)}...</p>
                                </div>
                            )
                        })}

                    </div>
                    :
                    null
                }
            </div>
            <div className='bottom'>
                <div className="bottom-item recent-entry">
                    <img src="/img/question_icon.png" alt="question_icon" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src="/img/history_icon.png" alt="history_icon" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src="/img/setting_icon.png" alt="setting_icon" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar