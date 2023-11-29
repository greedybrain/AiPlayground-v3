export interface IFooterNavItem {
  id: number;
  name: "Home" | "Privacy policy";
  path: string;
  _component?: JSX.Element;
  isAuthenticated?: boolean;
}

export default [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Privacy policy",
    path: "/privacy",
  },
] as IFooterNavItem[];
