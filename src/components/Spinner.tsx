import React from 'react';
import { Text, Box } from 'ink';
import SpinnerLib from 'ink-spinner';

interface SpinnerProps {
    label: string;
}

const Spinner: React.FC<SpinnerProps> = ({ label }) => {
    return (
        <Box>
            <Text color="cyan">
                <SpinnerLib type="dots" />
            </Text>
            <Text> {label}</Text>
        </Box>
    );
};

export default Spinner;
