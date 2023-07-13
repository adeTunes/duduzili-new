import { Icon } from '@iconify/react'
import { Loader, Select, TextInput } from '@mantine/core'
import React, {forwardRef} from 'react'
import UseBankList from '../../../hooks/useBankList';
import { UseFormReturnType } from '@mantine/form';

interface Props {
    form: UseFormReturnType<{
        bank: string;
        account_number: string;
        name: string;
    }, (values: {
        bank: string;
        account_number: string;
        name: string;
    }) => {
        bank: string;
        account_number: string;
        name: string;
    }>
    loading: boolean
}

function AddBankDetails({form, loading}: Props) {
  const { data } = UseBankList();

    interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
        label: string;
        value: string;
      }
      // eslint-disable-next-line react/display-name
      const SelectItem = forwardRef<HTMLImageElement, ItemProps>(
        ({ label, value, ...others }: ItemProps, ref) => (
          <div ref={ref} {...others}>
            <div className="flex items-center gap-3">
              <img
                src="/payments/default-bank-logo.png"
                alt="bank logo"
                className="h-[30px]"
              />
              {label}
            </div>
          </div>
        )
      );
  return (
    <>
    <p className="text-[#757575] max-[460px]:text-sm font-medium leading-6">
        Confirm bank account
      </p>
      <Select
        data={data ?? []}
        searchable
        label="Bank"
        itemComponent={SelectItem}
        placeholder="Select a bank"
        classNames={{
          label: "text-[#2a2a2a] font-medium leading-6",
          root: "flex flex-col gap-2",
          input:
            "h-[48px] border border-[#C8C8C8] rounded-[8px] placeholder:text-[#757575] leading-6 text-[15px]",
        }}
        {...form.getInputProps("bank")}
      />
      <div className="flex flex-col gap-3">
        <TextInput
          label="Account Number"
          placeholder="Enter your bank account number"
          classNames={{
            label: "text-[#2a2a2a] font-medium leading-6",
            root: "flex flex-col gap-2",
            input:
              "h-[48px] border border-[#C8C8C8] rounded-[8px] placeholder:text-[#757575] leading-6 text-[15px]",
          }}
          {...form.getInputProps("account_number")}
        />
        <p className="flex items-center gap-1">
          {form.values.name ? (
            <>
              <Icon color="#4534B8" icon="material-symbols:check-circle" />
              {form.values.name}
            </>
          ) : loading ? (
            <>
              <Loader size="sm" />
              fetching account name, please wait...
            </>
          ) : null}
        </p>
      </div>
    </>
  )
}

export default AddBankDetails