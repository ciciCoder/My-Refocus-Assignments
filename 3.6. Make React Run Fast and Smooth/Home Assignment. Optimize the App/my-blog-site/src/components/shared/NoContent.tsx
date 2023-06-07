import React from 'react';
import 'animate.css';

export default function NoContent() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1 className="flex item-center text-3xl text-slate-700 underline underline-offset-8 font-bold animate__animated animate__bounceInRight">
        NO BLOG POSTS TO DISPLAY
      </h1>
    </div>
  );
}
