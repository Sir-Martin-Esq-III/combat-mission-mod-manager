import React, { useContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ModManagerView from "./components/ModManagerView/ModManagerView";
import Navigation from "./components/Nav/Nav";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ModInstall from "./components/ModInstall/ModInstall";
import InstalledModContextWrapper from "./components/ModManagerView/context/InstalledModContext";
import WelcomeView from "./components/Welcome/Welcome-view";
import GlobalContext from "./context/globalContext";
import { folderPaths } from "./context/globalContext";

function App() {
  // const globContext=useContext(globalContext)
  const [folderPaths, setfolderPaths] = useState<folderPaths>({
    game: "",
    mods: "",
  });
  return (
    <GlobalContext.Provider
      value={{ folderPaths: folderPaths, setFolderPaths: setfolderPaths }}
    >
      <Router>
        <div className="w-screen h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<WelcomeView />}></Route>
            <Route
              path="/modmanager"
              element={
                <InstalledModContextWrapper>
                  <ModManagerView />
                </InstalledModContextWrapper>
              }
            ></Route>
            <Route path="/installMods" element={<ModInstall />}></Route>
          </Routes>
        </div>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
