function NormalButton({ children, onClick, type }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="p-2 m-2 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white rounded select-none"
    >
      {children}
    </button>
  );
}

export default NormalButton;
