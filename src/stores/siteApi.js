import axios from "axios";
import { defineStore } from "pinia";
const BASE_URL =
  import.meta.env.PROD
    ? "https://main.softitglobalbd.xyz/api"
    : "/api"; // local uses proxy


export const useSiteApi = defineStore("sites", {
  state: () => ({
    siteInfo: [],
    loading: false,
    error: false,
  }),

  actions: {
    async fetchSiteInfo() {
      try {
        this.loading = true;
        const res = await axios.get(`${BASE_URL}/site/vue.softitglobalbd.xyz`);
        this.siteInfo = res.data.site;
      } catch (error) {
        this.error = true;
        console.error("Site API error:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});