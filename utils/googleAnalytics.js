import ReactGA from "react-ga";
export const initGA = (id) => {
    ReactGA.initialize(id);
};
export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};
