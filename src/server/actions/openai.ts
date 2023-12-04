import { GPT_INSTRUCTIONS } from "@/constants";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_CLIENT_SECRET ?? "",
});

export const convertUserQueryToTags = async (userQuery: string) => {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: GPT_INSTRUCTIONS,
                },
                {
                    role: "user",
                    content: userQuery,
                },
            ],
        });

        const response = chatCompletion.choices[0].message.content;

        if (response) {
            const responseAsObj = JSON.parse(response) as Record<
                string,
                string[]
            >;

            return {
                tags: responseAsObj.tags,
                message: "Tags generated",
                success: true,
            };
        }

        return {
            message: "Failed to generate tags",
            success: false,
        };
    } catch (error: any) {
        return {
            message: error.message,
            success: false,
        };
    }
};
