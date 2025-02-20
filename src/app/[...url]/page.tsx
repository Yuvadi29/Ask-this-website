import ChatWrapper from "../components/ChatWrapper";
import { ragChat } from "../lib/rag-chat";
import { redis } from "../lib/redis";

interface PageProps {
    params: Promise<{ url: string | string[] | undefined }>; // ✅ `params` is async in Next.js 15
}

function reconstructUrl(url: string[]) {
    return url.map(decodeURIComponent).join("/");
}

const sessionId = "demo";

const Page = async ({ params }: PageProps) => {
    const resolvedParams = await params; // ✅ Await params before accessing it
    const reconstructedUrl = reconstructUrl(resolvedParams.url as string[]);

    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);

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

    return <div>
        <ChatWrapper sessionId={sessionId} />
    </div>;
};

export default Page;
