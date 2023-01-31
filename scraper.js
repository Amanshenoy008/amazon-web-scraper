const cheerio = require('cheerio')
const axios = require('axios')
const express = require('express');

const url ='https://www.amazon.in/Apple-MacBook-Chip-13-inch-256GB/dp/B08N5T6CZ6/ref=sr_1_1_sspa?keywords=macbook&qid=1675003152&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'

const product ={ name:'' , price:'' , link:''}


const scrape = async ()=>{
    const {data} = await axios.get(url);
    //console.log(data)

    const $ = cheerio.load(data)

    const item = $('div#dp-container')

    product.name = $(item).find('span.a-offscreen').text()

    console.log(product.name)

}
scrape()

