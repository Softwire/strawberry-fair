import { getSimplifiedIframe } from '../util/youtubeInfoExtractor'

export const youtubeEditorComponent = {
    // Internal id of the component
    id: "youtube",
    // Visible label
    label: "Youtube",
    // Fields the user need to fill out when adding an instance of the component
    fields: [{name: 'iframe', label: 'Embed Youtube Video <>', widget: 'string'}],
    // Pattern to identify a block as being an instance of this component
    pattern: /<figure\sclass="video-container\sis-marginless">(<iframe(?:\s.*)?\ssrc="https:\/\/www\.youtube\.com.*?"(?:\s.*>|>)<\/iframe>)<\/figure>/,
    // Function to extract data elements from the regexp match
    fromBlock: function(match) {
      return {iframe: match[1]}
    },
    // Function to create a text block from an instance of this component
    toBlock: getSimplifiedIframe,
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: getSimplifiedIframe
  }