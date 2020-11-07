import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import App from "@/App.vue";
import Repair from "@/views/Repair.vue";
import Chat from "@/views/Chat.vue";
import Config from "@/views/Configs.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/repair",
    component: App,
    children: [
      {
        path: "/repair",
        name: "RepairMenu",
        component: Repair
      },
      {
        path: "/chat",
        name: "ChatMenu",
        component: Chat
      },
      {
        path: "/config",
        name: "ConfigMenu",
        component: Config
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
