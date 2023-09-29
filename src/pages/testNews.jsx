import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function TestNews() {
    const items = Array.from({ length: 100 }).map((_, index) => (
        <img
            key={index}
            src={`https://picsum.photos/200/${Math.floor(
                Math.random() * (300 - 200 + 1) + 200
            )}`}
            style={{ width: "100%", borderRadius: "8px" }}
        />
    ));
    return (
        <div className="TestNews">
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
            >
                <Masonry>{items}</Masonry>
            </ResponsiveMasonry>
        </div>
    );
}
