import * as React from "react";

const Logo = ({ width = "110", height = "30" }) => {
  return (
    <svg role="img" width={width} height={height}>
      <use xlinkHref="#omrs-logo-full-grey"></use>
    </svg>
  );
};

export default Logo;
