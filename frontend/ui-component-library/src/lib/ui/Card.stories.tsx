import React from 'react';
import Card from './Card';

export default {
  title: 'UI/Card',
  component: Card,
};

export const Default = () => (
  <Card title="Hello" description="Card description">
    <p>Card content</p>
  </Card>
);
