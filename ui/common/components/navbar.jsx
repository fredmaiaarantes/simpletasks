import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../route-paths';
import { Logout } from './logout';

const navMenus = [
  {
    label: 'Tasks',
    items: [{ label: 'All Tasks', to: routes.tasks }],
  },
  {
    label: 'Dashboard',
    items: [
      { label: 'Overview', to: routes.dashboardOverview },
      { label: 'Analytics', to: routes.dashboardAnalytics },
      { label: 'Activity', to: routes.dashboardActivity },
      { label: 'Stats', to: routes.dashboardStats },
      { label: 'Recent Items', to: routes.dashboardRecentItems },
    ],
  },
  {
    label: 'Projects',
    items: [
      { label: 'All Projects', to: routes.projectsProjectList },
      { label: 'Create Project', to: routes.projectsProjectCreate },
      { label: 'Project Detail', to: routes.projectsProjectDetail },
      { label: 'Members', to: routes.projectsProjectMembers },
      { label: 'Settings', to: routes.projectsProjectSettings },
      { label: 'Archive', to: routes.projectsProjectArchive },
    ],
  },
  {
    label: 'Teams',
    items: [
      { label: 'All Teams', to: routes.teamsTeamList },
      { label: 'Create Team', to: routes.teamsTeamCreate },
      { label: 'Team Detail', to: routes.teamsTeamDetail },
      { label: 'Members', to: routes.teamsTeamMembers },
    ],
  },
  {
    label: 'Calendar',
    items: [
      { label: 'Calendar', to: routes.calendarCalendarView },
      { label: 'Create Event', to: routes.calendarEventCreate },
      { label: 'Event Detail', to: routes.calendarEventDetail },
      { label: 'Edit Event', to: routes.calendarEventEdit },
    ],
  },
  {
    label: 'Messages',
    items: [
      { label: 'Inbox', to: routes.messagesInbox },
      { label: 'Sent', to: routes.messagesSent },
      { label: 'Drafts', to: routes.messagesDrafts },
      { label: 'Compose', to: routes.messagesCompose },
      { label: 'Message Detail', to: routes.messagesMessageDetail },
    ],
  },
  {
    label: 'Files',
    items: [
      { label: 'Browse', to: routes.filesFileBrowser },
      { label: 'Upload', to: routes.filesFileUpload },
      { label: 'File Detail', to: routes.filesFileDetail },
      { label: 'Share', to: routes.filesFileShare },
      { label: 'Trash', to: routes.filesFileTrash },
    ],
  },
  {
    label: 'Reports',
    items: [
      { label: 'Daily', to: routes.reportsDailyReport },
      { label: 'Weekly', to: routes.reportsWeeklyReport },
      { label: 'Monthly', to: routes.reportsMonthlyReport },
      { label: 'Custom', to: routes.reportsCustomReport },
      { label: 'Export', to: routes.reportsExportReport },
    ],
  },
  {
    label: 'Users',
    items: [
      { label: 'All Users', to: routes.usersUserList },
      { label: 'User Detail', to: routes.usersUserDetail },
      { label: 'Edit User', to: routes.usersUserEdit },
      { label: 'Invite', to: routes.usersUserInvite },
      { label: 'Roles', to: routes.usersUserRoles },
      { label: 'Permissions', to: routes.usersUserPermissions },
    ],
  },
  {
    label: 'Workflows',
    items: [
      { label: 'All Workflows', to: routes.workflowsWorkflowList },
      { label: 'Create', to: routes.workflowsWorkflowCreate },
      { label: 'Detail', to: routes.workflowsWorkflowDetail },
      { label: 'History', to: routes.workflowsWorkflowHistory },
    ],
  },
  {
    label: 'Search',
    items: [
      { label: 'Search', to: routes.searchSearchResults },
      { label: 'Advanced', to: routes.searchAdvancedSearch },
      { label: 'Saved Searches', to: routes.searchSavedSearches },
    ],
  },
  {
    label: 'Tags',
    items: [
      { label: 'All Tags', to: routes.tagsTagList },
      { label: 'Create Tag', to: routes.tagsTagCreate },
      { label: 'Tag Detail', to: routes.tagsTagDetail },
    ],
  },
  {
    label: 'Notifications',
    items: [
      { label: 'Center', to: routes.notificationsNotificationCenter },
      { label: 'Preferences', to: routes.notificationsNotificationPreferences },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Profile', to: routes.settingsProfile },
      { label: 'Account', to: routes.settingsAccount },
      { label: 'Appearance', to: routes.settingsAppearance },
      { label: 'Notifications', to: routes.settingsNotifications },
      { label: 'Security', to: routes.settingsSecurity },
      { label: 'Privacy', to: routes.settingsPrivacy },
      { label: 'Language', to: routes.settingsLanguage },
      { label: 'Billing', to: routes.settingsBilling },
    ],
  },
  {
    label: 'Admin',
    items: [
      { label: 'Dashboard', to: routes.adminAdminDashboard },
      { label: 'Users', to: routes.adminAdminUsers },
      { label: 'Settings', to: routes.adminAdminSettings },
      { label: 'Logs', to: routes.adminAdminLogs },
      { label: 'Integrations', to: routes.adminAdminIntegrations },
      { label: 'Backup', to: routes.adminAdminBackup },
    ],
  },
  {
    label: 'Help',
    items: [
      { label: 'FAQ', to: routes.helpFaq },
      { label: 'Support', to: routes.helpSupport },
      { label: 'Contact', to: routes.helpContact },
      { label: 'Tutorials', to: routes.helpTutorials },
      { label: 'Documentation', to: routes.helpDocumentation },
    ],
  },
];

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const menuBg = useColorModeValue('white', 'gray.700');

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Text
          as={Link}
          to={routes.root}
          bgGradient="linear(to-l, #675AAA, #4399E1)"
          bgClip="text"
          fontWeight="bold"
          fontFamily="heading"
          textAlign="left"
          mr={6}
          flexShrink={0}
        >
          Simple Tasks
        </Text>

        <HStack
          flex={1}
          spacing={1}
          overflowX="auto"
          css={{ '&::-webkit-scrollbar': { display: 'none' } }}
        >
          {navMenus.map((menu) => (
            <Menu key={menu.label}>
              <MenuButton
                as={Button}
                size="sm"
                variant="ghost"
                rightIcon={<ChevronDownIcon />}
                fontWeight="normal"
                flexShrink={0}
              >
                {menu.label}
              </MenuButton>
              <MenuList bg={menuBg} zIndex={10}>
                {menu.items.map((item) => (
                  <MenuItem key={item.to} as={Link} to={item.to}>
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ))}
        </HStack>

        <Stack
          flex={{ base: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
          ml={4}
        >
          <Button
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Moon Icon' : 'Sun Icon'}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Logout />
        </Stack>
      </Flex>
    </Box>
  );
}
