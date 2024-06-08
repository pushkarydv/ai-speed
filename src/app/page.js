'use client';
import React, { useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import { marked } from 'marked';
import { Loader } from '@/components/utils/svgs';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/ai',
    });
  const [placeholder, setPlaceholder] = useState('');
  const prompts = [
    'How to implement ppr in next js?',
    'How to add a pink color button from shadcn',
    'Add a drawer from shadcn ui',
    'what type of event listerners are there in js dom',
    'what type of event listerners are there in js dom',
    'whats the difference between event bubbling and capturing',
  ];
  useEffect(() => {
    setPlaceholder(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);
  return (
    <div className='min-h-screen bg-orange-50 p-2'>
      <form
        onSubmit={handleSubmit}
        className={`flex items-center gap-2 w-[90%] md:w-full max-w-2xl p-2 bg-white  ring-1 ring-gray-100 rounded-full fixed z-10 left-1/2 -translate-x-1/2 ${
          messages.length === 0 ? 'bottom-1/2 translate-y-1/2' : 'bottom-8'
        }`}
      >
        <div className='fixed -top-6 left-4 z-10 bg-gradient-to-tr from-sky-400 to-blue-500 text-white text-sm px-1 rounded-md'>
          Fast Mode⏩
        </div>
        <input
          type='text'
          disabled={isLoading}
          value={input}
          onChange={handleInputChange}
          name='prompt'
          placeholder={placeholder}
          required
          autoComplete='off'
          className='w-full rounded-full py-1 px-2 outline-none border-none bg-transparent'
        />
        <button
          type='submit'
          disabled={isLoading}
          className='bg-orange-500 text-white rounded-full py-1 px-2 disabled:bg-orange-300'
        >
          {isLoading ? <Loader className='w-6' /> : 'Generate'}
        </button>
      </form>

      <div className='text-xs font-mono flex justify-center items-center flex-wrap gap-2 fixed bottom-2 left-0 w-full'>
        <a
          href='https://x.com/pushkaryadavin/'
          target='_blank'
          rel='noopener noreferrer'
          className='underline'
        >
          @pushkaryadavin
        </a>
        |
        <a
          href='http://labs.writewrap.in/'
          target='_blank'
          rel='noopener noreferrer'
          className='underline'
        >
          WriteWrap Labs
        </a>
      </div>
      <div className='prose max-w-4xl mx-auto pt-4 pb-16'>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-4 sm:max-w-2xl md:max-w-3xl w-fit rounded-xl shadow shadow-orange-100 px-3 py-1 prose-add ${
              m.role === 'user'
                ? 'mr-0 ml-auto bg-orange-400 border-t-2 border-t-orange-300 border-b-2 border-b-orange-500 text-white'
                : 'bg-white'
            }`}
            dangerouslySetInnerHTML={{
              __html: m.content ? marked.parse(m.content) : '',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
