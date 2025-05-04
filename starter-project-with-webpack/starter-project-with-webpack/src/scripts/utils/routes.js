import HomePage from "../views/pages/home-page";
import DetailPage from "../views/pages/detail-page";
import AddStoryPage from "../views/pages/add-story-page";
import AboutPage from "../views/pages/about-page";
import LoginPage from "../views/pages/login-page";
import RegisterPage from "../views/pages/register-page";
import AuthApi from "../data/auth-api";

const routes = {
  "/": HomePage, // default route
  "/home": HomePage,
  "/detail/:id": DetailPage,
  "/add": AddStoryPage,
  "/about": AboutPage,
  "/login": LoginPage,
  "/register": RegisterPage,
};

const checkAuth = (url) => {
  const { isLoggedIn } = AuthApi.checkAuth();
  const protectedRoutes = ["/add", "/detail/:id"];
  const loginRoutes = ["/login", "/register"];

  // Extract base route without ID parameters
  const baseRoute = url.split("/").slice(0, 2).join("/");

  // Check if current route is a protected route that requires auth
  const isProtectedRoute = protectedRoutes.some((route) => {
    const routeBase = route.split("/").slice(0, 2).join("/");
    return baseRoute === routeBase;
  });

  // Check if current route is a login-related route
  const isLoginRoute = loginRoutes.some((route) => baseRoute === route);

  // Redirect logic
  if (isProtectedRoute && !isLoggedIn) {
    // Redirect to login if trying to access protected route while not logged in
    return "/login";
  }

  if (isLoginRoute && isLoggedIn) {
    // Redirect to home if trying to access login routes while already logged in
    return "/home";
  }

  return url;
};

const urlParser = (url) => {
  const parsedUrl = checkAuth(url);
  const splitUrl = parsedUrl.split("/").filter(Boolean);

  return {
    resource: splitUrl[0] || "",
    id: splitUrl[1] || null,
    verb: splitUrl[2] || null,
  };
};

const findRoute = (url) => {
  const { resource, id } = urlParser(url);
  const pathWithId = id ? `/${resource}/:id` : `/${resource}`;

  return routes[pathWithId] || routes["/"];
};

export { urlParser, findRoute };
