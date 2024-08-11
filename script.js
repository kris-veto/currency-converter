// Crhistian Vera 
// Student Number  200557901

//links to the tutorial and documentation
//https://www.exchangerate-api.com/docs/pair-conversion-requests
//https://www.youtube.com/watch?v=37vxWr0WgQk&list=PL2HDlv-0QdyqB3etJGlkIYdwjZ7pwvQTv&index=43

const apiKey = '61b9302f9cc87cc7fc84504b';  
const convertButton = document.getElementById('convertButton'); 
const swapButton = document.getElementById('swapButton');

// Fetch the exchange rate  and convert when the button is clicked
convertButton.addEventListener('click', () => {
    convertCurrency();
    exchangeRate();
});

// Convert currency amount
async function convertCurrency() {
    try {
        const amount = document.getElementById('amount').value;
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;
    
        const response = await fetch(url)
        const data = await response.json();

        if (!data.result === 'success') {
                throw new Error(`Error fetching currencies`);
        }

        const convertedAmount = data.conversion_result;
        document.getElementById('result').innerText = `Converted Amount: ${convertedAmount} ${toCurrency}`;
    
    } catch (error) {
        console.error(error);
    }

}

//disply exchange rate
async function exchangeRate() {
    try {
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
    
        const response = await fetch(url)
        const data = await response.json();

        if (!data.result === 'success') {
            throw new Error(`Failed to fetch exchange rate`);
        }
        
        const exchangeRate = data.conversion_rates[toCurrency];
        document.getElementById('rate').innerText = `Exchange Rate: 1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;     
            
    } catch (error) {
        console.error(error);
    }
}

// Swap currencies
swapButton.addEventListener('click', () => {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const tempValue = fromCurrency.value;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempValue;

    getImg1();
    getImg2();
});


function getImg1() {
    const valorFromCurrency = document.getElementById('fromCurrency').value;
    const flagUrl = `https://www.xe.com/svgs/flags/${valorFromCurrency.toLowerCase()}.static.svg`;
    document.getElementById('imgContenedor1').innerHTML = `<img src="${flagUrl}" alt="Flag of ${valorFromCurrency}" width="40" style="border: 1px solid rgb(191, 191, 191)">`;
}

function getImg2() {
    const valorToCurrency = document.getElementById('toCurrency').value;
    const flagUrl = `https://www.xe.com/svgs/flags/${valorToCurrency.toLowerCase()}.static.svg`;
    document.getElementById('imgContenedor2').innerHTML = `<img src="${flagUrl}" alt="Flag of ${valorToCurrency}" width="40" style="border: 1px solid rgb(191, 191, 191)">`;
}