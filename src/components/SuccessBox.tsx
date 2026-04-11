import React from 'react';
import { Text, Box } from 'ink';

interface SuccessBoxProps {
    projectName: string;
    targetPath: string;
}

const SuccessBox: React.FC<SuccessBoxProps> = ({ projectName, targetPath }) => {
    return (
        <Box flexDirection="column" marginTop={1}>
            <Text color="green" bold>✔ Brewing complete!</Text>
            
            <Box 
                borderStyle="double" 
                borderColor="yellow" 
                padding={1} 
                flexDirection="column"
                marginTop={1}
            >
                <Box justifyContent="center" marginBottom={1}>
                    <Text bold>☕ create-brew-app</Text>
                </Box>
                
                <Text bold>✨ Your backend is ready!</Text>
                <Box marginTop={1}>
                    <Text dimColor>Location: </Text>
                    <Text color="blue">{targetPath}</Text>
                </Box>
                
                <Box flexDirection="column" marginTop={1}>
                    <Text bold>🚀 Next Steps:</Text>
                    <Box marginLeft={2}>
                        <Text color="yellow">1.</Text>
                        <Text> cd {projectName}</Text>
                    </Box>
                    <Box marginLeft={2}>
                        <Text color="yellow">2.</Text>
                        <Text> npm install</Text>
                    </Box>
                    <Box marginLeft={2}>
                        <Text color="yellow">3.</Text>
                        <Text> npm run dev</Text>
                    </Box>
                </Box>
                
                <Box marginTop={1}>
                    <Text italic dimColor>Happy Coding, Bro!</Text>
                </Box>
            </Box>
        </Box>
    );
};

export default SuccessBox;
