import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "../../styles/Carousel.css"

export default function App() {
  const slides = [
    "../../../public/images/carousel1.jpg",
    "../../../public/images/carousel2.jpg",
    "../../../public/images/carousel3.jpg",
    "../../../public/images/carousel4.jpg",
    "../../../public/images/carousel5.jpg",
    "../../../public/images/carousel6.jpg",
    "../../../public/images/carousel7.jpg",
    "../../../public/images/carousel8.jpg",
    "../../../public/images/carousel9.jpg",
    "../../../public/images/carousel10.jpg",
    "../../../public/images/carousel11.png",
    "../../../public/images/carousel12.png"
  ];
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
        pagination={{clickable:true}}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          slides.map((url,id)=>(
            <SwiperSlide key={id}>
              <img src={url} alt={`carousel-item${id+1}`}/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}

