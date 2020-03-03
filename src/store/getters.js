export const getStocks = state => {
    return state.stocks;
}

export const getPortfolio = state => {
    return state.portfolio;
}

export const getFunds = state => {
    return state.funds;
}

export const getStockPrice = (state) => payload => {
    let stockIndex = state.stocks.map(stock => stock.name).indexOf(payload)
    return state.stocks[stockIndex].price;
}

export const getPortfolioLoading = state => {
    return state.portfolioLoading;
}

export const getStocksLoading = state => {
    return state.stocksLoading;
}