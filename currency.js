
let coins = [{ name: 'btc', symbol: 'img/bitcoin.png' },
             { name: 'eth', symbol: 'img/ethereum.png' },
             { name: 'ltc', symbol: 'img/litecoin.png' },
             { name: 'xrp', symbol: 'img/ripple.png' },
            ]; 


coins.forEach((coin) => {
    document.getElementById('crypto-info').innerHTML += currency(coin.name, coin.symbol);
}   
);



function currency(name, symbol) { 
    return`<div class="item">
    <div class="badge">
        <div class="crypto">
            <img src="${symbol}" alt>
        </div>
    </div>
    <div id="${name}_currencyName">
    Loading...
    </div>
    <div class="money">
        <div id="${name}" class="current-price">
            Loading...
        </div>
        <div id="${name}_difference">
        Loading...
        </div>
    </div>
</div>`

}

