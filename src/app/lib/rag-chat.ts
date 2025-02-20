import { RAGChat, upstash } from "@upstash/rag-chat";
import { redis } from "./redis";

// Logic for AI Chat
export const ragChat = new RAGChat({
    model: upstash("meta-llama/Meta-Llama-3-8B-Instruct", {
        apiKey: process.env.UPSTASH_QSTASH_TOKEN
    }),
    redis: redis,

});