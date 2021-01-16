import { createCanvas } from './canvas-util'

const {URL} = window

export const imageToSource = async (imageElement, type = "image/jpeg", optQuality= 90) => {
    const {cvs, ctx} = createCanvas()

    cvs.width = imageElement.clientWidth
    cvs.height = imageElement.clientHeight

    ctx.drawImage(imageElement, 0, 0)

    return new Promise((resolve, reject) => {
        try {
            cvs.toBlob((blob) => {
                resolve(URL.createObjectURL(blob))
            }, type, optQuality)
        } catch (error) {
            reject(error)
        }
    })
}

export const disposeSource = imageBlobURL => {
    URL.revokeObjectURL(imageBlobURL)
}