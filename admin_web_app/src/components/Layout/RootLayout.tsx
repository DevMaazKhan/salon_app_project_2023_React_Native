import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="w-full h-screen bg-light">
      <Outlet />
    </div>
  );
}

export default RootLayout;
