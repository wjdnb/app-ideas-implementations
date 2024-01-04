function NormalButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 m-2 rounded border border-gray-400 hover:bg-gray-300 active:bg-gray-400 select-none"
    >
      {children}
    </button>
  );
}

export default NormalButton;
