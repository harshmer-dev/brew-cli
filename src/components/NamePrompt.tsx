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
        <Box flexDirection="column">
            <Box>
                <Text>What is your project name? </Text>
                <TextInput value={name} onChange={setName} onSubmit={handleSubmit} placeholder="my-brew-app" />
            </Box>
            {error && (
                <Box marginTop={1}>
                    <Text color="red">{error}</Text>
                </Box>
            )}
        </Box>
    );
};

export default NamePrompt;
