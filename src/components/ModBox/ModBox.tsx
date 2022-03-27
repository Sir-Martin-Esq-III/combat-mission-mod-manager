import React, { useContext } from "react";
import { Mod } from "../../types";
import { InstalledModContext } from "../ModManagerView/context/InstalledModContext";

type Props = {
  mods: Mod[];
};

const ModBox = ({ mods }: Props) => {
  const installedModContext = useContext(InstalledModContext);
  const { selectedMods, setSelectedMods } = installedModContext;

  const findModInSelectedMods = (mod: Mod, list: Mod[]) => {
    return list.findIndex((listMod: Mod) => listMod.name === mod.name);
  };

  const selectMod = (mod: Mod) => {
    if (selectedMods && setSelectedMods) {
      const selectedModsTmp = selectedMods;
      const found = findModInSelectedMods(mod, selectedModsTmp);
      found !== -1
        ? selectedModsTmp.splice(found, 1)
        : selectedModsTmp.push(mod);

      console.log(selectedModsTmp);
      setSelectedMods([...selectedModsTmp]);
    }
  };
  if (selectedMods === undefined || setSelectedMods === undefined)
    return <p>error</p>;
  return (
    <div className="w-2/5 rounded-md h-full overflow-scroll bg-background-inset">
      {mods.map((mod: Mod) => (
        <div
          onClick={() => selectMod(mod)}
          key={mod.name}
          className={` text-primary-default hover:text-white my-5 hover:cursor-pointer hover:bg-primary-hover ${
            findModInSelectedMods(mod, selectedMods) !== -1
              ? "bg-primary-selected text-white"
              : ""
          }`}
        >
          {mod.name}
        </div>
      ))}
    </div>
  );
};

export default ModBox;
