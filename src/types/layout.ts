import type {IconType, RouteType} from "@/types/index";

export type NavBarLinkType = {
    id: string
    icon?: IconType
    label: string
    route: RouteType
}

export type FooterLinkType = {
    icon?: IconType
    label: string
    route: RouteType
}

export type FooterItemType = {
    title: string
    links: FooterLinkType[]
}