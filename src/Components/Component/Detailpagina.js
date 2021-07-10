import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// arrow functie zelfde als function DetailPage() {}
// om props kun je laten zien door in te laden in de functie componenten
//zoals hieronder en dan kun je de props aanvragen. this. werkt niet in function componenten.
const DetailPage = (props) => {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);

  // useparams is een standard react functie die het parameter makkelijker maakt. door het een zelf
  //gemaakt varbiale me te geven.
  const { name } = useParams();

  /* Data inladen en in state zetten */
  useEffect(() => {
    // const id = props.match.params.id; <-- useparams nu  useParams is beter te gebruiken.
    // dan wat hier staat const id = props.match.params.

    async function loadData() {
      try {
        const response = await axios.get(
          `http://localhost:1337/characters?name=${name}`
        );
        setPokemon(response.data);
      } catch (error) {
        setError(error);
      }
    }

    loadData();
  }, []);

  console.log("POKEMON", pokemon);

  return (
    <div className="container ctn mb-5 pb-5 mt-5">
      <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3 mt-2">
        {pokemon.map((pok, key) => (
          <img
            key={key}
            src={`http://localhost:1337${pok.image.url}`}
            className="col-3"
            alt="..."
          ></img>
        ))}
        <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white col-xs-6">
          {pokemon.map((char, key) => (
            <div className="my-3 py-3">
              <h2 className="display-5">{char.name}</h2>
              <p className="lead">{char.Description.substring(0, 166)}</p>
            </div>
          ))}
          <div className="bg-light shadow-sm mx-auto w-80 mb-5 col-4">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center text-dark">
                Age
                {pokemon.map((char, key) => (
                  <span class="badge badge-primary badge-pill text-dark">
                    {char.age}
                  </span>
                ))}
              </li>

              {pokemon.map((char, key) => {
                return (
                  <li className="list-group-item d-flex justify-content-between align-items-center text-dark">
                    Main character?
                    {char.mainchar ? (
                      <span class="badge badge-primary badge-pill text-dark">
                        yes
                      </span>
                    ) : (
                      <span class="badge badge-primary badge-pill text-dark">
                        no
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
