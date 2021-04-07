import * as React from "react";

interface LogoProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({
  width = "110",
  height = "40",
  src,
  alt
}) => {
  return (
    <>
      {src ? (
        <img src={src} alt={alt} width={width} height={height} />
      ) : (
        <svg role="img" width={width} height={height}>
          <use xlinkHref="#omrs-logo-partial-grey"></use>
        </svg>
      )}
    </>
  );
};

export default Logo;
