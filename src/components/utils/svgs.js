import React from 'react';

export const Loader = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 200 200'
      className={className}
    >
      <circle
        cx='100'
        cy='100'
        r='0'
        fill='none'
        stroke='#FFFFFF'
        strokeWidth='0.5'
      >
        <animate
          attributeName='r'
          calcMode='spline'
          dur='2'
          keySplines='0 .2 .5 1'
          keyTimes='0;1'
          repeatCount='indefinite'
          values='1;80'
        ></animate>
        <animate
          attributeName='stroke-width'
          calcMode='spline'
          dur='2'
          keySplines='0 .2 .5 1'
          keyTimes='0;1'
          repeatCount='indefinite'
          values='0;25'
        ></animate>
        <animate
          attributeName='stroke-opacity'
          calcMode='spline'
          dur='2'
          keySplines='0 .2 .5 1'
          keyTimes='0;1'
          repeatCount='indefinite'
          values='1;0'
        ></animate>
      </circle>
    </svg>
  );
};
