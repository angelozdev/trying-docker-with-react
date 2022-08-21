import React, { FormEvent } from "react";
import axios from "axios";

const formatter = new Intl.ListFormat("en-US");

function HomePage() {
  const [values, setValues] = React.useState<any[]>([]);
  const [indexes, setIndexes] = React.useState([]);

  const getValues = async () => {
    const {
      data: { currentValues },
    } = await axios.get("http://localhost:4000/values/current");
    const formattedValues = Object.entries(currentValues).map(
      ([index, value]) => ({
        index,
        value,
      })
    );
    setValues(formattedValues);
  };

  const getIndexes = async () => {
    const {
      data: { values },
    } = await axios.get("http://localhost:4000/values/all");
    const indexes = values.map((value: any) => String(value.number));
    setIndexes(indexes);
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const index = formData.get("index") as string;

    await axios.post("http://localhost:4000/values", {
      index,
    });

    getValues();
    getIndexes();
    form.reset();
  };

  React.useEffect(() => {
    getIndexes();
    getValues();
  }, []);

  return (
    <div className="md:max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2">
          <span>Enter your index: </span>
          <input
            type="number"
            className="bg-transparent"
            placeholder="Enter your index..."
            name="index"
            min={0}
            required
            max={100}
          />
          <button type="submit">Submit</button>
        </label>
      </form>

      <h3 className="text-2xl">Indexes I have seen: </h3>
      <p>{formatter.format(indexes)}</p>

      <h3 className="text-2xl">Calculated values: </h3>
      <ul>
        {values.map((value) => (
          <li key={value.id}>
            {value.index} - {value.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
