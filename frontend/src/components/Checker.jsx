import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    chakra,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";

const CheckerContext = React.createContext({
  data: [], fetchData: () => {}
})

function DeleteComparison({id}) {
  const {fetchData} = React.useContext(CheckerContext)

  const deleteComparison = async () => {
    await fetch(`http://localhost:8000/data/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: { "id": id }
    })
    await fetchData()
  }

  return (
    <Button h="2rem" size="md" onClick={deleteComparison}>Delete comparison</Button>
  )
}

function CheckerHelper({question, answer, aianswer, similarity, id}) {
    return (
      <Box
        p={2}
        shadow="lg"
        display="flex"
        flexWrap="wrap"
        alignItems="flex-start" 
        border="2px solid #e2e8f0"
        borderRadius="md"
      >
        <Box width={["100%", "50%", "33.33%", "25%"]} minWidth="200px" p={2}>
          <Text mt={4} as="div">
            <Text fontWeight="bold">Question:</Text>
          </Text>
          <Text as="div">{question}</Text> 
        </Box>
        <Box width={["100%", "50%", "33.33%", "25%"]} minWidth="200px" p={2}>
          <Text mt={4} as="div">
            <Text fontWeight="bold">Answer:</Text>
          </Text>
          <Text as="div">{answer}</Text> 
        </Box>
        <Box width={["100%", "50%", "33.33%", "25%"]} minWidth="200px" p={2}>
          <Text mt={4} as="div">
            <Text fontWeight="bold">AI Answer:</Text>
          </Text>
          <Text as="div">{aianswer}</Text> 
        </Box>
        <Box width={["100%", "50%", "33.33%", "25%"]} minWidth="200px" p={2}>
          <Text mt={4} as="div">
            <Text fontWeight="bold">similarity:</Text>
          </Text>
          <Text as="div">{similarity}</Text> 
        </Box>
        <DeleteComparison id={id}/>
      </Box>
    )
  }

  function AddQandA() {
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState("");
    const { data, fetchData } = React.useContext(CheckerContext);
  
    const handleQuestionInput = (event) => {
      setQuestion(event.target.value);
    };
  
    const handleAnswerInput = (event) => {
      setAnswer(event.target.value);
    };
  
    const handleSubmit = (event) => {
      const newdata = {
        question: question,
        answer: answer,
      };
  
      fetch("http://localhost:8000/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newdata),
      }).then(fetchData);
    };
  
    return (
        <Box
            p={4}
            m={4}
            boxShadow="md"
            borderRadius="md"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={40}
          >
        <form onSubmit={handleSubmit}>
          <Textarea
            pr="4.5rem"
            placeholder="Add the question"
            aria-label="Add the question"
            onChange={handleQuestionInput}
            value={question}
            size="lg"
            rows={4} 
            maxWidth="800px"
          />
          <Textarea
            pr="4.5rem"
            placeholder="Add the answer"
            aria-label="Add the answer"
            onChange={handleAnswerInput}
            value={answer}
            size="lg"
            rows={4} 
            maxWidth="800px"
          />
          <Box textAlign="center">
            <Button type="submit" colorScheme="blue" size="lg">
              Check answer
            </Button>
          </Box>
        </form>
      </Box> 
    );
  }
  
  


export default function data() {
    const [data, setdata] = useState([])
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/data")
      const data = await response.json()
      setdata(data.data)
    }
    useEffect(() => {
      fetchData()
    }, [])
    return (
        <CheckerContext.Provider value={{data, fetchData}}>
          <AddQandA />
          <Stack spacing={5}>
            {
              data.slice().reverse().map((data) => (
                <Box key={data.id} p={10}>
                  <CheckerHelper question={data.question} answer={data.answer} aianswer={data.aianswer} similarity={data.similarity} id={data.id} />
                </Box>
              ))
            }
          </Stack>
        </CheckerContext.Provider>
      )
  }
  