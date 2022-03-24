import { BrowserRouter, Routes as RoutesDom, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import Map from "./pages/map/map";
import { Point } from "./pages/point/point";
import { NotFound } from "./pages/not-found/not-found";
import { Signup } from "./pages/signup/signup";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesDom>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/map" element={<Map />} />
        <Route path="/point" element={<Point />} />
        <Route path="*" element={<NotFound />} />
      </RoutesDom>
    </BrowserRouter>
  );
};
