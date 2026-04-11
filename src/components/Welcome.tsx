import React from "react";
import { Text, Box } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";

const Welcome: React.FC = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Box>
        <Gradient colors={["#f7971e", "#ffd200", "#00c6ff", "#0072ff"]}>
          <BigText text="BREW CLI" font="block" />
        </Gradient>
      </Box>

      <Box>
        <Text color="cyanBright" italic>
          ⚡ The Ultimate Project Scaffolder for 2026
        </Text>
      </Box>

      <Box marginY={1}>
        <Text dimColor>
          ─────────────────────────────────────────────────────────────
        </Text>
      </Box>
    </Box>
  );
};

export default Welcome;
