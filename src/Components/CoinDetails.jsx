import { Box,Button ,Container,Radio,Image,Text,RadioGroup ,HStack, VStack, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress} from '@chakra-ui/react';
import React from 'react'
import Loading from './Loading';
import { api_url } from './url';
import Error from './Error';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chart from './Chart';
function CoinDetails() {
  const [Coin, setCoin] = useState([])
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(false)
  const [currency, setcurrency] = useState("pkr")
  const [days, setdays] = useState("24h")
  const [chartArray, setchartArray] = useState([])
  const chartDays=["1d","3d","7d","14d","30d","60d","200d","365d"]
  // const [currentSymbol, setcurrentSymbol] = useState("Rs")
  const switchChartStats=(key)=>{
    setdays(key);
    setloading(true);


  }
  const currentSymbol=currency=="pkr"?"Rs":currency=="eur"?"$":"€";
  const params=useParams();

  useEffect(() => {

    const fetchCoins=async()=>{
        try{
          const {data}= await axios.get(`${api_url}/coins/${params.id}`)
          const {data:chartData}= await axios.get(`${api_url}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)

          console.log(chartData)
          // console.log(data) 
          setCoin(data);
          setchartArray(chartData.prices)
          setloading(false);

        }
        catch(error){
            console.log(error)
            seterror(true)
            setloading(false)

        }
    }
    
    fetchCoins();

}, [params.id])

if (error) return <Error message={"Errp while fetching coin"}/>
  return (
    <Container maxW={"container.xl"}>
      {loading?<Loading />:
      (
        <>
        <Box width={'full'} borderWidth={1}>
          <Chart arr={chartArray} currency={currentSymbol} days={days} />

        </Box> 

        <HStack>
          {
            chartDays.map((i)=>(
              <Button key={i} onClick={()=>switchChartStats(i)}>{i} </Button>
            ))
          }
        </HStack>
         

        <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
                <HStack spacing={'4'}>

                <Radio value={"pkr"}>Rs</Radio>
                <Radio value={"usd"}>$</Radio>
                <Radio value={"eur"}>€</Radio>
                </HStack>
                
              

            </RadioGroup>
            <VStack>
              <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
                Last Updated On {" "}
                {Date(Coin.market_data.last_updated).split("G")[0]}
              </Text>
              <Image
              src={Coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
              />

              <Stat>
                <StatLabel>{Coin.name}</StatLabel>
                <StatNumber>{Coin.market_data.current_price[currency]}</StatNumber>
                <StatHelpText>
                  <StatArrow type={Coin.market_data.price_change_percentage_24h?"increase":"decrease"}/>
                  {Coin.market_data.price_change_percentage_24h}%
                </StatHelpText>

               </Stat>
               <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"}>
                {`#${Coin.market_cap_rank}`}
               </Badge>
               <CustomBar high={`${currentSymbol} ${Coin.market_data.high_24h[currency]}`} 
               low={`${currentSymbol} ${Coin.market_data.low_24h[currency]}`}
               />

              <Box w={"full"} p="4">
                <Item title={"Max Supply"} value={Coin.market_data.max_supply}/>
                <Item title={"Circulating Supply"} value={Coin.market_data.circulating_supply}/>
                <Item title={"Market Cap"} value={`${currentSymbol} ${Coin.market_data.market_cap[currency]}`}/>
                <Item title={"All Time Low"} value={`${currentSymbol} ${Coin.market_data.atl[currency]}`}/>
                <Item title={"All Time High"} value={`${currentSymbol} ${Coin.market_data.atl[currency]}`}/>

                


              </Box>
            </VStack>
        
        </>
      )
      }

    </Container>
  )
};
const Item=({title,value})=>(
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>

  </HStack>

)
const CustomBar=({high,low})=>(

  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack>
      <Badge children={low} colorScheme={"red"}/>
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"}/>

    </HStack>

  </VStack>
)

export default CoinDetails;