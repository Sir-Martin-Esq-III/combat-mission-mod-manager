import React, { useEffect } from "react";
import { Nav } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const Navigation = (props: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navOptions: Nav[] = [
    {
      displayName: "Manage Mods",
      path: "modmanager",
    },
    {
      displayName: "Install New Mods",
      path: "installMods",
    },
  ];

  return (
    <div className="flex flex-row h-1/5">
      {navOptions.map((option: Nav) => (
        <div
          key={option.path}
          onClick={() => navigate(`/${option.path}`)}
          className={`hover:bg-primary-hover ${
            pathname.includes(option.path) ? "bg-primary-selected" : ""
          }`}
        >
          {option.displayName}
        </div>
      ))}
    </div>
  );
};

export default Navigation;
