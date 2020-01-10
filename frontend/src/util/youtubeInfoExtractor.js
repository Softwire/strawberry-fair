export function getVideoInfoString(iframe) {
    if(iframe) {
        const height = iframe.match(/<iframe(?:\s.*)?\s(height=".*?")(?:\s.*>|>)/)
        const width = iframe.match(/<iframe(?:\s.*)?\s(width=".*?")(?:\s.*>|>)/)
        const source = iframe.match(/<iframe(?:\s.*)?\s(src="https:\/\/www\.youtube\.com.*?")(?:\s.*>|>)/)
        return source ? (height && width ? height[1] + ' ' + width[1] + ' ' + source[1] : source[1] ) : null
    }
    else return null
}

export function getSimplifiedIframe({iframe}) {
    const videoInfo = getVideoInfoString(iframe)
    return videoInfo ? '<figure class="video-container is-marginless"><iframe ' + videoInfo + ' frameborder="0" allowfullscreen="true"></iframe></figure>' : ''
}