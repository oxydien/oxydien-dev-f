import { defineStore } from "pinia";

export const useRouteStore = defineStore("router", {
  state: () => {
    return {
      currentRoute: "index",
      routeDetails: routeList[0],
    };
  },
  actions: {
    changeRoute(route) {
      console.log("ROUTER", `Switching to /?route=${route}`);
      this.currentRoute = route;
      this.routeDetails = routeList.find((Route) => Route.loc === route) || {};
      changeRouteParam(route);
    },
  },
});

function changeRouteParam(route) {
  const currentUrl = new URL(window.location.href);

  if (route !== "index") {
    currentUrl.searchParams.set("route", route);
  } else {
    currentUrl.searchParams.delete("route");
  }

  currentUrl.pathname = '/';

  window.history.replaceState({}, "", currentUrl.toString());
}


export const routeList = [
  {
    name: "index",
    loc: "index",
    icon: "HomeIcon",
    priority: 600,
    overlay: true,
  },
  {
    name: "about",
    loc: "index#about",
    icon: "UserIcon",
    priority: 71,
    overlay: true,
  },
  {
    name: "contact",
    loc: "contact",
    icon: "ChatIcon",
    priority: 70,
    overlay: true,
  },
  {
    name: "projects",
    loc: "projects",
    icon: "WindowIcon",
    priority: 68,
    overlay: true,
  },
  {
    name: "videos",
    loc: "videos",
    icon: "VideoIcon",
    priority: 67,
    overlay: true,
  },
  {
    name: "more",
    loc: "switch",
    icon: "MoreIcon",
    priority: 65,
    overlay: true,
  },
  {
    name: "wiki",
    loc: "wiki",
    priority: 32,
    overlay: false,
  },
  {
    name: "stream_loading",
    loc: "str_lo",
    priority: 12,
    overlay: false,
  },
  {
    name: "stream_start",
    loc: "str_st",
    priority: 12,
    overlay: false,
  },
  {
    name: "stream_pause",
    loc: "str_po",
    priority: 12,
    overlay: false,
  },
  {
    name: "stream_end",
    loc: "str_en",
    priority: 12,
    overlay: false,
  },
];
