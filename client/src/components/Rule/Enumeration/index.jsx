
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

const Enumeration = ({ content }) => (
    <div className={styles.container}>
        <ul>
            {content.map((en, i) => <li key={i} className={styles.text}>{en}</li>)}
        </ul>
    </div>
);

Enumeration.propTypes = {
    content: PropTypes.array,
};

export default Enumeration;
