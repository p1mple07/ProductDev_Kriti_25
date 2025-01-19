import getSystemPrompt, { extractJsonFromResponse } from "./systemPrompt";

export const handleSend = async ({ prompt, chat, setChat, updateChat, generateResponse }) => {
  if (!prompt.trim()) return;

  const formattedPrompt = getSystemPrompt(prompt);

  try {
    const responseText = await generateResponse(formattedPrompt);
    if (!responseText) return;

    const responseData = extractJsonFromResponse(responseText);
    if (!responseData) return;

    // Structure response
    const newEntry = {
      prompt,
      response: {
        textOverview: responseData.textOverview || "No overview provided.",
        html: responseData.html || "",
        css: responseData.css || "",
        script: responseData.script || "",
      },
    };

    // Update chat state locally
    setChat((prevChat) => ({
      ...prevChat,
      promptsAndResponses: [...(prevChat?.promptsAndResponses || []), newEntry],
    }));

    // Send only the new prompt and response to the backend
    await updateChat(chat._id, newEntry);
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};