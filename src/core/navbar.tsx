import { Badge, NavLink } from '@mantine/core';
import { IconActivity, IconCalendar, IconChevronRight, IconFolder, IconLayoutDashboard, IconUserCircle, IconUsers, IconKey, IconFiles } from '@tabler/icons-react';
import { type JSX } from "react";
import { useLocation, useNavigate  } from "react-router";


function Navbar(): JSX.Element {
  const _location = useLocation();
  const _nav = useNavigate();

  return (
    <>
      <NavLink
          // href="/dashboard"
          onClick={() => _nav('/dashboard')}
          label="Dashboard"
          variant="filled"
          active={_location.pathname === '/dashboard' }
          leftSection={<IconLayoutDashboard size={16} stroke={1.5} />}
          rightSection={<Badge size="sm" color="red" circle>3</Badge>}
        />
      <NavLink
        // href="/faculty"
        onClick={() => _nav('/faculty')}
        label="Faculty"
        variant="filled"
        active={_location.pathname === '/faculty' }
        leftSection={<IconUsers size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
      />
      <NavLink
        onClick={() => _nav('/school-year')}
        label="School Year"
        variant="filled"
        active={_location.pathname === '/school-year' }
        leftSection={<IconCalendar size={16} stroke={1.5} />}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
      />
      <NavLink
        onClick={() => _nav('/account/profile')}
        label="Account"
        // variant=""
        defaultOpened={true}
        active={_location.pathname.includes('account')}
        leftSection={<IconUserCircle size={16} stroke={1.5} />}
        childrenOffset={20}
        rightSection={
          <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
        }
      >
        <NavLink variant="filled" active={_location.pathname === '/account/profile' } onClick={() => _nav('account/profile')} label="Profile" leftSection={<IconKey size={16} stroke={1.5} />} />
        <NavLink variant="filled" active={_location.pathname === '/account/security' } onClick={() => _nav('account/security')} label="Security" leftSection={<IconKey size={16} stroke={1.5} />} />
        <NavLink variant="filled" active={_location.pathname === '/account/published' } onClick={() => _nav('account/published')} label="Published" leftSection={<IconFiles size={16} stroke={1.5} />} />
      </NavLink>
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
