import React from "react";
import astros from "../../images/teamImages/astros.svg" 
import athletics from "../../images/teamImages/athletics.svg" 
import braves from "../../images/teamImages/braves.svg" 
import brewers from "../../images/teamImages/brewers.svg" 
import cubs from "../../images/teamImages/cubs.svg" 
import dodgers from "../../images/teamImages/dodgers.svg" 
import indians from "../../images/teamImages/indians.svg" 
import redsox from "../../images/teamImages/redsox.svg" 
import rockies from "../../images/teamImages/rockies.svg" 
import yankees from "../../images/teamImages/yankees.svg" 

const teamNameToLogo = team => {
  switch (team) {
    case "astros":
      return <img src={astros} height="20" alt="astros" />;
    case "athletics":
      return <img src={athletics} height="20" alt="athletics" />;
    case "braves":
      return <img src={braves} height="20" alt="braves" />;
    case "brewers":
      return <img src={brewers} height="20" alt="brewers" />;
    case "cubs":
      return <img src={cubs} height="20" alt="cubs" />;
    case "dodgers":
      return <img src={dodgers} height="20" alt="dodgers" />
    case "indians":
      return <img src={indians} height="20" alt="indians" />
    case "redsox":
      return <img src={redsox} height="20" alt="redsox" />
    case "rockies":
      return <img src={rockies} height="20" alt="rockies" />
    case "yankees":
      return <img src={yankees} height="20" alt="yankees" />
    // no default
  }
}

export default teamNameToLogo;