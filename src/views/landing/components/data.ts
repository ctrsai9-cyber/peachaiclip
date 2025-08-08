import type {FeatureType, DemoType} from "@/views/landing/components/types";
import {TabletSmartphone, Chrome, Cog, Cpu, Code2, Dribbble, CheckCheck, BadgeHelp} from "lucide-vue-next";

import demo1 from "@/assets/images/demo/demo1.png"
import demo2 from "@/assets/images/demo/demo2.png"
import demo3 from "@/assets/images/demo/demo3.png"
import demo4 from "@/assets/images/demo/demo4.png"
import demo5 from "@/assets/images/demo/demo5.png"

import loginImg from "@/assets/images/demo/auth-login.png"
import qrLoginImg from "@/assets/images/demo/auth-qr-login.png"
import registerImg from "@/assets/images/demo/auth-register.png"
import lockScreenImg from "@/assets/images/demo/auth-lock-screen.png"
import forgotPWImg from "@/assets/images/demo/auth-forgotpw.png"
import logoutImg from "@/assets/images/demo/auth-logout.png"


export const landingDemos: DemoType[] = [
    {
        image: demo1,
        name: 'Web 3',
        route: {name: 'pages.index-1'}
    },
    {
        image: demo2,
        name: 'Image Generator',
        route: {name: 'pages.index-2'}
    },
    {
        image: demo3,
        name: 'Video Creator',
        route: {name: 'pages.index-3'}
    },
    {
        image: demo4,
        name: 'Content Creator',
        route: {name: 'pages.index-4'}
    },
    {
        image: demo5,
        name: 'Business Tools',
        route: {name: 'pages.index-5'}
    },
]


export const authDemos: DemoType[] = [
    {
        image: loginImg,
        name: 'Sign In',
        route: {name: 'auth.sign-in'}
    },
    {
        image: qrLoginImg,
        name: 'Sign In With QR',
        route: {name: 'auth.sign-in-with-qr'}
    },
    {
        image: registerImg,
        name: 'Sign Up',
        route: {name: 'auth.sign-up'}
    },
    {
        image: lockScreenImg,
        name: 'Lock Screen',
        route: {name: 'auth.lock-screen'}
    },
    {
        image: forgotPWImg,
        name: 'Forgot Password',
        route: {name: 'auth.forgot-password'}
    },
    {
        image: logoutImg,
        name: 'Logout',
        route: {name: 'auth.logout'}
    },
]


export const features: FeatureType[] = [
    {
        icon: TabletSmartphone,
        title: "Fully Responsive"
    },
    {
        icon: Chrome,
        title: "Cross-browser compatible"
    },
    {
        icon: Cog,
        title: "Easy to customize"
    },
    {
        icon: Cpu,
        title: "Developer Friendly"
    },
    {
        icon: Code2,
        title: "Clean &amp; Easy to Understand Code"
    },
    {
        icon: Dribbble,
        title: "Font and SVG Icons"
    },
    {
        icon: CheckCheck,
        title: "Free Updates"
    },
    {
        icon: BadgeHelp,
        title: "Ultimate Support"
    },
]