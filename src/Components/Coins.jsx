import React from 'react'
import axios from "axios"
import {api_url} from "./url" 
import { useEffect,useState } from 'react'
import { Container, HStack,VStack,Image, Heading,Text,Button, RadioGroup, Radio} from '@chakra-ui/react'
import Loading from './Loading'
import Error from './Error'
import { Link } from 'react-router-dom'
function Coins() {
    const [Coins, setCoins] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [Page, setPage] = useState()
    const [currency, setcurrency] = useState("pkr")
    const [currentSymbol, setcurrentSymbol] = useState("Rs")

    
    const btn=new Array(132).fill(1)
    useEffect(() => {
        if(currency=="pkr"){
            setcurrentSymbol("Rs")
        }
        else if (currency=="usd"){
            setcurrentSymbol("$")
        }
        else if (currency=="eur"){
            setcurrentSymbol("€")
        }

        const fetchCoins=async()=>{
            try{
              const {data}= await axios.get(`${api_url}/coins/markets?vs_currency=${currency}&page=${Page}`)
              // console.log(data)
              setCoins(data);
              setloading(false);
            }
            catch(error){
                
                seterror(true)
                setloading(false)

            }
        }
        
        fetchCoins();

    }, [Page,currency])
    if(error) return <Error message={"Error while fetching results"}/>
    
  return (
    <Container
    maxW={"container.xl"}

    >
        {
            loading?<Loading/>:
            
            <>
            <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
                <HStack spacing={'4'}>

                <Radio value={"pkr"}>Rs</Radio>
                <Radio value={"usd"}>$</Radio>
                <Radio value={"eur"}>€</Radio>
                </HStack>
                
              

            </RadioGroup>
            <HStack wrap={'wrap'} justifyContent={"center"}>
                
            {
                Coins.map((value,index)=>{
                    
                    return  <CoinsItem id={value.id} name={value.name} image={value.image} symbol={value.symbol} price={value.current_price} currentSymbol={currentSymbol}/>
                    
                })
            }
        </HStack>
            </>
       
        
        }
        <HStack overflowX={'auto'} p={'8'}>
        {
            btn.map((value,index)=>{
                return <Button
                bgColor={'blackAlpha.900'}
                color={'white'}
                onClick={()=>{
                    setPage(index+1)
                    setloading(true)
                }}
                
                >
                    {index+1}


                </Button>


            })
        }
        </HStack>

    </Container>
  )
}
const CoinsItem=({id,name,image,symbol,price,currentSymbol})=>(
    <Link to={`/coin/${id}`} target={"blank"}>
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
                    {symbol}

                </Heading>
                <Text noOfLines={1}>
                    {name}
                </Text>
                <Text noOfLines={1}>
                    {price?`${currentSymbol} ${price}`:"N/A"}
                </Text>

         

        </VStack>
    </Link>

)

export default Coins;
