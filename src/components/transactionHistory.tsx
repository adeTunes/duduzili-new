import { Icon } from "@iconify/react";
import { clsx } from "@mantine/core";
import { ArrowDown, ArrowUp } from "iconsax-react";
import { useEffect, useMemo, useState } from "react";
import { usePagination, useRowSelect, useTable } from "react-table";
import useTransactionHistory from "../../hooks/useTransactionHistory";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

const TransactionHistory = () => {
  const [activepage, setActivePage] = useState(1);
  const [selected, setSelected] = useState([]);
  const { data } = useTransactionHistory();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (data) {
      setTransactions(
        data?.data?.reduce((acc, item) => {
          dayjs.extend(LocalizedFormat);
          acc.push({
            ...item,
            date_of_transaction: dayjs(item?.date_of_transaction).format("ll"),
          });
          return acc;
        }, [])
      );
    }
  }, [data]);

  const CategoryColumn = useMemo(
    () => [
      {
        Header: "Description",
        accessor: " ",
      },
      {
        Header: "Date",
        accessor: "date_of_transaction",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Transaction type",
        accessor: "mode",
      },

      {
        Header: "Status",
        accessor: "",
      },
    ],
    []
  );

  const [loading, setLoading] = useState(false);

  const CategoryData = useMemo(() => transactions, [transactions]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    gotoPage,
    pageCount,
    state,
    prepareRow,
    selectedFlatRows,
  }: any = useTable(
    {
      columns: CategoryColumn as any,
      data: CategoryData ?? [],
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [...columns];
      });
    }
  );

  useEffect(() => {
    setSelected(selectedFlatRows.map(({ original }) => original.id));
  }, [selectedFlatRows]);

  const { pageIndex, pageSize } = state as any;

  return (
    <div className="flex flex-1 flex-col">
      {transactions?.length ? (
        <div className="flex-1">
          <table
          {...getTableProps()}
          className="bg-[white] text-sm font-normal text-[#514747] w-full"
        >
          <thead className=" text-[#514747]  font-normal">
            {headerGroups.map((headerGroups, idx) => (
              <tr key={idx} {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((columns, index) => (
                  <th
                    key={index}
                    {...columns.getHeaderProps()}
                    className="py-4 text-[#C1C2C6] leading-[25px] pl-8 text-left font-normal border-b border-b-[#F0F0F1]"
                  >
                    {columns.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, id) => {
              prepareRow(row);
              return (
                <tr key={id} {...row.getRowProps()} className="text-left">
                  {row.cells.map((cell) => {
                    return cell.column.Header === "Description" ? (
                      <td
                        {...cell.getCellProps()}
                        className="py-3 text-left pl-8"
                      >
                        <span className="flex items-center gap-3">
                          <span className="bg-[#4534b821] rounded-full h-10 w-10 flex items-center justify-center">
                            {cell.row.original.mode === "Credit" ? (
                              <Icon
                                color="#4534B8"
                                height={20}
                                width={20}
                                icon="iconamoon:download-thin"
                              />
                            ) : (
                              <Icon
                                color="#4534B8"
                                height={20}
                                width={20}
                                icon="iconamoon:download-thin"
                                className="rotate-180"
                              />
                            )}
                          </span>
                          {cell.row.original.mode}
                        </span>
                      </td>
                    ) : cell.column.Header === "Transaction type" ? (
                      <td
                        {...cell.getCellProps()}
                        className="py-3 text-left pl-8"
                      >
                        <span
                          className={clsx(
                            cell.value === "Credit"
                              ? "text-[#367EE8]"
                              : "text-[#4534B8]",
                            "flex items-center gap-1"
                          )}
                        >
                          {cell.value === "Credit" ? "Income" : "Outcome"}
                          {cell.value === "Credit" ? (
                            <ArrowDown
                              className="rotate-45"
                              size={16}
                              color="#367EE8"
                            />
                          ) : (
                            <ArrowUp
                              className="rotate-45"
                              size={16}
                              color="#4534B8"
                            />
                          )}
                        </span>
                      </td>
                    ) : cell.column.Header === "Status" ? (
                      <td
                        {...cell.getCellProps()}
                        className="py-3 text-left pl-8"
                      >
                        <span
                          style={{
                            background: "rgba(2, 177, 90, 0.15)",
                            color: "#02B15A",
                          }}
                          className="w-[81px] text-[12px] leading-[15px] rounded-[32px] flex items-center justify-center h-6"
                        >
                          Successful
                        </span>
                      </td>
                    ) : (
                      <td
                        {...cell.getCellProps()}
                        className="py-3 text-left pl-8"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      ) : (
        <div className="h-full flex-1 bg-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <img
              className="w-[200px]"
              src="/empty-states/pending-requests.png"
              alt="community list empty"
            />
            <p className="text-[#2a2a2a] text-[20px] leading-7 font-bold">
              Recent transactions will appear here
            </p>
          </div>
        </div>
      )}
      {/* <TablePagination
          totalPage={cards?.count / 10}
          setPage={setActivePage}
          activePage={cards?.page}
        /> */}
    </div>
  );
};

export default TransactionHistory;
