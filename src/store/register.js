const state = {
    user: null
}

const mutations = {
    SET_USER(state, newUser){
        state.user = newUser
    }, 
}

const actions = {
    async postNewUser(user){
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        return response
    },
    setUser({commit}, newUser){
        commit("SET_USER", newUser)
    }
}  

const getters  = {
    user: (state) => state.user    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
  