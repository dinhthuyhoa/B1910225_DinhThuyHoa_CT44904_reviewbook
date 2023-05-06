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
                name: "Users",
                component: () => import("@/components/admin/Users/Users.vue"),

            },

            {
                path: "users/create",
                name: "CreateNewUser",
                component: () => import("@/components/admin/Users/CreateNewUser.vue"),
            },

            {
                path: "users/:id",
                name: "EditUser",
                component: () => import("@/components/admin/Users/EditUser.vue"),
            },

            {
                path: "books",
                name: "Books",
                component: () => import("@/components/admin/Books/Books.vue"),

            },

            {
                path: "books/create",
                name: "CreateNewBook",
                component: () => import("@/components/admin/Books/CreateNewBook.vue"),
            },

            {
                path: "books/:id",
                name: "EditBook",
                component: () => import("@/components/admin/Books/EditBook.vue"),
            },

            {
                path: "reviews",
                name: "Reviews",
                component: () => import("@/components/admin/Reviews/Reviews.vue"),

            },

            {
                path: "reviews/create",
                name: "CreateNewReview",
                component: () => import("@/components/admin/Reviews/CreateNewReview.vue"),
            },

            {
                path: "reviews/:id",
                name: "EditReview",
                component: () => import("@/components/admin/Reviews/EditReview.vue"),
            },
        ]
    }


]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;

