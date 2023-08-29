import { ENV } from "../constants"

export const getUrlImage = ( imageName ) => {
    return `${ ENV.MEDIA_URL }/${ imageName }.jpg`
}