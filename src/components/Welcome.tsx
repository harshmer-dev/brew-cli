import React from 'react';
import { Text, Box } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

const Welcome: React.FC = () => {
    return (
        <Box flexDirection="column" marginBottom={1}>
            <Gradient name="summer">
                <BigText text="BREW" font="block" />
            </Gradient>
            <Box marginLeft={2} marginTop={-1}>
                <Text color="gray" italic>
                    The Ultimate Project Scaffolder for 2026
                </Text>
            </Box>
            <Box marginTop={1} marginBottom={1}>
                <Text dimColor>─────────────────────────────────────────────────</Text>
            </Box>
        </Box>
    );
};

export default Welcome;
