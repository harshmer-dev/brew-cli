import React from "react";
import { Text, Box } from "ink";

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <Box marginTop={1}>
      <Text color="red" bold>
        The brew spilled (Error)!
      </Text>
      <Box marginLeft={1}>
        <Text color="red">{message}</Text>
      </Box>
    </Box>
  );
};

export default ErrorDisplay;
