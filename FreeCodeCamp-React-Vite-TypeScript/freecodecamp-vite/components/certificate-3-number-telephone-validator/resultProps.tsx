interface StylesElement {
  blue: string;
  red: string;
}

interface Param {
  isValid: boolean | null;
  inputValue: string;
}

const styles: StylesElement = {
  blue: "#00471b",
  red: "red",
};
function ResultProps({ isValid, inputValue }: Param) {
  if (isValid === null) {
    return null;
  }

  return (
    <p style={isValid ? { color: styles.blue } : { color: styles.red }}>
      {isValid ? "Valid" : "Invalid"} Us number :{inputValue}
    </p>
  );
}
export default ResultProps;
