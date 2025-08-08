import {createRouter, createWebHistory} from 'vue-router'
import {type IStaticMethods} from "preline/preline";
import {allRoutes} from "@/router/routes";
import {appTitle} from "@/helpers";
import {useAuthStore} from '@/stores/auth'

declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: allRoutes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }

        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            };
        }

        return {left: 0, top: 0};
    }
})


// set page title
router.beforeEach((to, from, next) => {
    const title = to.meta.title;
    if (title) {
        document.title = title + ' | ' + appTitle;
    } else {
        document.title = appTitle;
    }

    next();
})

// preline
router.afterEach((to, from, failure) => {
    if (!failure) {
        setTimeout(() => {
            window.HSStaticMethods.autoInit();
        }, 100)
    }
});


// auth (remove or comment below code if authentication is not needed)
router.beforeEach((to, from, next) => {

    const requiresAuth = to.matched.some((route) => route.meta.requiresAuth)

    if (!requiresAuth) return next()

    const useAuth = useAuthStore()
    if (useAuth.isAuthenticated()) {
        return next()
    }

    redirectToLogin()

    function redirectToLogin() {
        next({name: 'auth.sign-in', query: {redirectedFrom: to.fullPath}})
    }
})

export default router
