import type { JSX } from "vue/jsx-runtime";

export type RichNode = JSX.Element | string;

export interface PublicationLink {
    label: string;
    url: string;
}

export interface Publication {
    id: string;
    title: string;
    authors: RichNode[];
    venue: RichNode[];
    year: number;
    preview: string;
    links: PublicationLink[];
}

export interface NewsItem {
    dateLabel: string;
    content: RichNode[];
}

export interface Profile {
    firstName: string;
    lastName: string;
    subtitle: RichNode[];
    bio: RichNode[][];
    contacts: PublicationLink[];
    avatar: string;
    footer: RichNode[];
}

export interface Experience {
    id: string;
    logo: string;
    institution: RichNode[];
    periodLocation: RichNode[];
    degree: RichNode[];
    advisors: RichNode[];
}
