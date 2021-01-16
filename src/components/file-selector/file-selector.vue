<template>
  <fieldset>
    <label for="file"></label>
    <input
      type="file"
      id="file"
      :accept="acceptedImageTypes"
      @change="handleFileSelect"
    />
  </fieldset>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import messages from './messages.json'
import { loader } from 'zcanvas'


const ACCEPTED_IMAGE_TYPES = ["image/png", "image/gif", "image/jpeg"]

export default {
  i18n: { messages },
  data: () => ({
    acceptedImageTypes: ACCEPTED_IMAGE_TYPES
  }),
  computed: {
    ...mapGetters([

    ])
  },
  methods: {
    ...mapMutations([

    ]),
    ...mapActions([
        'addImage'
    ]),
    async handleFileSelect({ target }) {
      const files = target?.files
      if (!files || files.length === 0) {
        return
      }

      const file = files[0]
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          const imageElement = reader.result
          const { image, size } = await loader.loadImage(imageElement)
          const { source} = await this.addImage({file, imageElement, size})

          image.src = source
        } catch {
          // TODO: show warning
        }
      }
    }
  }
}

</script>