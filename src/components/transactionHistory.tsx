import { Icon } from "@iconify/react";
import { Checkbox, clsx } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ArrowDown, ArrowUp } from "iconsax-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { usePagination, useRowSelect, useTable } from "react-table";
import useTransactionHistory from "../../hooks/useTransactionHistory";

const TransactionHistory = () => {
  const [activepage, setActivePage] = useState(1);
  const [selected, setSelected] = useState([]);
  const {data} = useTransactionHistory()
  

  const CategoryColumn = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Transaction type",
        accessor: "transaction_type",
      },

      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );
  const [CategoryListData, setCategoryListData] = useState([
    {
      description: "Ayodele Davies gifted you a Pcock",
      date: "Sat, 20 Apr 2020",
      amount: "N1,500.00",
      transaction_type: "Income",
      status: "Successful",
      sticker: "Pcock",
      action: "gifted sticker",
    },
    {
      description: "You deposited fund",
      date: "Sat, 20 Apr 2020",
      amount: "N1,500.00",
      transaction_type: "Income",
      status: "Failed",
      action: "deposited",
    },
    {
      description: "You withdrew fund",
      date: "Sat, 20 Apr 2020",
      amount: "N1,500.00",
      transaction_type: "Income",
      status: "Successful",
      action: "withdrew",
    },
    {
      description: "Ayodele Davies gifted you a Pcock",
      date: "Sat, 20 Apr 2020",
      amount: "N1,500.00",
      transaction_type: "Income",
      status: "Successful",
      sticker: "Pcock",
      action: "gifted sticker",
    },
    {
      description: "You deposited fund",
      date: "Sat, 20 Apr 2020",
      amount: "N1,500.00",
      transaction_type: "Income",
      status: "Failed",
      action: "deposited",
    },
    {
      description: "You withdrew fund",
      date: "Sat, 20 Apr 2020",
      amount: "N1,500.00",
      transaction_type: "Income",
      status: "Successful",
      action: "withdrew",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const CategoryData = useMemo(() => CategoryListData, [CategoryListData]);

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
    <div className=" grid grid-rows-[1fr_auto]">
      <div className="">
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
                            {cell.row.original.action === "deposited" ? (
                              <Icon
                                color="#4534B8"
                                height={20}
                                width={20}
                                icon="iconamoon:download-thin"
                              />
                            ) : cell.row.original.action === "withdrew" ? (
                              <Icon
                                color="#4534B8"
                                height={20}
                                width={20}
                                icon="iconamoon:download-thin"
                                className="rotate-180"
                              />
                            ) : (
                              <img
                                src="/payments/butfly.png"
                                className="h-5 w-5 object-cover"
                                alt=""
                              />
                            )}
                          </span>
                          {cell.value}
                        </span>
                      </td>
                    ) : cell.column.Header === "Transaction type" ? (
                      <td
                        {...cell.getCellProps()}
                        className="py-3 text-left pl-8"
                      >
                        <span
                          className={clsx(
                            cell.value === "Income"
                              ? "text-[#367EE8]"
                              : "text-[#4534B8]",
                            "flex items-center gap-1"
                          )}
                        >
                          {cell.value}
                          {cell.value === "Income" ? (
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
                            background:
                              cell.value === "Successful"
                                ? "rgba(2, 177, 90, 0.15)"
                                : "#F4B9B9",
                            color:
                              cell.value === "Successful"
                                ? "#02B15A"
                                : "#D40000",
                          }}
                          className="w-[81px] text-[12px] leading-[15px] rounded-[32px] flex items-center justify-center h-6"
                        >
                          {cell.value}
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
      {/* <TablePagination
          totalPage={cards?.count / 10}
          setPage={setActivePage}
          activePage={cards?.page}
        /> */}
    </div>
  );
};

export default TransactionHistory;
