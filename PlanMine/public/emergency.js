document.addEventListener('DOMContentLoaded', function () {
    // Function to calculate inflated price of goal
    function calculateInflatedPrice(currentPrice, yearsRemaining) {
        // Assuming an average inflation rate of 6% per year
        const inflationRate = 0.06;
        const inflatedPrice = currentPrice * Math.pow(1 + inflationRate, yearsRemaining);
        return inflatedPrice.toFixed(2); // Limiting to 2 decimal places
    }

    // Function to calculate CAGR
    function calculateCAGR(initialValue, finalValue, years) {
        return Math.pow(finalValue / initialValue, 1 / years) - 1;
    }

    // Function to update HTML element with inflated price
    function updateInflatedPrice(price) {
        const inflatedPriceElement = document.getElementById('inflatedPrice');
        inflatedPriceElement.textContent = price;
    }

    // Function to update HTML element with CAGR
    function updateCAGR(cagr) {
        const cagrElement = document.getElementById('cagr');
        cagrElement.textContent = (cagr * 100).toFixed(2) + "%";
    }

    // Function to update HTML element with amount to invest
    function updateAmountToInvest(amount) {
        const amountToInvestElement = document.getElementById('amountToInvest');
        amountToInvestElement.textContent = amount.toFixed(2);
    }

    // Function to update HTML element with monthly SIP amount
    function updateMonthlySIP(sipAmount) {
        const sipAmountElement = document.getElementById('sipMessage');
        sipAmountElement.textContent = sipAmount.toFixed(2);
    }

    // Function to calculate SIP amount needed to achieve goal with user-defined interest rate
    function calculateSIPAmount(inflatedPrice, yearsRemaining, investmentType) {
        let interestRate;
        switch (investmentType) {
            case 'debt':
                interestRate = 0.07;
                break;
            case 'equity':
                interestRate = 0.22;
                break;
            case 'hybrid':
                interestRate = 0.16;
                break;
            case 'index':
                interestRate = 0.17;
                break;
            default:
                interestRate = 0.1; // Default interest rate if no type is selected
        }

        // Convert interest rate from annual to monthly
        const monthlyInterestRate = interestRate / 12;

        // Convert years to months
        const months = yearsRemaining * 12;

        // Calculate SIP amount using formula for future value of annuity
        const sipAmount = inflatedPrice * (monthlyInterestRate) / (Math.pow(1 + (monthlyInterestRate), months) - 1);

        return sipAmount;
    }

    // Get the form elements
    const emergency = document.getElementById('emergency-form');
    const currentPriceInput = document.getElementById('currentPrice');
    const yearsRemainingInput = document.getElementById('yearsRemaining');
    const investmentTypeInput = document.getElementById('investmentType');

    // Add event listener to form submission
    emergency.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get the current price, years remaining, and investment type from form inputs
        const currentPrice = parseFloat(currentPriceInput.value);
        const yearsRemaining = parseInt(yearsRemainingInput.value);
        const investmentType = investmentTypeInput.value;

        // Calculate inflated price of goal
        const inflatedPrice = calculateInflatedPrice(currentPrice, yearsRemaining);

        // Update HTML element with inflated price
        updateInflatedPrice(inflatedPrice);

        // Fetch the amount to invest from the server
        fetch('/getAmountInvested')
            .then(response => response.json())
            .then(data => {
                // Check if amount to invest is available in the response
                if (data.amountToInvest !== null) {
                    // Update the HTML element with amount to invest
                    updateAmountToInvest(data.amountToInvest);

                    // Calculate SIP amount needed to achieve goal with user-defined interest rate
                    const sipAmount = calculateSIPAmount(inflatedPrice, yearsRemaining, investmentType);

                    // Update HTML element with monthly SIP amount
                    updateMonthlySIP(sipAmount);

                    // Calculate CAGR based on total investment amount
                    const totalInvestment = sipAmount * yearsRemaining * 12;
                    const cagr = calculateCAGR(totalInvestment, inflatedPrice, yearsRemaining);

                    // Update HTML element with CAGR
                    updateCAGR(cagr);

                    // Optionally, you can also display a confirmation message
                    const confirmationMessage = document.getElementById('confirmation-message');
                    confirmationMessage.classList.remove('hidden');
                }
            })
            .catch(error => {
                console.error('Error fetching amount to invest:', error);
            });
    });
});
