
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

const Text = ({ content }) => (
    <div>
        <p className={styles.text}>{content}</p>
    </div>
);

Text.propTypes = {
    content: PropTypes.string,
};

export default Text;
