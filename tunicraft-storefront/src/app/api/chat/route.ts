import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json()

        if (!message || typeof message !== "string") {
            return NextResponse.json({ error: "Message invalide." }, { status: 400 })
        }

        // Remplace par ta vraie clé OpenRouter ici
        const OPENROUTER_API_KEY = "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"

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "mistralai/mistral-7b-instruct",
                messages: [
                    { role: "user", content: message }
                ],
                temperature: 0.7
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error("OpenRouter Error:", errorText)
            return NextResponse.json({ error: "Erreur OpenRouter", details: errorText }, { status: 500 })
        }

        const data = await response.json()

        const reply = data?.choices?.[0]?.message?.content || "Aucune réponse générée."
        console.log("Réponse OpenRouter :", reply)


        return NextResponse.json({ reply })
    } catch (err) {
        console.error("Erreur serveur :", err)
        return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 })
    }
}
