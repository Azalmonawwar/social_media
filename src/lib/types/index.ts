export type IUser = {
    name: string;
    username: string;
    email: string | null;
    phone: string | null;
    password: string;
    avatar: string;
    date: Date;
}

export type IComment = {
    user: IUser;
    text: string;
    name: string;
    avatar: string;
    date: Date;
}

export type IPost = {
    user: IUser;
    caption: string;
    image: string;
    location: string;
    likes: IUser[];
    comments: IComment[];
    createdAt: Date;
}


export type IProfile = {
    user: IUser;
    location: string;
    status: string;
    bio: string;
    date: Date;
}