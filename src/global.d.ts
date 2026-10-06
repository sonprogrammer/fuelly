import mongoose from "mongoose";

declare global {
    var mongoose: {
        conn: mongoose.Mongoose | null;
        promise: Promise<mongoose.Mongoose> | null;
    } | undefined
    interface Window {
        Kakao: {
            isInitialized: () => boolean
            init: (key: string) => void
            Auth: {
                authorize: (options: {
                    redirectUri: string
                    throughTalk: boolean
                }) => void
            }
            Share: {
                sendDefault: (options: KakaoShareOptions) => void
            }
        }
    }
}

type KakaoShareOptions =
    | {
        objectType: "text"
        text: string
        link: {
            mobileWebUrl: string
            webUrl: string
        }
    }
    | {
        objectType: "feed"
        content: {
            title: string
            description: string
            imageUrl: string
            link: {
                mobileWebUrl: string
                webUrl: string
            }
        }
        buttons?: {
            title: string
            link: {
                mobileWebUrl: string
                webUrl: string
            }
        }[]
    }
