"use client";

import React, { useState, useEffect } from 'react';

export function HeroSectionImages() {
  const cardImages = [
    "/hero_photos/main_3.jpg",
    "/hero_photos/main_1.jpg",
    "/hero_photos/main_2.jpg",
  ];

  return (
    <div className="relative w-[30vmin] h-[42vmin] group z-10">
      {cardImages.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full bg-cover bg-center rounded-[1vmin] transition-transform duration-300 ease-in-out border-2 border-highlight ${
            index === 0 ? '-translate-x-[10%] -rotate-1' :
            index === 1 ? 'rotate-2' :
            'translate-x-[10%] translate-y-[3%] rotate-5'
          } group-hover:shadow-[-2vmin_2vmin_3vmin_rgba(0,0,0,0.4)] ${
            index === 0 ? 'group-hover:-translate-x-[75%] group-hover:translate-y-[20%] group-hover:-rotate-24' :
            index === 1 ? 'group-hover:-translate-x-[25%] group-hover:translate-y-[8%] group-hover:-rotate-8' :
            'group-hover:translate-x-[75%] group-hover:translate-y-[16%] group-hover:rotate-24'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
};
