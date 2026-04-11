import React from 'react';
import { Text, Box } from 'ink';

const Welcome: React.FC = () => {
    return (
        <Box marginBottom={1}>
            <Text bold color="yellow">
                ☕ WELCOME TO BREW CLI
            </Text>
        </Box>
    );
};

export default Welcome;
