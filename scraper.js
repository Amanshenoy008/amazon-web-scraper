const cheerio = require('cheerio')
const axios = require('axios')
const express = require('express');
const twilio = require('twilio');
const app = express()
const cors = require('cors')

require('dotenv').config()
const account_sid = process.env.Twilio_SID
const account_token = process.env.Twilio_TOKEN

const client = require('twilio')(account_sid,account_token)

const url ='https://www.amazon.in/Apple-MacBook-Chip-13-inch-256GB/dp/B08N5T6CZ6/ref=sr_1_1_sspa?keywords=macbook&qid=1675003152&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'

const product ={ name:'' , price:'' , link:''}


const scrape = async ()=>{
    const {data} = await axios.get(url);
    //console.log(data)

    const $ = cheerio.load(data)

    const item = $('div#dp-container')

    product.name = $(item).find('span#productTitle').text()

    console.log(product.name)

    product.price = $(item).find('span.a-price-whole').first().text().replace(/[,.]/g,'')

    const val = parseInt(product.price)

   product.price = val
    //console.log(product)

    product.link = url;
    console.log(product)


    if(val>100000){
        client.messages
        .create({ body: "Hello from Twilio", from: "+18705125933", to: '+917483403863' })
        .then(message => console.log(message.sid))
    }

   // product.link=url
    
   //if(val < )

    return product
}


app.use(cors())

app.get('/:id',(req,res)=>{
   try{
    const product = scrape()
    //console.log(req.params.id)
   }
   catch(err){
    res.send(err)
   }
    
    
    res.json(product)
    res.end()
})


app.listen(3000,()=>{
    console.log('hosting on port 3000')
})

