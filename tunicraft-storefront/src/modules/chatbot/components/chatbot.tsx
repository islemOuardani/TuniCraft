"use client"

import { useState } from "react"

const Chatbot = () => {
    const [input, setInput] = useState("")
    const [response, setResponse] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const res = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({ message: input }),
            headers: { "Content-Type": "application/json" },
        })
        const data = await res.json()
        setResponse(data.choices[0].message.content)
    }

    return (
        <div className="p-4 border rounded-lg shadow">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="border p-2 w-full"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pose une question..."
                />
                <button type="submit" className="mt-2 bg-blue-500 text-white p-2">
                    Envoyer
                </button>
            </form>
            <div className="mt-4 p-2 bg-gray-100 rounded">{response}</div>
        </div>
    )
}

export default Chatbot
