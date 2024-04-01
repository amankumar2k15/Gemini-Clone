import { createContext, useState } from "react";
import runChat from "../config/gemini.jsx";

export const GeminiContext = createContext()

const GeminiContextProvider = ({ children }) => {

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord)
        }, 75 * index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)

    }

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)                             // loading chalegi
        setShowResult(true)                          // right side me jo (data) dikhra hai  or jo result dikhana hai

        let response;
        if (prompt !== undefined) {
            setRecentPrompt(prompt)                       // jo prompt bharunga vo prompt (input) dikha dega in right side 
            response = await runChat(prompt)
        } else {
            setPrevPrompts((prev) => [...prev, input])   // left side me previous filled (input) show krdunga isse me
            setRecentPrompt(input)
            response = await runChat(input)
        }

        let responseArray = response.split("**");
        let newResponse = ""
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 === 0) {
                newResponse += responseArray[i]
            } else {
                newResponse += `<b> ${responseArray[i]} </b>`
            }
        }
        let newResponse2 = newResponse.split("*").join("<br/>")

        let newResponseArray = newResponse2.split(" ")
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i]
            delayPara(i, nextWord + " ")
        }
        // setResultData(newResponse2)                        // res ko store krwa liya hai "resultData" me
        setLoading(false)                         // loading bad ho jygi
        setInput("")                              // response aate hi input empty ho jyga
    }

    const contextValue = {
        prevPrompts, setPrevPrompts, onSent, setRecentPrompt, recentPrompt, showResult, loading, resultData, input, setInput, newChat
    }

    return (
        <GeminiContext.Provider value={contextValue}>
            {children}
        </GeminiContext.Provider>
    )
}

export default GeminiContextProvider