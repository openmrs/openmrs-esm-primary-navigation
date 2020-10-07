import React from "react";
import { LoggedInUser } from "../types";
import { Location20, UserAvatar20 } from "@carbon/icons-react";
import {
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction
} from "carbon-components-react";
import LocationChangePanel from "./nav-header-panels/location-change-panel.component";
import UserMenuPanel from "./nav-header-panels/user-menu-panel.component";

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
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName prefix="">OpenMRS</HeaderName>

            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="Location"
                aria-labelledby="Location Icon"
                onClick={evt => togglePanel("location")}
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
                onClick={evt => togglePanel("userMenu")}
              >
                <UserAvatar20 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
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
