const EmptyTableState = ({ name }: { name: string }) => {
  return (
    <span className="flex justify-center items-center my-6 font-assistant-semibold text-gray text-lg">
      No data for {name} found!
    </span>
  );
};

export default EmptyTableState;