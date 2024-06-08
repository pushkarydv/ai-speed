'use client';
import React, { useState } from 'react';
import { useChat, useCompletion } from 'ai/react';
import { marked } from 'marked';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/ai',
    });
  return (
    <div className='min-h-screen bg-orange-50 p-2'>
      <div className='fixed top-0 left-0 z-10 opacity-60'>llama-3 mode</div>
      <form
        onSubmit={handleSubmit}
        className={`flex items-center gap-2 w-[90%] md:w-full max-w-2xl p-2 bg-white ring-1 ring-gray-100 rounded-full fixed z-10 left-1/2 -translate-x-1/2 ${
          messages.length === 0 ? 'bottom-1/2 translate-y-1/2' : 'bottom-4'
        }`}
      >
        <input
          type='text'
          disabled={isLoading}
          value={input}
          onChange={handleInputChange}
          name='prompt'
          placeholder='What&apos;s up buddy'
          required
          autoComplete='off'
          className='w-full rounded-full py-1 px-2 outline-none border-none'
        />
        <button
          type='submit'
          disabled={isLoading}
          className='bg-orange-500 text-white rounded-full py-1 px-2 disabled:bg-orange-300'
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </form>

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
