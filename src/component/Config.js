module.exports = {


    //currencyConverterUrl:"http://localhost:8082",
    addTransactionUrl:"http://localhost:8081/forex/transaction/save",
    saveUserBankDetailsUrl:"http://localhost:8081/forex/UserBankDetails/save",
    currencyConverterUrl:"http://localhost:8081/forex/rate/convert?amount=${amount}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}",
    updateRateUrl:"http://localhost:8081/forex/exchangeRate/update",
    updateUrlSave:"http://localhost:8081/forex/admin/exchangeRate/update",
    getRateByDate:" http://localhost:8081/forex/exchange-rates/" 
    }
