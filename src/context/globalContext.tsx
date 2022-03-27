import React from "react";

export type folderPaths = {
  game: string;
  mods: string;
};

type globalContextT = {
  folderPaths: folderPaths | undefined;
  setFolderPaths: React.Dispatch<React.SetStateAction<folderPaths>> | undefined;
};

let GlobalContext = React.createContext<globalContextT>({
  folderPaths: undefined,
  setFolderPaths: undefined,
});

export default GlobalContext;
