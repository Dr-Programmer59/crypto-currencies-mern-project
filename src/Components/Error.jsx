import React from 'react'
import {Alert,AlertIcon} from "@chakra-ui/react"
function Error({message}) {
  return (
    <Alert
    status="error"
    position={'fixed'}
    bottom={"4"}
    left={"50%"}
    transform={"translateX(-50%)"}
    w={"container.lg"}
    >
      <AlertIcon/>
      {message}
    </Alert>
  )
}

export default Error