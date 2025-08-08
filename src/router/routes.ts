import type {RouteRecordRaw} from "vue-router";

interface RouteMetaType {
    title?: string;
    requiresAuth?: boolean // add this if authentication is needed
}

export const allRoutes: Array<RouteRecordRaw & { meta?: RouteMetaType }> = [
    {
        path: '/',
        name: 'landing',
        component: () => import('@/views/pages/index-2/index.vue'),
    },
     {
        path: '/room',
        name: 'room',
        component: () => import('@/views/pages/index-2/chatroom.vue'),
    },
    {
        path: '/crowdfunding',
        name: 'crowdfunding',
        component: () => import('@/views/pages/index-2/Crowdfunding.vue'),
    },
    {
        path: '/fundinggirls',
        name: 'fundinggirls',
        component: () => import('@/views/pages/index-2/FundingGirls.vue'),
    },
    {
        path: '/liveroom',
        name: 'liveroom',
        component: () => import('@/views/pages/index-2/liveroom.vue'),
    },
];