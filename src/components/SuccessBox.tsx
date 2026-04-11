import React from "react";
import { Text, Box } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";

interface SuccessBoxProps {
  projectName: string;
  targetPath: string;
}

const SuccessBox: React.FC<SuccessBoxProps> = ({ projectName, targetPath }) => {
  return (
    <Box flexDirection="column" marginTop={1} marginLeft={2}>
      <Gradient name="summer">
        <BigText text="CHEERS" font="block" />
      </Gradient>

      <Text color="green" bold>
        ✨ Brewing complete! Your project is served hot.
      </Text>

      <Box
        borderStyle="double"
        borderColor="yellow"
        padding={1}
        flexDirection="column"
        marginTop={1}
        width={60}
      >
        <Box justifyContent="center" marginBottom={1}>
          <Text bold color="cyan">
            ☕ create-brew-app 2026
          </Text>
        </Box>

        <Box marginBottom={1}>
          <Text bold>Project: </Text>
          <Text color="yellow">{projectName}</Text>
        </Box>

        <Box marginBottom={1}>
          <Text bold>Path: </Text>
          <Text color="blue">{targetPath}</Text>
        </Box>

        <Box flexDirection="column" marginTop={1}>
          <Text bold color="magenta">
            🚀 NEXT STEPS:
          </Text>
          <Box marginTop={1} flexDirection="column">
            <Box>
              <Text color="cyan"> 1. </Text>
              <Text>cd </Text>
              <Text color="yellow" bold>
                {projectName}
              </Text>
            </Box>
            <Box>
              <Text color="cyan"> 2. </Text>
              <Text color="white">npm install</Text>
            </Box>
            <Box>
              <Text color="cyan"> 3. </Text>
              <Text color="white">npm run dev</Text>
            </Box>
          </Box>
        </Box>

        <Box marginTop={2} justifyContent="center">
          <Text italic dimColor>
            Happy Coding! May your brew never turn cold.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SuccessBox;
