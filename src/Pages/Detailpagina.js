import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Utilities
import { callApi } from "../utils";

// Components
import Loading from "../elements/Loading";

// arrow functie zelfde als function DetailPage() {}
// om props kun je laten zien door in te laden in de functie componenten
//zoals hieronder en dan kun je de props aanvragen. this. werkt niet in function componenten.
const DetailPage = (props) => {
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useparams is een standard react functie die het parameter makkelijker maakt. door het een zelf
  //gemaakt varbiale me te geven.
  const { id } = useParams();

  /* Data inladen en in state zetten */
  useEffect(() => {
    // const id = props.match.params.id; <-- useparams nu  useParams is beter te gebruiken.
    // dan wat hier staat const id = props.match.params.

    async function loadData() {
      try {
        const response = await callApi(`/characters/${id}`, "GET");

        setCharacter(response);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    setIsLoading(true);

    loadData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return character ? (
    <div className="container ctn mb-5 pb-5 mt-5">
      <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3 mt-2">
        <img
          src={`http://localhost:1337${character.image.url}`}
          className="col-3"
        />

        <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white col-xs-6">
          <div className="my-3 py-3">
            <h2 className="display-5">{character.name}</h2>
            <p className="lead">{character.Description.substring(0, 166)}</p>
          </div>

          <div className="bg-light shadow-sm mx-auto w-80 mb-5 col-4">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center text-dark">
                Age
                <span class="badge badge-primary badge-pill text-dark">
                  {character.age}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center text-dark">
                Main character?
                {character.mainchar ? (
                  <span class="badge badge-primary badge-pill text-dark">
                    yes
                  </span>
                ) : (
                  <span class="badge badge-primary badge-pill text-dark">
                    no
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Characters aan het laden...</p>
  );
};

export default DetailPage;
