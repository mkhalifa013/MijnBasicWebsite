import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Autoplay } from "swiper"

// Import Swiper styles
import 'swiper/swiper.scss';

import { callApi } from "../../utils";


SwiperCore.use([Autoplay])

//een simple pagina
const Overzicht = () => {
  const [character, setCharacter] = React.useState([]);
  const [status, setStatus] = React.useState(null);
  const [animes, setAnimes] = React.useState([]);
  const [error, setError] = React.useState(null);

  {/* Retrieve data from Strapi / And Set in state*/}
  React.useEffect(() => {
    async function getData() {
      try {
        const data = await callApi("/animes", "GET");

        if (data.error) {
          throw data;
        }

        setAnimes(data);
      } catch (error) {
        console.log("ERROR", error);
        setError(error);
      }
    }
    getData();
  }, []);
  
  // Remove data from Strapi server
  const removeData = async (id) => {
    // DELETE request using fetch with async/await
     await callApi(`animes/${id}`, 'DELETE'); 
     removeAnimeFromReactState(id)   
  };
  
  // Filter deleted anime from local state in browser.
  const removeAnimeFromReactState = (id) => {
    // Make copy of current animes in react state
    const oldAnimeArray = animes 

    // Create new array with anime to be deleted filtered away from the new array
    const newAnimeArray = oldAnimeArray.filter((anime => anime.id !== id))

    // Update local react state with new array
    setAnimes(newAnimeArray)
  }

  const { name } = useParams();

  React.useEffect(() => {
    async function getDatacharc() {
      try {
        const data = await callApi("/characters", "GET");

        if (data.error) {
          throw data;
        }

        setCharacter(data);
      } catch (error) {
        console.log("ERROR", error);
        setError(error);
      }
    }
    getDatacharc();
  }, []);


    return (
    <div className="px-4 py-5 my-5 text-center container">
      <h2>Overzicht Pagina</h2>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Quickly design and customize responsive mobile-first sites with
          Bootstrap, the world’s most popular front-end open source toolkit,
          featuring Sass variables and mixins, responsive grid system, extensive
          prebuilt components, and powerful JavaScript plugins.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
            Characters
          </button>
        </div>
      </div>
        <div className="row">
        {error && <div className="alert bg-danger">{error.message}</div>}
          {animes.map((anime, key) => {
            return (
                <div key={key} className="col-sm-3 pt-4">
                  <div className="card">
                    {anime.testimage && (
                    <img
                      src={`http://localhost:1337${anime.testimage.url}`}
                      className="card-img-top animeimage"
                      alt="..."
                    />)}
                    <div className="card-body">
                      <h5 className="card-title">{anime.title}</h5>
                      <p className="card-text">{anime.description.substring(0, 120)}</p>
                      <h5 className="card-title">Characters:</h5>
                      <Swiper
                        autoplay={{ delay: 2000}}
                        spaceBetween={20}
                        slidesPerView={2}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                      >
                         {anime.characters.map((char, key) => <SwiperSlide> <NavLink className="nav-link" exact activeClassName="active" to={`/detail/${char.name}`}>
                         {char.name}
            </NavLink></SwiperSlide>)}
  
                      </Swiper>

                      {/* <ul className="list-unstyled">
                        {anime.characters.map(c => {
                          return <li>{c.name}</li>
                        })}
                      </ul> */}
                      {/* Prevent automatic function calling in map with () => */}
                      <button className="btn btn-danger" onClick={() => removeData(anime.id)}>Delete</button>
                    </div>
                    </div>
                  </div>
               
            );
          })}
          </div>
        </div>
  );
};

export default Overzicht;
