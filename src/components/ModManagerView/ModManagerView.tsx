import React, { useContext, useEffect, useState } from "react";
import { Mod } from "../../types";
import ModBox from "../ModBox/ModBox";
import { SwitchHorizontalIcon } from "@heroicons/react/outline";
import InstalledModContextWrapper, {
  InstalledModContext,
} from "./context/InstalledModContext";

type Props = {};

const mockData: Mod[] = [
  { author: "tom", loaded: false, name: "mod1" },
  { author: "tom", loaded: true, name: "mod2" },
  { author: "tom", loaded: true, name: "mod3" },
  { author: "tom", loaded: false, name: "mod4" },
  { author: "tom", loaded: false, name: "mod5" },
];

function ModManagerView({}: Props) {
  const [mods, setmods] = useState<Mod[]>(mockData);
  const installedModContext = useContext(InstalledModContext);
  const { selectedMods, handleModLoadedState, setSelectedMods, loadedMods } =
    installedModContext;

  const switchClickHandler = () => {
    if (handleModLoadedState) {
      handleModLoadedState();
    }
  };

  useEffect(() => {
    if (loadedMods) {
      setmods(loadedMods);
    }
    console.log(loadedMods);
  }, [installedModContext]);

  return (
    <div className="flex flex-col py-8 md:py-0 md:flex-row w-screen h-4/5 items-center ">
      <ModBox mods={mockData.filter((mod) => mod.loaded === false)} />
      <SwitchHorizontalIcon
        className="w-1/5 h-1/5 rotate-90 md:rotate-0 hover:cursor-pointer hover:text-primary-hover text-primary-default hover:animate-arrowFlipV md:hover:animate-arrowFlipH"
        onClick={() => switchClickHandler()}
      />
      <ModBox mods={mods.filter((mod) => mod.loaded === true)} />
    </div>
  );
}

export default ModManagerView;
