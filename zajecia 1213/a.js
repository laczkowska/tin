// script.js

let lastData = null;
let newsIndex = 0;
const newsBuffer = [];

async function fetchData() {
    try {
        const response = await fetch('http://szuflandia.pjwstk.edu.pl/~ppisarski/zad8/dane.php');
        const data = await response.json();
        updateStockData(data.kursy);
        updateNews(data.newsy);
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
    }
}

function updateStockData(stockData) {
    const stockBody = document.getElementById('stockBody');
    stockBody.innerHTML = ''; 

    stockData.forEach(stock => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const priceCell = document.createElement('td');

        nameCell.textContent = stock.nazwa;
        priceCell.textContent = stock.kurs;

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        stockBody.appendChild(row);
    });
}

function updateNews(newsData) {
    newsData.forEach(news => {
        newsBuffer.push(news);
        if (newsBuffer.length > 3) {
            newsBuffer.shift();
        }
    });

    const newsRotator = document.getElementById('newsRotator');
    newsRotator.innerHTML = '';

    newsBuffer.forEach((news, index) => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        if (index === newsIndex % newsBuffer.length) {
            newsItem.classList.add('active');
        }
        newsItem.textContent = news;
        newsRotator.appendChild(newsItem);
    });

    newsIndex++;
}

setInterval(() => {
    fetchData();
}, 10000);

fetchData();
