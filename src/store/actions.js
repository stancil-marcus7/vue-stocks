import Vue from "vue"

export const endDayAction = ({state}) => {
    for (let stock in state.stocks) {
        state.stocks[stock].price = Math.floor(Math.random() * 100) + 1
        Vue.http.put(`https://vue-stocks-a6ed5.firebaseio.com/stocks/${stock}.json`, state.stocks[stock])
            .then(response => {
                console.log(response, `Successfully changed stock price`)
            }, error => {
                console.log(error, `Could not change stock price`)
            })
    }
}

export const addFundsAction = ({state, getters}, payload) => {
    let increaseBy = getters.getStockPrice(payload.stock.stock.name) * payload.quantity
    state.funds += increaseBy;
    Vue.http.put('https://vue-stocks-a6ed5.firebaseio.com/funds.json', state.funds)
        .then(response => {
            console.log(response, 'Successfully increased funds by ' + increaseBy)
        }, error => {
            console.log(error, 'Did not successfully add funds')
        })
}

export const decreaseFundsAction = ({state}, payload) => {
    let decreaseBy = payload.stock.price * payload.quantity
    state.funds -= decreaseBy;
    Vue.http.put('https://vue-stocks-a6ed5.firebaseio.com/funds.json', state.funds)
        .then(response => {
            console.log(response, 'Successfully decreased funds by ' + decreaseBy)
        }, error => {
            console.log(error, 'Did not successfully decrease funds')
        })
}

export const getFundsAction = ({state}) => {
    Vue.http.get('funds.json')
        .then(response => {
            console.log(response, 'Successfully retrieved funds')
            state.funds = response.body;
        }, error => {
            console.log(error)
        })
}

export const insertPortfolioAction = ({state, dispatch}, payload) => {
    console.log("Amount paid " + payload.stock.price * payload.quantity);
    if ((payload.stock.price * payload.quantity) > state.funds) {
        alert("You don't enough funds to purchase these stocks");
    } else {
        if (state.portfolio.length > 0) {
            let portfolioIndex = state.portfolio.map(stock => stock.stock.name).indexOf(payload.stock.name)
            if (portfolioIndex != -1) {
                state.portfolio[portfolioIndex].quantity += payload.quantity;
                console.log(state.portfolio[portfolioIndex].key)
                Vue.http.put(`https://vue-stocks-a6ed5.firebaseio.com/portfolio/${state.portfolio[portfolioIndex].key}.json`, state.portfolio[portfolioIndex], {
                        headers: {
                            "Access-Control-Allow-Origin": '*'
                        }
                    })
                    .then(response => {
                        console.log(response, 'successfully edited stock in portfolio');
                        dispatch('decreaseFundsAction', payload)
                        dispatch('getPortfolioAction')
                    }, error => {
                        console.log(error)
                    })
            } else {
                Vue.http.post('portfolio.json', payload)
                    .then(response => {
                        console.log(response, 'successfully edited stock in portfolio');
                        dispatch('decreaseFundsAction', payload)
                        dispatch('getPortfolioAction')
                    }, error => {
                        console.log(error)
                    })
            }
        } else {
            Vue.http.post('portfolio.json', payload, {
                    headers: {
                        "Access-Control-Allow-Origin": '*'
                    }
                })
                .then(response => {
                    console.log(response, 'successfully edited stock in portfolio');
                    dispatch('decreaseFundsAction', payload)
                    dispatch('getPortfolioAction')
                }, error => {
                    console.log(error)
                })
        }
    }
}

export const removePortfolioAction = ({state, dispatch}, payload) => {
    let portfolioIndex = state.portfolio.map(stock => {
        return stock.stock.name
    }).indexOf(payload.stock.stock.name)
    if (portfolioIndex != -1) {
        if (payload.quantity > state.portfolio[portfolioIndex].quantity) {
            alert("You don't have enough stocks to sell")
        } else {
            state.portfolio[portfolioIndex].quantity -= payload.quantity;
            if (state.portfolio[portfolioIndex].quantity === 0) {
                dispatch('addFundsAction', payload);
                Vue.http.delete(`https://vue-stocks-a6ed5.firebaseio.com/portfolio/${state.portfolio[portfolioIndex].key}.json`)
                    .then(response => {
                        console.log(response, 'Successfully deleted stock from portfolio')

                    }, error => {
                        console.log(error, 'Could not delete stock from portfolio')
                    })
                    .then(() => {
                        dispatch('getPortfolioAction')
                    })
            } else {
                dispatch('addFundsAction', payload);
                Vue.http.put(`https://vue-stocks-a6ed5.firebaseio.com/portfolio/${state.portfolio[portfolioIndex].key}.json`, state.portfolio[portfolioIndex])
                    .then(response => {
                        console.log(response, 'Successfully sold')
                    }, error => {
                        console.log(error, "Couldn't sell stock")
                    })
            }
        }
    }
}

export const loadPortfolioAction = ({dispatch}) => {
    Vue.http.get(`save/portfolio.json`)
        .then(response => {
            Vue.http.put("https://vue-stocks-a6ed5.firebaseio.com/portfolio.json", response.body)
                .then(response => {
                    console.log(response, 'Successfully loaded portfolio')
                    dispatch('getPortfolioAction')
                }, error => {
                    console.log(error, "Could not load portfolio")
                })
        }, error => {
            console.log(error, "Could not load portfolio")
        })
    Vue.http.get(`save/stocks.json`)
        .then(response => {
            Vue.http.put("https://vue-stocks-a6ed5.firebaseio.com/stocks.json", response.body)
                .then(response => {
                    console.log(response, 'Successfully loaded stocks')
                    dispatch('getStocksAction')
                }, error => {
                    console.log(error, "Could not load stocks")
                })
        }, error => {
            console.log(error, "Could not load stocks")
        })
}

export const savePortfolioAction = () => {
    Vue.http.get(`portfolio.json`)
        .then(response => {
            Vue.http.put(`save/portfolio.json`, response.body)
                .then(response => {
                    console.log(response, 'Successfully saved portfolio')
                }, error => {
                    console.log(error, "Could not save portfolio")
                })
        }, error => {
            console.log(error, "Could not solve stocks")
        })

    Vue.http.get(`stocks.json`)
        .then(response => {
            Vue.http.put(`save/stocks.json`, response.body)
                .then(response => {
                    console.log(response, 'Successfully saved stocks')
                }, error => {
                    console.log(error, "Could not save stocks")
                })
        }, error => {
            console.log(error, "Could not save stocks")
        })
}

export const getStocksAction = ({commit}) => {
    commit('changeStocksLoadingTrueMutation')
    Vue.http.get('stocks.json')
        .then(response => {
            commit('changeStocksLoadingFalseMutation')
            console.log(response, 'Successfully retrieved stocks');
            commit('getStocksMutation', response.body)
        }, error => {
            console.log(error, 'Something went wrong')
        })
}

export const getPortfolioAction = ({commit}) => {
    commit('changePortLoadingTrueMutation');
    Vue.http.get('portfolio.json')
        .then(response => {
            commit('changePortLoadingFalseMutation');
            console.log("Successfully retrieved portfolio");
            commit('getPortfolioMutation', response.body)
        }, error => {
            console.log(error, 'Something went wrong')
        })
}