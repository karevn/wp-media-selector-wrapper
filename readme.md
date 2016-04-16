This plugin wraps WordPress media selector into a simple Promise-based API.

## Usage

```js
const select = require('wp-image-selector-wrapper')
select({
  id: [100, 101]
  multiple: true,
  title: 'Select image',
  buttonText: 'Select'
})
.then((images)=> {console.info(images)})

```
