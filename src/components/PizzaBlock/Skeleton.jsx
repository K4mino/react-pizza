import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="130" /> 
    <rect x="0" y="291" rx="12" ry="12" width="280" height="24" /> 
    <rect x="1" y="337" rx="12" ry="12" width="280" height="88" /> 
    <rect x="-1" y="443" rx="8" ry="8" width="95" height="30" /> 
    <rect x="119" y="436" rx="13" ry="13" width="160" height="46" />
  </ContentLoader>
)

export default PizzaSkeleton