#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import { Command } from "commander";
import path from "path";
import { fileURLToPath } from "url";
import App from "./app.js";

// --- ESM __dirname Fix ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name("create-brew-app")
  .description("Brew a fresh Node.js backend with Express and MongoDB")
  .version("1.1.0")
  .argument("[project-name]", "Name of the project")
  .action((projectName) => {
    const templatePath = path.join(__dirname, "templates");

    // We don't clear the screen anymore as Ink handles its own rendering
    // but if the user really wants it we could do it before render.
    // console.clear();

    render(
      <App initialProjectName={projectName} templatePath={templatePath} />,
    );
  });

program.parse(process.argv);
