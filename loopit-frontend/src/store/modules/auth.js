import axios from "axios";

const state = {
    userId: null,
    token: null,
    name: null,
    cars: null,
};

const getters = {
    StateCars: (state) => state.cars,

    userId(state) {
        return state.userId
    },
    name(state) {
        return state.name
    },
    token(state) {
        return state.token
    },
    isAuthenticated(state) {
        return !!state.token
    }

};

const actions = {
    async Register({dispatch}, form) {
        await axios.post('register', form).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
        let UserForm = new FormData()
        UserForm.append('name', form.name)
        UserForm.append('email', form.email)
        UserForm.append('password', form.password)
        UserForm.append('password_confirmation', form.password_confirmation)
        await dispatch('LogIn', UserForm);


    },
    async LogIn({commit}, user) {
        await axios.post("login", user).then(async function (response) {
            console.log(response);

            await commit("setUser", {
                token: response.data.token,
                userId: response.data.user.id,
                name: response.data.user.name,
                //isAuthenticated: true
            });
        })
            .catch(function (error) {
                console.log(error);
            });
    },


    async GetCars({commit}) {
        const response = await axios.get('cars', {
            headers: {
                'Authorization': `Bearer ${getters.token(state)}`
            }
        });
        console.log(response.data)
        commit("setCars", response.data);
    },

    async LogOut({commit}) {

        commit("logout", null);
    },
};

const mutations = {
    setUser(state, payload) {
        console.log(payload.token + 'sss')
        state.token = payload.token;
        state.userId = payload.userid;
        state.name = payload.name

    },

    setCars(state, cars) {
        state.cars = cars;
    },
    logout(state, user) {
        state.token = user;
        state.userId = user;
        state.name = user
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
