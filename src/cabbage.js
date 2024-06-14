import { Carousel } from "@mantine/carousel";

const slides = [
  "https://media.gettyimages.com/id/1548121747/photo/topshot-in-this-photo-taken-on-july-22-2023-meira-paibis-women-activists-of-the-meiti.jpg?s=612x612&w=0&k=20&c=bo06t3ur-FveFbUgnFjuWwY-SoEPcfoa_RUzy-hF0s4=",
  "https://media.gettyimages.com/id/1627635211/photo/women-and-students-take-part-in-a-demonstration-demanding-for-the-restoration-of-peace-in.jpg?s=612x612&w=0&k=20&c=WoS2fuSeI-hATUKuX232ECd3A4Wksgim1BiDo4LpIeQ=",
  "https://media.gettyimages.com/id/1574205187/photo/army-personnel-stand-guard-as-demonstrators-protest-against-mass-burial-of-kuki-zomi-people.jpg?s=612x612&w=0&k=20&c=6H_T9rDP4dk0-csndhf5X4sv2-YhRxUFTyuCDoU3x6U=",
  "https://media.gettyimages.com/id/1556136292/photo/protesters-burn-an-effigy-of-mizoram-chief-minister-zoramthanga-along-the-national-highway-37.jpg?s=612x612&w=0&k=20&c=8HBtaojwIp6J9kO3a-GZJL3y3oLf37kkEUDnFtN6o3A=",
];

const CarouselElement = () => {
  return (
    <Carousel
      slideSize="33.33333%"
      slideGap="md"
      loop
      dragFree
      align="start"
      slidesToScroll={1}
      withIndicators
      height={300}
    >
      {slides.map((slide) => (
        <Carousel.Slide>
          <img height="400px" src={slide} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default CarouselElement;