import { pageSearch } from '@/store';
import { Icon } from '@iconify/react';
import { Menu, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react'

function SearchDropdown({children}) {
    const [search, setSearch] = useState("");
  const [searchValue] = useDebouncedValue(search, 500);
  const setPageSearch = useSetAtom(pageSearch);
  const queryClient = useQueryClient();
  const {pathname, push} = useRouter()

  useEffect(() => {
    if (searchValue) {
      setPageSearch(searchValue);
      if (pathname !== "/search") {
        queryClient.invalidateQueries(["search-result", searchValue]);
        push(`/search?q=${searchValue}`);
      }
    }
  }, [searchValue]);
  return (
    <Menu
      closeOnItemClick={false}
      shadow="md"
      width="auto"
      classNames={{
        item: "!p-0",
        dropdown: "!p-0 rounded-[32px]",
      }}
      styles={{
        dropdown: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
        item: {
          "&[data-hovered]": {
            background: "none",
            cursor: "default",
          },
        },
      }}
    >
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
        <TextInput
        placeholder="Search Duduzili"
        icon={<Icon icon="mingcute:search-line" height={24} width={24} />}
        classNames={{
          input:
            "rounded-[32px] h-[47px] min-w-[200px] border-none bg-[#f4f4f4] pl-[2.6rem]",
        }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default SearchDropdown