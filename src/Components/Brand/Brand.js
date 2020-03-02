import React from 'react';
import {
  Level, Image, Title, Column,
} from 'rbx';

const Brand = () => (
  <Column.Group>
    <Column size={4} offset={4}>
      <Level>
        <Level.Item>
          <Image.Container size={64} className="img-center">
            <Image alt="BellHopper Logo" src="/images/bell-solid.svg" />
          </Image.Container>
        </Level.Item>
        <Level.Item>
          <Title size={1} as="b">BellHopper</Title>
        </Level.Item>
      </Level>
    </Column>
  </Column.Group>
);

export default Brand;
