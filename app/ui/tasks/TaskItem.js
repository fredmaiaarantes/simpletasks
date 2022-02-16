import React, { Component } from 'react';
import { Box, Button, HStack, Stack, Checkbox } from '@chakra-ui/react';

export class TaskItem extends Component {
  render() {
    const { task, onMarkAsDone, onDelete } = this.props;
    return (
      <HStack mt={4}>
        <Box w="80%">
          <Checkbox
            colorScheme="green"
            isChecked={task.done}
            onChange={() => onMarkAsDone(task._id)}
          >
            {task.description}
          </Checkbox>
        </Box>
        <Stack w="20%" justify="flex-end" direction="row">
          <Button
            colorScheme="red"
            variant="outline"
            size="xs"
            onClick={() => onDelete(task._id)}
          >
            Remove
          </Button>
        </Stack>
      </HStack>
    );
  }
}
