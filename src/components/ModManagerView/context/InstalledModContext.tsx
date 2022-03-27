import React, { useContext, useEffect, useState } from "react";
import { Mod } from "../../../types";
import { event, invoke } from "@tauri-apps/api";
import GlobalContext from "../../../context/globalContext";

type Props = {
  children: React.ReactNode;
};

type installedModContextT = {
  selectedMods: Mod[] | undefined;
  setSelectedMods: React.Dispatch<React.SetStateAction<Mod[]>> | undefined;
  handleModLoadedState: (() => any) | undefined;
  loadedMods: Mod[] | undefined;
};

export const InstalledModContext = React.createContext<installedModContextT>({
  selectedMods: undefined,
  setSelectedMods: undefined,
  handleModLoadedState: undefined,
  loadedMods: undefined,
});
const InstalledModContextWrapper = ({ children }: Props) => {
  const [selectedMods, setSelectedMods] = useState<Mod[]>([]);
  const [loadedMods, setloadedMods] = useState<Mod[]>([]);
  const { folderPaths } = useContext(GlobalContext);

  const handleModLoadedState = () => {
    event.emit("ping", selectedMods);
    invoke("fetch_files_in_folder", {
      folderPath: `T:/Steam/steamapps/common/Combat Mission Black Sea/Data/z`,
    }).then((res) => console.log(JSON.parse(res as string)));
    setSelectedMods([]);
    console.log("here");
  };

  const parseMod = (modString: string): Mod => {
    return {
      name: modString.split("\\").at(-1) ?? "error",
      author: "n/a",
      loaded: true,
    };
  };

  useEffect(() => {
    if (folderPaths) {
      invoke("fetch_files_in_folder", {
        folderPath: folderPaths.game,
      })
        .then((res) => JSON.parse(res as string))
        .then((modsList: string[]) =>
          setloadedMods(modsList.map((mod) => parseMod(mod)))
        );
    }
  }, [selectedMods, folderPaths]);

  return (
    <InstalledModContext.Provider
      value={{
        loadedMods,
        selectedMods,
        setSelectedMods,
        handleModLoadedState,
      }}
    >
      {children}
    </InstalledModContext.Provider>
  );
};

export default InstalledModContextWrapper;
