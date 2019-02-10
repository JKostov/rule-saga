
import React from 'react';
import PropTypes from 'prop-types';
import Enumeration from './Enumeration';
import Text from './Text';
import Image from './Image';
import style from './style.scss';

const Rule = ({ rule: { name, category, tags, data }, push }) => {
  return (
    <div>
      <h1>{category} - {name}</h1>
      <div>
        {
          tags.map(tag =>
            <div
              className={style.tag}
              key={tag}
              onClick={() => {
                if (category) {
                  push(`/category/${category}/rules?tags[]=${tag}`)
                }
              }}>#{tag}
          </div>)
        }
      </div>
      <div className={style.mt5}>
        {data.map(({ type, content }, i) => {
          switch(type) {
            case 'enumeration': return (<Enumeration key={i} content={content}/>);
            case 'image': return (<Image key={i} content={content}/>);
            case 'text': return (<Text key={i} content={content}/>);
          }
        })}
      </div>
    </div>
  );
};

Rule.propTypes = {
  category: PropTypes.string,
  rule: PropTypes.shape({}),
};

export default Rule;
