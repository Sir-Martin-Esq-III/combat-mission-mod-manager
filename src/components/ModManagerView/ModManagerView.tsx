import React, { useContext, useState } from "react";
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
  const { selectedMods, handleModLoadedState, setSelectedMods } =
    installedModContext;

  const switchClickHandler = () => {
    if (handleModLoadedState) {
      handleModLoadedState();
    }
  };
  return (
    <div className="flex flex-col md:flex-row w-screen ">
      <ModBox mods={mockData.filter((mod) => mod.loaded === false)} />
      <SwitchHorizontalIcon
        className="w-1/5 rotate-90 md:rotate-0 hover:cursor-pointer hover:text-primary-hover text-primary-default"
        onClick={() => switchClickHandler()}
      />
      <ModBox mods={mockData.filter((mod) => mod.loaded === true)} />
    </div>
  );
}

export default ModManagerView;
