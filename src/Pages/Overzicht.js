// Dependencies
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

// Components
import CharacterList from "../Components/CharacterList";
import Loading from "../elements/Loading";

// Hooks
import useAnimes from "../hooks/getAnimes";

const Overzicht = () => {
  const { name } = useParams();
  const { isLoading, animes, removeAnime, error } = useAnimes([]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="page py-5 text-center container">
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
          const { testimage, title, description, characters } = anime;

          return (
            <div key={key} className="col-12 col-sm-6 col-lg-4 col-xl-3 pt-4">
              <div className="card h-100">
                {testimage && (
                  <img
                    src={`http://localhost:1337${testimage.url}`}
                    className="card-img-top animeimage"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{description.substring(0, 120)}</p>
                  <h5 className="card-title">Characters:</h5>
                  {/* Renders a list of charactes with swipeable carousel */}
                  <CharacterList characters={characters} />

                  {/* Prevent automatic function calling in map with () => */}
                  <button
                    className="btn btn-danger"
                    onClick={() => removeAnime(anime.id)}
                  >
                    Delete
                  </button>
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
