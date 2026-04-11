import React from 'react';
import { Text, Box } from 'ink';
import SpinnerLib from 'ink-spinner';

interface SpinnerProps {
    label: string;
}

const Spinner: React.FC<SpinnerProps> = ({ label }) => {
    return (
        <Box marginTop={1} marginLeft={2}>
            <Box marginRight={1}>
                <Text color="yellow">
                    <SpinnerLib type="dots" />
                </Text>
            </Box>
            <Text bold color="white">{label}</Text>
        </Box>
    );
};

export default Spinner;
