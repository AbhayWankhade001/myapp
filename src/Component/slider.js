/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./App.css"
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Router, Link } from "react-router-dom";
import ReactDOM from "react-dom";


export default () => {



  const [activeIndex, setActiveIndex] = useState(0);

  return (

    <>

      <div className="res">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          cssMode={true}


        >
          <SwiperSlide>
            <img src="./Frame.png" alt="" />
            <div className={`slider-slide-text swiper-slide ${activeIndex === 0 ? "active" : ""}`} role="group">
              Be Kind to you !
            </div>
            <div className={`para_slider-slide swiper-slide ${activeIndex === 0 ? "active" : ""}`} role="group">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  incididunt ut labore et
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src="./Frame 2372.png" className="img2372" alt="" />
            <div className={`slider-slide-text swiper-slide ${activeIndex === 1 ? "active" : ""}`} role="group">
              Be Kind to you !
            </div>
            <div className={`para_slider-slide swiper-slide ${activeIndex === 1 ? "active" : ""}`} role="group">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  incididunt ut labore et
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src="./Frame.png" alt="" />
            <div className={`slider-slide-text swiper-slide ${activeIndex === 2 ? "active" : ""}`} role="group">
              Be Kind to you !
            </div>
  

            <div className={`para_slider-slide swiper-slide ${activeIndex === 2 ? "active" : ""}`} role="group">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              <Link to="../ImageSelector"><button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Let's gooo!</button></Link>
            </div>


          </SwiperSlide>
          <div className="swiper-button-next">
            <img src="./arrow-right.png" />
          </div>
          <div className="swiper-button-prev">
            <img src="./left-arrow.png" />
          </div>

        </Swiper>
      </div>
  
    </>

  );
};

