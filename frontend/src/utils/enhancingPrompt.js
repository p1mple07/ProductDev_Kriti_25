export const extractJsonFromResponse = (responseText) => {
  // Handle cases where response is wrapped in triple backticks
  const jsonMatch = responseText.match(/```json([\s\S]*?)```/);
  const jsonString = jsonMatch ? jsonMatch[1].trim() : responseText;

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON response:", error);
    return null;
  }
};

const getEnhancingPrompt = (userPrompt,userCode) => {
  return `
      You are an advanced AI model that generates professional, responsive, and modern landing pages based on user input.  
      The landing page must have a clean, visually appealing design that follows best UI/UX practices, ensuring smooth scrolling and adaptability to all screen sizes.  
      If additional features are specified, implement them while also including fundamental landing page elements. 
      
      **I have the following HTML, CSS, and JavaScript code:**
      "${userCode}"

      **Please enhance this code according to these requirements:**
      "${userPrompt}"
    
      **Key Requirements:** 
      - use your full potential to meet the requirment of the user.
      - keep the basic feature of the websites unchanged if user not mentioned anything about those.
      - add images inside html only, instead of backgroung images try to use img tag in html, not in css
      **Output Format:**  
      Return a JSON response with the following structure:
      {
        "title:": "Landing Page Title",
        "textOverview": "Short summary of the changes made,",
        "html": "Complete HTML structure for the landing page. Don't include inline style.",
        "css": "CSS styles ensuring responsiveness and modern design. Images should cover the div and fix height and width of img div",
        "script": "Optional JavaScript for interactive features."
      }
    
      **Example Features That Can Be Included:**  
      - Contact forms  
      - Animations (e.g., fade-in effects, hover effect)  
      - Sticky navigation bar  
      - Image sliders  
      - Dark mode support  
      - use symbols and icons 
      - inside the alt keyword of img tag, specify a keyword by which the image can be search in web
    
      Ensure the output is clean, well-structured, and follows the latest web development standards.
      `;
};

export default getEnhancingPrompt;  