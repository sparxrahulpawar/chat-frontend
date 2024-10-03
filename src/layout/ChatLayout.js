import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import SidebarMainMenu from "../components/SidebarMainMenu/SidebarMainMenu";
import "./ChatLayout.css";
import { isAuthenticated } from "../routes/ProtectRoutes";

const ChatLayout = () => {
  // Check if the user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex flex-col h-screen chat-layout">
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
