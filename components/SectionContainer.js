export default function SectionContainer({ children, wide = false }) {
  return (
    <div
      className={`mx-auto my-auto px-4 sm:px-6 ${
        wide ? 'max-w-6xl xl:px-2' : 'max-w-2xl xl:max-w-2xl xl:px-0'
      }`}
    >
      {children}
    </div>
  );
}
