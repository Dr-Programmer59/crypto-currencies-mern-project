import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

function Loading() {
  return (
    <VStack justifyContent={'center'} h={'90vh'}>

      <Box transform={"scale(3)"}>
        <Spinner size={'xl'}/>
      </Box>
    </VStack>
  )
}

export default Loading;