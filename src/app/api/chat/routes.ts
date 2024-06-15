
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream,StreamingTextResponse } from "ai";

export const runtime = 'edge';

const config = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
})
const open_ai = new OpenAIApi(config);
export async function POST(request:Request){
    const {messages} = await request.json();

    console.log(messages,"message")


    const response= await open_ai.createChatCompletion({
        model:'gpt-4',
        stream:true,
        messages:[
            {role:"system",content:"you are a helpful assistant. You explain Software concept simply to intermediate programmers"},
            ...messages
        ]
    })
 const stream = await OpenAIStream(response);

 return new StreamingTextResponse(stream)
}