export const state = () => ({
    series: {
        name: null,
        hed: ''
    }
});

export const mutations = {
    set(state, series) {
        state.series = series;
    }
};
