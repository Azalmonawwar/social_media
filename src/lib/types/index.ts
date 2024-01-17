export type IUser = {
    _id: string;
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
    _id: string;
    caption: string;
    image: string;
    tags: string;
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