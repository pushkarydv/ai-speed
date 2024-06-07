import { createOpenAI } from '@ai-sdk/openai';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
import { LangChainAdapter, StreamingTextResponse, streamText } from 'ai';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
export const runtime = 'edge';

export async function POST(req) {
  const { messages } = await req.json();
  const prompt = messages[messages.length - 1].content;
  try {
    // Initializing all services
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      model: 'text-embedding-3-small',
    });

    // const model = new ChatGroq({
    //   apiKey: process.env.GROQ_CLOUD_API_KEY,
    //   model: 'llama3-8b-8192',
    //   streaming: true,
    // });

    const openai = createOpenAI({
      // baseURL: 'https://api.groq.com/openai/v1',
      apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorStore = new PineconeStore(embeddings, { pineconeIndex });

    const results = await vectorStore.maxMarginalRelevanceSearch(prompt, {
      k: 5,
    });

    const documents = results.map((doc) => doc.pageContent).join('\n\n');
    const newPrompt = `Given the following documents, answer the query: ${prompt}\n\nDocuments:\n${documents}`;

    messages.push({ role: 'system', content: newPrompt });

    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      messages,
    });

    return result.toAIStreamResponse();
  } catch (err) {
    console.log(err);
    return Response.error({ message: 'An error occurred!' });
  }
}
