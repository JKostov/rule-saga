
import React from 'react';
import PropTypes from 'prop-types';
import Enumeration from './Enumeration';
import Text from './Text';
import Image from './Image';
import styles from './style.scss';

const Rule = ({ rule }) => {
  if (!rule) {
    return <div>No data</div>;
  }

  const { name, category, tags, data } = rule;
  return (
    <div>
        <h1>{category} - {name}</h1>
        <div>{tags.map(tag => `#${tag} `)}</div>
        <div className={styles.mt5}>
            {data.map(({ type, content }) => {
                switch(type) {
                    case 'enumeration': return (<Enumeration content={content}/>);
                    case 'image': return (<Image content={content}/>);
                    case 'text': return (<Text content={content}/>);
                }
            })}
        </div>
    </div>
  );
};

Rule.propTypes = {
  rule: PropTypes.shape({}),
};

export default Rule;
