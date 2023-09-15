import config from './config.js'; 

const streams =  {
    'btceur@trade': { name: 'btc', stockPriceElement: document.getElementById('btc'), input: document.getElementById('btc_currencyName') },
    'etheur@trade': { name: 'eth', stockPriceElement: document.getElementById('eth'), input: document.getElementById('eth_currencyName')}, 
    'ltceur@trade': { name: 'ltc', stockPriceElement: document.getElementById('ltc'), input: document.getElementById('ltc_currencyName') },
    'xrpeur@trade': { name: 'xrp', stockPriceElement: document.getElementById('xrp'), input: document.getElementById('xrp_currencyName') },

};

const streams24 =  {
    'btceur@ticker': { name: 'btc', stockPriceDifference: document.getElementById('btc_difference') },
    'etheur@ticker': { name: 'eth', stockPriceDifference: document.getElementById('eth_difference') },
    'ltceur@ticker': { name: 'ltc', stockPriceDifference: document.getElementById('ltc_difference') },
    'xrpeur@ticker': { name: 'xrp', stockPriceDifference: document.getElementById('xrp_difference') },

};
  

const streamParams = Object.entries(streams).map(([streamId]) => streamId).join(`/`);
const streamUrl = config.url + `stream?streams=${streamParams}`;
const wss = new WebSocket(streamUrl);

const streamParams24 = Object.entries(streams24).map(([streamId]) => streamId).join(`/`);
const streamUrl24 = config.url + `stream?streams=${streamParams24}`;
const ws24 = new  WebSocket(streamUrl24);


let lastDifference = null;  

wss.onmessage = (e) => {
    const stockObject = JSON.parse(e.data);  
    const streamId = stockObject.stream;
    let latestPrice = Number.parseFloat(stockObject.data.p);
    const lastPrice = streams[streamId].lastPrice || latestPrice;

    const stockPriceElement = streams[streamId].stockPriceElement;
    const input = streams[streamId].input;

    let price = lastPrice.toFixed(2);
   
        stockPriceElement.innerHTML = `<Span>${price} €</Span>`;

        input.innerHTML = `<div class='currency_name'>${stockObject.data.s}</div>
                           <div style='font-size:14px;'>24h Change</div>`; 
}

ws24.onmessage = (e) => {
    let stockObject = JSON.parse(e.data); 
    const streamId = stockObject.stream;
    let difference = parseFloat(stockObject.data.p).toFixed(2);
    // let difference = Number.parseFloat(stockObject.data.p).toFixed(2);
    const stockPriceDifference = streams24[streamId].stockPriceDifference;
   
    if (lastDifference >= difference) {
        stockPriceDifference.innerHTML = `<div class="green">
                                            <span> ${difference}</span>
                                            <i class="fa-solid fa-caret-up"></i>
                                          </div>
        
                                        `;
       
    } else {
        stockPriceDifference.innerHTML = `<div class="red">
                                            <span> ${difference}</span>
                                            <i class="fa-solid fa-sort-down"></i>
                                        </div>
                                        `;
    }

    lastDifference = difference;
}



