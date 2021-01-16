import Vue from 'vue'
import {imageToSource, disposeSource} from "@/utils/memory-util";

export default {
    state: {
        images: []
    },
    getters: {
        images: state => state.images
    },
    mutations: {
        removeImage(state, image) {
            const index = state.images.indexOf(image)
            disposeSource(image.source)
            if (index === -1 ) {
                return
            }
            Vue.delete(state.images, index)
        }
    },
    actions: {
        async addImage(state, {file, imageElement, size}) {
            console.log(222)
            const source = await imageToSource(imageElement)
            state.images.push({file, size, source})
        }
    }
}