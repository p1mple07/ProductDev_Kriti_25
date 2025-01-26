import getEnhancingPrompt, { extractJsonFromResponse } from "./enhancingPrompt";
import { updateHtmlContent } from "./addImage";

export const HandleEnhance = async ({ prompt,oldCode, chat, setChat, updateChat, generateResponse }) => {
  if (!prompt.trim()) return;

  const formattedPrompt = getEnhancingPrompt(prompt,oldCode);

  try {
    const responseText = await generateResponse(formattedPrompt);
    if (!responseText) return;

    const responseData = extractJsonFromResponse(responseText);
    if (!responseData) return;
    const htmlWithImage = await updateHtmlContent(responseData.html);

    // Structure response
    const newEntry = {
      prompt,
      response: {
        textOverview: responseData.textOverview || "No overview provided.",
        html: htmlWithImage || "",
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