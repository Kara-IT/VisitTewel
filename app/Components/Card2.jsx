import React from "react";

export default function Card({ image, title, category }) {
  return (
    <div className="h-96 lg:h-[480px] w-full overflow-hidden rounded-xl relative cursor-pointer group">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
        <div className="absolute bottom-0 p-6 text-white">
          <span className="bg-primary/20 px-3 py-1 rounded-full text-xs">
            {category}
          </span>
          <h3 className="text-xl font-medium mt-2">{title}</h3>
        </div>
      </div>
    </div>
  );
}
