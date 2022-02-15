import React from 'react'
import CompraFinal from "../../components/CompraFinal";
import profileData from "../../data/profile.json";
function Fallo() {
  return (
    <CompraFinal credit={profileData.profile.credit} type="failed"/>
  )
}

export default Fallo