import React, { useEffect, useState } from "react";
import { Mod } from "../../../types";
import { event } from "@tauri-apps/api";

type Props = {
  children: React.ReactNode;
};

type installedModContextT = {
  selectedMods: Mod[] | undefined;
  setSelectedMods: React.Dispatch<React.SetStateAction<Mod[]>> | undefined;
  handleModLoadedState: (() => any) | undefined;
};

export const InstalledModContext = React.createContext<installedModContextT>({
  selectedMods: undefined,
  setSelectedMods: undefined,
  handleModLoadedState: undefined,
});
const InstalledModContextWrapper = ({ children }: Props) => {
  const [selectedMods, setSelectedMods] = useState<Mod[]>([]);
  const handleModLoadedState = () => {
    event.emit("ping", selectedMods);
    setSelectedMods([]);
    console.log("here");
  };

  useEffect(() => {
    console.log(selectedMods);
  }, [selectedMods]);

  return (
    <InstalledModContext.Provider
      value={{ selectedMods, setSelectedMods, handleModLoadedState }}
    >
      {children}
    </InstalledModContext.Provider>
  );
};

export default InstalledModContextWrapper;
