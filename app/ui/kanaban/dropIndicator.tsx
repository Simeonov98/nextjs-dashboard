export const DropIndicator = ({ beforeId, columnId }: { beforeId: string; columnId: number }) => {
  return (
    <div data-before={beforeId || "-1"} 
    data-column={columnId}
    className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
}