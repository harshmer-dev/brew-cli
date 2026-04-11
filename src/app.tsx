import React, { useEffect, useState } from 'react';
import { Box, useApp } from 'ink';
import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import Welcome from './components/Welcome.js';
import NamePrompt from './components/NamePrompt.js';
import Spinner from './components/Spinner.js';
import SuccessBox from './components/SuccessBox.js';
import ErrorDisplay from './components/ErrorDisplay.js';

interface AppProps {
    initialProjectName?: string;
    templatePath: string;
}

type Phase = 'PROMPT' | 'BREWING' | 'SUCCESS' | 'ERROR';

const App: React.FC<AppProps> = ({ initialProjectName, templatePath }) => {
    const { exit } = useApp();
    const [projectName, setProjectName] = useState<string | undefined>(initialProjectName);
    const [phase, setPhase] = useState<Phase>(initialProjectName ? 'BREWING' : 'PROMPT');
    const [statusMessage, setStatusMessage] = useState('Brewing your backend...');
    const [errorMessage, setErrorMessage] = useState('');
    const [targetPath, setTargetPath] = useState('');

    const startBrewing = async (name: string) => {
        setProjectName(name);
        setPhase('BREWING');
    };

    useEffect(() => {
        if (phase === 'BREWING' && projectName) {
            brew(projectName);
        }
    }, [phase, projectName]);

    const brew = async (name: string) => {
        const target = path.join(process.cwd(), name);
        setTargetPath(target);

        try {
            // 1. Conflict Check
            if (fs.existsSync(target)) {
                throw new Error(`Folder "${name}" already exists!`);
            }

            // 2. Copy Template Files
            setStatusMessage('Gathering ingredients (Copying templates)...');
            await fs.ensureDir(target);
            if (fs.existsSync(templatePath)) {
                await fs.copy(templatePath, target);
            } else {
                // Fallback if templates are missing (mostly for development)
                await fs.ensureDir(path.join(target, 'src'));
            }

            // 3. Configure package.json
            setStatusMessage('Mixing dependencies (Configuring package.json)...');
            const pkgPath = path.join(target, 'package.json');
            let pkg: any = {};
            if (fs.existsSync(pkgPath)) {
                pkg = await fs.readJson(pkgPath);
            }

            pkg.name = name;
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

            // 4. Setup .env
            const exampleEnv = path.join(target, '.env.example');
            if (fs.existsSync(exampleEnv)) {
                await fs.copy(exampleEnv, path.join(target, '.env'));
            }

            // 5. Initialize Git
            setStatusMessage('Setting up the boiler (Initializing Git)...');
            try {
                execSync('git init', { cwd: target, stdio: 'ignore' });
            } catch (e) {
                // Silently skip if git fails
            }

            setPhase('SUCCESS');
            // Allow some time to see the success message before exiting if needed, 
            // but usually we just let the user see it.
        } catch (error: any) {
            setErrorMessage(error.message || 'An unknown error occurred');
            setPhase('ERROR');
        }
    };

    return (
        <Box flexDirection="column" padding={1}>
            <Welcome />
            
            {phase === 'PROMPT' && (
                <NamePrompt onSubmit={startBrewing} />
            )}
            
            {phase === 'BREWING' && (
                <Spinner label={statusMessage} />
            )}
            
            {phase === 'SUCCESS' && projectName && (
                <SuccessBox projectName={projectName} targetPath={targetPath} />
            )}
            
            {phase === 'ERROR' && (
                <ErrorDisplay message={errorMessage} />
            )}
        </Box>
    );
};

export default App;
