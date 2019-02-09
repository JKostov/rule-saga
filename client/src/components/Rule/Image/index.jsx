
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

const Image = ({ content }) => (
    <div className={styles.imageContainer}>
        <img src={`http://localhost:3000/uploads/${content}`} className={styles.image}/>
    </div>
);

Image.propTypes = {
    content: PropTypes.string,
};

export default Image;
