import { Link } from 'react-router-dom'

/*
  Component: Logo
  Description: The main logo which is filled in by the Strapi GET request response
  Params: logo 
*/
export default ({ logo }) => (
  <Link to="/"><img
    src={`http://localhost:1337${logo.siteLogo.url}`}
    className="logo"
    alt="main-logo"
  /></Link>
);
