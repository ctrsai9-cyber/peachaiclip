import type {IconType} from "@/types";

export type FeatureType = {
    icon: IconType
    title: string
    description: string
}

export type TestimonialType = {
    review: string
    rating: number
    user: {
        image: string
        name: string
        role: string
    }
}