import React, { useEffect, useState } from 'react';
import { Box, useApp, Text } from 'ink';
import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import Welcome from './components/Welcome.js';
import NamePrompt from './components/NamePrompt.js';
import Spinner from './components/Spinner.js';
import SuccessBox from './components/SuccessBox.js';
import ErrorDisplay from './components/ErrorDisplay.js';
import SelectionList from './components/SelectionList.js';
import type { SelectionItem } from './components/SelectionList.js';

interface AppProps {
    initialProjectName?: string;
    templatePath: string;
}

type Phase = 
    | 'PLATFORM' 
    | 'LANGUAGE' 
    | 'FRAMEWORK' 
    | 'NAME' 
    | 'COMING_SOON'
    | 'BREWING' 
    | 'SUCCESS' 
    | 'ERROR';

const App: React.FC<AppProps> = ({ initialProjectName, templatePath }) => {
    const { exit } = useApp();
    const [projectName, setProjectName] = useState<string | undefined>(initialProjectName);
    const [phase, setPhase] = useState<Phase>('PLATFORM');
    
    const [platform, setPlatform] = useState<string>('');
    const [language, setLanguage] = useState<string>('');
    const [framework, setFramework] = useState<string>('');
    
    const [statusMessage, setStatusMessage] = useState('Brewing your backend...');
    const [errorMessage, setErrorMessage] = useState('');
    const [targetPath, setTargetPath] = useState('');

    const platformItems = [
        { label: 'Node.js', value: 'node' },
        { label: 'Other Framework', value: 'other' }
    ];

    const languageItems = [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' }
    ];

    const frameworkItems = [
        { label: 'Express', value: 'express' },
        { label: 'Fastify', value: 'fastify' },
        { label: 'NestJS', value: 'nestjs' },
        { label: 'ReactJS', value: 'reactjs' },
        { label: 'Angular', value: 'angular' },
        { label: 'Vuejs', value: 'vuejs' },
        { label: 'NextJS', value: 'nextjs' }
    ];

    const handlePlatformSelect = (item: SelectionItem) => {
        if (item.value === 'other') {
            setPhase('COMING_SOON');
        } else {
            setPlatform(item.value);
            setPhase('LANGUAGE');
        }
    };

    const handleLanguageSelect = (item: SelectionItem) => {
        setLanguage(item.value);
        setPhase('FRAMEWORK');
    };

    const handleFrameworkSelect = (item: SelectionItem) => {
        setFramework(item.value);
        if (projectName) {
            setPhase('BREWING');
        } else {
            setPhase('NAME');
        }
    };

    const startBrewing = async (name: string) => {
        setProjectName(name);
        setPhase('BREWING');
    };

    useEffect(() => {
        if (phase === 'BREWING' && projectName && platform && language && framework) {
            brew();
        }
    }, [phase]);

    useEffect(() => {
        if (phase === 'COMING_SOON') {
            setTimeout(() => {
                exit();
            }, 3000);
        }
    }, [phase]);

    const brew = async () => {
        if (!projectName || !platform || !language || !framework) return;

        const target = path.join(process.cwd(), projectName);
        setTargetPath(target);

        try {
            if (fs.existsSync(target)) {
                throw new Error(`Folder "${projectName}" already exists!`);
            }

            // --- Scaffolding Logic ---
            const isTS = language === 'typescript';
            
            // Logic based on framework type
            if (framework === 'express' || framework === 'fastify') {
                // TEMPLATE-BASED SCAFFOLDING
                setStatusMessage(`Brewing ${framework} app (${language})...`);
                const finalTemplatePath = path.join(templatePath, platform, language, framework);
                
                await fs.ensureDir(target);
                if (fs.existsSync(finalTemplatePath)) {
                    await fs.copy(finalTemplatePath, target);
                } else {
                    // Minimal fallback
                    await fs.ensureDir(path.join(target, 'src'));
                    await fs.writeJson(path.join(target, 'package.json'), {
                        name: projectName,
                        version: '1.0.0',
                        type: 'module'
                    });
                }
            } else {
                // COMMAND-BASED SCAFFOLDING
                setStatusMessage(`Invoking official ${framework} cli (might take a minute)...`);

                let cmd = '';
                switch (framework) {
                    case 'nextjs':
                        cmd = `npx create-next-app@latest ${projectName} --${language} --eslint --tailwind --app --src-dir --import-alias "@/*" --use-npm --skip-install --yes`;
                        break;
                    case 'reactjs':
                        cmd = `npm create vite@latest ${projectName} -- --template react${isTS ? '-ts' : ''} --no-interactive`;
                        break;
                    case 'vuejs':
                        cmd = `npm create vite@latest ${projectName} -- --template vue${isTS ? '-ts' : ''} --no-interactive`;
                        break;
                    case 'angular':
                        cmd = `npx -y @angular/cli@latest new ${projectName} --defaults --skip-install --skip-git`;
                        break;
                    case 'nestjs':
                        cmd = `npx -y @nestjs/cli@latest new ${projectName} --package-manager npm --language ${isTS ? 'TS' : 'JS'} --skip-install --skip-git`;
                        break;
                }

                if (cmd) {
                    execSync(cmd, { stdio: 'ignore' });
                }
            }

            // --- Final Post-Scaffolding Customization ---
            setStatusMessage('Finishing touches...');
            
            const pkgPath = path.join(target, 'package.json');
            if (fs.existsSync(pkgPath)) {
                const pkg = await fs.readJson(pkgPath);
                pkg.name = projectName;
                pkg.description = `Project scaffolded using brew-cli (${framework} / ${language})`;
                await fs.writeJson(pkgPath, pkg, { spaces: 2 });
            }

            // Standardize Git
            try {
                // Sometimes tools create it even if we ask not to, or don't. 
                // We ensure it's there and freshly initialized if it's missing.
                if (!fs.existsSync(path.join(target, '.git'))) {
                    execSync('git init', { cwd: target, stdio: 'ignore' });
                }
            } catch (e) {}

            setPhase('SUCCESS');
        } catch (error: any) {
            setErrorMessage(error.message || 'An unknown error occurred');
            setPhase('ERROR');
        }
    };

    return (
        <Box flexDirection="column" padding={1}>
            <Welcome />
            {phase === 'PLATFORM' && <SelectionList title="Choose your platform:" items={platformItems} onSelect={handlePlatformSelect} />}
            {phase === 'LANGUAGE' && <SelectionList title={`Select language for ${platform}:`} items={languageItems} onSelect={handleLanguageSelect} />}
            {phase === 'FRAMEWORK' && <SelectionList title={`Which framework or library do you want to use?`} items={frameworkItems} onSelect={handleFrameworkSelect} />}
            {phase === 'NAME' && <NamePrompt onSubmit={startBrewing} />}
            {phase === 'COMING_SOON' && <Box marginTop={1}><Text color="yellow" bold>More technologies will be available in the near future!</Text></Box>}
            {phase === 'BREWING' && <Spinner label={statusMessage} />}
            {phase === 'SUCCESS' && projectName && <SuccessBox projectName={projectName} targetPath={targetPath} />}
            {phase === 'ERROR' && <ErrorDisplay message={errorMessage} />}
        </Box>
    );
};

export default App;
