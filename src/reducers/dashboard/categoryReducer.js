const INITIAL_STATE = {
  nextPageCount: 0,
  loading: false,
  subCategoryLoader: false,
  totalPageCount: 0,
  categoryList: [],
  dealOfDayList: [],
  bannerList: [],
  categoryData: {
    category: [],
  },
};

function categoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CATEGORY_REQUEST":
      return {...state, loading: true};

    case "CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        categoryList: action.payload.category,
        bannerList: action.payload.banner,
        totalPageCount: action.payload.totalpage,
        nextPageCount: action.payload.nextPage,
        dealOfDayList: action.payload.dealOfDay,
      };
    case "CLOTH_REQUEST_RESET":
      return {
        ...state,
        subCategoryLoader: true,
        categoryData: {
          category: [],
        },
      };
    case "CLOTH_SUCCESS":
      return {
        ...state,
        subCategoryLoader: false,
        categoryData: {
          nextPage: action.payload.nextPage,
          current_page: action.payload.current_page,
          category: [
            ...state.categoryData.category,
            ...action.payload.category,
          ],
        },
      };
    case "CATEGORY_FAIL":
      return {
        ...state,
        subCategoryLoader: false,
        categoryData: {
          category: [],
        },
      };
    case "ADD_WISH_LIST_SUCCESS":
      let dealOfDayList = state.dealOfDayList.reduce((list, i) => {
        if (i.post_id === action.payload) {
          list.push({...i, wishlist_status: !i.wishlist_status});
        } else {
          list.push(i);
        }
        return list;
      }, []);
      let categoryData = state.categoryData.category.reduce((d, item) => {
        let product = item.product.reduce((q, i) => {
          if (i.post_id === action.payload) {
            q.push({...i, wishlist_status: !i.wishlist_status});
          } else {
            q.push(i);
          }
          return q;
        }, []);
        d.push({...item, product});
        return d;
      }, []);
      return {
        ...state,
        dealOfDayList,
        categoryData: {category: categoryData},
      };
    case "DELETE_WISH_LIST_SUCCESS":
      let dealOfDayLi = state.dealOfDayList.reduce((list, i) => {
        if (i.post_id == action.payload.product_id) {
          list.push({...i, wishlist_status: false});
        } else {
          list.push(i);
        }
        return list;
      }, []);

      let category = state.categoryData.category.reduce((d, item) => {
        let product = item.product.reduce((q, i) => {
          if (i.post_id == action.payload.product_id) {
            q.push({...i, wishlist_status: false});
          } else {
            q.push(i);
          }
          return q;
        }, []);
        d.push({...item, product});
        return d;
      }, []);
      return {
        ...state,
        dealOfDayList: dealOfDayLi,
        categoryData: {category},
      };
    case "ADD_CART_SUCCESS":
      let dealOfDay = state.dealOfDayList.reduce((list, i) => {
        if (i.post_id == action.payload.product_id) {
          list.push({...i, cart_status: !i.cart_status});
        } else {
          list.push(i);
        }
        return list;
      }, []);

      let cat = state.categoryData.category.reduce((d, item) => {
        let product = item.product.reduce((q, i) => {
          if (i.post_id == action.payload.product_id) {
            q.push({...i, cart_status: !i.cart_status});
          } else {
            q.push(i);
          }
          return q;
        }, []);
        d.push({...item, product});
        return d;
      }, []);
      return {
        ...state,
        dealOfDayList: dealOfDay,
        categoryData: {category: cat},
      };
    case "DELETE_CART_LIST_REQUEST":
      let deal = state.dealOfDayList.reduce((list, i) => {
        if (i.post_id == action.payload.product_id) {
          list.push({...i, cart_status: false});
        } else {
          list.push(i);
        }
        return list;
      }, []);

      let c = state.categoryData.category.reduce((d, item) => {
        let product = item.product.reduce((q, i) => {
          if (i.post_id == action.payload.product_id) {
            q.push({...i, cart_status: false});
          } else {
            q.push(i);
          }
          return q;
        }, []);
        d.push({...item, product});
        return d;
      }, []);

      return {
        ...state,
        dealOfDayList: deal,
        categoryData: {category: c},
      };
    case "DELETE_CART_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "ORDER_PLACE_SUCCESS":
      let d = state.dealOfDayList.reduce((list, i) => {
        if (i.post_id == action.payload.product_id) {
          list.push({...i, cart_status: false});
        } else {
          list.push(i);
        }
        return list;
      }, []);

      let ca = state.categoryData.category.reduce((d, item) => {
        let product = item.product.reduce((q, i) => {
          if (i.post_id == action.payload.product_id) {
            q.push({...i, cart_status: false});
          } else {
            q.push(i);
          }
          return q;
        }, []);
        d.push({...item, product});
        return d;
      }, []);
      return {...state, dealOfDayList: d, categoryData: {category: ca}};
    case "CLEAR_LOADERS":
      return {...state, loading: false, subCategoryLoader: false};
    case "LOGOUT_SUCCESS":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default categoryReducer;
