import "./table.css";
import { Link } from 'react-router-dom';

const Table = ({ data }) => {
  console.log(data);
  return (
    <table className="table1">
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <a href={`/product/${item._id}`}>
              {/* <Link to={`/product/${item._id}`}> */}
              <td>{item.title}</td>
            </a>
            {/* </Link> */}
            {/* <td>{item.categories}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
