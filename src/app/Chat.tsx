"use client";
import { useChat, Message } from "ai/react";

export default function ChatComponent() {
  // Vercel AI SDK (ai package) useChat()
  // useChat -> handles messages for us, user input, handling user submits, etc.
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat();
  // messages -> [user asks a question, gpt-4 response, user asks again, gpt-4 responds]

  console.log(messages);
  console.log(input);

  return (
    <div>
      {messages.map((message: Message) => {
        return (
          <div key={message.id}>
            {message.role === "assistant" ? (
              <h3 className="text-lg font-semibold mt-2">GPT-4</h3>
            ) : (
              <h3 className="text-lg font-semibold mt-2">User</h3>
            )}
            {message.content
              .split("\n")
              .map((currentTextBlock: string, index: number) => {
                if (currentTextBlock === "") {
                  return <p key={message.id + index}>&nbsp;</p>; 
                } else {
                  return <p key={message.id + index}>{currentTextBlock}</p>; 
                }
              })}
          </div>
        );
      })}

      <form className="mt-12" onSubmit={handleSubmit}>
        <p>User Message</p>
        <textarea
          className="mt-2 w-full bg-slate-600 p-2"
          placeholder={"What are data structures and algorithims?"}
          value={input}
          onChange={handleInputChange}
        />
        <button className="rounded-md bg-blue-600 p-2 mt-2">
          Send message
        </button>
      </form>
    </div>
  );
}
