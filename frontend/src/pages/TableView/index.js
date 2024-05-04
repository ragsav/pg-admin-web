import { useParams } from "react-router-dom";
import { RawDatagrid } from "../../components/RawDataGrid";
import "./styles.css";
/**
 *
 * @param {object} param0
 * @returns
 */
const TableView = ({}) => {
  const { table_name } = useParams();
  return (
    <div className="flex flex-col justify-start items-stretch w-full h-full">
      {table_name && <RawDatagrid showStats={true} tableName={table_name} />}
    </div>
  );
};

export default TableView;
