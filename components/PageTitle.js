import BlurText from './BlurText';

export default function PageTitle({ children }) {
  const text = typeof children === 'string' ? children : '';

  if (!text) {
    return (
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
        {children}
      </h1>
    );
  }

  return (
    <BlurText
      as="h1"
      text={text}
      effect="focus"
      animateBy="words"
      direction="top"
      trigger="load"
      delay={45}
      blur={10}
      distance={16}
      className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
    />
  );
}
