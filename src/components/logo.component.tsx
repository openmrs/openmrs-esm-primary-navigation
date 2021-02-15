import * as React from "react";

const Logo = ({ width = "110", height = "40" }) => {
  return (
    <svg role="img" width={width} height={height}>
      <use xlinkHref="#omrs-logo-partial-grey"></use>
    </svg>
  );
};

export default Logo;
