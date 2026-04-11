import React from 'react';
import { Text, Box } from 'ink';
import TextInput from 'ink-text-input';

interface NamePromptProps {
    onSubmit: (name: string) => void;
}

const NamePrompt: React.FC<NamePromptProps> = ({ onSubmit }) => {
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = (value: string) => {
        if (/^([a-z\-\_\d])+$/.test(value)) {
            onSubmit(value);
        } else {
            setError('Project name may only include letters, numbers, and dashes.');
        }
    };

    return (
        <Box flexDirection="column" marginTop={1} marginLeft={2}>
            <Box marginBottom={1}>
                <Text bold color="yellow">➜ </Text>
                <Text bold color="white">What is your project name?</Text>
            </Box>
            
            <Box 
                borderStyle="round" 
                borderColor="cyan" 
                paddingLeft={1} 
                paddingRight={2}
                width={40}
            >
                <Text color="yellow" bold>» </Text>
                <TextInput 
                    value={name} 
                    onChange={setName} 
                    onSubmit={handleSubmit} 
                    placeholder="my-cool-project" 
                />
            </Box>
            
            {error && (
                <Box marginTop={1}>
                    <Text color="red" bold>✖ {error}</Text>
                </Box>
            )}
            
            <Box marginTop={1}>
                <Text dimColor italic>Enter your project identifier and press Enter</Text>
            </Box>
        </Box>
    );
};

export default NamePrompt;
