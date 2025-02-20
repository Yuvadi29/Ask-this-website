'use client';

import { useChat } from 'ai/react';
import React from 'react';
import Messages from './Messages';

const ChatWrapper = ({ sessionId }: { sessionId: string }) => {
    const { messages, handleInputChange, handleSubmit, input } = useChat({
        api: "/api/chat-stream",
        body: { sessionId },
    })

    return (
        <div className='relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between'>
            <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
                <Messages messages={messages}>
            </div>

            {/* Input Box */}
            <form onSubmit={handleSubmit}>
                <input
                    className='text-black'
                    value={input}
                    type="text"
                    onChange={handleInputChange}
                />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default ChatWrapper