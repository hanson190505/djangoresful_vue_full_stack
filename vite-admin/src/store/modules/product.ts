export const ProductModule = {
  namespaced: true,
  state: () => {
    productID: 0;
  },

  mutations: {
    commitSetProductID(state, id: number) {
      state.productID = id;
    },
  },
  actions: {
    setProductID({ commit }, id: number) {
      commit('commitSetProductID', id);
    },
  },
};
