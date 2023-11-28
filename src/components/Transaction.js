import Items from "./Items";
import "./transaction.css";

const Transaction = (props) => {
  const { items } = props
  return (
    <div>
      <ul className="item-list">
        {items.map((e) => {
          return <Items {...e} key={e.id} />;
        })}
      </ul>
    </div>
  );
};

export default Transaction;
