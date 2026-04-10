#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import ora from 'ora';
import boxen from 'boxen';

// --- ESM __dirname Fix ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('create-brew-app')
  .description('Brew a fresh Node.js backend with Express and MongoDB')
  .version('1.1.0')
  .argument('[project-name]', 'Name of the project')
  .action(async (projectName) => {
    console.clear();
    console.log(chalk.bold.yellow('\n☕ WELCOME TO BREW CLI\n'));

    // 1. Prompt for name if not provided
    if (!projectName) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is your project name?',
          default: 'my-brew-app',
          validate: (input) => {
            if (/^([a-z\-\_\d])+$/.test(input)) return true;
            return 'Project name may only include letters, numbers, and dashes.';
          }
        },
      ]);
      projectName = answers.name;
    }

    const targetPath = path.join(process.cwd(), projectName);
    const templatePath = path.join(__dirname, 'templates'); 

    // Start the primary spinner
    const spinner = ora(`Brewing ${chalk.cyan(projectName)}...`).start();

    try {
      // 2. Conflict Check
      if (fs.existsSync(targetPath)) {
        spinner.fail(chalk.red(`Error: Folder "${projectName}" already exists!`));
        process.exit(1);
      }

      // 3. Copy Template Files
      await fs.ensureDir(targetPath);
      if (fs.existsSync(templatePath)) {
        await fs.copy(templatePath, targetPath);
      } else {
        await fs.ensureDir(path.join(targetPath, 'src'));
      }
      spinner.text = 'Gathering ingredients (Copying templates)...';

      // 4. Configure package.json
      const pkgPath = path.join(targetPath, 'package.json');
      let pkg: any = {};
      if (fs.existsSync(pkgPath)) {
        pkg = await fs.readJson(pkgPath);
      }

      pkg.name = projectName;
      pkg.type = "module"; 
      pkg.scripts = {
        start: "node src/index.js",
        dev: "nodemon src/index.js",
        ...pkg.scripts
      };
      pkg.devDependencies = { "nodemon": "^3.1.0", ...pkg.devDependencies };
      pkg.dependencies = { 
        "express": "^4.19.0", 
        "mongoose": "^8.0.0", 
        "dotenv": "^16.4.0", 
        ...pkg.dependencies 
      };

      await fs.writeJson(pkgPath, pkg, { spaces: 2 });
      
      // 5. Setup .env
      const exampleEnv = path.join(targetPath, '.env.example');
      if (fs.existsSync(exampleEnv)) {
        await fs.copy(exampleEnv, path.join(targetPath, '.env'));
      }

      spinner.text = 'Setting up the boiler (Initializing Git)...';

      // 6. Initialize Git
      try {
        execSync('git init', { cwd: targetPath, stdio: 'ignore' });
      } catch (e) {
        // Silently skip if git fails
      }

      spinner.succeed(chalk.bold.green('Brewing complete!'));

      // 7. Fancy Success Box
      const resultMessage = `
${chalk.bold('✨ Your backend is ready!')}

${chalk.dim('Location:')} ${chalk.blue(targetPath)}

${chalk.bold('🚀 Next Steps:')}
  ${chalk.yellow('1.')} cd ${projectName}
  ${chalk.yellow('2.')} npm install
  ${chalk.yellow('3.')} npm run dev

${chalk.italic.gray('Happy Coding, Bro!')}
      `;

      console.log(
        boxen(resultMessage, {
          padding: 1,
          margin: 1,
          borderStyle: 'double',
          borderColor: 'yellow',
          title: '☕ create-brew-app',
          titleAlignment: 'center',
        })
      );

    } catch (error) {
      spinner.fail(chalk.red('The brew spilled (Error)!'));
      console.error(error);
      process.exit(1);
    }
  });

program.parse(process.argv);
