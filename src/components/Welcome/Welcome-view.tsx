import React, { useContext, useEffect, useState } from "react";
import { dialog } from "@tauri-apps/api";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/globalContext";

type Props = {};

const WelcomeView = (props: Props) => {
  const { setFolderPaths, folderPaths } = useContext(GlobalContext);
  const [GameInstallFolder, setGameInstallFolder] = useState<string>(
    folderPaths?.game ?? ""
  );
  const [ModStoreageFolder, setModStoreageFolder] = useState<string>(
    folderPaths?.mods ?? ""
  );
  const navigate = useNavigate();

  const tauriDialogHandler = async (title: string) => {
    const dirpath = await dialog.open({ directory: true, title });
    return dirpath + "";
  };

  const installButtonHandler = () => {
    tauriDialogHandler("CM game install location").then((path: string) =>
      setGameInstallFolder(path)
    );
  };
  const modStoreageButtonHandler = () => {
    tauriDialogHandler("CM game install location").then((path: string) =>
      setModStoreageFolder(path)
    );
  };

  const validateButtonHandler = () => {
    if (GameInstallFolder && ModStoreageFolder && setFolderPaths) {
      setFolderPaths({ game: GameInstallFolder, mods: ModStoreageFolder });
      navigate("/modmanager");
    }
  };

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-4xl">Welcome to the Combat Mission Mod Loader</h1>
      <p>Finish the setup process to continue</p>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row w-2/5">
          <label htmlFor="gameInstall"></label>
          <textarea
            readOnly
            id="gameInstall"
            className="resize-none text-black rounded-md px-4 py-1"
            value={GameInstallFolder}
          ></textarea>
          <button
            className="bg-primary-default text-white rounded-r-md p-5 hover:bg-primary-hover"
            onClick={() => installButtonHandler()}
          >
            CM game folder
          </button>
        </div>

        <div className="flex flex-row w-2/5">
          <label htmlFor="modInstall"></label>
          <textarea
            readOnly
            id="modInstall"
            className="resize-none text-black rounded-md px-4 py-1"
            value={ModStoreageFolder}
          ></textarea>
          <button
            className="bg-primary-default text-white rounded-r-md p-5 hover:bg-primary-hover"
            onClick={() => modStoreageButtonHandler()}
          >
            Mods folder
          </button>
        </div>
      </div>
      <button
        className="bg-primary-default text-white rounded-md disabled:bg-gray-600 p-10 my-5 text-xl hover:bg-primary-hover"
        disabled={!(ModStoreageFolder && GameInstallFolder)}
        onClick={() => validateButtonHandler()}
      >
        Continue
      </button>
    </div>
  );
};

export default WelcomeView;
