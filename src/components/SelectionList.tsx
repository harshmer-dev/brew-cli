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
        <Box flexDirection="column" marginTop={1}>
            <Text bold color="cyan">{title}</Text>
            <Box marginTop={1}>
                <SelectInput items={items} onSelect={onSelect} />
            </Box>
        </Box>
    );
};

export default SelectionList;
