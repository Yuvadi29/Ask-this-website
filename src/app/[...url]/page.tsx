import { cookies } from "next/headers";
import ChatWrapper from "../components/ChatWrapper";
import { ragChat } from "../lib/rag-chat";
import { redis } from "../lib/redis";

interface PageProps {
    params: Promise<{ url: string | string[] | undefined }>; // ✅ `params` is async in Next.js 15
}

function reconstructUrl(url: string[]) {
    return url.map(decodeURIComponent).join("/");
}

const Page = async ({ params }: PageProps) => {
    const sessionCookie = (await cookies()).get("sessionId")?.value
    const resolvedParams = await params; // ✅ Await params before accessing it
    const reconstructedUrl = reconstructUrl(resolvedParams.url as string[]);

    const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g, "")

    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);

    const initialMessages = await ragChat.history.getMessages({
        amount: 10,
        sessionId
    })

    if (!isAlreadyIndexed) {
        await ragChat.context.add({
            type: "html",
            source: reconstructedUrl,
            config: {
                chunkOverlap: 50,
                chunkSize: 200,
            },
        });

        await redis.sadd("indexed-urls", reconstructedUrl);
    }

    return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />

};

export default Page;
