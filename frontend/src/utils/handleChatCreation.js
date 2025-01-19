import getSystemPrompt, { extractJsonFromResponse } from "./systemPrompt";

export const handleChatCreation = async ({ prompt, file, generateResponse, createChat }) => {
  if (!prompt.trim() && !file) {
    return;
  }

  let finalPrompt = prompt;

  // If a file is provided, read its content
  if (file) {
    try {
      const fileText = await file.text();
      finalPrompt = `${prompt}\n\n${fileText}`;
    } catch (error) {
      console.error("Error reading file:", error);
      return;
    }
  }

  const formattedPrompt = getSystemPrompt(finalPrompt);

  try {
    const responseText = await generateResponse(formattedPrompt);
    if (!responseText) return;

    const responseData = extractJsonFromResponse(responseText);
    if (!responseData) return;

    // console.log("responseData", responseData);
    const newChat = {
      title: responseData.title || prompt.slice(0, 50),
      prompt: finalPrompt,
      response: {
        textOverview: responseData.textOverview || "No overview provided.",
        html: responseData.html || "",
        css: responseData.css || "",
        script: responseData.script || "",
      },
    };

    await createChat(newChat);
  } catch (error) {
    console.error("Error creating chat:", error);
  }
};