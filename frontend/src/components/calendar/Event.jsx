import PropTypes from 'prop-types'

// These are validators that can be re-used to validate events and lists of events
export const eventPropTypeValidator = PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.object.isRequired,
      dateTime: PropTypes.string.isRequired,
      isMeeting: PropTypes.bool.isRequired
    }),
    html: PropTypes.string.isRequired,
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired
    })
  })
