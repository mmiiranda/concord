const state = {
    isOpen: false,
}

const mutations = {
    SET_MODAL_STATE(state, value){
        state.isOpen = value
    }
}

const actions = {
    setModalState({commit}, value){
        commit("SET_MODAL_STATE", value)
    }
}

const getters = {
    isOpen:(state) => state.isOpen
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };