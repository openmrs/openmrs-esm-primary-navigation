import React from "react";
import Location20 from "@carbon/icons-react/es/location/20";
import UserAvatar20 from "@carbon/icons-react/es/user--avatar/20";
import LocationChangePanel from "./nav-header-panels/location-change-panel.component";
import UserMenuPanel from "./nav-header-panels/user-menu-panel.component";
import SideMenuPanel from "./nav-header-panels/side-menu-panel.component";
import { navigate } from "@openmrs/esm-config";
import {
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction
} from "carbon-components-react/es/components/UIShell";
import { LoggedInUser } from "../types";

const HeaderLink: any = HeaderName;

export interface NavbarProps {
  user: LoggedInUser;
  allowedLocales: Array<string>;
  onLogout(): void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, allowedLocales }) => {
  const headerRef = React.useRef(null);
  const [activeHeaderPanel, setActiveHeaderPanel] = React.useState<string>(
    null
  );
  const isActivePanel = (panelName: string) => {
    return activeHeaderPanel == panelName;
  };

  const togglePanel = (panelName: string) => {
    panelName === activeHeaderPanel
      ? setActiveHeaderPanel(null)
      : setActiveHeaderPanel(panelName);
  };

  const hidePanel = () => {
    setActiveHeaderPanel(null);
  };

  const handleClickOutside = event => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      hidePanel();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={headerRef}>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <Header aria-label="OpenMRS">
            <HeaderMenuButton
              aria-label="Open menu"
              isCollapsible
              onClick={() => togglePanel("sideMenu")}
              isActive={isActivePanel("sideMenu")}
            />
            <HeaderLink
              prefix=""
              onClick={() => {
                navigate({ to: "${openmrsSpaBase}/home" });
                hidePanel();
              }}
            >
              OpenMRS
            </HeaderLink>
            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="Location"
                aria-labelledby="Location Icon"
                onClick={() => togglePanel("location")}
                isActive={isActivePanel("location")}
                name="LocationIcon"
              >
                <Location20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Users"
                aria-labelledby="Users Avator Icon"
                name="Users"
                isActive={isActivePanel("userMenu")}
                onClick={() => togglePanel("userMenu")}
              >
                <UserAvatar20 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            <SideMenuPanel expanded={isActivePanel("sideMenu")} />
            <LocationChangePanel
              expanded={isActivePanel("location")}
              refreshLocation={hidePanel}
            />
            <UserMenuPanel
              user={user}
              expanded={isActivePanel("userMenu")}
              allowedLocales={allowedLocales}
              onLogout={onLogout}
            />
          </Header>
        )}
      />
    </div>
  );
};

export default Navbar;
