const Table = ({ data }) => {
  return (
    <table>
      <tbody>
       
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.title}</td>
            {/* <td>{item.categories}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
