import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <h1>My Layout</h1>
      <Outlet />
    </div>
  );
};
