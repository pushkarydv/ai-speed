'use client';
import React, { useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import { marked } from 'marked';
import { Loader } from '@/components/utils/svgs';
import PromptsMarquee from '@/components/elements/PromptsMarquee';

export default function Home() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    api: '/api/ai',
  });
 

  const executPrompt = (description) => {
    setInput(description);
    setTimeout(() => {
      document.getElementById('generate-button').click();
    }, 500);
  };

  return (
    <div className='min-h-screen bg-orange-50 p-2'>
      {messages.length === 0 && (
        <div className='fixed z-0 w-full left-1/2 -translate-x-1/2 bottom-1/2 -translate-y-24 max-w-4xl mx-auto'>
          <PromptsMarquee executPrompt={executPrompt} />
          <div className='h-full bg-gradient-to-r from-orange-50 to-orange-50/0 w-24 absolute left-0 top-0 z-10'></div>
          <div className='h-full bg-gradient-to-l from-orange-50 to-orange-50/0 w-24 absolute right-0 top-0 z-10'></div>
        </div>
      )}
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
          placeholder="What's on your mind?"
          required
          autoComplete='off'
          className='w-full rounded-full py-1 px-2 outline-none border-none bg-transparent'
        />
        <button
          type='submit'
          disabled={isLoading}
          id='generate-button'
          className='bg-orange-500 text-white rounded-full py-1 px-2 disabled:bg-orange-300'
        >
          {isLoading ? <Loader className='w-6' /> : 'Generate'}
        </button>
      </form>

      <div className='text-xs font-mono flex justify-center items-center flex-wrap gap-2 fixed bottom-2 left-0 w-full'>
        <a
          href='https://twitter.com/pushkaryadavin/'
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
            className={`mb-4 w-full sm:max-w-2xl md:max-w-3xl sm:w-fit rounded-xl shadow shadow-orange-100 px-3 py-1 prose-add ${
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
