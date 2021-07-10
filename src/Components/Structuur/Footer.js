import React from "react";
import { callApi } from "../../utils";

function Footer() {
  const [logotje, setLogo] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function getData() {
      try {
        const data = await callApi("/logo", "GET");

        if (data.error) {
          throw data;
        }

        setLogo(data);
      } catch (error) {
        console.log("ERROR", error);
        setError(error);
      }
    }
    getData();
  }, []);

  return (
    <footer className="bg-light text-center text-lg-start">
    <div className="text-center p-3">
       <a className="text-dark" href="">{logotje.sitename}</a>
     </div>
   </footer>
  );
}

export default Footer;
