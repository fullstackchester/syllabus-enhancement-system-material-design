import { AppShell, AppShellNavbarConfiguration, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import s from './shell.module.scss';

// const NAVBAR_CONFIG: AppShellNavbarConfiguration = {
//   breakpoint: 1000,
//   collapsed: { mobile: false },
//   width: 200,
  
// }

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
        <img src={require('../../../Assets/Img/bulsu-logo.png')} className={s.header_logo} />
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