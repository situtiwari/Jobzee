import React, {useContext} from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./heroSection";
import HowItWorks from "./howItWorks";
import PopularCompanies from "./popularCompanies";
import PopularCategories from "./popularCategories";

const Home = () => {
  const {isAuthorized} = useContext(Context);
  if(!isAuthorized){
    return <Navigate to={'/login'}/>
  }
  return <section className="homePage page">
   <HeroSection/>
   <HowItWorks/>
   <PopularCategories/>
   <PopularCompanies/>

  </section>
}

export default Home;
