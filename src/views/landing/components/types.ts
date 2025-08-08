import type {IconType, RouteType} from "@/types";

export type DemoType = {
    image: string
    name: string
    route: RouteType
}

export type FeatureType = {
    icon: IconType,
    title: string
    description?: string
}