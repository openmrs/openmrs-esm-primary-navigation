import React from "react";
import { navigate } from "@openmrs/esm-config";
import UserAvatarFilledAlt20 from "@carbon/icons-react/es/user--favorite--alt--filled/20";
import Search20 from "@carbon/icons-react/lib/search/20";
import Add20 from "@carbon/icons-react/lib/add/20";
import Switcher20 from "@carbon/icons-react/lib/switcher/20";
import {
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Search
} from "carbon-components-react";
import LocationChangePanel from "./nav-header-panels/location-change-panel.component";
import UserMenuPanel from "./nav-header-panels/user-menu-panel.component";
import SideMenuPanel from "./nav-header-panels/side-menu-panel.component";
import Logo from "./logo.component";
import { LoggedInUser } from "../types";
import styles from "./navbar.scss";

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

  let [searchBarIsVisible, setSearchBarIsVisible] = React.useState<any>(false);

  let [closeSearchBar, setCloseSearchBar] = React.useState<any>(false);

  const setSearchBar = () => {
    setSearchBarIsVisible((searchBarIsVisible = true));
    if (searchBarIsVisible === true) {
      document
        .getElementById("searchBar")
        .classList.add(styles.searchOverlayOn);

      document.getElementById("searchIcon").classList.add(styles.search);
    } else {
      document
        .getElementById("searchBar")
        .classList.add(styles.searchOverlayOn);

      document
        .getElementById("searchIcon")
        .classList.add(styles.searchIconOverlayed.display.none);
    }
  };

  let closeSerachBarRef = React.useRef(null);

  let handleSearcbBarClose = e => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    setCloseSearchBar((closeSearchBar = true));
    setSearchBarIsVisible((searchBarIsVisible = false));
  };

  let closeTheSearchBar = () => {
    setCloseSearchBar((closeSearchBar = true));
    setSearchBarIsVisible((searchBarIsVisible = false));
  };

  return (
    <div ref={headerRef} className={styles.navbar}>
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
              <Logo />
            </HeaderLink>
            <HeaderGlobalBar>
              <HeaderGlobalAction className={styles.search} id="searchBar">
                <Search
                  placeHolderText="Search for Patient name or Id"
                  size="lg"
                  onBlur={handleSearcbBarClose}
                />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                id="searchIcon"
                aria-label="Patient Search"
                aria-labelledby="Search Avatar Icon"
                name="Searchpatient"
                onClick={setSearchBar}
              >
                <Search20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Create New patient"
                aria-labelledby="Add Avatar Icon"
                name="Create New patient"
              >
                <Add20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Users"
                aria-labelledby="Users Avatar Icon"
                name="Users"
                isActive={isActivePanel("userMenu")}
                onClick={() => togglePanel("userMenu")}
              >
                <UserAvatarFilledAlt20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Switcher"
                aria-labelledby="Switcher Avatar Icon"
                onClick={() => togglePanel("switcher")}
                isActive={isActivePanel("switcher")}
                name="Switcher"
              >
                <Switcher20 />
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
