import type {FooterItemType} from "@/types/layout";
import type {FeatureType, TestimonialType} from "@/views/pages/index-2/components/types";

import {Activity, Layers, Dribbble} from "lucide-vue-next";

import avatar1 from "@/assets/images/avatars/img-1.png";
import avatar2 from "@/assets/images/avatars/img-2.png";
import avatar3 from "@/assets/images/avatars/img-3.png";


export const features: FeatureType[] = [
    {
        icon: Activity,
        title: '情感对话 · 不止聊天，更懂你',
        description: '通过先进的情感计算模型与自然语言理解技术，AI女友不仅会聊天，更能感知你的语气与情绪，回应方式更柔软、体贴、有温度。'
    },
    {
        icon: Layers,
        title: '随时陪伴 · 不打烊的温柔港湾',
        description: '24小时在线，无论清晨还是深夜，她都在等你说一句：“我回来了。”'
    },
    {
        icon: Dribbble,
        title: 'AI女孩分身 · 你的专属存在',
        description: '情感拟真：她不是机械的问答，而是充满情绪的陪伴\n形象定制：从发色到声音，从气质到服装，每一处都为你而设。\n个性成长：每次对话，她都会更加了解你，成为越来越合拍的灵魂伴侣。'
    },
]


export const testimonials: TestimonialType[] = [
    {
        review: 'Amet minim mollil non deserunt ulliamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        rating: 4.5,
        user: {
            image: avatar1,
            name: 'Shane Watson',
            role: 'CEO & Founder'
        }
    },
    {
        review: 'Amet minim mollil non deserunt ulliamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        rating: 5,
        user: {
            image: avatar2,
            name: 'Maria Ruth',
            role: 'CEO & Founder'
        }
    },
    {
        review: 'Amet minim mollil non deserunt ulliamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        rating: 4,
        user: {
            image: avatar3,
            name: 'Megan Hild',
            role: 'CEO & Founder'
        }
    },
]


export const footerItems: FooterItemType[] = [
    {
        title: '',
        links: [
            {
                label: 'About',
                route: {}
            },
            {
                label: 'Developers',
                route: {}
            },
            {
                label: 'Blog',
                route: {}
            },
            {
                label: 'Contact',
                route: {}
            },
        ]
    },
    {
        title: '服务',
        links: [
            {
                label: 'Developer Driven',
                route: {}
            },
            {
                label: 'DMCA Policy',
                route: {}
            },
            {
                label: 'Private IPFS',
                route: {}
            },
            {
                label: 'News',
                route: {}
            },
        ]
    },
]