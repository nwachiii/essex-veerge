import React from 'react';
import styles from './propertyValue.module.css';
import property from '/src/images/property.png';
import { Image } from '@chakra-ui/react';

export const PropertyValue = () => {
  return (
    <div className="container">
      <div className="prop_container">
        <p>Best selling unit</p>
        <p>
          ₦ 86,000,000<span style={{color: '#cbcbcb'}}>.00</span>
        </p>
        <p>Property Value</p>
        <div className={styles.prop__image}>
          <div>
            <Image src={property} alt="" />
          </div>
          <div>
            <p>Astrid 2.0</p>
            <p>Construed</p>
            <p>30 Days</p>
            <p>Sold out period</p>
            <button>See review</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// NOTE: This component is a work in progress for INSIGHTS Flow....
