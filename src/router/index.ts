import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        meta: { title: "Zhe Huang" },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.afterEach((to) => {
    const title = typeof to.meta.title === "string" ? to.meta.title : "Zhe Huang";
    document.title = title;
});

export default router;
