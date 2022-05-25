import { AccountCircle, Article, Dashboard, Group, School } from "@mui/icons-material";

export const SidebarLinks = [
    {
        label: 'Dashboard',
        link: '/dashboard',
        icon: <Dashboard color='primary' />
    },
    {
        label: 'Syllabus',
        link: '/syllabus',
        icon: <Article color='primary' />
    },
    {
        label: 'Subjects',
        link: '/subjects',
        icon: <School color='primary' />
    },
    {
        label: 'Faculty',
        link: '/faculty',
        icon: <Group color='primary' />
    },
    {
        label: 'Account',
        link: '/account',
        icon: <AccountCircle color='primary' />
    },
]