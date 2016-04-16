/* global wp */
export default function(options) {
    return new Promise((resolve) => {
        options = Object.assign({
            title: 'Select an image',
            buttonText: 'Select',
            multiple: false
        }, options)
        const state = wp.media({
            title: options.title,
            library: {
                type: 'image'
            },
            button: {
                text: options.buttonText
            },
            multiple: options.multiple
        }).open().state()
        if (options.id && options.id !== -1) {
            var ids
            if (Array.isArray(options.id)) {
                ids = options.id
            } else {
                ids = [options.id]
            }
            ids = ids.map((id) => {return wp.media.model.Attachment.get(id)})
            state.get('selection').reset(ids)
        }
        state.set('display', false)
        state.on('select', function() {
            const selection = this.get('selection')
            if (options.multiple) {
                resolve(selection.toArray()
                .map((item)=>{Object.assign({}, item.attributes)}))
            } else {
                resolve(selection.single().attributes)
            }
        })
    })
}
