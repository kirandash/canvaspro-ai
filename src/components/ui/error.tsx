type Props = {
  text: string;
};

const ErrorAlert = ({ text }: Props) => {
  return (
    <p className="text-red-500 text-xs bg-destructive/50 p-4 rounded">{text}</p>
  );
};

export default ErrorAlert;
