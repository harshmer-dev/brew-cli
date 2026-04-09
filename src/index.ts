#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// --- ESM __dirname Fix (Required because of "type": "module") ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('create-brew-app')
  .description('Brew a fresh Node.js backend with Express and MongoDB')
  .version('1.0.0')
  .argument('[project-name]', 'Name of the project')
  .action(async (projectName) => {
    
    // 1. Ask for project name if not provided in command line
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
    // This points to dist/templates after you run 'npm run build'
    const templatePath = path.join(__dirname, 'templates'); 

    console.log(chalk.blue(`\n☕ Brewing your project in: ${chalk.bold(targetPath)}...`));

    try {
      // 2. Check if the folder already exists to prevent overwriting
      if (fs.existsSync(targetPath)) {
        console.log(chalk.red(`\n❌ Error: Folder "${projectName}" already exists!`));
        process.exit(1);
      }

      // 3. Ensure the templates folder actually exists in dist
      if (!fs.existsSync(templatePath)) {
        console.log(chalk.red(`\n❌ Error: Template files not found in ${templatePath}`));
        console.log(chalk.yellow('Tip: Make sure you ran "npm run build" first!'));
        process.exit(1);
      }

      // 4. Create target directory and copy CONTENTS of templatePath
      await fs.ensureDir(targetPath);
      await fs.copy(templatePath, targetPath);

      // 5. Update the package.json name inside the new project
      const pkgPath = path.join(targetPath, 'package.json');
      if (fs.existsSync(pkgPath)) {
        const pkg = await fs.readJson(pkgPath);
        pkg.name = projectName;
        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
      }

      // 6. Initialize Git
      console.log(chalk.yellow('⚙️  Initializing git...'));
      try {
        execSync('git init', { cwd: targetPath, stdio: 'ignore' });
      } catch (e) {
        console.log(chalk.gray('⚠️  Git not found, skipping git init.'));
      }

      // 7. Success Message
      console.log(chalk.bold.green('\n✨ Project Brewed Successfully!'));
      console.log(chalk.gray('----------------------------------'));
      console.log(`${chalk.cyan('📂 Location:')} ${targetPath}`);
      console.log(`${chalk.cyan('🚀 Next Steps:')}`);
      console.log(chalk.white(`   1. cd ${projectName}`));
      console.log(chalk.white(`   2. npm install`));
      console.log(chalk.white(`   3. npm start`));
      console.log(chalk.gray('----------------------------------\n'));

    } catch (error) {
      console.error(chalk.red('\n❌ Something went wrong while brewing:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv);