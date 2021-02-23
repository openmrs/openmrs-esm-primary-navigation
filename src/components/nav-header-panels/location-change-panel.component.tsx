import React from "react";
import { HeaderPanel } from "carbon-components-react/es/components/UIShell";
import { HeaderPanelProps } from "carbon-components-react";
import { ChangeLocation } from "../choose-location/change-location.component";

interface ChangeLocationPanelProps extends HeaderPanelProps {
  refreshLocation(): void;
}

const LocationChangePanel: React.FC<ChangeLocationPanelProps> = ({
  expanded,
  refreshLocation
}) => {
  return (
    <HeaderPanel
      expanded={expanded}
      aria-label="Location"
      aria-labelledby="Location Icon"
    >
      <ChangeLocation
        LoadLocations={expanded}
        refreshLocation={refreshLocation}
      />
    </HeaderPanel>
  );
};

export default LocationChangePanel;
