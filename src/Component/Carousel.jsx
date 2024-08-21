// import { ChevronLeft, ChevronRight } from "lucide-react";
// import React, { useEffect, useState } from "react";

// const Carousel = ({
//   children: slides,
//   autoSlide = false,
//   autoSlideInterval = 3000,
// }) => {
//   const [curr, setCurr] = useState(0);

//   const prev = () =>
//     setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

//   const next = () =>
//     setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

//   useEffect(() => {
//     if (!autoSlide) return;
//     const slideInterval = setInterval(next, autoSlideInterval);
//     return () => clearInterval(slideInterval);
//   }, [autoSlide, autoSlideInterval, next]);

//   return (
//     <div className="relative ">
//       <div
//         className="flex transition-transform ease-out duration-500 gap-4 "
//         style={{ transform: `translateX(-${curr * 100}%)` }}
//       >
//         {slides}
//       </div>
//       <div className="absolute inset-0 flex items-center justify-between p-4">
//         <button
//           onClick={prev}
//           className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
//         >
//           <ChevronLeft size={40} />
//         </button>

//         <button
//           onClick={next}
//           className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
//         >
//           <ChevronRight size={40} />
//         </button>
//       </div>

//       <div className="absolute bottom-4 right-0 left-0">
//         <div className="flex items-center justify-center gap-2">
//           {slides.map((_, i) => (
//             <div
//               className={`transition-all w-3 h-3 bg-white rounded-full ${
//                 curr === i ? "p-2" : "bg-opacity-50"
//               }`}
//             >
//               {" "}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carousel;
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";

const slides = [
  "https://media.gettyimages.com/id/1548121747/photo/topshot-in-this-photo-taken-on-july-22-2023-meira-paibis-women-activists-of-the-meiti.jpg?s=612x612&w=0&k=20&c=bo06t3ur-FveFbUgnFjuWwY-SoEPcfoa_RUzy-hF0s4=",
  "https://media.gettyimages.com/id/1627635211/photo/women-and-students-take-part-in-a-demonstration-demanding-for-the-restoration-of-peace-in.jpg?s=612x612&w=0&k=20&c=WoS2fuSeI-hATUKuX232ECd3A4Wksgim1BiDo4LpIeQ=",
  "https://media.gettyimages.com/id/1574205187/photo/army-personnel-stand-guard-as-demonstrators-protest-against-mass-burial-of-kuki-zomi-people.jpg?s=612x612&w=0&k=20&c=6H_T9rDP4dk0-csndhf5X4sv2-YhRxUFTyuCDoU3x6U=",
  "https://media.gettyimages.com/id/1556136292/photo/protesters-burn-an-effigy-of-mizoram-chief-minister-zoramthanga-along-the-national-highway-37.jpg?s=612x612&w=0&k=20&c=8HBtaojwIp6J9kO3a-GZJL3y3oLf37kkEUDnFtN6o3A=",
];

const CarouselElement = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (
    <Carousel
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      withIndicators
      height={300}
      // slideSize="100%" // Set this for full width on mobile
      slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
      slideGap={{ base: 0, sm: "md" }} // Adjust gap between slides
      loop
      align="start"

      // height={300}
    >
      {slides.map((slide) => (
        <Carousel.Slide>
          <img src={slide} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default CarouselElement;
