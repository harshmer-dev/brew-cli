#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// --- ESM __dirname Fix ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('create-brew-app')
  .description('Brew a fresh Node.js backend with Express and MongoDB')
  .version('1.0.0')
  .argument('[project-name]', 'Name of the project')
  .action(async (projectName) => {
    
    // 1. Prompt for name if not provided
    if (!projectName) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is your project name?',
          default: 'my-brew-app',
        },
      ]);
      projectName = answers.name;
    }

    const targetPath = path.join(process.cwd(), projectName);
    const templatePath = path.join(__dirname, 'templates'); 

    console.log(chalk.blue(`\n☕ Brewing your project in: ${chalk.bold(targetPath)}...`));

    try {
      // 2. Conflict Check
      if (fs.existsSync(targetPath)) {
        console.log(chalk.red(`\n❌ Error: Folder "${projectName}" already exists!`));
        process.exit(1);
      }

      // 3. Copy Template Files
      await fs.ensureDir(targetPath);
      if (fs.existsSync(templatePath)) {
        await fs.copy(templatePath, targetPath);
      } else {
        // Fallback: Create src folder if template is missing
        await fs.ensureDir(path.join(targetPath, 'src'));
      }

      // 4. Advanced package.json Configuration
      const pkgPath = path.join(targetPath, 'package.json');
      let pkg: any = {};

      if (fs.existsSync(pkgPath)) {
        pkg = await fs.readJson(pkgPath);
      }

      // Injecting necessary fields
      pkg.name = projectName;
      pkg.version = pkg.version || "1.0.0";
      pkg.type = "module"; // Essential for ESM
      pkg.main = "src/index.js";
      
      // Setup Scripts
      pkg.scripts = {
        start: "node src/index.js",
        dev: "nodemon src/index.js",
        ...pkg.scripts
      };

      // Ensure Nodemon is in devDependencies
      pkg.devDependencies = {
        "nodemon": "^3.1.0",
        ...pkg.devDependencies
      };

      // Ensure Base Dependencies exist
      pkg.dependencies = {
        "express": "^4.19.0",
        "mongoose": "^8.0.0",
        "dotenv": "^16.4.0",
        ...pkg.dependencies
      };

      await fs.writeJson(pkgPath, pkg, { spaces: 2 });
      console.log(chalk.gray('  - Generated package.json with Nodemon & ESM support'));

      // 5. Setup .env from .env.example if it exists
      const exampleEnv = path.join(targetPath, '.env.example');
      if (fs.existsSync(exampleEnv)) {
        await fs.copy(exampleEnv, path.join(targetPath, '.env'));
        console.log(chalk.gray('  - Created .env from template'));
      }

      // 6. Initialize Git
      console.log(chalk.yellow('⚙️  Initializing git...'));
      try {
        execSync('git init', { cwd: targetPath, stdio: 'ignore' });
      } catch (e) {
        console.log(chalk.gray('⚠️  Git init skipped (check if git is installed)'));
      }

      // 7. Success Final Message
      console.log(chalk.bold.green('\n✨ Project Brewed Successfully!'));
      console.log(chalk.gray('----------------------------------'));
      console.log(`${chalk.cyan('📂 Location:')} ${targetPath}`);
      console.log(`${chalk.cyan('🚀 Next Steps:')}`);
      console.log(chalk.white(`   1. cd ${projectName}`));
      console.log(chalk.white(`   2. npm install`));
      console.log(chalk.white(`   3. npm run dev`));
      console.log(chalk.gray('----------------------------------\n'));

    } catch (error) {
      console.error(chalk.red('\n❌ Error during brewing:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv);