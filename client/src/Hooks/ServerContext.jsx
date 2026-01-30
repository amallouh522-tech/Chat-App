import { createContext, useContext, useEffect, useState } from "react";

const ServerContext = createContext(null);

export function ServerProvider({ children }) {

  const [Server, SetServer] = useState(() => {
    const savedServer = localStorage.getItem("Server");
    return savedServer ? JSON.parse(savedServer) : null;
  });

  useEffect(() => {
    if (Server) {
      localStorage.setItem("Server", JSON.stringify(Server));
    } else {
      localStorage.removeItem("Server");
    }
  }, [Server]);

  return (
    <ServerContext.Provider value={{ Server, SetServer }}>
      {children}
    </ServerContext.Provider>
  );
}

export function useServerContext() {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error("useUserContext must be used inside UserProvider");
  }
  return context;
}
