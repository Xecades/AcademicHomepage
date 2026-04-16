import type { NewsItem, Profile, Publication, RichNode } from "@/types/site";

const sup = (text: string) => <sup>{text}</sup>;
const link = (content: RichNode | RichNode[], url: string) => (
    <a href={url} rel="noopener" target="_blank">
        {content}
    </a>
);
const b = (text: RichNode | RichNode[]) => <strong>{text}</strong>;
const commaSeparated = (items: RichNode[]): RichNode[] =>
    items.flatMap((item, index) => (index === 0 ? [item] : [", ", item]));

const _make_author = (name: RichNode, url: string) => ({
    _: link(name, url),
    star: link([name, sup("*")], url),
    stress: b(name),
    star_stress: b([name, sup("*")]),
});

const _authors = {
    me: _make_author("Zhe Huang", "https://github.com/Xecades"),
    rouwan_wu: _make_author("Rouwan Wu", "https://github.com/RingoWRW"),
    xingyi_he: _make_author("Xingyi He", "https://hxy-123.github.io/"),
    yan_liu: _make_author("Yan Liu", "https://faculty.hdu.edu.cn/jsjxy/ly2_21682/main.htm"),
    shen_yan: _make_author("Shen Yan", "https://openreview.net/profile?id=~Shen_Yan6"),
    sida_peng: _make_author("Sida Peng", "https://pengsida.net/"),
    maojun_zhang: _make_author("Maojun Zhang", "https://orcid.org/0000-0001-6748-0545"),
    xiaowei_zhou: _make_author("Xiaowei Zhou", "https://xzhou.me/"),
};

export const profile: Profile = {
    firstName: "Zhe",
    lastName: "Huang",
    subtitle: ["Undergrad @ ", link("Turing, ZJU", "http://www.cs.zju.edu.cn/turingclass_en/")],
    bio: [
        [
            "I am a junior undergraduate student at ",
            link("Zhejiang University", "https://www.zju.edu.cn/english/"),
            " (",
            link("Turing Class", "http://www.cs.zju.edu.cn/turingclass_en/"),
            "), majoring in Computer Science and Technology, with an honours degree from ",
            link("Chu Kochen Honors College", "http://ckc.zju.edu.cn/ckcen/"),
            ".",
        ],
        [
            "Currently, I am fortunate to be advised by Prof. ",
            link("Xiaowei Zhou", "https://www.xzhou.me/"),
            " and Prof. ",
            link("Sida Peng", "https://pengsida.net/"),
            " at ",
            link("ZJU3DV Group", "https://github.com/zju3dv"),
            ", affiliated with the State Key Lab of CAD&CG, ZJU.",
        ],
        [
            "My academic focus lies in ",
            b("computer vision"),
            " and ",
            b("embodied intelligence"),
            ", with experience in ",
            b("3D perception"),
            ", ",
            b("visual localization"),
            ", and ",
            b("vision-language navigation"),
            ", and a broader interest in learning-based intelligent agents.",
        ],
    ],
    contacts: [
        { label: "Email", url: "mailto:zhehuang02@gmail.com" },
        { label: "Github", url: "https://github.com/Xecades" },
        { label: "X", url: "https://x.com/XecadesZhe" },
        { label: "CV", url: "zhehuang-cv.pdf" },
    ],
    avatar: "https://placehold.co/600x800/eee/bbb?text=Photo\\nnot+taken\\nyet+:(",
    footer: ["© Copyright 2026 Zhe Huang"],
};

export const news: NewsItem[] = [
    {
        dateLabel: "March, 2026",
        content: [
            link("AerialExtreMatch", "https://xecades.github.io/AerialExtreMatch/"),
            " is accepted to RA-L 2026.",
        ],
    },
];

export const publications: Publication[] = [
    {
        id: "aerialextrematch",
        preview: "./images/pubs/AerialExtreMatch.png",
        title: "AerialExtreMatch: A Benchmark for Extreme-View Image Matching and Localization",
        authors: commaSeparated([
            _authors.rouwan_wu.star,
            _authors.me.star_stress,
            _authors.xingyi_he._,
            _authors.yan_liu._,
            _authors.shen_yan._,
            _authors.sida_peng._,
            _authors.maojun_zhang._,
            _authors.xiaowei_zhou._,
        ]),
        venue: ["RA-L, 2026"],
        year: 2026,
        links: [
            { label: "Paper", url: "https://ieeexplore.ieee.org/document/11434521" },
            { label: "Website", url: "https://xecades.github.io/AerialExtreMatch/" },
            { label: "Code", url: "https://github.com/Xecades/AerialExtreMatch" },
        ],
    },
];
