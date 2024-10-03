import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import SidebarMainMenu from "../components/SidebarMainMenu/SidebarMainMenu";

const ChatLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-1 overflow-hidden">
        <SidebarMainMenu />
        <Sidebar />
        <section className="flex-1 flex flex-col overflow-hidden">
          {/* Render the nested route's component here */}
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default ChatLayout;
