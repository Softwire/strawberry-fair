export const imageEditorComponent = {
  // Internal id of the component
  id: "image",
  // Visible label
  label: "Image",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {name: 'alt', label: 'Description', widget: 'string'},
    {name: 'src', label: 'Image', widget: 'image'},
    {
      name: 'size', label: 'Desktop Size Limit', widget: 'select', default: 'Medium', 
      options: ['Small', 'Medium', 'Large'],
    }
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<figure><img src="(.*)" alt="(.*)" class="html-embedded-image-(.*)"><\/figure>/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {alt: match[2], src: match[1], size: capitalize(match[3])}
  },
  // Function to create a text block from an instance of this component
  toBlock: htmlEmbeddedImage,
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: htmlEmbeddedImage
}

function htmlEmbeddedImage({src = "src", alt = "alt", size}) {
  return `<figure><img src="${src}" alt="${alt}" class="html-embedded-image-${size.toLowerCase()}"></figure>`
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1)
}