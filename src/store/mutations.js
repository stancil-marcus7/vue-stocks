export const getStocksMutation = (state, payload) => {
    const stockArray = [];
    for (let key in payload){
        stockArray.push(payload[key]);
    }
    state.stocks = [...stockArray];
}

export const getPortfolioMutation = (state, payload) => {
    const portFolioArray = [];
    for (let key in payload){
        payload[key].key = key
        console.log('[key]' + payload[key].key)
        portFolioArray.push(payload[key]);
    }
    state.portfolio =[...portFolioArray];
}

export const changePortLoadingTrueMutation = (state) => {
    state.portfolioLoading = true;
}

export const changePortLoadingFalseMutation = (state) => {
    state.portfolioLoading = false;
}

export const changeStocksLoadingTrueMutation = (state) => {
    state.stocksLoading = true;
}

export const changeStocksLoadingFalseMutation = (state) => {
    state.stocksLoading = false;
}