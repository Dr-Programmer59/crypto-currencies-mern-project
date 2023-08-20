import React from 'react'
import axios from "axios"
import {api_url} from "./url" 
import { useEffect,useState } from 'react'
import { Container, HStack,VStack,Image, Heading,Text,Button} from '@chakra-ui/react'
import Loading from './Loading'
import Error from './Error'
function Exchange() {
    const [exchanges, setexchanges] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [Page, setPage] = useState()
    const btn=new Array(10).fill(1)
    useEffect(() => {

        const fetchExchanges=async()=>{
            try{
                console.log(api_url)
            const {data}= await axios.get(`${api_url}/exchanges`)
            // console.log(data)
            setexchanges(data);
            setloading(false);
            }
            catch(error){
                console.log(error)
                seterror(true)
                setloading(false)

            }
        }
        
        fetchExchanges();

    }, [Page])
    if(error) return <Error/>
    
  return (
    <Container
    maxW={"container.xl"}

    >
        {
            loading?<Loading message={"Error while fetching the exchanges"}/>:
            <HStack wrap={'wrap'}>
            {
            exchanges.map((value,index)=>{

               return  <ExchangeItem name={value.name} image={value.image} index={index+1} url={value.url}/>

            })
        }
        </HStack>
       
        
        }
        

    </Container>
  )
}
const ExchangeItem=({name,image,no,url})=>(
    <a href={url} >
        <VStack 

        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        css={{

            "&:hover":{
                transform:"scale(1.1)"
            }
        }}
        >
            <Image
            src={image}
            s={"10"}
            h={"10"}
            objectFit={"contain"}
            alt={'Exhange'}
            /

            >
                <Heading size={"md"} noOfLines={1}>
                    {no}

                </Heading>
                <Text noOfLines={1}>
                    {name}
                </Text>

         

        </VStack>
    </a>

)

export default Exchange;
