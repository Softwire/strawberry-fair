export function getVideoInfoString(iframe) {
    if(iframe) {
        const height = iframe.match(/ (height=".*?") /)
        const width = iframe.match(/ (width=".*?") /)
        const source = iframe.match(/<iframe .* (src="https:\/\/www\.youtube\.com.*?") .*><\/iframe>/)
        return source ? (height && width ? height[1] + ' ' + width[1] + ' ' + source[1] : source[1] ) : null
    }
    else return null
}

export function getSimplifiedIframeString({iframe}) {
    const videoInfo = getVideoInfoString(iframe)
    return videoInfo ? '<figure className="video_container"><iframe ' + videoInfo + ' frameborder="0" allowfullscreen="true"></iframe></figure>' : ''
}