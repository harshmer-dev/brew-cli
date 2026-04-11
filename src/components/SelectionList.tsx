import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';

export interface SelectionItem {
    label: string;
    value: string;
}

interface SelectionListProps {
    title: string;
    items: SelectionItem[];
    onSelect: (item: SelectionItem) => void;
}

const SelectionList: React.FC<SelectionListProps> = ({ title, items, onSelect }) => {
    return (
        <Box flexDirection="column" marginTop={1} marginLeft={2}>
            <Box marginBottom={1}>
                <Text bold color="yellow">➜ </Text>
                <Text bold color="white">{title}</Text>
            </Box>
            
            <Box 
                borderStyle="round" 
                borderColor="cyan" 
                paddingLeft={1} 
                paddingRight={2}
                flexDirection="column"
            >
                <SelectInput 
                    items={items} 
                    onSelect={onSelect}
                    indicatorComponent={({ isSelected }) => (
                        <Box marginRight={1}>
                            <Text color={isSelected ? "yellow" : "gray"}>
                                {isSelected ? '●' : '○'}
                            </Text>
                        </Box>
                    )}
                    itemComponent={({ isSelected, label }) => (
                        <Text color={isSelected ? "yellow" : "white"} bold={!!isSelected}>
                            {label}
                        </Text>
                    )}
                />
            </Box>
            
            <Box marginTop={1}>
                <Text dimColor italic>Use arrow keys to navigate · Enter to select</Text>
            </Box>
        </Box>
    );
};

export default SelectionList;
