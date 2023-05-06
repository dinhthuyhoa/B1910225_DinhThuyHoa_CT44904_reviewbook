import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import ClientRender from "@/AppClient.vue";
import AdminRender from "@/AppAdmin.vue";

const routes = [
    {
        path: "/",
        name: "client",
        component: ClientRender,
        children: [
            {
                path: "login",
                name: "login",
                component: () => import("@/components/Login.vue"),

            },
            {
                path: "",
                name: "home",
                component: Home,
            },

            {
                path: "contact",
                name: "contact",
                component: () => import("@/views/Contact.vue"),

            },
            {
                path: "about",
                name: "about",
                component: () => import("@/views/About.vue"),

            },
            {
                path: "signup",
                name: "signup",
                component: () => import("@/components/SignUp.vue"),

            },
        ]
    },
    {
        path: "/admin",
        name: "admin",
        component: AdminRender,
        children: [

            {
                path: "users",
                name: "users",
                component: () => import("@/views/admin/Users.vue"),

            },

            {
                path: "users/create",
                name: "CreateNewUser",
                component: () => import("@/components/CreateNewUser.vue"),
            },

            {
                path: "users/:id",
                name: "EditNewUser",
                component: () => import("@/components/EditNewUser.vue"),
            },

            {
                path: "books",
                name: "books",
                component: () => import("@/views/admin/Books.vue"),

            },

            {
                path: "books/create",
                name: "CreateNewBook",
                component: () => import("@/components/CreateNewBook.vue"),
            },

            {
                path: "reviews",
                name: "reviews",
                component: () => import("@/views/admin/Reviews.vue"),

            },
            
            {
                path: "reviews/create",
                name: "CreateReview",
                component: () => import("@/components/CreateReviewBook.vue"),
            },
        ]
    }


]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;

