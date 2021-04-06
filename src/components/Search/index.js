import { useContext, useState } from "react";
import { AlertContext } from "../../context/Alert";

export const Search = () => {
  const [val, setVal] = useState("");

  const { show } = useContext(AlertContext);

  const onSubmit = (e) => {
    if (e.key !== "Enter") return;

    if (val.trim()) {
      console.log("Make request with: ", val);
    } else {
      show("Введите корректный ник.");
    }
  };

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Введите ник пользователя..."
        value={val}
        onKeyPress={onSubmit}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  );
};
