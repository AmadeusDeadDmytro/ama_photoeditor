import storeModule from '@/store/modules/image-module'

const { mutations, getters, actions } = storeModule

let mockUpdateFn
jest.mock('@/utils/memory-util', () => ({
    imageToSource: (...args) => mockUpdateFn?.('imageToSource', ...args),
    disposeSource: (...args) => mockUpdateFn?.('disposeSource', ...args),
}))

describe('Vuex image module', () => {
    describe('getters', () => {
        it('retrieving the registered images', () => {
            const state = { images: [{foo: 'bar'},{baz: 'qux'}] }
            expect(getters.images(state)).toEqual(state.images)
        })
    })
    describe('mutations', () => {
        it('removing an image object from the images list', () => {
            const image1 = {file: new Blob(), source: 'blob://1', size: {width: 50, height: 50}}
            const image2 = {file: new Blob(), source: 'blob://2', size: {width: 75, height: 75}}
            const state = {
                images: [image1, image2]
            }
            mockUpdateFn = jest.fn()
            mutations.removeImage(state, image1)
            expect(mockUpdateFn).toHaveBeenCalledWith('disposeSource', image1.source)
        })
    })
    describe('actions', () => {
        it('storing image object in the images list', async () => {
            const state = {images: []}
            const image = {
                file: new Blob(),
                imageElement: new Image(),
                size: {width: 100, height: 100}
            }
            mockUpdateFn = jest.fn(() => blobUrl)
            const blobUrl = 'blob://foo'
            await actions.addImage(state, image)
            expect(state.images).toEqual([{file: image.file, size: image.size, source:blobUrl}])
            expect(mockUpdateFn).toHaveBeenCalledWith('imageToSource', image.imageElement)
        })
    })
})