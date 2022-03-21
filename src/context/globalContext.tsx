import React from "react";

type filePaths = {
  game: string;
  mods: string;
};

type globalContextT = {
  data: Record<any, any> | undefined;
  error: any;
  loading: boolean;
};

let GlobalContext = React.createContext<globalContextT>({
  data: undefined,
  error: null,
  loading: false,
});

export default GlobalContext;
