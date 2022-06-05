import { defineStore } from 'pinia'
import { store } from '../index'

// interface LocaleState {
//   localInfo: LocaleSetting;
// }

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: () => ({}),
  getters: {
    getShowPicker() {},
    getLocale() {}
  },
  actions: {
    /**
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo() {},
    /**
     * Initialize multilingual information and load the existing configuration from the local cache
     */
    initLocale() {}
  }
})

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
