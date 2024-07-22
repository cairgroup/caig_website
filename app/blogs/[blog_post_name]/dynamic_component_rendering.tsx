import { Card } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';

interface DynamicComponentLoaderProps {
  block: string;
  post_name: string;
}

const DynamicComponentLoader: React.FC<DynamicComponentLoaderProps> = ({ block, post_name }) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const component = await import(`${process.cwd()}/public/content/${post_name}/components/${block}.tsx`);
        setComponent(() => component.default);
      } catch (error) {
        console.error(`Error loading component ${block}:`, error);
      }
    };

    loadComponent();
  }, [block, post_name]);

  if (!Component) {
    return <Card className='p-3'>Loading...</Card>;
  }

  return (
    <div className='bg-gray-800 text-background rounded-lg'>
      <Component />
    </div>
  );
};

export default DynamicComponentLoader;
