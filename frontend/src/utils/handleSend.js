import getSystemPrompt, { extractJsonFromResponse } from "./systemPrompt";
import { updateHtmlContent } from "./addImage";
import { toast } from 'sonner';

export const handleSend = async ({ prompt, chat, setChat, setCodeVersion, updateChat, generateResponse }) => {
  if (!prompt.trim()) return;

  const formattedPrompt = getSystemPrompt(prompt);

  try {
    // Optimistic update with loading state
    setChat((prevChat) => ({
      ...prevChat,
      promptsAndResponses: [
        ...(prevChat?.promptsAndResponses || []),
        {
          prompt,
          response: { textOverview: "Generating response..." }
        }
      ]
    }));

    // Generate and process response
    const responseText = await generateResponse(formattedPrompt);
    if (!responseText) {
      throw new Error("Failed to generate response");
    }

    const responseData = extractJsonFromResponse(responseText);
    if (!responseData) {
      throw new Error("Invalid response format");
    }

    const htmlWithImage = await updateHtmlContent(responseData.html);

    // Update local state with final response
    setChat((prevChat) => ({
      ...prevChat,
      promptsAndResponses: [
        ...(prevChat?.promptsAndResponses || []).slice(0, -1),
        {
          prompt,
          response: { textOverview: responseData.textOverview || "No overview provided." }
        }
      ]
    }));

    // Send to backend
    await updateChat(chat._id, {
      prompt,
      response: {
        textOverview: responseData.textOverview || "No overview provided.",
        html: htmlWithImage || "",
        css: responseData.css || "",
        script: responseData.script || ""
      }
    }, setCodeVersion);

  } catch (error) {
    // Revert optimistic update
    setChat((prevChat) => ({
      ...prevChat,
      promptsAndResponses: (prevChat?.promptsAndResponses || []).slice(0, -1)
    }));
    
    // Show error toast
    toast.error(error.message || "Failed to process your request");
    console.error("Error handling message:", error);
  }
};