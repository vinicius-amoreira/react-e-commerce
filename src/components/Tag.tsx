interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

function Tag({ text, ...props }: Readonly<TagProps>) {
  return (
    <div
      className={`inline-flex items-center justify-center px-3 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 transition hover:bg-gray-200 cursor-pointer ${props.className}`}
    >
      <span>{text}</span>
    </div>
  );
}

export default Tag;
