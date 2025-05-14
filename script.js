const API_URL = 'https://crypto-arbitrage-server.onrender.com/api/arbitrage';

async function updateTable() {
  const response = await fetch(API_URL);
  const data = await response.json();

  const tbody = document.querySelector('#arbitrage-table tbody');
  tbody.innerHTML = '';

  Object.keys(data).forEach(symbol => {
    const { binance, bybit } = data[symbol];
    if (binance && bybit) {
      const diff = ((binance - bybit) / ((binance + bybit) / 2)) * 100;
      const row = `
        <tr>
          <td>${symbol}</td>
          <td>${binance.toFixed(2)}</td>
          <td>${bybit.toFixed(2)}</td>
          <td style="color: ${diff > 0 ? 'green' : 'red'}">${diff.toFixed(2)}%</td>
        </tr>
      `;
      tbody.innerHTML += row;
    }
  });
}

updateTable();
setInterval(updateTable, 60000);
