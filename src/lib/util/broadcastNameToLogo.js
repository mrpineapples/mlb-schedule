import React from "react"
import espn from "../../images/broadcastImages/espn.svg"
import fox from "../../images/broadcastImages/fox.svg" 
import fs1 from "../../images/broadcastImages/fs1.svg" 
import mlbnet from "../../images/broadcastImages/mlbnet.svg" 
import tbs from "../../images/broadcastImages/tbs.svg" 

const broadcastNameToLogo = name => {
  switch (name) {
    case "ESPN":
      return <img src={espn} height="12" alt="ESPN" />;
    case "FOX":
      return <img src={fox} height="12" alt="FOX" />;
    case "FS1":
      return <img src={fs1} height="12" alt="FS1" />;
    case "FS1-INT":
      return <img src={fs1} height="12" alt="FS1" />;
    case "MLBN":
      return <img src={mlbnet} height="20" alt="MLB Network" />;
    case "TBS":
      return <img src={tbs} height="12" alt="TBS" />
    default:
      return null
  }
}

export default broadcastNameToLogo;