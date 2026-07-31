import type { Meta, StoryObj } from "@storybook/react-vite";
import BannerHero from "./banner-hero";
import bannerFallbackImage from "./assets/banner-fallback.webp";
import bannerShopDesktop from "./assets/banner-shop-desktop.webp";
import bannerShopTablet from "./assets/banner-shop-tablet.webp";
import bannerShopMobile from "./assets/banner-shop-mobile.webp";

const createBannerImage = (label: string, startColor: string, endColor: string) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 1200">
            <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="${startColor}" />
                    <stop offset="100%" stop-color="${endColor}" />
                </linearGradient>
            </defs>
            <rect width="2400" height="1200" fill="url(#bg)" />
            <text x="120" y="180" fill="white" font-family="Arial, sans-serif" font-size="92" font-weight="700">${label}</text>
        </svg>`
    )}`;

const desktopImage = createBannerImage("Desktop 2400w", "#5aa07a", "#2f6c50");
const tabletImage = createBannerImage("Tablet 1600w", "#5296b8", "#2d5874");
const mobileImage = createBannerImage("Mobile 900w", "#b8649f", "#704066");

const meta = {
    title: "Components/BannerHero",
    component: BannerHero,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: "Hero-Banner mit responsiven Bildern, optionalen CTAs und internem Fallback-Bild.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        title: { control: "text" },
        description: { control: "text" },
        imageBackgroundDesktop: { control: "text" },
        imageBackgroundTablet: { control: "text" },
        imageBackgroundMobile: { control: "text" },
        fallbackImageSrc: { control: "text" },
        colorToken: {
            control: "select",
            options: [
                "--color-juice-sugarcane",
                "--color-juice-tamarind",
                "--color-juice-guarana",
                "--color-juice-icetea",
                "--color-text-light",
                "--color-text-dark",
            ],
        },
        actionButtonPrimary: { control: false },
        actionButtonSecondary: { control: false },
    },
    args: {
        title: "Entdecke unsere Getränke",
        description: "Saisonale Getränke mit natürlichen Zutaten\njetzt in deiner Nähe erhältlich.",
        imageBackgroundDesktop: desktopImage,
        imageBackgroundTablet: tabletImage,
        imageBackgroundMobile: mobileImage,
        colorToken: "--color-text-light",
    },
} satisfies Meta<typeof BannerHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutButtons: Story = {

};

export const ImageWithoutButtons: Story = {
    args: {
        colorToken: "--color-juice-sugarcane",
        imageBackgroundDesktop: bannerShopDesktop,
        imageBackgroundTablet: bannerShopTablet,
        imageBackgroundMobile: bannerShopMobile,
    },
};

export const WithButtons: Story = {
    args: {
        colorToken: "--color-juice-sugarcane",
        labelButtonPrimary: "Jetzt entdecken",
        labelButtonSecondary: "Mehr erfahren",
    },
};

export const ImageWithButtons: Story = {
    args: {
        colorToken: "--color-juice-sugarcane",
        labelButtonPrimary: "Jetzt entdecken",
        labelButtonSecondary: "Mehr erfahren",
        imageBackgroundDesktop: bannerShopDesktop,
        imageBackgroundTablet: bannerShopTablet,
        imageBackgroundMobile: bannerShopMobile,
    },
};

export const WithButtonsAndGradient: Story = {
    args: {
        colorToken: "--color-text-light",
        labelButtonPrimary: "Jetzt entdecken",
        labelButtonSecondary: "Mehr erfahren",
        gradientOverlay: true
    },
};

export const ImageWithButtonsAndGradient: Story = {
    args: {
        colorToken: "--color-text-light",
        labelButtonPrimary: "Jetzt entdecken",
        labelButtonSecondary: "Mehr erfahren",
        imageBackgroundDesktop: bannerShopDesktop,
        imageBackgroundTablet: bannerShopTablet,
        imageBackgroundMobile: bannerShopMobile,
        gradientOverlay: true
    },
};

export const FallbackIfNoImageIsConfigured: Story = {
    args: {
        imageBackgroundDesktop: "",
        imageBackgroundTablet: "",
        imageBackgroundMobile: "",
    },
};

export const FallbackIfImageNotFound: Story = {
    args: {
        imageBackgroundDesktop: "https://example.invalid/banner-does-not-exist.webp",
        imageBackgroundTablet: "",
        imageBackgroundMobile: "",
        fallbackImageSrc: bannerFallbackImage,
    },
};
