export interface videoData {
    title: string;
    description: string;
    thumbnail: string;
    author: string;
    authorThumbnail: string;
}

export interface MarkerData {
    id?: string;
    uid?: string;
    position: Array<any>;
    title: string;
    type: MarkerIconType;
    // type: "" | "info" | "me" | "jellyfish" | "run" | "walk" | "drive" | "fly";
    seekto?: string;
    description?: string;
    imgurl?: string;
    seekAsSeconds?: number;
}

export type MarkerIconType = "info" | "me" | "jellyfish" | "jellyfishJump" | "alien" | "devil" | "exploding" | "ghost" | "poo" | "robot";