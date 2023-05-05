import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
         {
        path: "/login",
        name: "login",
        component: () => import("@/components/Login.vue"),
        
    },
    {
        path: "/",
        name: "home",
        component: Home,
    },

    {
        path: "/contact",
        name: "contact",
        component: () => import("@/views/Contact.vue"),
        
    },
    {
        path: "/about",
        name: "about",
        component: () => import("@/views/About.vue"),
       
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("@/components/SignUp.vue"),
       
    },
    
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;

