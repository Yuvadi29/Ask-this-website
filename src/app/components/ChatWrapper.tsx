'use client';

import { Message, useChat } from 'ai/react';
import React from 'react';
import Messages from './Messages';
import ChatInput from './ChatInput';

const ChatWrapper = ({ sessionId, initialMessages }: { sessionId: string, initialMessages: Message[] }) => {
    const { messages, handleInputChange, handleSubmit, input, setInput } = useChat({
        api: "/api/chat-stream",
        body: { sessionId },
        initialMessages,
    })

    return (
        <div className='relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between'>
            <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
                <Messages messages={messages} />
            </div>

            {/* Input Box */}
            <ChatInput
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                setInput={setInput}
            />
        </div>
    )
}

export default ChatWrapper