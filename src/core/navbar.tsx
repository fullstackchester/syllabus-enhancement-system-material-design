import { type JSX, useState } from "react";
import { Badge, NavLink } from '@mantine/core';
import { IconFolder, IconUsers, IconChevronRight, IconActivity, IconUserCircle, IconCalendar, IconLayoutDashboard } from '@tabler/icons-react';
import { useLocation } from "react-router";


function Navbar(): JSX.Element {
  const [active, setActive] = useState("Billing");
  const _location = useLocation();
  console.log(_location.pathname)
  return (
    <>
      <NavLink
          href="/dashboard"
          
          
          label="Dashboard"
          variant="filled"
          active={_location.pathname === '/dashboard' }
          leftSection={<IconLayoutDashboard size={16} stroke={1.5} />}
          rightSection={<Badge size="sm" color="red" circle>3</Badge>}
        />
      <NavLink
        href="/faculty"
        label="Faculty"
        variant="filled"
        active={_location.pathname === '/faculty' }
        leftSection={<IconUsers size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
      />
      <NavLink
        href="/school-year"
        label="School Year"
        variant="filled"
        active={_location.pathname === '/school-year' }
        leftSection={<IconCalendar size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
      />
      <NavLink
        href="/account"
        label="Account"
        variant="filled"
        active={_location.pathname === '/account' }
        leftSection={<IconUserCircle size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
      />
      <NavLink
        href="#required-for-focus"
        label="My Files"
        leftSection={<IconFolder size={16} stroke={1.5} />}
      />
      <NavLink
        href="#required-for-focus"
        label="With description"
        description="Additional information"
        leftSection={
          <Badge size="xs" color="red" circle>
            3
          </Badge>
        }
      />
      <NavLink
        href="#required-for-focus"
        label="Active subtle"
        leftSection={<IconActivity size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
        variant="subtle"
        active
      />
      <NavLink
        href="#required-for-focus"
        label="Active light"
        leftSection={<IconActivity size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
        active
      />
      <NavLink
        href="#required-for-focus"
        label="Active filled"
        leftSection={<IconActivity size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
        variant="filled"
        active
      />
    </>
  );
}

export default Navbar;
