import type {CurrencyType, SocialLinkType} from "@/types";
import {Facebook, Instagram, Twitter, Linkedin} from "lucide-vue-next";

import favicon from '@/assets/images/favicon.ico'

export const appName: string = '蜜桃AI'
export const appTitle: string = '蜜桃AI - 与专属AI女友随时畅聊'
export const appDescription: string = '每一次互动都将留下独特记忆，越聊越懂你'
export const appAuthor: string = 'CentaurusAI'
export const appAuthorWebsite: string = ' '

export const buyLink: string = ''

export const currentYear: number = new Date().getFullYear()

export const currency: CurrencyType = '$'

export {favicon}

export const socialLinks: SocialLinkType[] = [
    {
        icon: Facebook,
        route: {url: 'https://www.facebook.com/profile.php?id=61576972806577'}
    },
    {
        icon: Instagram,
        route: {url: 'https://www.instagram.com/peach_ai888/'}
    },
    {
        icon: Twitter,
        route: {url: 'https://x.com/GirlAi59576'}
    },
]