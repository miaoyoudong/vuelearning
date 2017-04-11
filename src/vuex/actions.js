//test
export const increment = ({commit}) => {
    commit('INCREMENT')
}
export const decrement = ({commit}) => {
    commit('DECREMENT')
}
export const orderInfo = ({commit}, orderInfo) => {
    commit('SETORDERINFO', orderInfo)
}
