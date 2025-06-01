// File: frontend/src/components/EGFRCalculator.stories.jsx
import React from 'react';
import EGFRCalculator from './EGFRCalculator.jsx';

export default {
  title: 'Components/EGFRCalculator',
  component: EGFRCalculator,
};

export const Default = () => <EGFRCalculator onSubmit={console.log} />;

