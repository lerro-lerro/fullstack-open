import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Blog = ({ blog }) => {
  return (
    <div
      className="blog"
      style={{ border: '1px solid #ddd', padding: '8px', marginBottom: '5px' }}
    >
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
  }).isRequired,
};

export default Blog;
