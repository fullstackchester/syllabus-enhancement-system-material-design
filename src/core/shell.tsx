import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { JSX } from 'react';
import { Outlet } from 'react-router';
import Navbar from './navbar';


function Shell(): JSX.Element {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header px={10} py={5} flex={'row'}>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        {/* <h6>Bulcan State University</h6> */}
        {/* <img src={'../assets/react.svg'} /> */}
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default Shell