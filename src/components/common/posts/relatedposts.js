
const RelatedPosts = ({ post }) => {}


RelatedPosts.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    }).isRequired
}

export default RelatedPosts
