// Dependencies
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper.scss";

SwiperCore.use([Autoplay]);

export default ({ characters }) => (
  <Swiper autoplay={{ delay: 2000 }} spaceBetween={20} slidesPerView={2}>
    {characters.map((char, key) => (
      <SwiperSlide key={key}>
        <NavLink
          className="nav-link"
          exact
          activeClassName="active"
          to={`/detail/${char.id}`}
        >
          {char.name}
        </NavLink>
      </SwiperSlide>
    ))}
  </Swiper>
);
