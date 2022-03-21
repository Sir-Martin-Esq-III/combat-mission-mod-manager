// import react-testing methods
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

import ModBox from "./ModBox";
import { Mod } from "../../types";

const modsMock: Mod[] = [{ author: "author", loaded: true, name: "ModName" }];

test("should render all of the data passed in to it correctly", () => {
  render(<ModBox mods={modsMock} />);
  expect(screen.getByTestId("mod-box-container")).toBeVisible();
});
