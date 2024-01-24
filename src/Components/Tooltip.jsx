import Portal from "./Portal";

const Tooltip = ({ children, title }) => {
  return (
    <Trigger>{children}</Trigger>
    // {children}
    // <Portal>
    //   <div className="p-2">{title}</div>
    // </Portal>
  );
};

export default Tooltip;
