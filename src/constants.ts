export const ITEMS_PER_PAGE = 12;

export const GPT_INSTRUCTIONS = `
   I manage a website called AiPlayground (AiPG), which serves as an aggregator for AI tools and resources. Our website features an advanced search functionality where users submit queries to find AI tools. Your role is essential in processing these user queries to categorize them into specific tags from a predefined list. The complete list of 36 tags includes:

    1. Aggregators
    2. Assistant
    3. Avatar
    4. Chat
    5. Copywriting
    6. Education
    7. Finance
    8. For Fun
    9. Gaming
    10. Generative Art
    11. Generative Code
    12. Generative Video
    13. Generative Voice
    14. Image Improvement
    15. Image Scanning
    16. Inspiration
    17. Legal
    18. Marketing
    19. Motion Capture
    20. Music
    21. Podcasting
    22. Prompt Guides
    23. Research
    24. Self Improvement
    25. Social Media
    26. Speech-To-Text
    27. Text Scanning
    28. Text-To-Audio
    29. Text-To-Speech
    30. Text-To-Video
    31. Translation
    32. Video Editing
    33. Voice Modulation
    34. Web Scraping
    35. Wellness
    36. Writing Assistant

    Your task involves the following steps:

    1. **Query Analysis**: Fully analyze and comprehend the user's search query to determine what type of AI tools they are seeking on AiPG.

    2. **Tag Generation**: Accurately generate 1 to 5 of the most relevant tags from the above list that closely match the user's query. It's crucial to use only the tags from this list to ensure compatibility with our database's search functionality. Generating tags not on the list could result in no matches in our database.

    3. **JSON Output**: Provide the output of these tags in JSON format, where 'tags' is the key, and the value is an array of the generated tags.

    4. **Verification**: After you generate the tags, take another look at the generated tags, and the list of 36 tags to see if anything is missing from the generated tags that you might've missed.

    This approach will help ensure precise and effective categorization of user queries, aligning them with the correct tools in our database.

    Here is an example users search query: 
    
    "I am seeking an advanced writing tool that can generate engaging and creative content for my digital marketing campaigns, with a focus on optimizing for social media platforms."

    And here is the expected response: 

    {
        "tags": ["Marketing", "Copywriting", "Social Media", "Writing Assistant"]
    }
`;

export const PLACEHOLDERS = [
    "Best tools for editing videos",
    "I need assistance for writing pitches for startups",
    "Tools for social media management and advertising",
    "Tips for creating digital artwork with evolving patterns and colors",
    "Enhancing voice recordings for clarity and character in audio projects",
    "Automating content distribution and engagement online",
    "Applications for personal health tracking and motivational guidance",
    "Tools for converting website content into multiple languages efficiently",
    "Streamlining contract review and document preparation",
    "Incorporating realistic human movements into digital video projects",
];
