import React from 'react';
import Marquee from 'react-fast-marquee';
const PromptsMarquee = ({ executPrompt }) => {
  const RepresentationCard = ({ description, executPrompt }) => {
    return (
      <div
        className='relative h-20 aspect-video rounded-2xl z-0 mx-2 p-2 bg-white ring-1 ring-gray-100 cursor-pointer shadow-sm overflow-hidden'
        onClick={() => executPrompt(description)}
      >
        {description}
        <div className='absolute h-8 bottom-0 right-0 w-full bg-gradient-to-tl from-white to-white/0'></div>
        <div className='absolute h-8 bottom-0 right-0 w-full bg-gradient-to-t from-white to-white/0'></div>
      </div>
    );
  };
  return (
    <Marquee pauseOnHover={true}>
      <RepresentationCard executPrompt={executPrompt} description='How to implement ppr in next js?' />
      <RepresentationCard executPrompt={executPrompt} description='How to add a pink color button from shadcn' />
      <RepresentationCard executPrompt={executPrompt} description='Add a drawer from shadcn ui' />{' '}
      <RepresentationCard executPrompt={executPrompt} description='what type of event listerners are there in js dom' />
      <RepresentationCard executPrompt={executPrompt} description='what type of event listerners are there in js dom' />
      <RepresentationCard executPrompt={executPrompt} description='whats the difference between event bubbling and capturing' />
    </Marquee>
  );
};

export default PromptsMarquee;
