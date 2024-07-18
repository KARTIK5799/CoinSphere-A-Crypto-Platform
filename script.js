'use strict';
let coinData = null;

let seeAll=false;

let seeAllButton=document.querySelector('.btn-link').addEventListener('click',function(){
    seeAll=!seeAll
    fetchAllCoinData(); 

})


const fetchAllCoinData = function () {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-xzgRNztXu24NskufskZ7P2mZ'
    }
  };

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options)
    .then(response => response.json())
    .then(response => {
      coinData = response;
     if(seeAll){
        populateTable(coinData)
     }else{
        populateTable(coinData.slice(0,10))
     };
      populateCards(coinData.slice(0,4))
    })
    .catch(error => {
      console.error('Error fetching coin data:', error);
    });
};

fetchAllCoinData();

const populateTable = function (data) {
  const tbody = document.querySelector('.table-body');
  tbody.innerHTML = ''; 
  data.forEach((coin, index) => {
    const row = document.createElement('tr');
    row.classList.add("table-row");
    row.innerHTML = `
      <td class="table-data">
      
        <button class="add-to-fav" aria-label="Add to favourite" data-add-to-fav>
          <ion-icon name="star-outline" aria-hidden="true" class="icon-outline"></ion-icon>
          <ion-icon name="star" aria-hidden="true" class="icon-fill"></ion-icon>
        </button>
        
      </td>
      <th class="table-data rank" scope="row">${index + 1}</th>
      <td class="table-data">
        <div class="wrapper">
          <img src="${coin.image}" width="20" height="20" alt="${coin.name} logo" class="img">
          <h3>
            <a href="cryptoresult.html?search=${encodeURIComponent(coin.id)}" class="coin-name">${coin.name} <span class="span">${coin.symbol.toUpperCase()}</span></a>
          </h3>
        </div>
      </td>
      <td class="table-data last-price">$${coin.current_price.toFixed(2)}</td>
      <td class="table-data last-update ${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td class="table-data market-cap">$${coin.market_cap.toLocaleString()}</td>
      <td class="table-data">
            <a href="cryptoresult.html?search=${encodeURIComponent(coin.id)}" class="btn btn-outline">Trade</a>
      </td>
    
    `;
    tbody.appendChild(row);
  });
};

document.getElementById('search-button').addEventListener('click', function() {
  const searchValue = document.getElementById('coin-search').value;
  window.location.href = `cryptoresult.html?search=${encodeURIComponent(searchValue)}`;
});



document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get('search');
    console.log(searchValue);
    if(searchValue){
        fetchCoinData(searchValue)
    }
  });


let coinDetail=null;

const fetchCoinData = function (coinId) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-xzgRNztXu24NskufskZ7P2mZ'
    }
  };

  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`, options)
    .then(response => response.json())
    .then(response => {
        coinDetail=response
     populateDetail(coinDetail[0])
  
    })
    .catch(error => {
      console.error('Error fetching coin data:', error);
    });
};

const populateDetail = function (coin) {
    const detailContainer = document.querySelector('.coin-detail');

    if (!coin) {
        detailContainer.innerHTML = `
            <div class="crypto-info error">
                <p class="error-message">Oops! Data for the cryptocurrency is not found.</p>
                <p class="error-message">Please check if the spelling is correct or try again later.</p>
            </div>`;
        return;
    }

    detailContainer.innerHTML = `
        <div class="crypto-info">
            <img src=${coin.image} alt=${coin.name} class="crypto-logo">
            <p class="crypto-name">${coin.name}</p>
            <h1 class="crypto-price">$${coin.current_price.toFixed(2)}</h1>
        </div>

        <div class="crypto-details">
            <div class="crypto-detail">
                <h2>Crypto Market Rank</h2>
                <p>${coin.market_cap_rank}</p>
            </div>
            <div class="crypto-detail">
                <h2>Current Price</h2>
                <p>$${coin.current_price.toFixed(2)}</p>
            </div>
            <div class="crypto-detail">
                <h2>Market Cap</h2>
                <p>$${coin.market_cap.toLocaleString()}</p>
            </div>
            <div class="crypto-detail">
                <h2>24 Hour High</h2>
                <p>$${coin.high_24h.toFixed(2)}</p>
            </div>
            <div class="crypto-detail">
                <h2>24 Hour Low</h2>
                <p>$${coin.low_24h.toFixed(2)}</p>
            </div>
        </div>`;
};




function populateCards(data) {
    const cardSection = document.querySelector('.tab-content');
    cardSection.innerHTML=''
    for (let i = 0; i < 4; i++) {
        const coin = data[i];

 
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="trend-card">
                <div class="card-title-wrapper">
                    <img src="${coin.image}" width="24" height="24" alt="${coin.name} logo">
                    <a href="#" class="card-title">
                        ${coin.name} <span class="span">${coin.symbol.toUpperCase()}</span>
                    </a>
                </div>
                <data class="card-value" value="${coin.current_price.toFixed(2)}">$${coin.current_price.toFixed(2)}</data>
                <div class="card-analytics">
                    <data class="current-price" value="${coin.currentPrice}">$${coin.market_cap.toLocaleString()}</data>
                    <div class=" ${coin.price_change_percentage_24h >= 0 ? 'badgeGreen' : 'badgeRed'}">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </div>
                </div>
            </div>
        `;

        
        cardSection.appendChild(listItem);
    }
}






