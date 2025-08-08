import type {RouteParamsRaw} from "vue-router";
import type {FunctionalComponent} from "vue";

export type CurrencyType = '₹' | '$' | '€'

export type RouteType = {
    name?: string;
    params?: RouteParamsRaw;
    url?: string;
};

export type IconType = FunctionalComponent

export type SocialLinkType = {
    icon: IconType
    name?: string
    route: RouteType
}