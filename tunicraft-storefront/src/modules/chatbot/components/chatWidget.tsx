"use client"
import { useState } from "react"

export default function ChatWidget() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([{ from: "bot", text: "Hello, How can I help you ?" }])
    const [input, setInput] = useState("")

    const sendMessage = async () => {
        if (!input.trim()) return
        const newMessages = [...messages, { from: "user", text: input }]
        setMessages(newMessages)
        setInput("")

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({ message: input }),
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            setMessages([...newMessages, { from: "bot", text: data?.reply || "Erreur de réponse" }])
        } catch {
            setMessages([...newMessages, { from: "bot", text: "Erreur de connexion" }])
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {open ? (
                <div className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col border border-gray-300">
                    <div className="flex justify-between items-center p-3 border-b font-bold text-tunisianRed">
                        <span>Chat TuniCraft</span>
                        <button onClick={() => setOpen(false)}>&times;</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {messages.map((m, i) => (
                            <div key={i} className={`text-sm ${m.from === "bot" ? "text-gray-800" : "text-right text-tunisianRed"}`}>
                                {m.text}
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="message..."
                            className="w-full px-3 py-2 text-sm border rounded"
                        />
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className="bg-tunisianRed hover:bg-red-700 text-white rounded-full px-5 py-3 shadow-lg text-sm"
                >
                    💬 Need help ?
                </button>
            )}
        </div>
    )
}
