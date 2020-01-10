import { getSimplifiedIframe } from '../util/youtubeInfoExtractor'

export const youtubeEditorComponent = {
    // Internal id of the component
    id: "youtube",
    // Visible label
    label: "Youtube",
    // Fields the user need to fill out when adding an instance of the component
    fields: [
      {name: 'iframe', label: 'Embed Youtube Video <>', widget: 'string', hint: 'Hint: Paste a youtube video iframe into this box. To find the iframe, follow the steps below:\n\t1.\
       Go to the desired video on Youtube\n\t2. Click on "Share", above the red subscribe button.\n\t3. Click on "<> Embed"\n\t4. Click on "Copy" in the bottom-right corner.\n\t5.\
        Paste into this box.\nYou should now see your video appearing on the preview.'},
      {name: 'largeOnDesktop', label: 'Large size on desktop', widget: 'boolean', default: false, hint: 'This switch controls the size of the video on a desktop screen.\
       Switch it on if you want to make it large. You should see the video change in size as you toggle the switch.'}
    ],
    // Pattern to identify a block as being an instance of this component
    pattern: /<figure(?:\s.*?)?(\sis-large-on-desktop)?(?:\s.*?)?>(<iframe(?:\s.*?)?\ssrc="https:\/\/www\.youtube\.com.*?"(?:\s.*?)?><\/iframe>)<\/figure>/,
    // Function to extract data elements from the regexp match
    fromBlock: function(match) {
      return {iframe: match[2], largeOnDesktop: !!match[1]}
    },
    // Function to create a text block from an instance of this component
    toBlock: getSimplifiedIframe,
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: getSimplifiedIframe
  }